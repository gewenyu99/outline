import posthog from "posthog-js";
import env from "~/env";

/**
 * Initializes the PostHog SDK. Safe to call multiple times — PostHog
 * ignores subsequent calls once already initialized.
 */
export function initPostHog() {
  if (!env.POSTHOG_API_KEY) {
    return;
  }
  posthog.init(env.POSTHOG_API_KEY as string, {
    api_host: (env.POSTHOG_HOST as string) || "https://us.i.posthog.com",
    defaults: "2026-05-30",
  });
}

export default posthog;
