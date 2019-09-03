const ThreeBox = require('3box');

const SPACE_NAME = 'my-dao-dashboard';
const ADDRESS_KEY = 'watched-addresses';

export class BoxService {
  private space: any;

  constructor(private readonly account: string, private readonly provider: any) {}

  private async openSpace(): Promise<any> {
    if (!this.space) {
      const box = await ThreeBox.openBox(this.account, this.provider);
      this.space = await box.openSpace(SPACE_NAME);
    }
    return this.space;
  }

  async updateWatchedAddresses(addresses: string[]): Promise<void> {
    const space = await this.openSpace();
    await space.private.set(ADDRESS_KEY, addresses.map(a => a.toLowerCase()));
  }

  async watchedAddresses(): Promise<string[]> {
    const space = await this.openSpace();
    const watchedAddresses = await space.private.get(ADDRESS_KEY);
    return watchedAddresses || [];
  }
}
