import { CassandraProvider } from '@app/common/providers';
import { DynamicModule, Module } from '@nestjs/common';
import { CASSANDRA_OPTIONS } from '@app/common/consts';
import { DseClientOptions } from 'cassandra-driver';

import { CassandraService } from './cassandra.service';

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
