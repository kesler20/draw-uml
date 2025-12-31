/**
 * find the index of the htmlElement in the htmlCollection
 * @param {*} collection - this is an HTMLcollection
 * @param {*} item - this is an htmlElement
 * @returns number
 */
export const findIndex = <T>(
  collection: Iterable<T>,
  item: T
): number | undefined => {
  let i = 0;
  for (const j of collection) {
    if (j === item) return i;
    i++;
  }
  return undefined;
};
