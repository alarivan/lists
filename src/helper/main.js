export function randomString() {
  return Math.random()
    .toString(36)
    .substr(2, 14);
}

export function getFromArrayById(arr, id) {
  const index = getIndexFromArrayById(arr, id);

  return index !== null ? arr[index] : null;
}

export function getIndexFromArrayById(arr, id) {
  const index = arr.findIndex(i => i.id === id);

  return index !== -1 ? index : null;
}

export function generateUniqueId(arr) {
  const id = randomString();

  if (getFromArrayById(arr, id)) {
    return generateUniqueId(arr);
  }

  return id;
}

export function generateUniqueIdObject(m) {
  const id = randomString();

  if (m.hasOwnProperty(id)) generateUniqueId(m);

  return id;
}
