import {
  CID,
  CLIENT_ID,
  CLIENT_NAME,
  CLIENT_SECRET,
  CLIENT_TTL,
  SYSTEM_DOMAIN,
  SYSTEM_UID,
} from '@app/common/consts';
import { GrantType, Plan, SysScope } from '@app/common/enums';
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
    access_token_ttl: CLIENT_TTL.DEFAULT_ACCESS_TOKEN,
    refresh_token_ttl: CLIENT_TTL.DEFAULT_REFRESH_TOKEN,
    scopes: [SysScope.Whole],
    domains: [SYSTEM_DOMAIN],
    grant_types: [
      GrantType.OTP,
      GrantType.Password,
      GrantType.RefreshToken,
      GrantType.ClientCredential,
      GrantType.AuthorizationCode,
    ],
    expiration_date: new Date('2099-01-01T00:00:00.000Z'),
    created_in: CID,
    created_by: SYSTEM_UID,
    created_at: new Date(),
    otp_services: [],
  },
];
