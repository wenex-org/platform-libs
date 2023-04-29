export enum Action {
  // Keyword
  Any = 'any',

  // Special
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Restore = 'restore',
  Destroy = 'destroy',

  // Common
  CreateOwn = 'create:own',
  ReadOwn = 'read:own',
  UpdateOwn = 'update:own',
  DeleteOwn = 'delete:own',
  RestoreOwn = 'restore:own',
  DestroyOwn = 'destroy:own',

  CreateShare = 'create:share',
  ReadShare = 'read:share',
  UpdateShare = 'update:share',
  DeleteShare = 'delete:share',
  RestoreShare = 'restore:share',
  DestroyShare = 'destroy:share',

  CreateClient = 'create:client',
  ReadClient = 'read:client',
  UpdateClient = 'update:client',
  DeleteClient = 'delete:client',
  RestoreClient = 'restore:client',
  DestroyClient = 'destroy:client',

  CreateGroup = 'create:group',
  ReadGroup = 'read:group',
  UpdateGroup = 'update:group',
  DeleteGroup = 'delete:group',
  RestoreGroup = 'restore:group',
  DestroyGroup = 'destroy:group',
}
