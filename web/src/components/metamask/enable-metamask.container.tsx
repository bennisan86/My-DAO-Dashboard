import React from 'react';
import { LoginView } from './login.view';
import { ProgressKind, WithProgressProps } from './withProgress.hoc';

interface Props {
  availableProvider: any;
  isEnabled: boolean;
}

export class EnableMetamaskContainer extends React.Component<Props & WithProgressProps> {
  state = {
    isEnabled: this.props.isEnabled
  };

  async onLogin() {
    this.props.startProgress();
    if (this.props.availableProvider.enable) {
      try {
        await this.props.availableProvider.enable();
        this.props.stopProgress();
        this.setState({
          isEnabled: true,
        });
      } catch (e) {
        console.error(e);
        this.props.stopProgress('Something went wrong');
      }
    }
  }

  render() {
    if (this.state.isEnabled) {
      return this.props.children;
    } else {
      switch (this.props.progress.kind) {
        case ProgressKind.STOPPED:
          return <LoginView onLogin={this.onLogin.bind(this)} isProgress={false} error={undefined} />;
        case ProgressKind.RUNNING:
          return <LoginView onLogin={this.onLogin.bind(this)} isProgress={true} error={undefined} />;
        case ProgressKind.FAILED:
          return <LoginView onLogin={this.onLogin.bind(this)} isProgress={false} error={this.props.progress.error} />;
      }
    }
  }
}
