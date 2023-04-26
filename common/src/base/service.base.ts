import type { Document } from 'mongoose';

import type { CountFilter, OneFilter } from '../types';
import type { Filter } from '../interfaces';
import { Repository } from '../core';

export class BaseService<Schema, CreateDto, UpdateDto> {
  constructor(
    protected readonly repository: Repository<Schema, CreateDto, UpdateDto>,
  ) {}

  public count(filter: CountFilter<Document & Schema>) {
    return this.repository.count(filter);
  }

  public create(createDto: CreateDto) {
    return this.repository.create(createDto);
  }

  public findOne(filter: OneFilter<Document & Schema>) {
    return this.repository.findOne(filter);
  }

  public findMany(filter: Filter<Document & Schema, Schema>) {
    return this.repository.findMany(filter);
  }

  public findById(filter: OneFilter<Document & Schema>) {
    return this.repository.findById(filter);
  }

  public deleteById(filter: OneFilter<Document & Schema>) {
    return this.repository.deleteById(filter);
  }

  public restoreById(filter: OneFilter<Document & Schema>) {
    return this.repository.restoreById(filter);
  }

  public updateById(filter: OneFilter<Document & Schema>, update: UpdateDto) {
    return this.repository.updateById(filter, update);
  }

  public updateBulk(filter: CountFilter<Document & Schema>, update: UpdateDto) {
    return this.repository.updateBulk(filter, update);
  }

  public destroyById(filter: OneFilter<Document & Schema>) {
    return this.repository.findById(filter);
  }
}
