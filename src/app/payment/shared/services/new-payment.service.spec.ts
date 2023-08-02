import { TestBed, inject } from '@angular/core/testing';

import { NewPaymentService } from './new-payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('NewPaymentService', () => {
	let service: NewPaymentService;
	const mockSuppliers = [
		{ supplierName: 'New supplier', id: 1 },
		{ supplierName: 'Acme Supply Co', id: 2 },
		{ supplierName: 'Hudson Manufacturing', id: 3 },
		{ supplierName: 'Keebler Group', id: 4 },
		{ supplierName: 'Schultz Inc', id: 5 },
		{ supplierName: 'Wex Inc', id: 6 },
		{ supplierName: 'Old supplier', id: 7 },
		{ supplierName: 'Supplier Wex', id: 8 }
	  ];
	const mockPaymentData = {
		mcc: '1234',
		suppliers: mockSuppliers,
	  };

	  const mockDeliveryData = {
		email: 'accounting@acmesupply.com',
		fax: '+1 (234) 456-7890',
	  };
	  
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [NewPaymentService],
		});
		service = TestBed.inject(NewPaymentService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get payment creation data', (done: DoneFn) => {
		const orgId = 1; // Replace with your desired orgId
	
		service.getPaymentCreationData(orgId).subscribe((data: any) => {
		  expect(data).toEqual(mockPaymentData);
		  done();
		});
	  });

	  it('should get delivery data', (done: DoneFn) => {
		service.getDeliveryData().subscribe((data: any) => {
		  expect(data).toEqual(mockDeliveryData);
		  done();
		});
	  });
	
});
