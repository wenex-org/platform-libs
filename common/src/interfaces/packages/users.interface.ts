import type { Base } from '../base.interface';
import type { BaseService } from './base-service.interface';

export interface User extends Base {
  phone?: string;
  email?: string;
  password?: string;
  username?: string;
  subject: string[];
}

export type UsersService = BaseService<User>;
