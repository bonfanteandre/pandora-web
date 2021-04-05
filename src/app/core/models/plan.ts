export class Plan {
    public id: string;
    public name: string;
    public price: number;

    constructor(init?: Partial<Plan>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}