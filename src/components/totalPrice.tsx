import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartTotal/cartSlice";

export const TotalPrice = () => {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto">
      <hr className="border-blue-700" />
      <div className="flex justify-between p-4 font-semibold">
        <span>Total</span>${cart.totalPrice.toFixed(2)}
      </div>
      <button
        className="mx-auto flex rounded border-2 border-red-500 px-3 py-1 text-red-700 duration-200 hover:bg-red-500 hover:text-white"
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </button>
      
    </div>
  );
};
