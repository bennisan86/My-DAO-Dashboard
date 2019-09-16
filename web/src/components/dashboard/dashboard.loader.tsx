import React, { useContext, useEffect, useState } from "react";
import { DaosContext } from "../../contexts/daos.context";
import LoaderView from "../layout/loader/loader.view";
import { SettingsContext } from "../../contexts/settings.context";
import { zip } from "rxjs";
import { map } from "rxjs/operators";

export const DashboardLoader: React.FC = props => {
  const daosContext = useContext(DaosContext);
  const settingsContext = useContext(SettingsContext);
  const [isLoading, setIsLoading] = useState(daosContext.query.isLoading || !settingsContext.query.isLoaded);

  useEffect(() => {
    const isLoading$ = zip(daosContext.query.isLoading$, settingsContext.query.isLoaded$).pipe(map(t => t[0] && !t[1]));
    const subscription = isLoading$.subscribe(isLoading => {
      setIsLoading(isLoading);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [daosContext.query.isLoading$, settingsContext.query.isLoaded$]);

  if (isLoading) {
    return <LoaderView message={"Loading DAOs..."} />;
  } else {
    return <>{props.children}</>;
  }
};
