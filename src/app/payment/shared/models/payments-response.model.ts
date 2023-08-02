import { Payment } from './payment.model';

export class PaymentsResponse {
	payments!: PaymentsData;
}
export class PaymentsData {
	data!:Payment[];
	error!:any;
	hasErrors!: Boolean;
}