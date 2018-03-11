"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function logger(ctx, next) {
    const data = {
        method: ctx.method,
        url: ctx.url,
        query: ctx.query,
        data: ctx.request.body,
        remoteAddress: ctx.request.ip,
        host: ctx.headers['host'],
        userAgent: ctx.headers['user-agent'],
        statusCode: ctx.status
    };
    try {
        await next();
        data.statusCode = ctx.status;
    }
    catch (e) {
        data.statusCode = e.status;
    }
    process.stdout.write(JSON.stringify(data) + '\n');
}
exports.logger = logger;
//# sourceMappingURL=logger.js.map