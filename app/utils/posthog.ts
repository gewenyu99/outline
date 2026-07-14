import posthog from "posthog-js";
import env from "~/env";

if (env.POSTHOG_KEY && env.POSTHOG_HOST) {
  posthog.init(env.POSTHOG_KEY, {
    api_host: env.POSTHOG_HOST,
    defaults: "2026-05-30",
    capture_pageview: "history_change",
  });
}

export default posthog;
