import {
  APP_ID,
  APP_NAME,
  CID,
  CLIENT_TTL,
  SYSTEM_UID,
} from '@app/common/consts';
import { AppType, GrantType, Scope, Status } from '@app/common/enums';
import { CreateAppDto } from '@app/common/dto';
import { MongoId } from '@app/common/utils';

export const apps: CreateAppDto[] = [
  {
    _id: MongoId(APP_ID),
    owner: SYSTEM_UID,
    cid: CID,
    name: APP_NAME,
    type: AppType.Web,
    clients: [CID],
    status: Status.Active,
    version: process.env.npm_package_version,
    access_token_ttl: CLIENT_TTL.DEFAULT_ACCESS_TOKEN,
    refresh_token_ttl: CLIENT_TTL.DEFAULT_REFRESH_TOKEN,
    grant_types: [
      GrantType.OTP,
      GrantType.Password,
      GrantType.RefreshToken,
      GrantType.ClientCredential,
      GrantType.AuthorizationCode,
    ],
    scopes: [Scope.Whole],
    created_in: APP_ID ?? CID,
    created_by: SYSTEM_UID ?? CID,
    created_at: new Date(),
  },
];
