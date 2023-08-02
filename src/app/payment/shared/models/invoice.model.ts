import { IInvoice } from './i-payments';
import { UDF } from './udf';

export class Invoice implements IInvoice{
	invoiceAmount!: Number;
	invoiceId!: String;
	currency!: String;
	invoiceDate!: Date;
	udf!: UDF;
}