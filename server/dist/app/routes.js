"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_1 = require("./user");
const router = new Router();
router.get('/', async (ctx) => {
    ctx.body = 'invalid access';
});
router.get('/user/:phone', async (ctx) => {
    const user = user_1.get(ctx.params.phone);
    ctx.status = user ? 200 : 404;
    if (user)
        ctx.body = user;
});
router.post('/user', async (ctx) => {
    const body = ctx.request.body;
    const user = user_1.get(body.phone);
    ctx.body = user;
    ctx.assert(!user, 422, 'User already exists');
    user_1.add(body.phone, body.firstName, body.lastName, body.email);
    user_1.addCheckin(body.phone);
});
router.post('/user/:phone/checkin', async (ctx) => {
    const phone = ctx.request.body.phone;
    const user = user_1.get(phone);
    ctx.assert(user, 401, 'User not found');
    user_1.addCheckin(phone);
});
exports.routes = router.routes();
//# sourceMappingURL=routes.js.map