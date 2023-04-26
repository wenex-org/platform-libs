import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'RATE_LIMIT_KEY';
export const RateLimit = (path?: string, options: { ttl: number; limit: number } = { limit: 3, ttl: 15 }) =>
  SetMetadata(RATE_LIMIT_KEY, { path, options });
