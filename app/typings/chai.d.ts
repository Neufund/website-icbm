// Now we are using chai 4.1.1 and @types/chai 4.0.4 (there are no types for 4.1.1) so we need to polyfill missing types
// tslint:disable-next-line
declare namespace Chai {

  // tslint:disable-next-line
  export interface Assert {

    /**
     * Asserts that value is isFinite.
     *
     * @type T   Type of value.
     * @param value   Actual value.
     * @param message   Message to display on error.
     */
    isFinite<T>(value: T, message?: string): void;
  }
}
