export function availableProvider(): any {
  const w = window as any;
  return w.ethereum || (w.web3 && w.web3.currentProvider);
}

export function isEnabled(provider: any): boolean {
  return provider && provider.enable ? provider.selectedAddress : !!provider;
}

export async function enableProvider(provider: any): Promise<void> {
  if (provider && provider.enable) {
    await provider.enable();
  }
}
