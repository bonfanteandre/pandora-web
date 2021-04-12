import { Product } from "./product";

export class OrderItem {
    public id: string;
    public orderId: string;
    public productId: string;
    public product: Product;
    public unitValue: number;
    public amount: number;
    public price: number;
}