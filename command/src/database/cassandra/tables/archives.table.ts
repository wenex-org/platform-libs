export const archives = `CREATE TABLE archives (
  id uuid PRIMARY KEY,
  timestamp timestamp,

  version text,
  entity_id text,
  request_id text,

  ip inet,

  uid uuid,
  aid uuid,
  cid uuid,

  method text,
  endpoint text,

  req_body text,
  res_body text,

  scope text,
  action text,
  resource text,

  status int,
);`;
