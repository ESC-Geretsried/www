const { z } = require("zod");

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  GRAPHQL_BACKEND_URL: z.string().url(),
  EVENT_URL: z.string(),
  CLIENT_ID: z.string().optional(),
  AAD_ENDPOINT: z.string().optional(),
  TENANT_ID: z.string().optional(),
  CLIENT_SECRET: z.string().optional(),
  GRAPH_ENDPOINT: z.string().optional(),
  CALENDAR_USER: z.string().optional(),
  CALENDAR_ID: z.string().optional(),
  CALENDAR_OPTIONS: z.string().optional(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * edge runtimes (e.g. middlewares) or client-side so we need to destruct manually.
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  GRAPHQL_BACKEND_URL: process.env.GRAPHQL_BACKEND_URL,
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  EVENT_URL: process.env.EVENT_URL,
  CLIENT_ID: process.env.CLIENT_ID,
  AAD_ENDPOINT: process.env.AAD_ENDPOINT,
  TENANT_ID: process.env.TENANT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  GRAPH_ENDPOINT: process.env.GRAPH_ENDPOINT,
  CALENDAR_USER: process.env.CALENDAR_USER,
  CALENDAR_ID: process.env.CALENDAR_ID,
  CALENDAR_OPTIONS: process.env.CALENDAR_OPTIONS,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);
/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
let env = process.env;

if (Boolean(process.env.SKIP_ENV_VALIDATION) === false) {
  const isServer = typeof window === "undefined";

  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  /** @type z.infer<merged>
   *  @ts-ignore - can't type this properly in jsdoc */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );

      /*  @ts-ignore - can't type this properly in jsdoc */
      return target[prop];
    },
  });
}

module.exports = { env };
