import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { CassandraProvider } from './cassandra.provider';
import { CassandraService } from './cassandra.service';

describe('CassandraService', () => {
  let service: CassandraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CassandraService, CassandraProvider],
    }).compile();

    service = await module.resolve<CassandraService>(CassandraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
