"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const awesome_phonenumber_1 = require("awesome-phonenumber");
exports.add = (phone, firstName, lastName, email) => database_1.db
    .prepare('INSERT INTO users VALUES (?, ?, ?, ?)')
    .run(exports.parsePhone(phone), firstName, lastName, email);
exports.addCheckin = (phone, date = new Date().toISOString()) => database_1.db
    .prepare('INSERT INTO user_checkin VALUES (?, ?)')
    .run(exports.parsePhone(phone), date);
exports.getAll = () => database_1.db.prepare('SELECT * FROM users').all();
exports.get = (phone) => database_1.db.prepare('SELECT * FROM users WHERE phone=?').get(exports.parsePhone(phone));
exports.isValidPhone = (phone) => new awesome_phonenumber_1.default(phone, 'US').isValid();
exports.parsePhone = (phone) => new awesome_phonenumber_1.default(phone, 'US').getNumber();
//# sourceMappingURL=user.js.map