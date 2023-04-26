import type { Document, Model } from 'mongoose';

import type { CountFilter, OneFilter } from '../types';
import type { Filter } from '../interfaces';

export class Repository<Schema, CreateDto, UpdateDto> {
  constructor(protected readonly model: Model<Document & Schema>) {}

  public async count(filter: CountFilter<Document & Schema>) {
    return this.model.countDocuments(filter.query).exec();
  }

  public async create(createDto: CreateDto) {
    return this.model.create({ ...createDto, created_at: new Date() });
  }

  public async findOne(filter: OneFilter<Document & Schema>) {
    return this.model.findOne(filter.query, filter.projection).exec();
  }

  public async findMany(filter: Filter<Document & Schema, Schema>) {
    return this.model
      .find(filter.query, filter.projection)
      .skip(filter.pagination?.skip)
      .sort(filter.pagination?.sort)
      .limit(filter.pagination?.limit);
  }

  public async findById(filter: OneFilter<Document & Schema>) {
    return this.model.findById(filter.query.id, filter.projection).exec();
  }

  public async deleteById(filter: OneFilter<Document & Schema>) {
    return this.model
      .findByIdAndUpdate(filter.query.id, { deleted_at: new Date() })
      .select(filter.projection)
      .exec();
  }

  public async restoreById(filter: OneFilter<Document & Schema>) {
    return this.model
      .findByIdAndUpdate(filter.query.id, { restored_at: new Date() })
      .select(filter.projection)
      .exec();
  }

  public async updateById(
    filter: OneFilter<Document & Schema>,
    update: UpdateDto,
  ) {
    return this.model
      .findByIdAndUpdate(filter.query.id, { ...update, updated_at: new Date() })
      .select(filter.projection)
      .exec();
  }

  public async updateBulk(
    filter: OneFilter<Document & Schema>,
    update: UpdateDto,
  ) {
    return (
      await this.model
        .updateMany(filter.query, { ...update, updated_at: new Date() })
        .exec()
    ).modifiedCount;
  }

  public async destroyById(filter: OneFilter<Document & Schema>) {
    return this.model
      .findByIdAndDelete(filter.query.id)
      .select(filter.projection)
      .exec();
  }
}
