import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderItemComponent } from "./header/header-item/header-item.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
    declarations: [
        HeaderComponent,
        HeaderItemComponent
    ],
    exports: [
        HeaderComponent,
        HeaderItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ]
})
export class CoreModule {

}