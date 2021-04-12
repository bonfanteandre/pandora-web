import { Customer } from "./customer";
import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status";
import { PaymentMethod } from "./payment-method";

export class Order {
    public id: string;
    public status: OrderStatus;
    public createdOn: Date;
    public customerId: string;
    public customer: Customer;
    public paymentMethodId: string;
    public paymentMethod: PaymentMethod;
    public deliverAt: Date;
    public observations: string;
    public items: OrderItem[] = [];
    public total: number;
}