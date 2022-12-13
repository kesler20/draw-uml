/**
 * find the index of the htmlElement in the htmlCollection
 * @param {*} collection - this is an HTMLcollection
 * @param {*} item - this is an htmlElement
 * @returns number
 */
export const findIndex = (collection, item) => {
  let i = 0;
  for (let j of collection) {
    if (j === item) return i;
    i++;
  }
};
