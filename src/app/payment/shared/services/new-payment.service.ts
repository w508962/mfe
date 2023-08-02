import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NewPayment } from '../models/new-payment.model';

@Injectable({
	providedIn: 'root'
})
export class NewPaymentService {
	public newPaymentDetail = new BehaviorSubject<NewPayment>({});
	getNewPaymentDetail = this.newPaymentDetail.asObservable();
	public currentPage = new BehaviorSubject<String>('');
	getCurrentPage = this.currentPage.asObservable();
	constructor() { }
	getPaymentCreationData(orgId: number | null): Observable<any> {
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
