import * as Koa from 'koa';
import * as Router from 'koa-router';

import { add, checkin, getCheckins, get, canCheckin, calcualtePoints } from './user';

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
  
  ctx.checkBody('firstName', 'firstName is required').notEmpty();
  ctx.checkBody('lastName', 'lastName is required').notEmpty();
  ctx.checkBody('email', 'email is required').notEmpty();
  ctx.checkBody('phone', 'phone is required').notEmpty();
  
  const errors = await validationErrors(ctx);
  
  if (!errors) {
    const body = ctx.request.body;
    const user = get(body.phone);
    ctx.status = !user ? 200 : 422;

    if (!user) {
      add(body.phone, body.firstName, body.lastName, body.email);
      ctx.body = checkin(get(body.phone), body.phone);
    }
  }
});

/**
 * Check for validations errors, report downstream if present.
 * 
 * @param {Koa.ctx} ctx
 * @return {Promise<object>}
 */
const validationErrors = async (ctx: Koa.Context) => {
  let errors: any[] = await ctx.validationErrors();

  if (errors) {
    ctx.body = errors.map(error => error.msg);
    ctx.status = 422;
  }

  return errors;
};

export const routes = router.routes();
