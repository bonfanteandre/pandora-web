import { Address } from "./address";
import { Customer } from "./customer";
import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status";
import { PaymentMethod } from "./payment-method";

export class Order {
    public id: string;
    public status: OrderStatus;
    public statusDescription: string;
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
            this.statusDescription = init.statusDescription;
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
        } else {
            this.status = OrderStatus.Created;
            this.statusDescription = 'Criado';
        }
    }

    public canFinish(): boolean {
        return this.status == OrderStatus.Created;
    }

    public canDeliver(): boolean {
        return this.status == OrderStatus.Finished;
    }

    public canCancel(): boolean {
        return this.status == OrderStatus.Created
            || this.status == OrderStatus.Finished;
    }

    public canChangeItems(): boolean {
        return this.status == OrderStatus.Created;
    }

    public canChange(): boolean {
        return this.status == OrderStatus.Created
            || this.status == OrderStatus.Finished;
    }

    public getStatusBadgeClass(): string {
        switch(this.status) {
            case OrderStatus.Created: return 'success';
            case OrderStatus.Finished: return 'primary';
            case OrderStatus.Delivered: return 'info';
            case OrderStatus.Canceled: return 'danger';
            default: return 'light';
        }
    }
}