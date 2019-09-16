declare module "3box" {
  import { Provider } from "web3/providers";

  class ThreeBox {
  }

  namespace ThreeBox {
    export class SpaceEntry {
      get<A> (name: string): Promise<A | undefined>
      set<A> (name: string, value: A): Promise<void>
    }

    export class Space {
      private: SpaceEntry
    }

    export class Box {
      openSpace(namespace: string): Promise<Space>
    }

    function openBox(address: string, provider: Provider): Promise<Box>
  }

  export = ThreeBox
}
