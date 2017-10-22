type Promised<T> = { [P in keyof T]: PromiseLike<T[P]> };
declare function promiseAll<T>(o: Promised<T>): T

declare module "promise-all" {
  export = promiseAll;
}
