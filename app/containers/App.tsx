import * as moment from "moment";
import * as React from "react";
import { AppState } from "../actions/constants";
import config, { IAnnouncedCfg } from "../config";
import AnnouncedIco from "./AnnouncedIco";
import BeforeAnnouncementIco from "./BeforeAnnouncementIco";
import Ico from "./Ico";

interface IcoProps {
  appState: AppState;
}

export function checkIfCanShowCounter(now: moment.Moment, config: IAnnouncedCfg): boolean {
  if (!config.showCountdownAfter) {
    return true;
  }
  return now.isAfter(config.showCountdownAfter);
}

export const App: React.SFC<IcoProps> = props => {
  const { appState } = props;

  switch (appState) {
    case AppState.BEFORE_ANNOUNCEMENT:
      return <BeforeAnnouncementIco />;
    case AppState.ANNOUNCED:
      return checkIfCanShowCounter(moment.utc(), config.announcedCfg)
        ? <AnnouncedIco />
        : <BeforeAnnouncementIco />;
    case AppState.CONTRACTS_DEPLOYED:
      return <Ico />;
    default:
      throw new Error("Not supported");
  }
};

export default () => <App appState={config.appState} />;
