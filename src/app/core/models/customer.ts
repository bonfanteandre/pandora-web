import { Address } from "./address";
import { Plan } from "./plan";

export class Customer {
    public id: string;
    public name: string;
    public phoneNumber: string;
    public planId: string;
    public plan: Plan;
    public addresses: Address[];
}