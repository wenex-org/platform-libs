import type { ClientType, GrantType, Scope } from '@app/common/enums';

import type { Base } from '../base.interface';
import type { BaseService } from './base-service.interface';

export interface App extends Base {
  client_id: string;
  client_type: ClientType;
  scopes: Scope[];
  grant_types: GrantType[];
  app_version: string;
  access_token_ttl: number;
  refresh_token_ttl: number;
  app_links?: AppLink[];
  change_logs?: AppChangeLog[];
}

export interface AppLink {
  type: string;
  link: string;
  description?: string;
}

export interface AppChangeLog {
  version: string;
  code?: string;
  changes?: string[];
  description?: string;
  deprecation_date?: Date;
}

export type AppsService = BaseService<App>;
