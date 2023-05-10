import {
  CID,
  SYSTEM_PASSWORD,
  SYSTEM_SUBJECT,
  SYSTEM_UID,
  SYSTEM_USERNAME,
} from '@app/common/consts';
import { CreateUserDto } from '@app/common/dto';
import { MongoId } from '@app/common/utils';

export const users: CreateUserDto[] = [
  {
    _id: MongoId(SYSTEM_UID),
    owner: SYSTEM_UID,
    clients: [CID],
    username: SYSTEM_USERNAME,
    password: SYSTEM_PASSWORD,
    subjects: [SYSTEM_SUBJECT],
    created_in: CID,
    created_by: SYSTEM_UID,
    created_at: new Date(),
  },
];
