import Web3 from "web3";

export interface BlockchainReady {
  web3: Web3;
  address: string;
}
