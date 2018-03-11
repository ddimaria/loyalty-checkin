"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koaBody = require("koa-body");
const config_1 = require("./config");
const database_1 = require("./database");
const logger_1 = require("./logger");
const routes_1 = require("./routes");
const app = new Koa();
database_1.createTables();
app.use(koaBody());
app.use(logger_1.logger);
app.use(routes_1.routes);
app.listen(config_1.config.port);
console.log(`Server running on port ${config_1.config.port}`);
// curl -XPOST "http://localhost:3000/login" -d '{"email":"david.p.dimaria@gmail.com"}' -H 'Content-Type: application/json'
//# sourceMappingURL=app.js.map