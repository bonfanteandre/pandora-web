import { Component, Input } from "@angular/core";

@Component({
    selector: 'pndr-errors',
    templateUrl: './errors.component.html'
})
export class ErrorsComponent {

    @Input() public title: string;
    @Input() public errors: string[] = [];

}