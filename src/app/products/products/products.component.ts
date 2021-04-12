import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/core/models/product";
import { ProductsService } from "src/app/core/services/products.service";
import { SwalService } from "src/app/shared/services/swal.service";

@Component({
    selector: 'pndr-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent {
    
    public products: Product[] = [];
    public skip: number = 0;
    public take: number = 10;
    public name: string = '';

    constructor(
        private router: Router, 
        private productsService: ProductsService,
        private swalService: SwalService) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    private loadProducts(): void {
        this.productsService
            .getPaged(this.skip, this.take, this.name)
            .subscribe(products => this.products = products);
    }

    public createProduct(): void {
        this.router.navigateByUrl('/products/new/details');
    }

    public editProduct(product: Product): void {
        this.router.navigateByUrl(`/products/${product.id}/details`);
    }

    public removeProduct(product: Product): void {
        this.swalService.showConfirm('Tem certeza que deseja remover este produto?', '',
        () => {
            this.productsService
                .remove(product)
                .subscribe(() => {
                    this.swalService.showToast('Produto removido com sucesso!', 'success');
                    this.loadProducts();
                });
        },
        () => {});
    }
}