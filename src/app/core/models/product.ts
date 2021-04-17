export class Product {
    public id: string;
    public name: string;
    public stock: number;
    public cost: number;

    constructor(init?: Partial<Product>) {
        if (init) {
            this.id = init.id;
            this.name = init.name;
            this.stock = init.stock;
            this.cost = init.cost;
        }
    }
}