import { Address } from "./address";
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
    public addressId: string;
    public address: Address;
    public paymentMethodId: string;
    public paymentMethod: PaymentMethod;
    public deliverAt: Date;
    public observations: string;
    public items: OrderItem[] = [];
    public total: number;

    constructor(init?: Partial<Order>) {
        if (init) {
            this.id = init.id;
            this.status = init.status;
            this.createdOn = init.createdOn;
            this.customerId = init.customerId;
            this.customer = new Customer(init.customer);
            this.addressId = init.addressId;
            this.address = new Address(init.address);
            this.paymentMethodId = init.paymentMethodId;
            this.paymentMethod = new PaymentMethod(this.paymentMethod);
            this.deliverAt = init.deliverAt;
            this.observations = init.observations;
            this.items = init.items ? init.items.map(i => new OrderItem(i)) : [];
            this.total = init.total;
        }
    }
}