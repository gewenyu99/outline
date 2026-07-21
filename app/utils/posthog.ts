import posthog from "posthog-js";
import env from "~/env";

if (env.POSTHOG_PROJECT_TOKEN && env.POSTHOG_HOST) {
  posthog.init(env.POSTHOG_PROJECT_TOKEN, {
    api_host: env.POSTHOG_HOST,
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
  });
}

export default posthog;
