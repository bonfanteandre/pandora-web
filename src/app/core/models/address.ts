export class Address {
    public id: string;
    public customerId: string;
    public street: string;
    public number;
    public neighborhood: string;
    public reference: string;

    constructor(init?: Partial<Address>) {
        if (init) {
            this.id = init.id;
            this.customerId = init.customerId;
            this.street = init.street;
            this.number = init.number;
            this.neighborhood = init.neighborhood;
            this.reference = init.reference;
        }
    }
}