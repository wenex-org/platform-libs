import { SetMetadata } from '@nestjs/common';

import type { Resource } from '../enums';

export const CONTROLLER_RESOURCE_KEY = 'CONTROLLER_RESOURCE';
export const SetResource = (resource: Resource) => SetMetadata(CONTROLLER_RESOURCE_KEY, { resource });
