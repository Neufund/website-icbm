import * as React from "react";
import { AppState } from "../actions/constants";
import config from "../config";
import AnnouncedIco from "./AnnouncedIco";
import BeforeAnnouncementIco from "./BeforeAnnouncementIco";
import Ico from "./Ico";

interface IcoProps {
  appState: AppState;
}

export const App: React.SFC<IcoProps> = props => {
  const { appState } = props;

  switch (appState) {
    case AppState.BEFORE_ANNOUNCEMENT:
      return <BeforeAnnouncementIco />;
    case AppState.ANNOUNCED:
      return <AnnouncedIco />;
    case AppState.CONTRACTS_DEPLOYED:
      return <Ico />;
    default:
      throw new Error("Not supported");
  }
};

export default () => <App appState={config.appState} />;
