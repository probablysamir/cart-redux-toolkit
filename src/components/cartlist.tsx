import { ChevronDown, ChevronUp, Loader } from "../icons/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseItem,
  getItems,
  increaseItem,
  removeItem,
  totalItem,
  selectIsLoading,
} from "../features/cartTotal/cartSlice";
import { useEffect } from "react";
import { AppDispatch } from "../app/store";
import { TotalPrice } from "./totalPrice";

export const Cartlist = () => {
  const isLoading = useSelector(selectIsLoading);
  const items = useSelector((state: any) => state.cart.items);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(totalItem());
  });
  useEffect(() => {
    dispatch(getItems());
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-300 p-5 flex justify-center pt-10">
        <Loader />
      </div>
    );
  } else if (totalAmount > 1) {
    return (
      <div className="min-h-screen bg-slate-300 p-5">
        <ul className="container mx-auto">
          {items.map((item: any) => {
            return (
              <li className="mb-4 grid grid-cols-3" key={item.id}>
                <img src={item.img} className="mx-auto h-28" />
                <div className="flex flex-col justify-center">
                  <span className="text-center font-semibold">{item.title}</span>
                  <div className="text-center text-gray-500">${item.price}</div>
                  <button
                    className="text-blue-700 hover:text-blue-900"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    remove
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button className="text-blue-700" onClick={() => dispatch(increaseItem(item.id))}>
                    <ChevronUp />
                  </button>
                  {item.amount}
                  <button
                    className="text-blue-700"
                    onClick={() =>
                      item.amount > 1
                        ? dispatch(decreaseItem(item.id))
                        : dispatch(removeItem(item.id))
                    }
                  >
                    <ChevronDown />
                  </button>
                </div>
              </li>
            );
          })}
          <TotalPrice />
        </ul>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-slate-300 p-5">
        <p className="mb-6 mt-10 text-center text-4xl font-bold">Your Bag</p>
        <p className="text-center">is currently empty</p>
      </div>
    );
  }
};
