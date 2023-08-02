import { NgModule } from '@angular/core';
import { DialogService, MessageService } from '@wexinc/phoenix-angular-14-components';
import { FaIconLibrary } from '@wexinc/fontawesome/angular-fontawesome';
import { fas } from '@wexinc/fontawesome/pro-solid-svg-icons';
import { far } from '@wexinc/fontawesome/pro-regular-svg-icons';
import { fal } from '@wexinc/fontawesome/pro-light-svg-icons';
import { PaymentRoutingModule } from './payment-routing.module';

@NgModule({
	declarations: [],
	imports: [
		PaymentRoutingModule,
	],
	providers: [
		DialogService,
		MessageService,
	]
})
export class PaymentModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far, fal);
	}
}
