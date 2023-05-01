import { ClientType, GrantType, Scope } from '@app/common/enums';
import { MongoId } from '@app/common/utils';

// export const apps: CreateAppDto[] = [
//   {
//     _id: MongoId(APP_ID),
//     owner: SYSTEM_USER_ID,
//     client_id: CID,
//     clients: [CID],
//     client_type: ClientType.Application,
//     app_version: process.env.npm_package_version,
//     access_token_ttl: CLIENT_TTL.DEFAULT_ACCESS_TOKEN,
//     refresh_token_ttl: CLIENT_TTL.DEFAULT_REFRESH_TOKEN,
//     grant_types: [
//       GrantType.OTP,
//       GrantType.Password,
//       GrantType.RefreshToken,
//       GrantType.ClientCredential,
//       GrantType.AuthorizationCode,
//     ],
//     scopes: [Scope.Whole],
//     created_in: CID,
//     created_by: SYSTEM_USER_ID,
//     created_at: new Date('2022-12-09T20:43:48.302Z'),
//   },
// ];
