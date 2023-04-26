import { generateCacheKey } from '@app/common/utils';
import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';

import { BLACKLISTED_PREFIX_KEY } from './consts';

@Injectable()
export class BlacklistedService {
  constructor(private readonly redisService: RedisService) {}

  public async isBlacklisted(...str: string[]): Promise<boolean> {
    const keys = str.map((s) => generateCacheKey(BLACKLISTED_PREFIX_KEY, s));
    return !!(await this.redisService.exists(...keys));
  }

  public async put(str: string, ttl?: number): Promise<'OK'> {
    return this.redisService.set(
      generateCacheKey(BLACKLISTED_PREFIX_KEY, str),
      'true',
      'EX',
      ttl,
    );
  }

  public async del(str: string): Promise<number> {
    return this.redisService.del(generateCacheKey(BLACKLISTED_PREFIX_KEY, str));
  }
}
