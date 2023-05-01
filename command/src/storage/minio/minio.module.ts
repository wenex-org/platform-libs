import { MinioModule as MinioClientModule } from 'nestjs-minio-client';
import { DynamicModule, Module } from '@nestjs/common';
import { MINIO_OPTIONS } from '@app/common/configs';

import { MINIO_SERVICE_OPTIONS } from './consts';
import { MinioService } from './minio.service';

@Module({})
export class MinioModule {
  static register(): DynamicModule {
    const SERVICE_OPTIONS = MINIO_OPTIONS();

    return {
      module: MinioModule,
      imports: [
        MinioClientModule.register({
          port: SERVICE_OPTIONS.CONFIG.port,
          useSSL: SERVICE_OPTIONS.CONFIG.ssl,
          endPoint: SERVICE_OPTIONS.CONFIG.host,
          accessKey: SERVICE_OPTIONS.CONFIG.accessKeyId,
          secretKey: SERVICE_OPTIONS.CONFIG.secretAccessKey,
        }),
      ],
      providers: [
        {
          useValue: SERVICE_OPTIONS,
          provide: MINIO_SERVICE_OPTIONS,
        },
        MinioService,
      ],
      exports: [MinioService],
    };
  }
}
