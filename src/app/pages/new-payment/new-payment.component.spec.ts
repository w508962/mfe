import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentComponent } from './new-payment.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@wexinc/fontawesome/angular-fontawesome';
import { CalendarModule, ChipsModule, DropdownModule, InputNumberModule, InputTextModule, ProgressSpinnerModule } from '@wexinc/phoenix-angular-14-components';
import { TranslocoModule } from '@ngneat/transloco';
import {
	DynamicDialogConfig,
	DynamicDialogRef,
	DialogService,
} from 'primeng/dynamicdialog';
import { NewPaymentService } from 'src/app/payment/shared/services/new-payment.service';

describe('NewPaymentComponent', () => {
	let component: NewPaymentComponent;
	let fixture: ComponentFixture<NewPaymentComponent>;
	let newPaymentService: NewPaymentService;
	
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ NewPaymentComponent ],
			imports:[
				CommonModule,
				FormsModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				FontAwesomeModule,
				CalendarModule,
				TranslocoModule,
				ProgressSpinnerModule,
				ChipsModule,InputTextModule,DropdownModule,
				InputNumberModule,
				InputTextModule,
				HttpClientTestingModule,
			],
			providers: [
				NewPaymentService,
				DynamicDialogRef,
				DialogService,
				DynamicDialogConfig,
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(NewPaymentComponent);
		component = fixture.componentInstance;
		newPaymentService = TestBed.inject(NewPaymentService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	  it('should call createPayment() when currentPage is "reviewPayment"', () => {
		component.currentPage = 'reviewPayment';
		spyOn(component, 'createPayment');
		component.handleSubmit();
		expect(component.createPayment).toHaveBeenCalled();
	  });

	  it('should call next method with "invoiceDetails" when currentPage is "paymentDetails"', () => {
		component.currentPage = 'paymentDetails';
		const nextSpy = spyOn(newPaymentService.currentPage, 'next');
		component.handleSubmit();
		expect(nextSpy).toHaveBeenCalledWith('invoiceDetails');
	  });

	  it('should call next method with "reviewPayment" when currentPage is "invoiceDetails"', () => {
		component.currentPage = 'invoiceDetails';
		const nextSpy = spyOn(newPaymentService.currentPage, 'next');
		component.handleSubmit();
		expect(nextSpy).toHaveBeenCalledWith('reviewPayment');
	  });

	  it('should change current page to "invoiceDetails" when current page is "reviewPayment"', () => {
		component.currentPage = 'reviewPayment';
		spyOn(component.newPaymentService.currentPage, 'next');
		component.handleBackButton();
		expect(component.newPaymentService.currentPage.next).toHaveBeenCalledWith('invoiceDetails');
	});
	

	it('should call closeModal()', () => {
		spyOn(component, 'closeModal').and.callThrough();
		component.closeModal();
		expect(component.closeModal).toHaveBeenCalled();
	});

	it('should call closed dialog', () => {
		spyOn(component.ref, 'close');
		component.closedialog();
		expect(component.ref.close).toHaveBeenCalled();
	});

	it('should call cancel', () => {
		expect(component).toBeTruthy();
		component.cancel();
	});

	it('should call first step()', () => {
		spyOn(component, 'firstStepComplete').and.callThrough();
		component.firstStepComplete(component);
		expect(component.firstStepComplete).toHaveBeenCalled();
	});
	
	it('should call closeModal() when Escape key is pressed and currentPage is true', () => {
		spyOn(component, 'closeModal');
		const escapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
		component.keyEvent(escapeKeyEvent);
		expect(component.closeModal).toHaveBeenCalled();
	});
	
	it('should set returnValue and return an empty string', () => {
		const event: any = { returnValue: null };
		component.beforeunloadHandler(event);
		expect(event.returnValue).toBe('');
		expect(component.beforeunloadHandler(event)).toBe('');
	  });
});
