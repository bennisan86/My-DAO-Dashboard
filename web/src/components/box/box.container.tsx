import React, { useContext, useEffect, useState } from 'react';
import { TetherContext } from '../../contexts/tether.context';
import Loader from '../Layout/Loader/Loader';
import { useProgress } from '../../hooks/use-progress';
import { BoxContext } from '../../contexts/box.context';
import { BoxService } from '../../services/box.service';

export const BoxContainer: React.FC = props => {
  const tether = useContext(TetherContext);
  const boxService = new BoxService(tether.account, tether.provider);
  const progress = useProgress(true);
  const [watched, setWatched] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (!watched) {
      boxService
        .watchedAddresses()
        .then(addresses => {
          setWatched(addresses);
        })
        .catch(e => {
          progress.stop(e);
        });
    }
  });

  if (watched) {
    const box = {
      watchedAddresses: watched,
      updateWatchedAddresses: async (addresses: string[]) => {
        await boxService.updateWatchedAddresses(addresses);
        setWatched(addresses);
      },
    };

    return <BoxContext.Provider value={box}>{props.children}</BoxContext.Provider>;
  } else {
    return <Loader message={'Opening 3Box profile...'} />;
  }
};
