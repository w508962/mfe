import { TestBed } from '@angular/core/testing';

import { PaymentsService } from './payments.service';
import { SimpleGraphqlService } from '@yeti/service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { YetiEnvironmentModule } from '@yeti/environment';
import environmentVariables from '../../../../environments/.env.json';
describe('PaymentsService', () => {
	let service: PaymentsService;

	beforeEach(async() => {
		await TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ,YetiEnvironmentModule.forRoot({
				environmentVariables
			}),],
			providers:[SimpleGraphqlService,HttpClient,]
		});
		service = TestBed.inject(PaymentsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
