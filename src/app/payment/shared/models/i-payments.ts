import { PaymentMethod } from './enums/PaymentMethod';
import { PaymentStatus } from './enums/PaymentStatus';
import { Invoice } from './invoice.model';
import { UDF } from './udf';

export interface IPayment{
    uniqueId:String;
	lastActivityDate: Date;
	supplierId: Number;
	supplier: String;
	paymentMethod: PaymentMethod;
	paymentAmount: Number;
	transactionAmount: Number;
	paymentStatus: PaymentStatus;

	organisationId: Number;
	organisationName: String;
	udfList: UDF[];
	deliveryEmailID: String;
	deliveryFax: String;
	validFrom: Date;
	validThru: Date;
	mcc: String;
	invoiceList: Invoice[];
    
}

export interface IInvoice{
    invoiceAmount: Number;
    invoiceId: String;
    currency: String;
    invoiceDate: Date;
    udf: UDF;
}