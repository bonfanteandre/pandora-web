import { Product } from "./product";

export class OrderItem {
    public id: string;
    public orderId: string;
    public productId: string;
    public product: Product;
    public unitValue: number;
    public amount: number;
    public price: number;

    constructor(init?: Partial<OrderItem>) {
        if (init) {
            this.id = init.id;
            this.orderId = init.orderId;
            this.productId = init.orderId;
            this.product = new Product(init.product);
            this.unitValue = init.unitValue;
            this.amount = init.amount;
            this.price = init.price;
        }
    }
    
    public canDecrementAmount(): boolean {
        return (this.amount - 1) > 0;
    }

    public decrementAmount(): void {
        if ((this.amount - 1) <= 0) {
            return;
        }

        this.amount -= 1;
        this.price = this.amount * this.unitValue;
    }

    public incrementAmount(): void {
        this.amount += 1;
        this.price = this.amount * this.unitValue;
    }
}