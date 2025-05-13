import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

// For extending the Zod schema with OpenAPI properties
import "zod-openapi/extend";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { validator as zValidator } from "hono-openapi/zod";
import { z } from "zod";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use(cors());
app.use(logger());

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono",
        version: "1.0.0",
        description: "API for greeting users",
      },
      servers: [
        {
          url: Bun.env.APP_URL
            ? "https://" + Bun.env.APP_URL
            : "http://127.0.0.1:8080",
          description: "Server",
        },
      ],
    },
  })
);

app.get(
  "/docs",
  Scalar({
    theme: "saturn",
    url: "/openapi",
  })
);

app.post(
  "/demo",
  zValidator(
    "json",
    z.object({
      hello: z.string().openapi({ examples: ["World"] }),
    })
  ),
  describeRoute({
    description: "Test Route, send a hello world and it will return it back",
    responses: {
      200: {
        description: "Successful Response",
        content: {
          "application/json": {
            example: {
              hello: "World",
            },
          },
        },
      },
    },
  }),
  async (c) => {
    const { hello } = c.req.valid("json");

    return c.json({
      hello,
    });
  }
);

export default {
  fetch: app.fetch,
  // hostname: '0.0.0.0',
  port: 8080,
  idleTimeout: 0,
};
