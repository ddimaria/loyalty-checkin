import * as Koa from 'koa';

interface ILog {
  method: string;
  url: string;
  query: string;
  data?: any;
  remoteAddress: string;
  host: string;
  userAgent: string;
  statusCode: number;
}

export async function logger(ctx: Koa.Context, next: () => Promise<any>) {
  const data: Partial<ILog> = {
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
  } catch (e) {
    data.statusCode = e.status;
  }

  process.stdout.write(JSON.stringify(data) + '\n');
}
