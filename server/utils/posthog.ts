import { PostHog } from "posthog-node";
import env from "@server/env";

const posthog =
  env.POSTHOG_KEY && env.POSTHOG_HOST
    ? new PostHog(env.POSTHOG_KEY, { host: env.POSTHOG_HOST })
    : undefined;

export default posthog;
