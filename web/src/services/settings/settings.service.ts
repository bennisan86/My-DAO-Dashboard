import { SettingsStore } from "./settings.store";
import { SettingsQuery } from "./settings.query";
import { BehaviorSubject, Observable } from "rxjs";
import { mergeMap, tap } from "rxjs/operators";
import { BlockchainReady } from "../../model/blockchain-ready";
import ThreeBox, { Space } from "3box";

const NAMESPACE = "my-dao-dashboard";
const ADDRESS_KEY = "watched-addresses";

export async function openSpace(ready: BlockchainReady): Promise<Space> {
  const box = await ThreeBox.openBox(ready.address, ready.web3.currentProvider);
  return box.openSpace(NAMESPACE);
}

export class SettingsService {
  private readonly store: SettingsStore;
  readonly query: SettingsQuery;
  private readonly space$Subject: BehaviorSubject<any>;
  private readonly space$: Observable<Space>;

  constructor(blockchainReady$: Observable<BlockchainReady>) {
    this.store = new SettingsStore({
      watchedAddresses: [],
      isLoaded: false
    });
    this.query = new SettingsQuery(this.store);
    this.space$Subject = new BehaviorSubject(undefined);
    this.space$ = blockchainReady$.pipe(mergeMap(openSpace));
    this.space$.subscribe(async space => {
      const boxedAddresses = await space.private.get<string[]>(ADDRESS_KEY);
      const watchedAddresses = boxedAddresses || [];
      this.store.update({
        watchedAddresses,
        isLoaded: true
      });
    });
  }

  writeWatchedAddresses(addresses: string[]) {
    return this.space$.pipe(
      tap(async space => {
        const toWrite = addresses.map(a => a.toLowerCase());
        await space.private.set(ADDRESS_KEY, toWrite);
        this.store.update({
          watchedAddresses: toWrite
        });
      })
    );
  }
}
