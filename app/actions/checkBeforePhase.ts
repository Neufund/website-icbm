import { envPayload } from "../config";
import { beforeIcoPhase } from "./constants";

export function checkBeforeIcoPhase() {
  switch (envPayload.app_mode) {
    case beforeIcoPhase.BEFORE_ANNOUNCEMENT:
      return beforeIcoPhase.BEFORE_ANNOUNCEMENT;
    case beforeIcoPhase.ANNOUNCED:
      return beforeIcoPhase.ANNOUNCED;
    case beforeIcoPhase.ON_BLOCKCHAIN:
      return beforeIcoPhase.ON_BLOCKCHAIN;
  }
}
