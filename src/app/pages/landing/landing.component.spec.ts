import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogService} from '@wexinc/phoenix-angular-14-components';

import { LandingComponent } from './landing.component';
import { HeaderButtonModel} from '@yeti/ui-components';
import { PaymentsService } from 'src/app/payment/shared/services/payments.service';
import { SimpleGraphqlService } from '@yeti/service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import environmentVariables from '../../../environments/.env.json';
import { YetiEnvironmentModule } from '@yeti/environment';
import { IOrganization, IOrganizationGroup } from '@yeti/models';
import { PaymentsResponse } from 'src/app/payment/shared/models/payments-response.model';
import { PaymentMethod } from 'src/app/payment/shared/models/enums/PaymentMethod';
import { PaymentStatus } from 'src/app/payment/shared/models/enums/PaymentStatus';
const singleOrgGroup: IOrganizationGroup = {
	id: 235496,
	name: 'My Org',
	organizations: [
		{
			id: 30619,
			name: 'My org'
		} as IOrganization
	]
} as IOrganizationGroup;
class MockPaymentService {
	getPaymentsData():Observable<PaymentsResponse>{
		return of(<PaymentsResponse>{payments:{}});
	}
}
describe('LandingComponent', () => {
	let component: LandingComponent;
	let fixture: ComponentFixture<LandingComponent>;
	let storeSpy = jasmine.createSpyObj<Store>('Store', ['dispatch', 'select']);
	//storeSpy.select.and.returnValue(of(singleOrgGroup));
	let paymentService: PaymentsService; 
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				TranslocoModule, HttpClientTestingModule,YetiEnvironmentModule.forRoot({
					environmentVariables
				}), ],
			declarations: [ LandingComponent ],
			providers: [
				DialogService,
				{ provide: Store, useValue: storeSpy },HttpClient,
				SimpleGraphqlService,
				{provide:PaymentsService, MockPaymentService}
			]
		})
			.compileComponents();

		fixture = TestBed.createComponent(LandingComponent);
		component = fixture.componentInstance;		
		paymentService = TestBed.inject(PaymentsService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should call ngOnInit', () => {
		const mockData: PaymentsResponse = { payments: { data: [{ paymentMethod: PaymentMethod.MULTI_USE_CARD, 
			uniqueId: '', 
			paymentAmount: 123, 
			lastActivityDate: new Date(),
			 paymentStatus: PaymentStatus.CANCELLED,
			  transactionAmount: 122, 
			  supplier: 'ABS' ,
			deliveryEmailID:'',
			deliveryFax:'',
			invoiceList:[],
			mcc:'',
			organisationId:0,
			organisationName:'',
			supplierId:0,
			udfList:[],
			validFrom: new Date(),
			validThru: new Date()

		}
		],error:{},hasErrors:false } };
		spyOn(paymentService, 'getPaymentsData').and.returnValue(of(mockData));
		component.ngOnInit();
	});

	it('should open file upload dialog', () => {
		const dialogService = TestBed.inject(DialogService);
		component.uploadFile();
	});
	it('should set isKebabClickTrue to true', () => {
		expect(component.isKebabClickTrue).toBe(false);
		component.rowKebabClick();
		expect(component.isKebabClickTrue).toBe(true);
	  });
	  it('should trigger click and closePanel when "Escape" key is pressed', () => {
		const el = jasmine.createSpyObj('HTMLElement', ['click']);
		component.rowActionMenu = { nativeElement: el };
		const tableWithDetailsPanel = jasmine.createSpyObj('TableWithDetailsPanel', ['closePanel']);
		component.tableWithDetailsPanel = tableWithDetailsPanel;
		component.isKebabClickTrue = true;
		const mockEscapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
		component.keyEvent(mockEscapeEvent);
		expect(el.click).toHaveBeenCalled();
		expect(tableWithDetailsPanel.closePanel).toHaveBeenCalled();
	  });
	

	it('should call uploadFile when the first button is clicked', () => {
		const headerButton: HeaderButtonModel = { desc: '', autoid:''};
		component.headerButtons = [headerButton,];
		spyOn(component, 'uploadFile');
		component.buttonClickedEvent(headerButton);
		expect(component.uploadFile).toHaveBeenCalled();
	  });

	  it('should call openPaymentWorkspace when the second button is clicked', () => {
		const headerButtons: HeaderButtonModel[] = [
		];
		component.headerButtons = headerButtons;
		spyOn(component, 'openPaymentWorkspace');
		component.buttonClickedEvent(headerButtons[1]);
		expect(component.openPaymentWorkspace).toHaveBeenCalled();
	  });

	  it('should close the ref when Escape key is pressed and isOpenWorkSpace is true', () => {
		component.isOpenWorkSpace = true;
		const event = new KeyboardEvent('keydown', { key: 'Escape' });
		document.dispatchEvent(event);
		expect(component.ref.close).toBeTruthy();
		expect(component.isOpenWorkSpace).toBeFalse();
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
	  it('should set data and isLoading to false when API call is successful with data', () => {
		const orgId = 123;
		const mockData: PaymentsResponse = { payments: { data: [{ paymentMethod: PaymentMethod.MULTI_USE_CARD, 
			uniqueId: '', 
			paymentAmount: 123, 
			lastActivityDate: new Date(),
			 paymentStatus: PaymentStatus.CANCELLED,
			  transactionAmount: 122, 
			  supplier: 'ABS' ,
			deliveryEmailID:'',
			deliveryFax:'',
			invoiceList:[],
			mcc:'',
			organisationId:0,
			organisationName:'',
			supplierId:0,
			udfList:[],
			validFrom: new Date(),
			validThru: new Date()

		}
		],error:{},hasErrors:false } };
		// Mock the paymentService and its getPaymentsData method
		spyOn(paymentService, 'getPaymentsData').and.returnValue(of(mockData));
	  
		component.getPaymentsData(orgId);
	  
		expect(component.data).toEqual(mockData.payments.data);
		expect(component.isloading).toBeFalse();
	  });

	 it('should return current org id', () => {
		component.userOrgGroup = {
			id: 1, name: 'string',
			bankNumber: 1,
			companyNumber: 1,
			groupLoginId: 'string',
			assignedCompaniesCount: 1,
			assignedOrganizationsCount: 1,
			organizations: [{
				id: 234, name: '', bankNumber: 22,
				companyNumber: 22,
				isSelected: true,
				effectiveOrganizationGroupId: 2,
				effectiveOrganizationGroupLoginId: '123'
			}],
			isSelected: true
		};
	  const orgId=component.getDefaultOrganizationId();
	  expect(orgId).toEqual(234);
	});

	
});
