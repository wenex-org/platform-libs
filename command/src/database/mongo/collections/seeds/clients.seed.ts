import {
  APP_ID,
  CID,
  CLIENT_ID,
  CLIENT_NAME,
  CLIENT_SECRET,
  CLIENT_TTL,
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
    // repl: get(ClientsService).generateApiKey('6448d4122ed1fc913e4d4a5a', ['localhost', '127.0.0.1', '::1', '::ffff:127.0.0.1'], new Date('2099-01-01T00:00:00.000Z'))
    api_key:
      'U2FsdGVkX1//gsTlqKSvuBbx1BG+yCBbDzctf4Cx6XRtNZJdNhGdlJk00oW0CeafCh7Z+MZIXXzW8ANdqkUz9gFs0kmMAw9oaB3pr97hX3e7k0nPJ3cLUF1Ia3+hzH0lHLN7GRcVheL7CblRbsC1fe+L+IgMstj4zOGjv/hnlys41qh9Ej79/tIOmxX2WU3Wl011JJV5igVICXoA4A60k5z4E2Iel8KwyQj1t/KBxpWfsAoigYuA5jBGk6KNuWObQTW5UNdT4Ap0W139I/64F/D0HonqjR/Jq4Yc2PRvxMcsU9y+aTq01HmkOyTAdHEmGFieYPXPTQMstmZHvu9cWlh1bcC2xu5tW2ALk+0ez+SQJouxq0Ai4fMyk3awBMP1',
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
    expiration_date: new Date('2099-01-01T00:00:00.000Z'),
    created_in: APP_ID ?? CID,
    created_by: SYSTEM_UID ?? CID,
    created_at: new Date(),
    otp_services: [],
  },
];
