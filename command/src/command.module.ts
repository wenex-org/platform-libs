import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { StorageModule } from './storage';

@Module({
  imports: [DatabaseModule, StorageModule],
})
export class CommandModule {}
