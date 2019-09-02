import React from 'react';

export enum ProgressKind {
  STOPPED,
  FAILED,
  RUNNING,
}

export interface StoppedProgress {
  kind: ProgressKind.STOPPED;
}

export interface FailedProgress {
  kind: ProgressKind.FAILED;
  error: string;
}

export interface RunningProgress {
  kind: ProgressKind.RUNNING;
}

export type Progress = RunningProgress | FailedProgress | StoppedProgress;

export interface WithProgressProps {
  progress: Progress;
  startProgress: () => void;
  stopProgress: (reason?: string) => void;
}

export function withProgress<A>(WrappedComponent: React.ComponentType<A & WithProgressProps>, startProgress?: boolean) {
  return class extends React.Component<A, Progress> {
    constructor(props: A) {
      super(props)
      this.state = {
        kind: startProgress ? ProgressKind.RUNNING : ProgressKind.STOPPED
      }
    }

    startProgress() {
      this.setState({
        kind: ProgressKind.RUNNING
      });
    }

    stopProgress(reason?: string) {
      if (reason) {
        this.setState({
          kind: ProgressKind.FAILED,
          error: reason
        })
      } else {
        this.setState({
          kind: ProgressKind.STOPPED
        })
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          progress={this.state}
          startProgress={this.startProgress.bind(this)}
          stopProgress={this.stopProgress.bind(this)}
        />
      );
    }
  };
}
