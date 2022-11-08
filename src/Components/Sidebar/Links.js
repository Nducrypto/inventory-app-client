import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";

// import { RiContactsLine } from "react-icons/ri";

export const links = [
  {
    title: "Dashboard",
    link: [
      {
        name: "home",
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    title: "Products",
    link: [
      {
        name: "products",
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: "Profile",
    link: [
      {
        name: "profile",
        icon: <AiOutlineShoppingCart />,
      },
      // {
      //   name: "profile",
      //   icon: <RiContactsLine />,
      // },
    ],
  },
];
