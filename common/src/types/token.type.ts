export interface JwtToken {
  t: 'A' | 'R';
  ip?: string;
  cid: string;
  aid?: string;
  uid?: string;
  role: string;
  scope: string;
  domain: string;
  session: string;
  client_id: string;
}
