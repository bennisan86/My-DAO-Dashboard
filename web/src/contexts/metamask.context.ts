import React from 'react';
import { MetamaskProvider } from '../services/metamask-provider';

export const MetamaskContext = React.createContext(new MetamaskProvider());
