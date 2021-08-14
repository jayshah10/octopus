import { createContext } from "react";
import { IProduct } from "../types";

export interface ICartProduct{
    product:IProduct;
    quantity:number;
}

export interface ICartContext{
    products:Array<ICartProduct>;
    addProducts:(item:ICartProduct) => void;
}

export const CartContext = createContext<ICartContext>({products:[], addProducts:() => {}});

