import { PostHog } from "posthog-node";

type ServerEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

let posthogClient: PostHog | undefined;

const getClient = () => {
  const apiKey = process.env.POSTHOG_API_KEY;
  const host = process.env.POSTHOG_HOST;

  if (!apiKey || !host) {
    return undefined;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(apiKey, {
      host,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogClient;
};

const getDistinctId = (ctx: {
  state?: { auth?: { user?: { id?: string } } };
  request?: { headers?: Record<string, string | string[] | undefined> };
}) => {
  const headerDistinctId = ctx.request?.headers?.["x-posthog-distinct-id"];

  if (typeof headerDistinctId === "string" && headerDistinctId.length > 0) {
    return headerDistinctId;
  }

  return ctx.state?.auth?.user?.id ?? "anonymous_server_request";
};

export const captureServerEvent = async (
  ctx: {
    state?: { auth?: { user?: { id?: string; teamId?: string } } };
    request?: { headers?: Record<string, string | string[] | undefined> };
  },
  event: string,
  properties?: ServerEventProperties
) => {
  const client = getClient();
  if (!client) {
    return;
  }

  await client.capture({
    distinctId: getDistinctId(ctx),
    event,
    properties: {
      ...properties,
      $session_id:
        typeof ctx.request?.headers?.["x-posthog-session-id"] === "string"
          ? ctx.request?.headers?.["x-posthog-session-id"]
          : undefined,
    },
  });
};

export const shutdownPostHog = async () => {
  await posthogClient?.shutdown();
};
