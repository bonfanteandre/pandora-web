import { Component, OnInit } from "@angular/core";
import { HeaderItem } from "./header-item/header-item";
import { HeaderItemComponent } from "./header-item/header-item.component";

@Component({
    selector: 'pndr-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public items: HeaderItem[] = [];

    ngOnInit(): void {
        this.setItems();
    }

    private setItems(): void {
        this.items = [
            new HeaderItem('Home', '/home', 'fa fa-home'),
            new HeaderItem('Planos', '/plans', 'fa fa-file'),
            new HeaderItem('Formas de pagamento', '/payment-methods', 'fa fa-credit-card'),
            new HeaderItem('Clientes', '/customers', 'fa fa-users'),
            new HeaderItem('Produtos', '/products', 'fa fa-archive'),
            new HeaderItem('Pedidos', '/orders', 'fa fa-shopping-cart'),
        ];
    }

}