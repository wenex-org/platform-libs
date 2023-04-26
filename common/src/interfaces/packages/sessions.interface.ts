import type { Base } from '../base.interface';
import type { BaseService } from './base-service.interface';

export interface Session extends Base {
  agent?: string;
}

export type SessionsService = BaseService<Session>;
