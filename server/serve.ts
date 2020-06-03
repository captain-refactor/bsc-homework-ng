import * as Koa from 'koa';
import * as send from 'koa-send';
import * as serveStatic from 'koa-static';
import {join} from 'path';
import * as fs from 'fs';

const root = '../dist/bsc-homework-ng';
const langs = fs.readdirSync(root);

const start = async () => {
  const app = new Koa();
  app.use(serveStatic(root));
  app.use(async ctx => {
    for (const lang of langs) {
      if (ctx.path.startsWith(`/${lang}`)) {
        return send(ctx, join(lang, 'index.html'), {root});
      }
    }
    return ctx.redirect(langs[0]);
  });

  app.listen(process.env.PORT || 8080);
};

start();
