const inventory = (inventory = { inventories: [], inventory: {} }, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return { ...inventory, inventories: action.payload };

    case "FETCH_ONE":
      return { ...inventory, inventory: action.payload };

    case "CREATE":
      return {
        ...inventory,
        inventories: [...inventory.inventories, action.payload],
      };

    case "DELETE":
      return {
        ...inventory,
        inventories: inventory.inventories.filter(
          (t) => t._id !== action.payload
        ),
      };

    case "UPDATE":
      return {
        ...inventory,
        inventories: inventory.inventories.map((t) =>
          t._id === action.payload._id ? action.payload : t
        ),
      };

    default:
      return inventory;
  }
};

export default inventory;
