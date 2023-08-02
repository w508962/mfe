import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PaymentDetailsComponent } from './payment-details.component';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef } from '@wexinc/phoenix-angular-14-components';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NewPaymentService } from 'src/app/payment/shared/services/new-payment.service';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NewPayment } from 'src/app/payment/shared/models/new-payment.model';
import { PaymentsService } from 'src/app/payment/shared/services/payments.service';
import { SimpleGraphqlService } from '@yeti/service';
import { YetiEnvironmentVariables } from '@yeti/environment';

describe('PaymentDetailsComponent', () => {
	let component: PaymentDetailsComponent;
	let fixture: ComponentFixture<PaymentDetailsComponent>;
	let newPaymentService: NewPaymentService; 
	let paymentServiceObj: PaymentsService; 
	let store: Store;


	beforeEach(async () => {
		const graphQLService = jasmine.createSpyObj<SimpleGraphqlService>('GraphqlService', ['mutation']);
		let envVarsSpy = jasmine.createSpyObj<YetiEnvironmentVariables>('YetiEnvironmentVariables', ['getVariable']);
		
		await TestBed.configureTestingModule({
			declarations: [ PaymentDetailsComponent ],
			imports: [
				CommonModule,
				TranslocoModule,
			],
			providers: [
				NewPaymentService,
				PaymentsService,
				DynamicDialogRef,
				TranslocoService,
				{ provide: NewPaymentService, useClass: NewPaymentServiceClass },
				{ provide: PaymentsService, useClass: PaymentsService },
				{ provide: SimpleGraphqlService, useValue: {} },
				{ provide: TranslocoService },
				{
					provide: YetiEnvironmentVariables,
					useValue: envVarsSpy
				},
				{
					provide: Store,
					useValue: {
						pipe: () => {},
						dispatch: () => {},
						select: () => {},
					},
				},
			]
		}).compileComponents();

		fixture = TestBed.createComponent(PaymentDetailsComponent);
		component = fixture.componentInstance;
		newPaymentService = TestBed.inject(NewPaymentService);
		store = TestBed.inject(Store); 
		fixture.detectChanges();
		component.ngOnInit();
	});

	
	it('should create the component', () => {
		expect(component).toBeTruthy();
	  });

	  it('should update validThruDate when event is provided', () => {
		const eventDate = new Date('2023-07-24');
		const expectedValidThruDate = new Date('2023-07-27');
		component.updateValidThruDate(eventDate);
		expect(component.paymentDetailsForm.value.validThru).toEqual(expectedValidThruDate);
	  });

	  it('should set selectedFax and selectedEmail after getting delivery data', () => {
		const mockDeliveryData = { email: 'email1@example.com;email2@example.com', fax: '123456789' };
		spyOn(newPaymentService, 'getDeliveryData').and.returnValue(of(mockDeliveryData));
	
		component.selectSupplierName(null);
	
		expect(component.deliveryData).toBe(mockDeliveryData.email);
		expect(component.selectedFax).toBe(mockDeliveryData.fax);
		expect(component.selectedEmail).toEqual(['email1@example.com', 'email2@example.com']);
	  });

	  it('should call changeDetector.detectChanges()', () => {
		const mockDeliveryData = { email: 'email1@example.com', fax: '123456789' };
		spyOn(newPaymentService, 'getDeliveryData').and.returnValue(of(mockDeliveryData));
		spyOn(component.changeDetector, 'detectChanges');
	
		component.selectSupplierName(null);
		expect(component.changeDetector.detectChanges).toHaveBeenCalled();
	  });

	  it('should return true if "validThru" control value is empty', () => {
		component.paymentDetailsForm = new FormBuilder().group({
		  validThru: '',
		});
	
		const result = component.checkIsValid();
		expect(result).toBe(true);
	  });

	  it('should return true if "validThru" control value is null', () => {
		component.paymentDetailsForm = new FormBuilder().group({
		  validThru: null,
		});
		const result = component.checkIsValid();
		expect(result).toBe(true);
	  });

	  it('should return false if "validThru" control value is not empty or null', () => {
		component.paymentDetailsForm = new FormBuilder().group({
		  validThru: '01/25',
		});
		const result = component.checkIsValid();
		expect(result).toBe(false);
	  });

	  it('should changed organization', ()=>{
		component.getDefaultOrganizationId();
	  });

	 it('should fetch payment data from the service and set the form controls', () => {
		const testData = {
		  suppliers: ['Supplier 1', 'Supplier 2'],
		  mcc: '123456',
		};
		const event = { value: 'someValue' };
		spyOn(newPaymentService, 'getPaymentCreationData').and.returnValue(of(testData));
		component.organizationChanged(event);
		expect(component.suppliers).toEqual(testData.suppliers);
		expect(component.paymentData).toEqual(testData.mcc);
		expect(component.paymentDetailsForm.controls['mccField'].value).toEqual(testData.mcc);
	  });
	  it('should return current org id', () => {
		component.userOrgGroup = {
			id: 1, currentOrg: {
				id: 234, name: '', bankNumber: 22,
				companyNumber: 22,
				isSelected: true,
				effectiveOrganizationGroupId: 2,
				effectiveOrganizationGroupLoginId: '123'
			}, name: 'string',
			bankNumber: 1,
			companyNumber: 1,
			groupLoginId: 'string',
			assignedCompaniesCount: 1,
			assignedOrganizationsCount: 1,
			organizations: [],
			isSelected: true
		};
	  const orgId=component.getDefaultOrganizationId();
	  expect(orgId).toEqual(234);
	});

	it('should patch all fields correctly when valid formValue is provided', () => {
		const formValue = {
		  organizationId: 'org123',
		  selectedSupplierName: 'Supplier Name',
		  validFrom: new Date(),
		  validThru: new Date(),
		  mccField: '1234',
		  selectedEmail: 'test@example.com',
		  selectedFax: '1234567890'
		};
	  
		component.paymentDetailsForm = new FormGroup({
		  organizationId: new FormControl(),
		  selectedSupplierName: new FormControl(),
		  validFrom: new FormControl(),
		  validThru: new FormControl(),
		  mccField: new FormControl(),
		  selectedEmail: new FormControl(),
		  selectedFax: new FormControl()
		});
	  
		component.populateExistingFormValues(formValue);
	  
		expect(component.paymentDetailsForm.value).toEqual(formValue);
	  });
	  
});

class NewPaymentServiceClass{
	public newPaymentDetail = new BehaviorSubject<NewPayment>({});
	getNewPaymentDetail = this.newPaymentDetail.asObservable();
	public currentPage = new BehaviorSubject<String>('');
	getCurrentPage = this.currentPage.asObservable();
	getPaymentCreationData(): Observable<any> {
		const suppliers = [
			{ supplierName: 'New supplier', id: 1 },
			{ supplierName: 'Acme Supply Co', id: 2 },
			{ supplierName: 'Hudson Manufacturing', id: 3 },
			{ supplierName: 'Keebler Group', id: 4 },
			{ supplierName: 'Schultz Inc', id: 5 },
			{ supplierName: 'Wex Inc', id: 6 },
			{ supplierName: 'Old supplier', id: 7 },
			{ supplierName: 'Supplier Wex', id: 8 }
		];
		const paymentData = {
			mcc: '1234',
			suppliers: suppliers
		};
	
		return of(paymentData);
	}

	getDeliveryData(): Observable<any>  {
		const deliveryData = {
		  email:'accounting@acmesupply.com',
		  fax:'+1 (234) 456-7890'
		};
		return of(deliveryData);
	  }
}