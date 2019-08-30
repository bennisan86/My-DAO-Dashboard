import { Provider } from 'web3/providers';
import { providers } from 'ethers';
import { AsyncSendable } from 'ethers/providers';

export class Services {
  metamaskProvider(): Provider {
    const w = window as any;
    return w.ethereum || (w.web3 && w.web3.currentProvider);
  }

  async enable(): Promise<void> {
    const provider = this.metamaskProvider() as any;
    if (provider.enable) {
      await provider.enable();
    }
  }

  async account(): Promise<string> {
    const metamaskProvider = this.metamaskProvider() as AsyncSendable;
    const provider = new providers.Web3Provider(metamaskProvider);
    const signer = await provider.getSigner();
    return signer.getAddress();
  }
}
