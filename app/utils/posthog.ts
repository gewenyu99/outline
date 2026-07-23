import posthog from "posthog-js";
import env from "~/env";

const token = env.POSTHOG_PROJECT_TOKEN;
const host = env.POSTHOG_HOST;

if (!token || !host) {
  if (env.isDevelopment) {
    const missingVariable = token ? "POSTHOG_HOST" : "POSTHOG_PROJECT_TOKEN";
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`
    );
  }
} else {
  posthog.init(token, {
    api_host: host,
  });
  posthog.startExceptionAutocapture();
}

export default posthog;
