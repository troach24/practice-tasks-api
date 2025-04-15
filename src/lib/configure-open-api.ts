import type { AppOpenAPI } from "@/lib/types.js";

import packageJSON from '../../package.json';
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasks API',
    },
  })

  // Use the middleware to serve the Scalar API Reference at /scalar
  app.get('/reference', Scalar({
    theme: 'kepler',
    layout: 'classic',
    defaultHttpClient: {
      targetKey: "js",
      clientKey: "fetch"
    },
    url: '/doc'
  }));
}
