import { RedisService } from '@app/redis';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';

import { RATE_LIMIT_PREFIX_KEY } from '../consts';
import { RATE_LIMIT_KEY } from '../metadatas';
import type { JwtToken } from '../types';

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const rateLimit = this.reflector.getAllAndOverride<{
      path?: string;
      options: { ttl: number; try: number };
    }>(RATE_LIMIT_KEY, [context.getClass(), context.getHandler()]);

    const request = context.switchToHttp().getRequest();
    const token: JwtToken = request.token;

    const redis = this.redisService;
    const key = `${RATE_LIMIT_PREFIX_KEY}:${token.uid ?? token.cid}:${
      token.session
    }${rateLimit.path ? `:${rateLimit.path}` : ''}`;

    const cache = await redis.get(key);

    if (!cache) {
      await redis.set(key, 1, 'EX', rateLimit.options.ttl);
    } else {
      if (parseInt(cache, 10) >= rateLimit.options.try)
        throw new HttpException(
          'Too many request rate limit exceeded',
          HttpStatus.TOO_MANY_REQUESTS,
        );

      await redis.set(
        key,
        parseInt(cache, 10) + 1,
        'EX',
        rateLimit.options.ttl,
      );
    }

    return next.handle();
  }
}
