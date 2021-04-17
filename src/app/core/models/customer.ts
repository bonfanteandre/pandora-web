import { Address } from "./address";
import { Plan } from "./plan";

export class Customer {
    public id: string;
    public name: string;
    public phoneNumber: string;
    public planId: string;
    public plan: Plan;
    public addresses: Address[];

    constructor(init?: Partial<Customer>) {
        if (init) {
            this.id = init.id;
            this.name = init.name;
            this.phoneNumber = init.phoneNumber;
            this.planId = init.planId;
            this.plan = new Plan(init.plan);
            this.addresses = init.addresses ? init.addresses.map(a => new Address(a)) : [];
        }
    }
}