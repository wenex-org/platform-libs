import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { MinioModule as MinioClientModule } from 'nestjs-minio-client';

import { MINIO_CONFIG } from './minio.module';
import { MinioService } from './minio.service';

describe('MinioService', () => {
  let service: MinioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MinioClientModule.register({
          port: MINIO_CONFIG.port,
          useSSL: MINIO_CONFIG.ssl,
          endPoint: MINIO_CONFIG.host,
          accessKey: MINIO_CONFIG.accessKeyId,
          secretKey: MINIO_CONFIG.secretAccessKey,
        }),
      ],
      providers: [MinioService],
    }).compile();

    service = module.get<MinioService>(MinioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
