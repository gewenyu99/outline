import { PostHog } from "posthog-node";

const posthog = new PostHog(process.env.VITE_POSTHOG_KEY!, {
  host: process.env.VITE_POSTHOG_HOST,
});

export default posthog;
