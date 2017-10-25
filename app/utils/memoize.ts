// this code is extraced from https://github.com/darrylhodgins/typescript-memoize because of problems with webpack
// tslint:disable-next-line
export function Memoize(hashFunction?: (...args: any[]) => any) {
  return (_target: object, _propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    if (descriptor.value != null) {
      descriptor.value = getNewFunction(descriptor.value, hashFunction);
    } else if (descriptor.get != null) {
      descriptor.get = getNewFunction(descriptor.get, hashFunction);
    } else {
      throw new Error("Only put a Memoize() decorator on a method or get accessor.");
    }
  };
}

let counter = 0;
function getNewFunction(originalMethod: () => void, hashFunction?: (...args: any[]) => any) {
  // tslint:disable-next-line
  const identifier = ++counter;

  // The function returned here gets called instead of originalMethod.
  return function(...args: any[]) {
    const propValName = `__memoized_value_${identifier}`;
    const propMapName = `__memoized_map_${identifier}`;

    let returnedValue: any;

    if (hashFunction || args.length > 0) {
      // Get or create map
      if (!this.hasOwnProperty(propMapName)) {
        Object.defineProperty(this, propMapName, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: new Map<any, any>(),
        });
      }
      const myMap: Map<any, any> = this[propMapName];

      let hashKey: any;

      // tslint:disable-next-line
      if (hashFunction) {
        hashKey = hashFunction.apply(this, args);
      } else {
        hashKey = args[0];
      }

      if (myMap.has(hashKey)) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
      }
    } else {
      if (this.hasOwnProperty(propValName)) {
        returnedValue = this[propValName];
      } else {
        returnedValue = originalMethod.apply(this, args);
        Object.defineProperty(this, propValName, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: returnedValue,
        });
      }
    }

    return returnedValue;
  };
}
