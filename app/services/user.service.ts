//angular imports
import { Injectable } from '@angular/core';
import { Observable, Observer } from "rxjs/Rx";

//3rd party imports
import * as _ from 'lodash';

//app imports
import { PTDomain } from '../typings/domain';
import IUser = PTDomain.IUser;

@Injectable()
export class UserService {

    private _generatedUsers: Array<IUser> = [];
    private _observer: Observer<Array<IUser>>;

    public get users(): Array<IUser> {
        return this._generatedUsers;
    }

    public get usersObs(): Observable<Array<IUser>> {
        return Observable.create((observer: Observer<Array<IUser>>) => {
            this._observer = observer;
            observer.next(this._generatedUsers);
        });
    }

    constructor() { }

    public getUserAvatar(userId: string) {
        let user = _.find(this.users, (user) => user.id === userId);
        return user.avatar;
    }

}
