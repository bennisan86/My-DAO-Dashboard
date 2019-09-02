import { useState } from 'react';

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

export function useProgress(initialProgress?: boolean) {
  const [progress, setProgress] = useState<Progress>({
    kind: initialProgress ? ProgressKind.RUNNING : ProgressKind.STOPPED,
  });
  return {
    current: progress,
    start: () => {
      setProgress({
        kind: ProgressKind.RUNNING,
      });
    },
    stop: (reason?: Error) => {
      if (reason) {
        console.error(reason)
        setProgress({
          kind: ProgressKind.FAILED,
          error: reason.message,
        });
      } else {
        setProgress({
          kind: ProgressKind.STOPPED,
        });
      }
    },
  };
}
