import { PaymentMethod } from './enums/PaymentMethod';
import { PaymentStatus } from './enums/PaymentStatus';
import { IPayment } from './i-payments';
import { Invoice } from './invoice.model';
import { UDF } from './udf';

export class Payment implements IPayment{
	uniqueId!:String;
	lastActivityDate!: Date;
	supplierId!: Number;
	supplier!: String;
	paymentMethod!: PaymentMethod;
	paymentAmount!: Number;
	transactionAmount!: Number;
	paymentStatus!: PaymentStatus;

	organisationId!: Number;
	organisationName!: String;
	udfList!: UDF[];
	deliveryEmailID!: String;
	deliveryFax!: String;
	validFrom!: Date;
	validThru!: Date;
	mcc!: String;
	invoiceList!: Invoice[];

}
