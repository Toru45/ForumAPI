const CommentDetail = require('../../Domains/comments/entities/CommentDetail');
const ReplyDetail = require('../../Domains/replies/entities/ReplyDetail');
const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail');

class GetThreadDetailUseCase {
  constructor({
    threadRepository,
    commentRepository,
    replyRepository,
    commentLikeRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
    this._commentLikeRepository = commentLikeRepository;
  }

  async execute(threadId) {
    const threadDetail = await this._threadRepository.getThreadById(threadId);
    const threadComments = await this._commentRepository.getCommentsByThreadId(threadId);
    const threadCommentsReplies = await this._replyRepository.getRepliesByThreadId(threadId);
    const threadCommentsLikes = await this._commentLikeRepository.getLikesByThreadId(threadId);

    const repliesByComment = this._groupByCommentId(threadCommentsReplies);
    const likesByComment = this._groupByCommentId(threadCommentsLikes);

    threadDetail.comments = this._mapCommentsToCommentDetails(threadComments, repliesByComment, likesByComment);

    return new ThreadDetail(threadDetail);
  }

  _mapCommentsToCommentDetails(comments, repliesByComment, likesByComment) {
    return comments.map((comment) => new CommentDetail({
      ...comment,
      replies: this._getCommentReplies(comment, repliesByComment),
      likeCount: this._getLikeCountForComment(comment.id, likesByComment),
    }));
  }

  _getCommentReplies(comment, repliesByComment) {
    return comment.is_delete ? [] : this._getRepliesForComment(comment.id, repliesByComment);
  }

  _groupByCommentId(items) {
    return items.reduce((groups, item) => {
      const commentId = item.comment;
      if (!groups[commentId]) {
        groups[commentId] = [];
      }
      groups[commentId].push(item);
      return groups;
    }, {});
  }

  _getRepliesForComment(commentId, repliesByComment) {
    const replies = repliesByComment[commentId] || [];
    return replies.map((reply) => new ReplyDetail(reply));
  }

  _getLikeCountForComment(commentId, likesByComment) {
    return (likesByComment[commentId] || []).length;
  }
}

module.exports = GetThreadDetailUseCase;
