import { ProgressKind, useProgress } from './use-progress';
import { LoginView } from './login.view';
import React from 'react';
import { MetamaskProvider } from './metamask-provider';

interface Props {
  setEnabled: (enabled: boolean) => void;
  provider: MetamaskProvider
}

export const LoginComponent: React.FC<Props> = props => {
  const progress = useProgress(false);

  const onLogin = async () => {
    progress.start();
    try {
      await props.provider.enable()
      props.setEnabled(true);
    } catch (e) {
      progress.stop(e);
    }
  };

  switch (progress.current.kind) {
    case ProgressKind.STOPPED:
      return <LoginView onLogin={onLogin} isProgress={false} error={undefined} />;
    case ProgressKind.RUNNING:
      return <LoginView onLogin={onLogin} isProgress={true} error={undefined} />;
    case ProgressKind.FAILED:
      return <LoginView onLogin={onLogin} isProgress={false} error={progress.current.error} />;
    default:
      return <>ERROR</>;
  }
};
