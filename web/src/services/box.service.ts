const ThreeBox = require('3box');

const SPACE_NAME = 'my-dao-dashboard';

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

  async watchedAddresses(): Promise<string[]> {
    const space = await this.openSpace();
    const watchedAddresses = await space.private.get('watched-addresses');
    return watchedAddresses || [];
  }
}
