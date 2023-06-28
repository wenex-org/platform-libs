import { CASSANDRA_CONFIG, MONGO_CONFIG } from '@app/common/configs';
import { Module } from '@nestjs/common';

import { DatabaseService } from './database.service';
import { CassandraModule } from './cassandra';
import { MongoModule } from './mongo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { keyspace, ...options } = CASSANDRA_CONFIG();

@Module({
  imports: [
    MongoModule.register(MONGO_CONFIG()),
    CassandraModule.register(options),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
