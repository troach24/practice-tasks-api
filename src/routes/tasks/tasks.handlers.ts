import { ListRoute } from "./tasks.routes";
import { AppRouteHandler } from "@/lib/types";

export const list: AppRouteHandler<ListRoute> = c => {
  return c.json([{
    name: "Learn Hono",
    done: false,
  }])
}
 