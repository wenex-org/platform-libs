import { SetMetadata } from '@nestjs/common';

import type { Scope } from '../enums';

export const CHECK_SCOPE_KEY = 'CHECK_SCOPE';
export const SetScope = (...scope: Scope[]) => SetMetadata(CHECK_SCOPE_KEY, scope);
