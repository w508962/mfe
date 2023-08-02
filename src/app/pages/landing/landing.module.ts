import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@wexinc/fontawesome/angular-fontawesome';
import { DialogModule, ProgressSpinnerModule, ToastModule } from '@wexinc/phoenix-angular-14-components';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { TableWithDetailsPanelModule } from '@wexinc/phoenix-marketplace-angular-14-components';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from '@wexinc/phoenix-angular-14-components';
import { ROOT_LOGGING_SERVICE_TOKEN, RootLoggingService } from '@yeti/logger';

import {
	EmptyWidgetModule,
	FilterService,
	PageTemplateModule,
	SearchAndFilterModule,PaymentDetailsModule
} from '@yeti/ui-components';

import { PaymentFilterService } from '../../payment/shared/services/filter.service';

@NgModule({
	declarations: [
		LandingComponent
	],
	imports: [CommonModule,
		FontAwesomeModule,
		ProgressSpinnerModule,
		ToastModule,
		TableWithDetailsPanelModule,
		EmptyWidgetModule,
		PageTemplateModule,
		InputTextModule,
		ButtonModule,
		SearchAndFilterModule,
		DialogModule,
		RouterModule.forChild([
			{
				path: '',
				component: LandingComponent,
			},
		]),PaymentDetailsModule
	],
	providers: [
		{
			provide: ROOT_LOGGING_SERVICE_TOKEN,
			useClass: RootLoggingService,
		},
		{
			provide: FilterService,
			useClass: PaymentFilterService
		},
		DatePipe,
	],
})
export class LandingModule { }
