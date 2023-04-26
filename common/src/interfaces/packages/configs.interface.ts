import type { Base } from '../base.interface';
import type { BaseService } from './base-service.interface';

export interface Config extends Base {
  key: string;
  type?: string;
  value?: unknown;
}

export type ConfigsService = BaseService<Config>;
