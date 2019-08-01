export const NAME_ERROR_MESSAGE = "Name can't be empty";

const DEFAULT_VALUES = {
  status: false
};

const ItemModel = function(values) {
  const item = {};

  if (!values.name) {
    throw NAME_ERROR_MESSAGE;
  }

  Object.assign(item, DEFAULT_VALUES, values);

  return item;
};

export default ItemModel;
