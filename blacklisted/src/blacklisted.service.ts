import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';

import { BLACKLISTED_PREFIX_KEY } from './consts';

@Injectable()
export class BlacklistedService {
  constructor(private readonly redisService: RedisService) {}

  public async isBlacklisted(prefix: string, keys: string[]): Promise<boolean> {
    keys = keys.map((k) => `${BLACKLISTED_PREFIX_KEY}:${prefix}:${k}`);
    return !!(await this.redisService.exists(...keys));
  }

  public async put(
    str: string,
    { prefix, ttl }: { prefix: string; ttl: number },
  ): Promise<'OK'> {
    const key = `${BLACKLISTED_PREFIX_KEY}:${prefix}:${str}`;
    return this.redisService.set(key, 'true', 'EX', ttl);
  }

  public async del(str: string, prefix: string): Promise<number> {
    const key = `${BLACKLISTED_PREFIX_KEY}:${prefix}:${str}`;
    return this.redisService.del(key);
  }
}
