export enum Resource {
  // Keyword
  All = 'all',

  // Primary
  OTP = 'otp',

  Grants = 'grants',

  Stats = 'stats',
  Assets = 'assets',

  Configs = 'configs',
  Artifacts = 'artifacts',

  Domain = 'domain:all',
  DomainApps = 'domain:apps',
  DomainClients = 'domain:clients',

  Identity = 'identity:all',
  IdentityUsers = 'identity:users',
  IdentityProfiles = 'identity:profiles',
  IdentitySessions = 'identity:sessions',

  // Premium
  Jobs = 'jobs',

  Alerts = 'alerts',

  Comments = 'comments',

  Locations = 'locations',

  Workflows = 'workflows',

  Touch = 'touch:all',
  TouchSMS = 'touch:sms',
  TouchEmail = 'touch:email',
  TouchWebpush = 'touch:webpush',

  Thing = 'thing:all',
  ThingDevices = 'thing:devices',
  ThingSensors = 'thing:sensors',
  ThingMetrics = 'thing:metrics',

  Chat = 'chat:all',
  ChatRooms = 'chat:rooms',
  ChatMembers = 'chat:members',
  ChatContacts = 'chat:contacts',
  ChatMessages = 'chat:messages',
  ChatSignaling = 'chat:signaling',

  Financial = 'financial:all',
  FinancialWallets = 'financial:wallets',
  FinancialAccounts = 'financial:accounts',
  FinancialInvoices = 'financial:invoices',
  FinancialTransactions = 'financial:transactions',

  Business = 'business:all',
  BusinessServices = 'business:services',
  BusinessProducts = 'business:products',
  BusinessPartners = 'business:partners',
  BusinessEmployees = 'business:employees',
  BusinessCustomers = 'business:customers',
  BusinessSuppliers = 'business:suppliers',
  BusinessInvestors = 'business:investors',
}
