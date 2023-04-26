import { isInt } from 'class-validator';
import { Document, Types } from 'mongoose';
import { isEmpty } from 'radash';

import type { JwtToken } from '../types';

export const MongoId = (id?: string): Types.ObjectId => new Types.ObjectId(id);

export const toPlain = <T = any>(data: any): T => JSON.parse(JSON.stringify(data));

export const genCode = (len: number) => {
  if (!isInt(len)) throw new Error('type of len must be integer');
  if (len < 1) throw new Error('len of code cannot be lower than one');

  const max = parseInt(`9${'9'.repeat(len - 1)}`, 10);
  const min = parseInt(`1${'0'.repeat(len - 1)}`, 10);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isAvailable = ({
  deleted_at,
  restored_at,
}: {
  deleted_at?: Date | string;
  restored_at?: Date | string;
}): boolean => {
  if (!deleted_at) return true;
  if (deleted_at && !restored_at) return false;

  if (typeof deleted_at === 'string') deleted_at = new Date(deleted_at);
  if (typeof restored_at === 'string') restored_at = new Date(restored_at);

  if (deleted_at >= restored_at) return false;
  else return true;
};

export const aliases = (domains: { name: string; zones?: string[] }[], roles?: string[]) => {
  const _aliases: string[] = [];

  domains.forEach((domain) => {
    domain.zones?.forEach((zone) => _aliases.push(`${zone}.${domain.name}`));
  });

  if (roles) {
    return _aliases.flatMap((alias) => roles.map((role) => `${role}@${alias}`));
  } else return _aliases;
};

export function nestedTransformation(data: any, transformer: any) {
  if (data && Array.isArray(data)) {
    const newArray = [];

    // eslint-disable-next-line @typescript-eslint/no-for-in-array, fp/no-loops, guard-for-in
    for (const key in data) {
      newArray.push(nestedTransformation(data[key], transformer));
    }

    return newArray;
  } else if (data && typeof data === 'object') {
    if (data instanceof Document) data = JSON.parse(JSON.stringify(data));

    if ('__v' in data) delete data.__v;

    const newObj = {};

    // eslint-disable-next-line fp/no-loops
    for (const key in data) {
      if (data && typeof data[key] === 'object') {
        if (key.startsWith('$')) newObj[key] = data[key];
        else newObj[transformer(key)] = nestedTransformation(data[key], transformer);
      } else if (key.startsWith('$')) newObj[key] = data[key];
      else newObj[transformer(key)] = data[key];
    }

    return newObj;
  } else {
    return data;
  }
}

export const createSubject = ({ role, domain }: JwtToken) => {
  return role.split(' ').map((r) => `${r}@${domain}`);
};

export const isEntityExists = <T>(entity: T): boolean => !isEmpty(entity);

export const generateCacheKey = (...keys: (number | string)[]) => keys.join(':');
