import * as Database from 'better-sqlite3';

export const db = new Database('loyalty-checkin.db');

export const createUsersTable = () =>
  db.exec(
    'CREATE TABLE IF NOT EXISTS users (phone TEXT PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT)'
  );

export const createUserCheckinTable = () =>
  db.exec('CREATE TABLE IF NOT EXISTS user_checkin (phone TEXT, date TEXT)');

export const createTables = () =>
  createUsersTable() && createUserCheckinTable();
