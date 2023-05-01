import { Module } from '@nestjs/common';

import { StorageService } from './storage.service';
import { MinioModule } from './minio';

@Module({
  imports: [MinioModule.register()],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
