import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SimpleGraphqlService } from '@yeti/service';
import { YetiEnvironmentVariables } from '@yeti/environment';
import { GET_PAYMENTS, GET_SUPPLIERS_BY_ORG } from '../../../../graphql/graphql.queries';
import { PaymentsResponse } from '../models/payments-response.model';
@Injectable({
	providedIn: 'root'
})
export class PaymentsService {

	constructor(  private graphQlClient: SimpleGraphqlService,
		private envVars: YetiEnvironmentVariables) { }

	/**
	 * To get payments table data based on organisation ID
	 * @param orgId 
	 * @returns 
	 */
	getPaymentsData(orgId:number):Observable<PaymentsResponse>{
		return this.graphQlClient
			.query<any>(
				this.envVars.getVariable('paymentsBffUrl'),
				GET_PAYMENTS,
				{
					id: orgId
				}
			);
	}
	/**
	 * To get list of suppliers based on given organisation ID
	 * @param orgId 
	 * @returns 
	 */
	getSupplierListByOrgId(orgId:number):Observable<any>{
		return this.graphQlClient
			.query<any>(
				this.envVars.getVariable('paymentsBffUrl'),
				GET_SUPPLIERS_BY_ORG,
				{
					organizationId: orgId
				}
			);
	}
}
