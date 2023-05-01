import { MinioService as NestMinioService } from 'nestjs-minio-client';
import { Command, CommandRunner, Option } from 'nest-commander';
import { MINIO_OPTIONS } from '@app/common/configs';
import { Inject, Injectable } from '@nestjs/common';

import { MINIO_SERVICE_OPTIONS } from './consts';

interface MinioCommandOptions {
  bucket?: string[] | true;
}

@Injectable()
@Command({
  name: 'minio',
  arguments: '<task>',
  options: { isDefault: true },
  description: 'Minio commands',
})
export class MinioService extends CommandRunner {
  constructor(
    private readonly minioService: NestMinioService,
    @Inject(MINIO_SERVICE_OPTIONS)
    private readonly minioServiceOptions: ReturnType<typeof MINIO_OPTIONS>,
  ) {
    super();
  }

  public async run(
    passedParams: string[],
    options?: MinioCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('init')) await this.init(options);
  }

  public async init(options?: MinioCommandOptions): Promise<void> {
    console.log('Initializing minio...');

    const region = this.minioServiceOptions.REGION;
    const publicBucket = this.minioServiceOptions.PUBLIC_STORAGE.bucket;
    const privateBucket = this.minioServiceOptions.PRIVATE_STORAGE.bucket;

    if (this.cond('public', options)) {
      if (await this.minioService.client.bucketExists(publicBucket)) {
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Public bucket ${publicBucket} already exists.`,
        );
      } else {
        await this.minioService.client.makeBucket(publicBucket, region);
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Public bucket ${publicBucket} initialized.`,
        );
        console.log(
          '\x1b[33m%s\x1b[0m',
          `Please make sure to configure the bucket policy to allow public access.`,
        );
      }
    }

    if (this.cond('private', options)) {
      if (await this.minioService.client.bucketExists(privateBucket)) {
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Private bucket ${privateBucket} already exists.`,
        );
      } else {
        await this.minioService.client.makeBucket(privateBucket, region);
      }
    }

    console.log('Minio initialized ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-b, --bucket [string]',
    description: 'bucket to init',
  })
  parseString(val: string): string[] {
    return val.split(',');
  }

  private cond(bucket: string, options?: MinioCommandOptions): boolean {
    return (
      (typeof options?.bucket === 'boolean' && options.bucket) ||
      (typeof options?.bucket === 'object' && options.bucket.includes(bucket))
    );
  }
}
