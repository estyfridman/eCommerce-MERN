
export interface IProduct {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string; // write enum
    countInStock : number;
    image: string;
    token: string;
    brand: string;
    rating: {rate: number, count: number},
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}