import * as React from "react";
import { IcoCountdown } from "../components/IcoCountdown";
import config from "../config";

export default () => <IcoCountdown startDate={config.announcedCfg.startingDate} />;
