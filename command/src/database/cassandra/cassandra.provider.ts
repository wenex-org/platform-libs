import { Client, DseClientOptions } from 'cassandra-driver';
import { Inject, Injectable } from '@nestjs/common';

import { CASSANDRA_OPTIONS } from './consts';

@Injectable()
export class CassandraProvider {
  readonly client: Client;

  constructor(
    @Inject(CASSANDRA_OPTIONS) protected readonly options: DseClientOptions,
  ) {
    this.client = new Client(options);
  }
}