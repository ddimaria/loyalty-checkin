import * as Database from 'better-sqlite3';

export const db = new Database('loyalty-checkin.db');

/**
 * Create the users table
 */
export const createUsersTable = () =>
  db.exec(
    'CREATE TABLE IF NOT EXISTS users (phone TEXT PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT)'
  );

/**
 * Create the user_checkin table
 */
export const createUserCheckinTable = () =>
  db.exec('CREATE TABLE IF NOT EXISTS user_checkin (phone TEXT, date TEXT)');

/**
 * Create all tables
 */
export const createTables = () =>
  createUsersTable() && createUserCheckinTable();
