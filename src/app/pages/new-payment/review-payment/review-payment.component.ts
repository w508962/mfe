import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'payment-review-payment',
	templateUrl: './review-payment.component.html',
	styleUrls: ['./review-payment.component.scss']
})
export class ReviewPaymentComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		console.log('Review');
	}

}
