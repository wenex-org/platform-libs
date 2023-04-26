import type { Action, Resource } from '@app/common/enums';

import type { Base } from '../base.interface';
import type { BaseService } from './base-service.interface';

export interface Grant extends Base {
  subject: string;
  action: Action;
  object: Resource;
  field?: string[];
  filter?: string[];
  location?: string[];
  time?: GrantTime[];
}

export interface GrantTime {
  cron_exp: string;
  duration: number;
}

export type GrantsService = BaseService<Grant>;
