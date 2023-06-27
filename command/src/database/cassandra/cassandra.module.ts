import { DynamicModule, Module } from '@nestjs/common';

import { CassandraProvider } from './cassandra.provider';
import { CassandraService } from './cassandra.service';
import { CASSANDRA_OPTIONS } from './consts';

@Module({})
export class CassandraModule {
  static register(url: string): DynamicModule {
    return {
      module: CassandraModule,
      providers: [
        {
          useValue: url,
          provide: CASSANDRA_OPTIONS,
        },
        CassandraService,
        CassandraProvider,
      ],
      exports: [CassandraService],
    };
  }
}
