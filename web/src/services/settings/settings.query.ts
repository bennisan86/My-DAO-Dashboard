import { Query } from "@datorama/akita";
import { SettingsState, SettingsStore } from "./settings.store";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";

export class SettingsQuery extends Query<SettingsState> {
  isLoaded$ = this.select(s => s.isLoaded);
  watchedAddresses$: Observable<string[]> = this.select().pipe(
    filter(s => s.isLoaded),
    map(s => s.watchedAddresses || [])
  );

  constructor(readonly store: SettingsStore) {
    super(store);
  }

  get isLoaded(): boolean {
    return this.getValue().isLoaded;
  }

  get watchedAddresses(): string[] {
    return this.getValue().watchedAddresses || [];
  }
}
