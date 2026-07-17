import posthog from "posthog-js";
import env from "~/env";

posthog.init(env.POSTHOG_PROJECT_TOKEN, {
  api_host: env.POSTHOG_HOST,
  defaults: "2026-05-30",
  capture_exceptions: {
    capture_console_errors: false,
    capture_unhandled_errors: true,
    capture_unhandled_rejections: true,
  },
});

export default posthog;
