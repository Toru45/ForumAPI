const CommentDetail = require('../../comments/entities/CommentDetail');

class ThreadDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id, title, body, date, username, comments,
    } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
    this.comments = comments;
  }

  _verifyPayload(payload) {
    const {
      id,
      title,
      body,
      date,
      username,
      comments,
    } = payload;

    if (!id || !title || !body || !date || !username || !comments) {
      throw new Error('THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string'
      || typeof title !== 'string'
      || typeof body !== 'string'
      || typeof date !== 'string'
      || typeof username !== 'string'
      || !Array.isArray(comments)
    ) {
      throw new Error('THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    comments.forEach((comment) => {
      if (!(comment instanceof CommentDetail)) {
        throw new Error('THREAD_DETAIL.COMMENTS_CONTAINS_INVALID_MEMBER');
      }
    });
  }
}

module.exports = ThreadDetail;
