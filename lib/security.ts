import { NextRequest } from 'next/server';

/**
 * A simple in-memory rate limiter.
 * Note: In production, use Redis / Upstash for scalable rate limiting.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  req: NextRequest,
  identifier: string,
  limit: number = 5,
  windowMs: number = 60000
): { success: boolean; limit: number; remaining: number; reset: number } {

  const now = Date.now();
  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

  const key = `${identifier}:${clientIp}`;
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  record.count += 1;

  return {
    success: true,
    limit,
    remaining: limit - record.count,
    reset: record.resetTime,
  };
}