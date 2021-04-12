import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OperationResult } from "src/app/core/models/common/operation-result";
import { Product } from "src/app/core/models/product";
import { ProductsService } from "src/app/core/services/products.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-product',
    templateUrl: './product.component.html'
})
export class ProductComponent {

    public product: Product;
    public isNew: boolean = true;
    public operationResult: OperationResult;
    public form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder, 
        private productsService: ProductsService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.isNew = params.id === 'new';
            this.isNew ?
                this.newProduct() :
                this.loadProduct(params.id);
        });
    }

    private newProduct(): void {
        this.product = new Product();
        this.buildForm();
    }

    private loadProduct(id: any) {
        this.productsService
            .getById(id)
            .subscribe(product => {
                this.product = product;
                this.buildForm();
            });
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            name: [this.product.name, Validators.required],
            cost: [this.product.cost, Validators.required],
            stock: [this.product.stock, Validators.required],
        });
    }

    public saveProduct(): void {
        this.setProductData();
        this.isNew ?
            this.createProduct() :
            this.updateProduct();
    }

    private setProductData(): void {
        this.product.name = this.form.get('name').value;
        this.product.cost = parseFloat(this.form.get('cost').value);
        this.product.stock = parseInt(this.form.get('stock').value);
    }

    private createProduct(): void {
        this.operationResult = null;
        this.productsService.create(this.product).subscribe(
            () => {
                this.swalService.showToast('Produto criado com sucesso!', 'success');
                this.router.navigateByUrl('/products');
            },
            (result: OperationResult) => this.operationResult = result);
    }
    

    private updateProduct(): void {
        this.operationResult = null;
        this.productsService.update(this.product).subscribe(
            () => {
                this.swalService.showToast('Produto atualizado com sucesso!', 'success');
                this.router.navigateByUrl('/products');
            },
            (result: OperationResult) => this.operationResult = result);
    }

}