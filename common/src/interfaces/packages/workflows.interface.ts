import type { Status } from 'apps/workflows/src/enums';

import type { Base } from '../base.interface';

export interface State {
  ref: string;
  name?: string;
  status: Status;
  value?: any;
}

export interface Token {
  readonly id: string;
  parent?: string;
  locked?: boolean;
  history: State[];
}

export interface Workflow extends Base {
  data?: any;
  status: Status;
  tokens: Token[];
}
