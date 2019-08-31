import React from 'react';
import { ethers } from 'ethers';

export const BlockchainContext = React.createContext({
  account: '',
  provider: new ethers.providers.EtherscanProvider(),
});
