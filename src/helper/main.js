export function randomString() {
  return Math.random()
    .toString(36)
    .substr(2, 14);
}

export function getFromArrayById(arr, id) {
  const { found, index } = getIndexFromArrayById(arr, id);

  return { found, item: arr[index] };
}

export function getIndexFromArrayById(arr, id) {
  const index = arr.findIndex(i => i.id === id);

  return { found: index !== -1, index };
}

export function generateUniqueIdArray(arr) {
  return generateUniqueId(arr, (col, id) => getFromArrayById(col, id).found);
}

export function generateUniqueIdObject(obj) {
  return generateUniqueId(obj, (col, id) => col.hasOwnProperty(id));
}

export function generateUniqueId(collection, checker) {
  const id = randomString();

  if (checker(collection, id)) return generateUniqueId(collection, checker);

  return id;
}
