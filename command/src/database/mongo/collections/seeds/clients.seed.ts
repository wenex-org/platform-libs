import {
  APP_ID,
  CID,
  CLIENT_ID,
  CLIENT_NAME,
  CLIENT_SECRET,
  CLIENT_TTL,
  EXPIRATION_DATE,
  SYSTEM_DOMAIN,
  SYSTEM_UID,
} from '@app/common/consts';
import { GrantType, Plan, Scope, State, Status } from '@app/common/enums';
import { CreateClientDto } from '@app/common/dto';
import { MongoId } from '@app/common/utils';

export const clients: CreateClientDto[] = [
  {
    _id: MongoId(CID),
    owner: SYSTEM_UID,
    name: CLIENT_NAME,
    plan: Plan.Platinum,
    clients: [CID],
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    state: State.Approved,
    status: Status.Active,
    access_token_ttl: CLIENT_TTL.DEFAULT_ACCESS_TOKEN,
    refresh_token_ttl: CLIENT_TTL.DEFAULT_REFRESH_TOKEN,
    whitelist: ['localhost', '127.0.0.1', '::1', '::ffff:127.0.0.1'],
    scopes: [Scope.Whole],
    domains: [SYSTEM_DOMAIN],
    grant_types: [
      GrantType.OTP,
      GrantType.Password,
      GrantType.RefreshToken,
      GrantType.ClientCredential,
      GrantType.AuthorizationCode,
    ],
    expiration_date: EXPIRATION_DATE,
    created_in: APP_ID ?? CID,
    created_by: SYSTEM_UID ?? CID,
    created_at: new Date(),
    otp_services: [],
  },
];
