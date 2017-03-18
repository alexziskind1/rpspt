import { NgModule } from '@angular/core';

import { PTBacklogComponent } from './pt-backlog.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [PipesModule],
    exports: [],
    declarations: [PTBacklogComponent],
    providers: [],
})
export class PTBacklogModule { }
