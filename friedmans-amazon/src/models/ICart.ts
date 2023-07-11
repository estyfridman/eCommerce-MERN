import { ICartProduct } from "./ICartProduct";

export interface ICart {
    id: number;
    products :ICartProduct[];
    productQuantity: number;
    installments: number;
    totalPrice: number;
    currencyId: string;
    currencyFormat: string;
}