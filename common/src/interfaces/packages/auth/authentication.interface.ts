import type { GrantType, Scope } from '@app/common/enums';
import type { Observable } from 'rxjs';

import type { Void } from '../../base.interface';

export interface AuthenticationToken {
  access_token?: string;
  token_type?: 'Bearer';
  expires_in?: number;
  refresh_token?: string;
  session?: string;
  scope?: string[];
  code?: string;
}

export interface AuthenticationDecrypt {
  t: 'A' | 'R';
  cid: string;
  aid?: string;
  uid?: string;
  role: string;
  scope: string[];
  domain: string;
  session: string;
  client_id: string;
}

export interface AuthToken {
  grant_type: GrantType;
  app_id: string;
  domain: string;
  client_id: string;
  client_secret: string;
  phone?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmation_code?: string;
  refresh_token?: string;
  scope?: string[];
  code?: string;
  roles?: string[];
}

export interface RefreshToken {
  refresh_token: string;
}

export interface AccessToken {
  access_token: string;
}
export interface AuthenticationService {
  token: (data: AuthToken) => Observable<AuthenticationToken>;
  logout: (data: RefreshToken) => Observable<Void<boolean>>;
  decrypt: (data: AccessToken) => Observable<AuthenticationDecrypt>;
}
