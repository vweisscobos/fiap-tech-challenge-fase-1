export class ValueObject<T extends any> {
  constructor(private value: T) {}
  
  equals(valueObject: ValueObject<T>): boolean {
    return this.value === valueObject.value;
  }

  getValue() {
    return this.value;
  }
}