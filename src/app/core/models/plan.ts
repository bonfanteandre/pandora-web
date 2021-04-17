export class Plan {
    public id: string;
    public name: string;
    public price: number;

    constructor(init?: Partial<Plan>) {
        if (init) {
            this.id = init.id;
            this.name = init.name;
            this.price = init.price;
        }
    }
}