import type { JwtToken } from '@app/common/types';
import type { Permission } from 'abacl';
import type { Request } from 'express';

import type { Action, Resource } from '../enums';
import type { File } from './file.interface';
import type { Filter } from './filter.interface';

/**
 * Gateway Request
 */
export interface GRequest extends Request {
  token?: JwtToken;
  permission?: Permission<string, Action, Resource>;
  filter?: Filter;

  files?: File[];
}
