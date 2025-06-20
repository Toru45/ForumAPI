const AddCommentUseCase = require('../AddCommentUseCase');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = { content: 'A comment' };

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: 'A comment',
      owner: 'user-123',
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.checkThreadAvailability = jest.fn(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(mockAddedComment));

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addedComment = await addCommentUseCase.execute('user-123', 'thread-123', useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(new AddedComment({
      id: 'comment-123',
      content: 'A comment',
      owner: 'user-123',
    }));

    expect(mockThreadRepository.checkThreadAvailability).toBeCalledWith('thread-123');
    expect(mockCommentRepository.addComment).toBeCalledWith(
      'user-123',
      'thread-123',
      new NewComment({ content: useCasePayload.content }),
    );
  });
});
