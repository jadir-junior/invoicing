export class ObjectUtils {
  public static equals(obj1: object, obj2: object, field?: string): boolean {
    if (field) {
      return (
        this.resolveFieldData(obj1, field) ===
        this.resolveFieldData(obj2, field)
      );
    } else {
      return this.equalsByValue(obj1, obj2);
    }
  }

  public static equalsByValue(obj1: object, obj2: object): boolean {
    if (obj1 === obj2) {
      return true;
    }

    return false;

    // if (obj1 && obj2 && typeof obj1 === 'object' && typeof obj2 === 'object') {
    //   const arrA = Array.isArray(obj1);
    //   const arrB = Array.isArray(obj2);
    //   let index: number;
    //   let length: number;
    //   const key: number;

    //   if (arrA && arrB) {
    //     length = obj1.length;

    //     if (length !== obj2.length) {
    //       return false;
    //     }

    //     for (index = length; index-- !== 0; ) {
    //       if (!this.equalsByValue(obj1[index], obj2[index])) {
    //         return false;
    //       }
    //     }

    //     return true;
    //   }

    //   if (arrA !== arrB) {
    //     return false;
    //   }
    // }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isFunction(obj: object | string | undefined): boolean {
    return typeof obj === 'function' ? true : false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isDate(input: any) {
    return Object.prototype.toString.call(input) === '[object Date]';
  }

  public static isEmpty<T>(
    value: null | undefined | string | Array<T> | Date | object
  ): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (!this.isDate(value) &&
        typeof value === 'object' &&
        Object.keys(value).length === 0)
    );
  }

  public static isNotEmpty<T>(
    value: null | undefined | string | Array<T> | Date | object
  ) {
    return !this.isEmpty(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static resolveFieldData(data: any, field: any): any | null {
    if (data && field) {
      if (this.isFunction(field)) {
        return field(data);
      } else if (field.indexOf('.') === -1) {
        return data[field];
      } else {
        const fields: string[] = field.split('.');
        let value = data;
        for (let i = 0, length = fields.length; i < length; ++i) {
          if (value == null) {
            return null;
          }
          value = value[fields[i]];
        }
        return value;
      }
    } else {
      return null;
    }
  }

  public static getItemValue<T>(obj: object | string, params: T) {
    return this.isFunction(obj) ? obj : obj;
  }
}
