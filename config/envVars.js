const dbPath = 'mongodb://localhost:27017/todo-app-backend';

const vars = {
  dev: {
    PORT: 3000,
    DB_URI: dbPath,
    SALT_ROUNDS: 10,
    JWT_SECRET: 'thisissupersecretpassword',
    JWT_EXPIRY: 24
  },
  test: {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI || dbPath,
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    JWT_SECRET: process.env.JWT_SECRET || 'thisissupersecretpassword',
    JWT_EXPIRY: process.env.JWT_EXPIRY || 24
  }
};

module.exports = vars[process.env.NODE_ENV || 'dev'];
