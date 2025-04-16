import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import router from "./tasks.index";
import createApp, { createTestApp } from "@/lib/create-app";
import { testClient } from "hono/testing";
import { execSync } from "node:child_process";
import { rmSync } from "fs";

const client = testClient(createApp().route("/", router));

describe("Tasks list", () => {
  beforeAll(async () => {
    execSync("pnpm drizzle-kit push");
  })

  afterAll(async () => {
    rmSync("test.db", { force: true });
  })

  it("responds with an array", async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request("/tasks");
    const result = await response.json();
    console.log(result);
    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  })
  
  it("responds with an array again", async () => {
    const response = await client.tasks.$get();
    const json = await response.json();
    expectTypeOf(json).toBeArray();
  })
  
  it("validates the ID param", async () => {
    const response = await client.tasks[":id"].$get({
      param: {
        // @ts-expect-error
        id: "wat",
      }
    });
    expect(response.status).toBe(422);
  })
  
  it("validates the body when creating", async () => {
    const response = await client.tasks.$post({
      // @ts-expect-error
      json: {
        name: "Learn vitest",
      },
    })
    expect(response.status).toBe(422);
  })
})
