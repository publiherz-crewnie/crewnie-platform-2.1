import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'register-crewnie',
                loadChildren: './register-crewnie/ngx-wizard.module#NGXFormWizardModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WizardsRoutingModule { }