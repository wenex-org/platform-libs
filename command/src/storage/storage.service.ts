import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { MinioService } from './minio';

interface StorageCommandOptions {
  storage?: true | { minio?: boolean };
}

@Injectable()
@Command({
  name: 'storage',
  arguments: '<task>',
  description: 'storage commands',
  subCommands: [MinioService],
})
export class StorageService extends CommandRunner {
  constructor(private readonly minioService: MinioService) {
    super();
  }

  public async run(
    passedParams: string[],
    options?: StorageCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('init')) await this.init(options);
  }

  public async init(options?: StorageCommandOptions): Promise<void> {
    console.log('Initializing Storage...');

    const cond = (s: string) =>
      (typeof options?.storage === 'boolean' && options.storage) ||
      (typeof options?.storage === 'object' && options.storage[s]);

    if (cond('minio')) await this.minioService.init({ bucket: true });

    console.log('Storage initialized ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-s, --storage [string]',
    description: 'storage to use',
  })
  parseString(val: string): StorageCommandOptions['storage'] {
    return { minio: val.split(',').includes('minio') };
  }
}
