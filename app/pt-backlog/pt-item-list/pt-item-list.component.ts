import { Component, OnInit, Input } from '@angular/core';

import { RouterExtensions } from 'nativescript-angular/router';

import { BacklogService } from '../../services';
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../../shared/static-data';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;

@Component({
    moduleId: module.id,
    selector: 'pt-item-list',
    templateUrl: 'pt-item-list.component.html',
    styleUrls: ['pt-item-list.component.css']
})
export class PTItemListComponent implements OnInit {

    private _selectedViewIndex: number;

    public get selectedViewIndex() {
        return this._selectedViewIndex;
    }
    @Input() public set selectedViewIndex(value: number) {
        this._selectedViewIndex = value;
        this.refresh();
    }

    constructor(
        private backlogService: BacklogService,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit() {

    }

    private refresh() {
        this.backlogService.filter(this.selectedViewIndex);
    }

    public listItemTap(args) {
        let lv = args.object;
        let item = <IPTItem>lv.items[args.index];
        this._routerExtensions.navigate(['/pt-item', item.id]);
    }

    public getIndicatorClass(item: IPTItem) {
        return ItemTypeEnum.getIndicatorClass(item.type);
    }

}
