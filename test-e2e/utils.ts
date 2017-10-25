import { delay } from "bluebird";

// retries promise generator till the end of world (or mocha timeout ;) )
export async function waitUntilResolves(promiseGen: () => Promise<any>): Promise<any> {
  while (true) {
    try {
      await promiseGen();
      return;
    } catch (_e) {
      await delay(100);
    }
  }
}
