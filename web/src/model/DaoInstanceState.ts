import {IBalanceEntry} from "../backbone/balance.service";
import {DaoKind} from "./DaoKind";

// FIXME Merge with DAO Model
export interface DaoInstanceState {
  address: string;
  name: string | null;
  kind: DaoKind;
  shareBalance: number;
  totalSupply: number;
  balance: IBalanceEntry[];
  usdBalance: number;
}
