import { SetMetadata } from '@nestjs/common';

import type { Action } from '../enums';

export const CHECK_POLICY_KEY = 'CHECK_POLICY';
export const SetPolicy = (action: Action, resourceAttribute?: string) =>
  SetMetadata(CHECK_POLICY_KEY, { action, resourceAttribute });
