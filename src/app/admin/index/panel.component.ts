import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'panel',
    styleUrls: [ './panel.component.scss' ],
    templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit{

    public isCollapsed: number = 0;

    constructor(private route: ActivatedRoute){}

    ngOnInit(): void {
        let childrenData = this.route.snapshot.children[0].data;

        childrenData
            ? this.isCollapsed = childrenData.isCollapsed
            : this.isCollapsed = 0
    }
}