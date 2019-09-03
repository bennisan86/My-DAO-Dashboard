import React from 'react';

interface IBoxContext {
  watchedAddresses: string[];
}

export const BoxContext = React.createContext<IBoxContext>({
  watchedAddresses: [],
});
