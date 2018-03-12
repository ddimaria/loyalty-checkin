import { db }  from './database';
import PhoneNumber from 'awesome-phonenumber';
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';

import { config } from './config';


/**
 * Add a new user
 * 
 * @param {string} phone
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 */
export const add = (phone: string, firstName: string, lastName: string, email: string) => db
  .prepare('INSERT INTO users VALUES (?, ?, ?, ?)')
  .run(parsePhone(phone), firstName, lastName, email);

/**
 * Checkin a user
 * 
 * @param {string} phone
 * @param {string} data     Defaults to now
 */
export const addCheckin = (phone: string, date: string = new Date().toISOString()) => {
  db.prepare('INSERT INTO user_checkin VALUES (?, ?)').run(parsePhone(phone), date);
  const user = get(phone);
  const points = calcualtePoints(phone);
  sendEmail(user.email, points);
}

/**
 * Get a user record
 * 
 * @param {string} phone
 * @return {object}
 */
export const get = (phone: string) => db.prepare('SELECT * FROM users WHERE phone=?').get(parsePhone(phone));

/**
 * Get all checkins for a user
 * 
 * @param {string} phone
 * @return {object[]}
 */
export const getCheckins = (phone: string) => db.prepare('SELECT * FROM user_checkin WHERE phone=?').all(parsePhone(phone));

/**
 * Retrieve the total number of checkins for a user
 * 
 * @param {string} phone
 * @return {number}
 */
export const getCheckinCount = (phone: string): number  => db
  .prepare('SELECT count(*) as checkins FROM user_checkin WHERE phone=?')
  .get(parsePhone(phone)).checkins;

/**
 * Determin if a user can checkin
 * 
 * @param {string} phone
 * @return {number}
 */
export const canCheckin = (phone: string): number  => db
  .prepare("SELECT count(*) as checked_in_recently FROM user_checkin WHERE phone=? and datetime(date) >= datetime('now', '-5 minutes')")
  .get(parsePhone(phone)).checked_in_recently;

/**
 * Checkin a user if they haven't checked in with the last 5 mins.
 * Send back some useful data about the user.
 * 
 * @param {object} user
 * @param {string} phone
 * @return {object}
 */
export const checkin = (user: any, phone: string) => {
  
  canCheckin(phone) === 0
    ? addCheckin(phone)
    : user.error = 'You cannot checkin within 5 minutes of the last checkin';

  const checkins = getCheckins(phone);
  const points = calcualtePoints(phone);

  return { ...user, checkins: checkins, points: points };
};

/**
 * Remove user data
 * 
 * @param {string} phone
 * @return {number}
 */
export const remove = (phone: string) => {
  db.prepare('DELETE FROM users WHERE phone=?').run(parsePhone(phone));
  db.prepare('DELETE FROM user_checkin WHERE phone=?').run(parsePhone(phone));
};

/**
 * Determine if a phone number is valid
 * 
 * @param {string} phone
 * @return {boolean}
 */
export const isValidPhone = (phone: string): boolean => new PhoneNumber(phone, 'US').isValid();

/**
 * Parse a phone number into US format
 * 
 * @param {string} phone
 * @return {string} The parsed phone number
 */
export const parsePhone = (phone: string): string => new PhoneNumber(phone, 'US').getNumber();

/**
 * Determine the number of points a user has earned
 * 
 * @param {string} phone
 * @return {number} The points total
 */
export const calcualtePoints = (phone: string) => {
  const count: number = getCheckinCount(phone);

  return count
    ? ((count - 1) * 20) + 50
    : 0;
};

/**
 * Parse a phone number into US format
 * 
 * @param {string} email
 * @param {number} points
 * @return {string} The parsed phone number
 */
export const sendEmail = (email: string, points: number) => {
  createTestAccount((err, account) => {

    const transporter = createTransport(config.mail);
    const content = `Your Points Total is ${points}`;

    const mailOptions = {
      from: '"Administrator" <foo@example.com>',
      to: email,
      subject: 'Your Points Total',
      text: content,
      html: content
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
