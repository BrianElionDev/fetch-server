import { logger, task } from "@trigger.dev/sdk/v3";

export const getTranscript = task({
  id: "get-transcript",
  queue: {
    concurrencyLimit: 1,
  },
  retry: {
    maxAttempts: 3,
    minTimeoutInMs: 120000,
    maxTimeoutInMs: 360000,
  },
  run: async (payload) => {
    console.log(payload);
  },
});
