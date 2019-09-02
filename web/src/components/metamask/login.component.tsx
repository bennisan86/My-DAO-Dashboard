import { ProgressKind, useProgress } from './use-progress';
import { LoginView } from './login.view';
import React, { useContext } from 'react';
import { MetamaskContext } from '../../contexts/metamask.context';

interface Props {
  setEnabled: (enabled: boolean) => void;
}

export const LoginComponent: React.FC<Props> = props => {
  const provider = useContext(MetamaskContext);
  const progress = useProgress(false);

  const onLogin = async () => {
    progress.start();
    try {
      await provider.enable();
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
