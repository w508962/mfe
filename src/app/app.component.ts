import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'payment-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title='WEX - Payments';

	constructor(private titleService: Title) { }

	ngOnInit(): void {
		this.titleService.setTitle(this.title);
	}
}
