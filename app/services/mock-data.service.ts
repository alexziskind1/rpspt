import { Injectable } from '@angular/core';

import * as fileSystemModule from 'file-system';

import * as faker from 'faker';
import * as _ from 'lodash';

import * as constModule from '../shared/constants';
import { ItemTypeEnum, PriorityEnum, StatusEnum } from '../shared/static-data';

import { PTDomain } from '../typings/domain';
import IUser = PTDomain.IUser;
import IPTItem = PTDomain.IPTItem;
import ITask = PTDomain.ITask;
import IComment = PTDomain.IComment;

@Injectable()
export class MockDataService {

    constructor() { }

    private getUserAvatars(path) {
        var avatarList: Array<string> = [];
        var currentAppFolder = fileSystemModule.knownFolders.currentApp();
        var menAvatarsFile = currentAppFolder.getFile(path);
        var fileText = menAvatarsFile.readTextSync();

        var lines = fileText.split('\n');
        for (var i = 0; i < lines.length; i++) {
            avatarList.push(lines[i]);
        }
        return avatarList;
    }

    public generateUser(avatarsMen: string[]): IUser {
        let genderBool = faker.random.boolean();
        let genderInt = parseInt(genderBool + '');
        let firstName = faker.name.firstName(genderInt);
        let lastName = faker.name.lastName(genderInt);
        var avatar = _.sample(avatarsMen);

        let user: IUser = {
            id: faker.random.uuid(),
            fullName: firstName + ' ' + lastName,
            avatar: avatar
        };
        return user;
    }

    public getMeUser(): IUser {
        let avatarMe = this.getUserAvatars('images/avatars/base64/me.txt')[0];
        let userMe: IUser = {
            id: faker.random.uuid(),
            fullName: 'Alex Ziskind',
            avatar: avatarMe
        };
        return userMe;
    }

    public generateUsers(): Array<IUser> {
        let avatarsLi = this.getUserAvatars('images/avatars/base64/base64.txt');
        let users = _.times(constModule.NUM_USERS, () => {
            return this.generateUser(avatarsLi);
        });
        let userMe = this.getMeUser();
        users.unshift(userMe);
        return users;
    }

}