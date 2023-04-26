import type { RawOneFilter } from '@app/common/types';
import type { WalletStatus } from 'apps/wallets/src/enums';
import type { Observable } from 'rxjs';

import type { Base } from '../base.interface';
import type { BaseService } from './base-service.interface';

export interface Wallet extends Base {
  credit: number;
  blocked_credit: number;
  internal_credit: number;
  external_credit: number;
  iban?: string[];
  status: WalletStatus;
}

export interface WalletsChange {
  wallet_id: string[];
  credit_change: number;
  blocked_change: number;
  internal_change: number;
  external_change: number;
}
export type WalletsCoreService = BaseService<Wallet>;

export interface WalletsService {
  balance: (filter: RawOneFilter) => Observable<Wallet>;
  charge: (walletsChange: WalletsChange) => Observable<Wallet>;
  decharge: (walletsChange: WalletsChange) => Observable<Wallet>;
  collateralCreate: (walletsChange: WalletsChange) => Observable<Wallet>;
  collateralRemove: (walletsChange: WalletsChange) => Observable<Wallet>;
  internalCharge: (walletsChange: WalletsChange) => Observable<Wallet>;
  internalDecharge: (walletsChange: WalletsChange) => Observable<Wallet>;
  externalCharge: (walletsChange: WalletsChange) => Observable<Wallet>;
  externalDecharge: (walletsChange: WalletsChange) => Observable<Wallet>;
  preWithdraw: (walletsChange: WalletsChange) => Observable<Wallet>;
  walletSync: (walletsChange: WalletsChange) => Observable<Wallet>;
  transfer: (walletsChange: WalletsChange) => Observable<{ items: [Wallet] }>;
}
