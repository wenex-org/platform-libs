import { Command, CommandRunner, Option } from 'nest-commander';
import { CASSANDRA_CONFIG, CASSANDRA_REPLICATION } from '@app/common/configs';
import { Inject, Injectable } from '@nestjs/common';
import { DseClientOptions } from 'cassandra-driver';

import { CassandraProvider } from './cassandra.provider';
import { CASSANDRA_OPTIONS } from './consts';
import * as tables from './tables';

const { keyspace } = CASSANDRA_CONFIG();

interface CassandraCommandOptions {
  table?: string | true;
}

@Injectable()
@Command({
  name: 'cassandra',
  arguments: '<task>',
  options: { isDefault: true },
  description: 'CassandraDB commands',
})
export class CassandraService extends CommandRunner {
  constructor(
    private readonly cassandraProvider: CassandraProvider,
    @Inject(CASSANDRA_OPTIONS) private readonly options: DseClientOptions,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: CassandraCommandOptions,
  ): Promise<void> {
    if (passedParams.includes('migrate')) await this.migrate(options);
  }

  public async migrate(options?: CassandraCommandOptions): Promise<void> {
    await this.cassandraProvider.client.connect();
    console.log('Migrating cassandra...');

    const { strategy, replicationFactor } = CASSANDRA_REPLICATION();
    await this.cassandraProvider.client.execute(
      `CREATE KEYSPACE IF NOT EXISTS ${keyspace} WITH REPLICATION = { 'class' : '${strategy}', 'replication_factor' : ${replicationFactor} };`,
    );

    await this.cassandraProvider.client.execute(`USE ${keyspace};`);

    const keys =
      typeof options.table === 'boolean'
        ? Object.keys(tables)
        : Object.keys(tables).filter((t) => t === options.table);

    for (const key of keys) {
      if (await this.exists(key)) {
        console.log(
          `\x1b[32m%s\x1b[0m`,
          `Table ${key} already exists. alter it manually if you want to update it.`,
        );
      } else {
        await this.cassandraProvider.client.execute(tables[key]);
        console.log(`\x1b[32m%s\x1b[0m`, `Table ${key} created successfully.`);
      }
    }

    await this.cassandraProvider.client.shutdown();
    console.log('Cassandra migrated ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-t, --table [string]',
    description: 'Table name',
  })
  parseString(val: string): CassandraCommandOptions['table'] {
    return val;
  }

  private async exists(table: string): Promise<boolean> {
    return !!(
      await this.cassandraProvider.client.execute(`DESC TABLES;`)
    ).rows.find(
      (row) =>
        row.name === table &&
        row.type === 'table' &&
        row.keyspace_name === keyspace,
    );
  }
}
