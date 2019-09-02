export class MetamaskProvider {
  private readonly upstream: any;

  constructor () {
    const w = window as any;
    this.upstream = w.ethereum || (w.web3 && w.web3.currentProvider);
  }

  isAvailable (): boolean {
    return Boolean(this.upstream);
  }

  isEnabled (): boolean {
    return this.upstream && this.upstream.enable ? this.upstream.selectedAddress : !!this.upstream;
  }

  async enable (): Promise<void> {
    if (this.upstream && this.upstream.enable) {
      await this.upstream.enable();
    }
  }
}
