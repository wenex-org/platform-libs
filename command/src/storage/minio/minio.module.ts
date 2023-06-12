import { MinioModule as MinioClientModule } from 'nestjs-minio-client';
import { DynamicModule, Module } from '@nestjs/common';
import { MINIO_CONFIG } from '@app/common/configs';

import { MINIO_SERVICE_CONFIG } from './consts';
import { MinioService } from './minio.service';

@Module({})
export class MinioModule {
  static register(): DynamicModule {
    const SERVICE_CONFIG = MINIO_CONFIG();

    return {
      module: MinioModule,
      imports: [
        MinioClientModule.register({
          port: SERVICE_CONFIG.CONFIG.port,
          useSSL: SERVICE_CONFIG.CONFIG.ssl,
          endPoint: SERVICE_CONFIG.CONFIG.host,
          accessKey: SERVICE_CONFIG.CONFIG.accessKeyId,
          secretKey: SERVICE_CONFIG.CONFIG.secretAccessKey,
        }),
      ],
      providers: [
        {
          useValue: SERVICE_CONFIG,
          provide: MINIO_SERVICE_CONFIG,
        },
        MinioService,
      ],
      exports: [MinioService],
    };
  }
}
