import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'payment-invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		console.log('Invoice');
	}

}
