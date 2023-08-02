import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { HeaderButtonModel, HeaderItemModel } from '@yeti/ui-components';
import { DialogService, DynamicDialogRef } from '@wexinc/phoenix-angular-14-components';

import { CssVariableService } from '../utils/css-variables.service';
@Component({
	selector: 'payment-mfe-base-page',
	template: '',
})
export abstract class BasePageComponent {
	headerAutoID: string;
	headerTitle: string;

	headerItems: HeaderItemModel[];
	headerButtons: HeaderButtonModel[] =[];
	userPriveleges:any={};
	constructor(private router: Router) {

	 {

			this.headerAutoID = 'headertabmenu_payments_title';
			this.headerTitle = 'Payments';

			if(localStorage.getItem('WEX-accessUser')){
				this.userPriveleges = JSON.parse(localStorage.getItem('WEX-accessUser')!).privileges ?? {};
			}
			this.headerItems = [];
			if(this.userPriveleges.CREATE_PURCHASE_LOG)
				this.headerButtons.push(
					{
						desc: 'Upload',
						icon: 'fa fa-arrow-up-from-line',
						autoid: 'button_payments_upload',
						class: 'p-button p-button-outlined p-button-secondary',
						style: {
							'border': `1px solid ${CssVariableService.getCssVariable('--phoenix-base-color-slate-blue-70')}`,
							'color': CssVariableService.getCssVariable('--phoenix-base-color-slate-blue-70')
						}
					},
					{
						desc: 'Payment',
						icon: 'fa fa-plus',
						autoid: 'button_payments_add',
						class: 'p-button p-plus-button'
					},
				);
		}
	}
}
