import React from 'react';

export interface ITetherContext {
  account: string,
}

export const TetherContext = React.createContext<ITetherContext>({
  account: ''
});
