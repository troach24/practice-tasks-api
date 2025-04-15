import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { pinoLoggerPretty } from "@/middlewares/pino-logger.js";
import type { AppBindings } from "@/lib/types.js";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("🧑‍🍳"));
  app.use(pinoLoggerPretty());
  
  app.notFound(notFound);
  app.onError(onError);
  return app;
}
