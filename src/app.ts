import createApp from "@/lib/create-app.js";
import configureOpenAPI from "@/lib/configure-open-api.js";
import index from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index";

const app = createApp();

const routes = [
  index,
  tasks
]

configureOpenAPI(app);

routes.forEach(route => app.route('/', route));

export default app;
