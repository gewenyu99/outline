import posthog from "posthog-js";
import env from "~/env";

/**
 * Initializes PostHog analytics. Call once at app startup.
 * No-op if POSTHOG_API_KEY is not set.
 */
export function initPostHog() {
  if (!env.POSTHOG_API_KEY) {
    return;
  }

  posthog.init(env.POSTHOG_API_KEY, {
    api_host: env.POSTHOG_API_HOST ?? "https://us.i.posthog.com",
    defaults: "2026-05-30",
  });
}

export { posthog };
