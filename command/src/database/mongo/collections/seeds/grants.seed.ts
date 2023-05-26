import { APP_ID, CID, SYSTEM_SUBJECT, SYSTEM_UID } from '@app/common/consts';
import { Action, Resource } from '@app/common/enums';
import { CreateGrantDto } from '@app/common/dto';

export const grants: CreateGrantDto[] = [
  {
    owner: SYSTEM_UID,
    clients: [CID],
    subject: SYSTEM_SUBJECT,
    action: Action.Any,
    object: Resource.All,
    created_in: APP_ID ?? CID,
    created_by: SYSTEM_UID ?? CID,
    created_at: new Date(),
  },
];
