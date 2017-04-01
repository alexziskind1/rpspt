import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { UserService } from './';
import { MockDataService } from './mock-data.service';
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../shared/static-data';
import { PTDomain } from '../typings/domain';
import IUser = PTDomain.IUser;
import IPTItem = PTDomain.IPTItem;
import ITask = PTDomain.ITask;
import IComment = PTDomain.IComment;
import INewItem = PTDomain.INewItem;
import INewTask = PTDomain.INewTask;
import INewComment = PTDomain.INewComment;


@Injectable()
export class BacklogService {
    private _allItems: Array<IPTItem> = [];
    private _filteredItems: Array<IPTItem> = [];

    public get items() {
        return this._allItems;
    }

    public get filteredItems() {
        return this._filteredItems;
    }

    constructor(
        private mockDataService: MockDataService,
        private userService: UserService
    ) {
        this._allItems = mockDataService.generatePTItems(userService.users);
        //this._allItems[0].assignee = this.userService.users[0];
    }

    public getItem(id: string) {
        let selectedItem = _.find(this._allItems, i => i.id == id);
        return Promise.resolve(selectedItem);
    }

    public addNewPTItem(newItem: INewItem, assignee: IUser) {
        let item: IPTItem = {
            id: _.uniqueId(),
            title: newItem.title,
            description: newItem.description,
            type: newItem.type,
            estimate: 0,
            priority: PriorityEnum.Medium,
            status: StatusEnum.Open,
            assignee: assignee,
            tasks: [],
            comments: [],
            dateCreated: new Date(),
            dateModified: new Date()
        };
        this._allItems.push(item);
    }

    public updatePtItem(item: IPTItem) {

    }

    public updatePtItemStatus(item: IPTItem, newStatusStr: string) {
        let newStatus = StatusEnum[newStatusStr];
        if (item.status != newStatus) {
            item.status = newStatus;
            //this.publishUpdates();
            let selectedItem = _.find(this._allItems, i => i.id == item.id);
            selectedItem.status = newStatus;
        }
    }

    public filter(selectedViewIndex: number) {
        var filteredItems = [];
        switch (selectedViewIndex) {
            case 0:
                filteredItems = this._allItems.filter(i => i.assignee.fullName === 'Alex Ziskind');
                break;
            case 1:
                filteredItems = this._allItems.filter(i => i.status === StatusEnum.Open || i.status === StatusEnum.ReOpened);
                break;
            case 2:
                filteredItems = this._allItems.filter(i => i.status === StatusEnum.Closed);
                break;
            default:
                filteredItems = this._allItems;
        }
        this._filteredItems = filteredItems;
    }
}

