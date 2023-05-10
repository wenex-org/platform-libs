import {
  APP_ID,
  CID,
  SYSTEM_PASSWORD,
  SYSTEM_SUBJECT,
  SYSTEM_UID,
  SYSTEM_USERNAME,
} from '@app/common/consts';
import { CreateUserDto } from '@app/common/dto';
import { MongoId } from '@app/common/utils';
import { Status } from '@app/common/enums';

export const users: CreateUserDto[] = [
  {
    _id: MongoId(SYSTEM_UID),
    owner: SYSTEM_UID,
    clients: [CID],
    status: Status.Active,
    username: SYSTEM_USERNAME,
    password: SYSTEM_PASSWORD,
    subjects: [SYSTEM_SUBJECT],
    created_in: APP_ID ?? CID,
    created_by: SYSTEM_UID ?? CID,
    created_at: new Date(),
  },
];
