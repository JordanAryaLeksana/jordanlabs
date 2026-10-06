import "server-only";

import { getRedis } from "@/lib/redis";

const MINUTE_SECONDS = 60;

export type RateLimitResult = {
  allowed: boolean;

  reason:
    | "minute"
    | "day"
    | null;

  limit: number;
  remaining: number;

  dailyLimit: number;
  dailyRemaining: number;

  retryAfter: number;
};

const DAY_SECONDS = 86_400;

function getDayBucket() {
  return Math.floor(
    Date.now() /
      (DAY_SECONDS * 1000)
  );
}

export function getClientIp(
  request: Request
): string {
  const realIp =
    request.headers.get("x-real-ip");

  if (realIp) {
    return realIp;
  }

  const forwardedFor =
    request.headers.get(
      "x-forwarded-for"
    );

  if (forwardedFor) {
    return (
      forwardedFor
        .split(",")[0]
        ?.trim() ??
      "unknown"
    );
  }

  return "local";
}

export type TokenBudgetResult = {
  allowed: boolean;
  limit: number;
  used: number;
  remaining: number;
};

export async function checkDailyTokenBudget(
  clientIp: string
): Promise<TokenBudgetResult> {
  const redis =
    await getRedis();

  const limit =
    Number(
      process.env
        .AI_TOKEN_LIMIT_PER_DAY ??
        "300000"
    );

  const key =
    `ai-tokens:${clientIp}:${getDayBucket()}`;

  const raw =
    await redis.get(key);

  const used =
    Number(raw ?? "0");

  return {
    allowed:
      used < limit,

    limit,

    used,

    remaining:
      Math.max(
        limit - used,
        0
      ),
  };
}

export async function addDailyTokenUsage(
  clientIp: string,
  tokens: number
) {
  if (
    !Number.isFinite(tokens) ||
    tokens <= 0
  ) {
    return;
  }

  const redis =
    await getRedis();

  const key =
    `ai-tokens:${clientIp}:${getDayBucket()}`;

  const total =
    await redis.eval(
      `
      local current =
        redis.call(
          "INCRBY",
          KEYS[1],
          ARGV[1]
        )

      if current ==
        tonumber(ARGV[1])
      then
        redis.call(
          "EXPIRE",
          KEYS[1],
          ARGV[2]
        )
      end

      return current
      `,
      {
        keys: [key],

        arguments: [
          String(
            Math.ceil(tokens)
          ),
          String(DAY_SECONDS),
        ],
      }
    );

  return Number(total);
}

export async function checkAiRateLimit(
  request: Request
): Promise<RateLimitResult> {
  const redis = await getRedis();

  const minuteLimit =
    Number(
      process.env
        .AI_RATE_LIMIT_PER_MINUTE ??
        "10"
    );

  const dailyLimit =
    Number(
      process.env
        .AI_RATE_LIMIT_PER_DAY ??
        "100"
    );

  const ip = getClientIp(request);

  const now = Date.now();

  const minuteBucket =
    Math.floor(
      now /
        (MINUTE_SECONDS * 1000)
    );

  const dayBucket =
    Math.floor(
      now /
        (DAY_SECONDS * 1000)
    );

  const minuteKey =
    `ai-rate:${ip}:${minuteBucket}`;

  const dailyKey =
    `ai-rate-day:${ip}:${dayBucket}`;

  /*
   * Increment minute + daily counter
   * atomically.
   */
  const result =
    (await redis.eval(
      `
      local minuteCount =
        redis.call(
          "INCR",
          KEYS[1]
        )

      if minuteCount == 1 then
        redis.call(
          "EXPIRE",
          KEYS[1],
          ARGV[1]
        )
      end

      local dailyCount =
        redis.call(
          "INCR",
          KEYS[2]
        )

      if dailyCount == 1 then
        redis.call(
          "EXPIRE",
          KEYS[2],
          ARGV[2]
        )
      end

      return {
        minuteCount,
        dailyCount
      }
      `,
      {
        keys: [
          minuteKey,
          dailyKey,
        ],

        arguments: [
          String(MINUTE_SECONDS),
          String(DAY_SECONDS),
        ],
      }
    )) as [number, number];

  const [
    minuteCount,
    dailyCount,
  ] = result;

  const minuteRemaining =
    Math.max(
      minuteLimit -
        minuteCount,
      0
    );

  const dailyRemaining =
    Math.max(
      dailyLimit -
        dailyCount,
      0
    );

  if (
    dailyCount >
    dailyLimit
  ) {
    return {
      allowed: false,
      reason: "day",

      limit: minuteLimit,
      remaining:
        minuteRemaining,

      dailyLimit,
      dailyRemaining: 0,

      retryAfter:
        DAY_SECONDS,
    };
  }

  if (
    minuteCount >
    minuteLimit
  ) {
    return {
      allowed: false,
      reason: "minute",

      limit: minuteLimit,
      remaining: 0,

      dailyLimit,
      dailyRemaining,

      retryAfter:
        MINUTE_SECONDS,
    };
  }

  return {
    allowed: true,
    reason: null,

    limit:
      minuteLimit,

    remaining:
      minuteRemaining,

    dailyLimit,
    dailyRemaining,

    retryAfter:
      MINUTE_SECONDS,
  };
}