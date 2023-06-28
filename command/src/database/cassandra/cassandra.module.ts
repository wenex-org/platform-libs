import { DynamicModule, Module } from '@nestjs/common';
import { DseClientOptions } from 'cassandra-driver';

import { CassandraProvider } from './cassandra.provider';
import { CassandraService } from './cassandra.service';
import { CASSANDRA_OPTIONS } from './consts';

@Module({})
export class CassandraModule {
  static register(options: DseClientOptions): DynamicModule {
    return {
      module: CassandraModule,
      providers: [
        {
          useValue: options,
          provide: CASSANDRA_OPTIONS,
        },
        CassandraService,
        CassandraProvider,
      ],
      exports: [CassandraService],
    };
  }
}
