const inventory = (
  inventory = { inventories: [], inventory: {}, loading: false },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...inventory, loading: true };

    case "END_LOADING":
      return { ...inventory, loading: false };

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
