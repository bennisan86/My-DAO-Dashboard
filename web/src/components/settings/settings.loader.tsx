import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../contexts/settings.context";
import LoaderView from "../layout/loader/loader.view";

export const SettingsLoader: React.FC = props => {
  const settings = useContext(SettingsContext);
  const [isLoaded, setLoaded] = useState<boolean>(settings.query.isLoaded);

  useEffect(() => {
    const subscription = settings.query.isLoaded$.subscribe(isLoaded => {
      setLoaded(isLoaded);
    });
    return () => {
      subscription.unsubscribe();
    };
  });

  if (isLoaded) {
    return <>{props.children}</>;
  } else {
    return <LoaderView message={"Opening 3Box profile..."} />;
  }
};
