export function checkElementInArray<T>(array: T[], element: T): boolean {
    const index = array.indexOf(element);

    if (index === -1) {
      // Element does not exist in the array, add it
      return false;
    }
    return true
  }