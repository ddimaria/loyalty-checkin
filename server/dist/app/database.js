"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database = require("better-sqlite3");
exports.db = new Database('loyalty-checkin.db');
exports.createUsersTable = () => exports.db.exec('CREATE TABLE IF NOT EXISTS users (phone TEXT PRIMARY KEY, firstName TEXT, lastName TEXT, email TEXT)');
exports.createUserCheckinTable = () => exports.db.exec('CREATE TABLE IF NOT EXISTS user_checkin (phone TEXT, date TEXT)');
exports.createTables = () => exports.createUsersTable() && exports.createUserCheckinTable();
//# sourceMappingURL=database.js.map