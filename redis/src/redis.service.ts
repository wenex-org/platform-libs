import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

import { REDIS_CONFIG } from './consts';

@Injectable()
export class RedisService extends Redis {
  constructor(@Inject(REDIS_CONFIG) options: RedisOptions) {
    super(options);
  }
}
