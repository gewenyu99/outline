import posthog from "posthog-js";
import env from "~/env";

if (env.POSTHOG_PROJECT_TOKEN && env.POSTHOG_HOST) {
  posthog.init(env.POSTHOG_PROJECT_TOKEN, {
    api_host: env.POSTHOG_HOST,
    defaults: "2026-05-30",
    capture_pageview: "history_change",
    capture_exceptions: true,
  });
}

export default posthog;
