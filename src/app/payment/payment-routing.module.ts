import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';

const routes: Routes = [{
	path: '',
	component: AppComponent,
	children: [
		{
			path: '',
			redirectTo: 'all',
			pathMatch: 'full',
		},{
			path: 'all',
			loadChildren: () =>
				import('../pages/landing/landing.module').then((m) => m.LandingModule),
		},
	],
}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PaymentRoutingModule { }
