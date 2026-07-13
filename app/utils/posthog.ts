import posthog from "posthog-js";

declare global {
  interface ImportMeta {
    env?: Record<string, string | undefined>;
  }
}

let initialized = false;

const getPostHogConfig = () => {
  const key = import.meta.env?.VITE_POSTHOG_KEY;
  const host = import.meta.env?.VITE_POSTHOG_HOST;

  if (!key || !host) {
    return null;
  }

  return { key, host };
};

export const initPostHog = () => {
  if (initialized || typeof window === "undefined") {
    return;
  }

  const config = getPostHogConfig();
  if (!config) {
    return;
  }

  posthog.init(config.key, {
    api_host: config.host,
    defaults: "2026-05-30",
    capture_pageview: "history_change",
    capture_exceptions: true,
  });

  initialized = true;
};

export const captureEvent = (
  event: string,
  properties?: Record<string, string | number | boolean | null | undefined>
) => {
  if (!initialized) {
    return;
  }

  posthog.capture(event, properties);
};

export const capturePostHogException = (
  error: unknown,
  properties?: Record<string, string | number | boolean | null | undefined>
) => {
  if (!initialized) {
    return;
  }

  posthog.captureException(error, properties);
};

export const identifyUser = (params: {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string | null;
  teamId?: string | null;
  teamName?: string | null;
}) => {
  if (!initialized || !params.id) {
    return;
  }

  posthog.identify(params.id, {
    email: params.email ?? undefined,
    name: params.name ?? undefined,
    role: params.role ?? undefined,
    team_id: params.teamId ?? undefined,
    team_name: params.teamName ?? undefined,
  });
};

export const resetPostHog = () => {
  if (!initialized) {
    return;
  }

  posthog.reset();
};

export const getPostHogDistinctId = () => {
  if (!initialized) {
    return undefined;
  }

  return posthog.get_distinct_id();
};

export const getPostHogSessionId = () => {
  if (!initialized) {
    return undefined;
  }

  return posthog.get_session_id();
};
