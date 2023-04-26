import { REDIS_OPTIONS } from '@app/common/configs';
import { RedisModule } from '@app/redis';
import { Module } from '@nestjs/common';

import { BlacklistedService } from './blacklisted.service';

@Module({
  imports: [RedisModule.register(REDIS_OPTIONS())],
  providers: [BlacklistedService],
  exports: [BlacklistedService],
})
export class BlacklistedModule {}
