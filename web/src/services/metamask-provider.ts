import { ethers } from 'ethers';

export class MetamaskProvider {
  readonly upstream: any;
  account: string;

  constructor() {
    const w = window as any;
    this.upstream = w.ethereum || (w.web3 && w.web3.currentProvider);
    this.account = this.upstream.selectedAddress;
  }

  isAvailable(): boolean {
    return Boolean(this.upstream);
  }

  async enable(): Promise<void> {
    if (this.upstream && this.upstream.enable) {
      const accounts = await this.upstream.enable();
      this.account = accounts[0];
    } else {
      const provider = new ethers.providers.Web3Provider(this.upstream);
      const signer = await provider.getSigner(0);
      this.account = await signer.getAddress();
    }
  }
}
