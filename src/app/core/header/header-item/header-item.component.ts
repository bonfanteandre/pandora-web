import { Component, Input } from "@angular/core";
import { HeaderItem } from "./header-item";

@Component({
    selector: 'pndr-header-item',
    templateUrl: './header-item.component.html',
    styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent {

    @Input() public item: HeaderItem;
    
}