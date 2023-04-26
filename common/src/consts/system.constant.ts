import { Bcrypt } from '../helpers';

export const SYSTEM_UID = '6448d5355f9f253a031e9215';

export const SYSTEM_USERNAME = 'root';
export const SYSTEM_PASSWORD = Bcrypt.hash('admin');

export const SYSTEM_DOMAIN = {
  uid: SYSTEM_UID,
  zones: ['admin'],
  name: 'wenex.org',
};

export const SYSTEM_SUBJECT = 'root@admin.wenex.org';

export const SYSTEM_ROLE = SYSTEM_SUBJECT;
