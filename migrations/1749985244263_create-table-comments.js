/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    date: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    thread: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'threads',
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
    },
    is_delete: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
};