import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Order } from "src/app/core/models/order";
import { OrderItem } from "src/app/core/models/order-item";
import { Product } from "src/app/core/models/product";
import { OrderItemsService } from "src/app/core/services/order-items.service";
import { ProductsService } from "src/app/core/services/products.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-order-item-form',
    templateUrl: './order-item-form.component.html'
})
export class OrderItemFormComponent implements OnInit {

    @Output() public onAddItem = new EventEmitter<void>();
    @Input() public order: Order;

    public form: FormGroup;
    public products: Product[] = [];

    constructor(
        private formBuilder: FormBuilder, 
        private productsService: ProductsService,
        private orderItemsService: OrderItemsService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    private loadProducts(): void {
        this.productsService
        .getAll()
        .subscribe(products => {
            this.products = products;
            this.createForm();
        });
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            productId: ['', Validators.required],
            amount: [null, Validators.required]
        });
    }

    public createItem(): void {
        const productId = this.form.get('productId').value;
        const product = this.products.find(p => p.id == productId);
        
        const amount = parseInt(this.form.get('amount').value);

        if (this.itemAlreadyAdded(productId)) {
            this.swalService.showMessage('Produto já adicionado!');
            return;
        }

        if (amount <= 0) {
            this.swalService.showMessage('A quantidade deve ser maior que zero!');
            return;
        }
        
        const item = this.createOrderItem(product, amount);
        this.saveItem(item);
    }

    private createOrderItem(product: Product, amount: number) {
        const item = new OrderItem();
        item.orderId = this.order.id;
        item.productId = product.id;
        item.amount = amount;
        item.unitValue = product.cost;
        item.price = item.amount * item.unitValue;
        return item;
    }

    private itemAlreadyAdded(productId: string): boolean {
        return this.order.items.some(i => i.productId == productId);
    }

    private saveItem(item: OrderItem): void {
        this.orderItemsService
            .create(item)
            .subscribe(() => {
                this.onAddItem.emit();
                this.clearItem();
                this.swalService.showToast('Item adicionado com sucesso!', 'success');
            });
    }

    public clearItem(): void {
        this.form.reset();
    }

}