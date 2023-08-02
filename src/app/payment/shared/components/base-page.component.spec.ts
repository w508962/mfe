import {
	ComponentFixture,
	fakeAsync,
	TestBed,
} from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from '@wexinc/phoenix-angular-14-components';
import { TranslocoService, TranslocoModule } from '@ngneat/transloco';

import { BasePageComponent } from './base-page.component';

/**
 * Since BasePageComponent is an Abstract class we can't have one instance of it
 */
class TestAbstractClass extends BasePageComponent {
	constructor(router: Router) {
		super(router);
	}
}

describe('BasePageComponent', () => {
	let component: BasePageComponent;
	let fixture: ComponentFixture<BasePageComponent>;
	let router: Router;
	const obj:any = {
		privileges:{
			'CREATE_PURCHASE_LOG':'test'
		}
	};
	localStorage.setItem('WEX-accessUser',JSON.stringify(obj));
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [BasePageComponent],
			imports: [RouterTestingModule, NoopAnimationsModule, TranslocoModule],
			providers: [DialogService],
		}).compileComponents();

		router = TestBed.get(Router);

		fixture = TestBed.createComponent(TestAbstractClass);
		component = fixture.componentInstance;
		spyOn(component['router'], 'navigate');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	 it('should have specific Header data', () => {
		expect(component.headerAutoID).toBe('headertabmenu_payments_title');
		expect(component.headerTitle).toBe('Payments');

		expect(component.headerItems).toBeDefined();


		expect(component.headerButtons).toBeDefined();

	});

});
