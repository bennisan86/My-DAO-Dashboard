import React from 'react';

interface IBoxContext {
  watchedAddresses: string[];
  updateWatchedAddresses: (addresses: string[]) => Promise<void>
}

export const BoxContext = React.createContext<IBoxContext>({
  watchedAddresses: [],
  updateWatchedAddresses: async () => {}
});
