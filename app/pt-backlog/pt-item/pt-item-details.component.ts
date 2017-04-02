import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { confirm, action, ActionOptions, ConfirmOptions } from 'ui/dialogs';

import { BacklogService } from '../../services/backlog.service';
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../../shared/static-data';
import { PTDomain } from '../../typings/domain';
import IPTItem = PTDomain.IPTItem;
import IUser = PTDomain.IUser;

import { ItemTypePickerModalComponent } from "../shared/item-type-picker-modal.component";
import { UserPickerModalComponent } from '../shared/user-picker-modal.component';

@Component({
    moduleId: module.id,
    selector: 'pt-item-details',
    templateUrl: 'pt-item-details.component.html'
})
export class PTItemDetailsComponent implements OnInit {
    public item: IPTItem;

    public formFieldGridCols = '90, *, 90 ';

    public get priorityDecEnabled() {
        return !PriorityEnum.isMin(this.item.priority);
    }

    public get priorityIncEnabled() {
        return !PriorityEnum.isMax(this.item.priority);
    }

    constructor(
        private backlogService: BacklogService,
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef
    ) { }

    ngOnInit() {
        this.item = this.backlogService.items[0];
    }

    public textViewFieldHeight(value: string): number {
        if (value) {
            let lineHeight = 20;
            let numlines = Math.ceil(value.length / 36);
            let newHeight = ((numlines < 2 ? 2 : numlines) * lineHeight) + 10;
            return newHeight < 150 ? newHeight : 150;
        }
        else {
            return 40;
        }
    }

    public titleChange(newVal: string) {
        this.backlogService.updatePtItemTitle(this.item, newVal);
    }

    public descriptionChange(newVal: string) {
        this.backlogService.updatePtItemDescription(this.item, newVal);
    }

    public estimateIncDecTapped(incdec: boolean) {
        this.backlogService.updatePtItemEstimate(this.item, incdec);
    }

    public priorityIncDecTapped(incdec: boolean) {
        this.backlogService.updatePtItemPriority(this.item, incdec);
    }

    public showTypeModal() {
        const options: ModalDialogOptions = {
            context: { itemTitle: this.item.title, promptMsg: "Select item type" },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modalService.showModal(ItemTypePickerModalComponent, options).then((res: ItemTypeEnum) => {
            if (res) {
                this.backlogService.updatePtItemType(this.item, res);
            }
        });
    }

    public showStatusOptions() {
        let statusKeys = [];
        let statuses = [];
        for (var enumMember in StatusEnum) {
            var isValueProperty = parseInt(enumMember, 10) >= 0;
            if (isValueProperty) {
                statuses.push(StatusEnum[enumMember]);
                statusKeys.push({ key: enumMember, value: StatusEnum[enumMember] });
            }
        }

        var options: ActionOptions = {
            title: 'Select Status',
            cancelButtonText: 'Cancel',
            actions: statuses
        };

        action(options).then((result) => {
            if (result != 'Cancel') {
                this.backlogService.updatePtItemStatus(this.item, result);
            }
        });
    }

    public showAssigneeModal() {
        const options: ModalDialogOptions = {
            context: { itemTitle: this.item.title, promptMsg: "Select assignee" },
            fullscreen: true,
            viewContainerRef: this.vcRef
        };

        this.modalService.showModal(UserPickerModalComponent, options).then((res: IUser) => {
            if (res) {
                this.backlogService.updatePtItemAssignee(this.item, res);
            }
        });
    }
}