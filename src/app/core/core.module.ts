import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ErrorsComponent } from "./components/errors/errors.component";
import { HeaderItemComponent } from "./components/header/header-item/header-item.component";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
    declarations: [
        HeaderComponent,
        HeaderItemComponent,
        ErrorsComponent
    ],
    exports: [
        HeaderComponent,
        HeaderItemComponent,
        ErrorsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule
    ]
})
export class CoreModule {

}