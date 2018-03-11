import { db }  from './database';
import PhoneNumber from 'awesome-phonenumber';
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';

import { config } from './config';

export const add = (phone: string, firstName: string, lastName: string, email: string) => db
  .prepare('INSERT INTO users VALUES (?, ?, ?, ?)')
  .run(parsePhone(phone), firstName, lastName, email);

export const addCheckin = (phone: string, date: string = new Date().toISOString()) => db
  .prepare('INSERT INTO user_checkin VALUES (?, ?)')
  .run(parsePhone(phone), date);

export const get = (phone: string) => db.prepare('SELECT * FROM users WHERE phone=?').get(parsePhone(phone));

export const getCheckins = (phone: string) => db.prepare('SELECT * FROM user_checkin WHERE phone=?').all(parsePhone(phone));

export const getCheckinCount = (phone: string): number  => db
  .prepare('SELECT count(*) as checkins FROM user_checkin WHERE phone=?')
  .get(parsePhone(phone)).checkins;

export const canCheckin = (phone: string): number  => db
  .prepare("SELECT count(*) as checked_in_recently FROM user_checkin WHERE phone=? and datetime(date) >= datetime('now', '-5 minutes')")
  .get(parsePhone(phone)).checked_in_recently;

export const remove = (phone: string) => {
  db.prepare('DELETE FROM users WHERE phone=?').run(parsePhone(phone));
  db.prepare('DELETE FROM user_checkin WHERE phone=?').run(parsePhone(phone));
};

export const isValidPhone = (phone: string): boolean => new PhoneNumber(phone, 'US').isValid();

export const parsePhone = (phone: string): string => new PhoneNumber(phone, 'US').getNumber();

export const calcualtePoints = (phone: string) => {
  const count: number = getCheckinCount(phone);

  return count
    ? ((count - 1) * 20) + 50
    : 0;
};

export const sendEmail = (email: string) => {
  createTestAccount((err, account) => {

    const transporter = createTransport(config.mail);

    const mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>',
      to: email,
      subject: 'Your Points Total',
      text: 'Hello world?',
      html: '<b>Hello world?</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.log(error);

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', getTestMessageUrl(info));
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
};
