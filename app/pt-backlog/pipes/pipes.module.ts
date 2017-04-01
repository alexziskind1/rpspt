import { NgModule } from '@angular/core';

import {
    TypeDisplayPipe,
    TypeImagePipe
} from './';

@NgModule({
    imports: [],
    declarations: [
        TypeDisplayPipe,
        TypeImagePipe
    ],
    exports: [
        TypeDisplayPipe,
        TypeImagePipe
    ]
})
export class PipesModule { }
