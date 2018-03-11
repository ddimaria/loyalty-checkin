import * as Router from 'koa-router';

import { add, addCheckin, getCheckins, get, canCheckin, calcualtePoints } from './user';

const router = new Router();

/**
 * Base route
 * @todo: return app version number
 */
router.get('/', async ctx => {
  ctx.body = 'invalid access';
});

/**
 * Basic healthcheck
 * @todo: return app version number
 */
router.get('/healthcheck', async ctx => {
  ctx.body = 'OK';
});

/**
 * Get a user by their phone number
 */
router.get('/api/v1/users/:phone', async ctx => {
  const phone = ctx.params.phone;
  const user = get(phone);
  ctx.status = user ? 200 : 404;

  if (user) ctx.body = checkin(user, phone);
});

/**
 * Add a new user
 */
router.post('/api/v1/users', async ctx => {
  const body = ctx.request.body;
  const user = get(body.phone);

  ctx.status = !user ? 200 : 422;

  if (!user) {
    add(body.phone, body.firstName, body.lastName, body.email);
    ctx.body = checkin(get(body.phone), body.phone);
  }
});

/**
 * Checkin a user if they haven't checked in with the last 5 mins.
 * Send back some useful data about the user.
 * 
 * @param {object} user
 * @param {string} phone
 * @return {object}
 */
const checkin = (user: any, phone: string) => {
  
  canCheckin(phone) === 0
    ? addCheckin(phone)
    : user.error = 'You cannot checkin within 5 minutes of the last checkin';

  const checkins = getCheckins(phone);
  const points = calcualtePoints(phone);

  return { ...user, checkins: checkins, points: points };
};

export const routes = router.routes();
