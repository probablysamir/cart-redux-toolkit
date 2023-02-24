import { BagIcon } from "../icons/icons";
import { useSelector } from "react-redux/es/exports";

export const Navbar = () => {
    const cart = useSelector((state: any) => state.cart);
    return (
    <div className="flex justify-between bg-blue-500 p-3 text-center text-white">
      <p className="text-xl font-bold">Store</p>
      <div className="flex">
        <BagIcon />
        <div className="absolute right-2 flex h-5 w-5 justify-center rounded-2xl bg-blue-400 align-middle text-xs">
          {cart.totalAmount}
        </div>
      </div>
    </div>
  );
};
