import type { Action, Resource } from '@app/common/enums';
import type { JwtToken } from '@app/common/types';
import type { Observable } from 'rxjs';

import type { Grant } from '../grants.interface';

export interface AuthorizationReq {
  action: Action;
  token: JwtToken;
  object: Resource;
}

export interface AuthorizationRes {
  granted: boolean;
  grants: Grant[];
}

export interface AuthorizationService {
  can: (data: AuthorizationReq) => Observable<AuthorizationRes>;
}
