import { cold } from "jest-marbles";
import { runEffect, withEffect } from "../../util/testing";
import { SettingsStore } from "./settings.store";
import { SettingsQuery } from "./settings.query";

const VALUES = {
  u: {
    watchedAddresses: ["a"],
    isLoaded: false
  },
  a: {
    watchedAddresses: ["a"],
    isLoaded: true
  },
  b: {
    watchedAddresses: ["b"],
    isLoaded: true
  }
};

let store: SettingsStore;
let query: SettingsQuery;

const INITIAL = {
  watchedAddresses: [],
  isLoaded: false
};

beforeEach(() => {
  store = new SettingsStore(INITIAL);
  query = new SettingsQuery(store);
});

it("#watchedAddresses$", () => {
  const updateAddress$ = runEffect("ubba|", VALUES, a => store.update(a));
  const expected$ = cold("-bba", { a: ["a"], b: ["b"] });

  expect(withEffect(updateAddress$, query.watchedAddresses$)).toBeObservable(expected$);
});

it("#watchedAddresses", () => {
  expect(query.watchedAddresses).toEqual([]);
  store.update(VALUES.b);
  expect(query.watchedAddresses).toEqual(VALUES.b.watchedAddresses);
});

it("#isLoaded", () => {
  const values = {
    t: true,
    f: false
  };
  const updateLoaded$ = runEffect("tftf|", values, a => store.update({ isLoaded: a }));
  const expected$ = cold("ftft|", values);

  expect(withEffect(updateLoaded$, query.isLoaded$)).toBeObservable(expected$);
});

it("#isLoaded", () => {
  expect(query.isLoaded).toEqual(INITIAL.isLoaded);
  store.update({isLoaded: true});
  expect(query.isLoaded).toEqual(true);
});
