import { Component, HostListener, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { NewPaymentService } from 'src/app/payment/shared/services/new-payment.service';
import {  first } from 'rxjs/operators';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';

@Component({
	selector: 'payment-new-payment',
	templateUrl: './new-payment.component.html',
	styleUrls: ['./new-payment.component.scss'],
	providers: [ConfirmationService]
})
export class NewPaymentComponent implements OnInit {
	displaydata: any;
	currentPage:String='';
	paymentFormControlData: any;
	sendExistingFormValues: any = null;
	constructor(public newPaymentService:NewPaymentService, public service: TranslocoService, 
		public ref: DynamicDialogRef, 
		public config: DynamicDialogConfig,
		public confirmationService: ConfirmationService,
		public primengConfig: PrimeNGConfig,
	) { }

	@HostListener('document:keydown', ['$event'])
	keyEvent(event: KeyboardEvent) {
		if (event.key == 'Escape') {
			if(this.currentPage){
				this.closeModal();
			}
		}
	}
	
	ngOnInit(): void {
		this.service.load('en').subscribe((response) => {
			this.displaydata = response;
		});

		this.newPaymentService.currentPage.next('paymentDetails');
		this.newPaymentService.getCurrentPage.subscribe(currentPage =>{
			this.currentPage=currentPage;
		});
	}


	handleSubmit() {
		if(this.currentPage === 'paymentDetails') {
			this.newPaymentService.currentPage.next('invoiceDetails');
		} else if(this.currentPage === 'invoiceDetails') {
			this.newPaymentService.currentPage.next('reviewPayment');
		} else if(this.currentPage === 'reviewPayment') {
			this.createPayment();
		} 
	}
	createPayment() {
		//handle create payment service call here in future
	}
	closeModal(){
		this.confirmationService.confirm({
			message: this.displaydata.dialogmessage,
			header: this.displaydata.dialogheader,
			key: 'positionDialog',
			icon: 'pi pi-exclamation-triangle',
			closeOnEscape: true,
		});
		
	}
	closedialog() {
		this.ref.close();
	}
	cancel() {
		this.confirmationService.close();
	}
	firstStepComplete(event: any) {
		this.paymentFormControlData = event.value;
	}
	handleBackButton() {
		if(this.currentPage === 'invoiceDetails') {
			this.newPaymentService.currentPage.next('paymentDetails');
			this.sendExistingFormValues = JSON.parse(
				JSON.stringify(this.paymentFormControlData)
			);
		} else if(this.currentPage === 'reviewPayment') {
			this.newPaymentService.currentPage.next('invoiceDetails');
		}
	}
	@HostListener('window:beforeunload', ['$event']) beforeunloadHandler(event: any) {
		event.returnValue = '';
		return '';
	}
}
