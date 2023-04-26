import type { GrantType } from '@app/common/enums';
import type { OtpProvider } from '@app/otp/enums';
import type { Plan } from 'apps/clients/src/enums';

import type { Base } from '../base.interface';
import type { BaseService } from './base-service.interface';

export interface Client extends Base {
  name: string;
  logo?: string;
  site?: string;
  slogan?: string;
  plan: Plan;
  client_id: string;
  client_secret: string;
  expiration_date: Date;
  scopes: string[];
  domains: { uid: string; name: string; zones?: string[] }[];
  grant_types: GrantType[];
  description?: string;
  otp_service?: { provider: OtpProvider; config?: { apikey: string; host?: string }; template?: string };
}

export type ClientsService = BaseService<Client>;
