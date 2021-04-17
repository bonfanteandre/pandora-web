export class PaymentMethod {
    public id: string;
    public name: string;

    constructor(init?: Partial<PaymentMethod>) {
        if (init) {
            this.id = init.id;
            this.name = init.name;
        }
    }
}