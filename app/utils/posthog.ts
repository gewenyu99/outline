import posthog from "posthog-js";
import env from "~/env";

let initialized = false;

export function initPostHog() {
  if (initialized || !env.VITE_POSTHOG_KEY || !env.VITE_POSTHOG_HOST) {
    return;
  }

  posthog.init(env.VITE_POSTHOG_KEY, {
    api_host: env.VITE_POSTHOG_HOST,
    defaults: "2025-05-24",
    capture_pageview: "history_change",
    capture_exceptions: true,
  });

  initialized = true;
}

export default posthog;
