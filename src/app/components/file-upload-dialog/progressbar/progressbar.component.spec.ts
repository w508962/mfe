import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progressbar.component';

describe('ProgressbarComponent', () => {
	let component: ProgressBarComponent;
	let fixture: ComponentFixture<ProgressBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ProgressBarComponent ]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ProgressBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call upload timeout', () => {
		component.ngOnInit();
		expect(component.uploadTimeout).toBeDefined();
	});

	it('should cancel upload', () => {
		const spy = spyOn(component.uploadCancelled, 'emit');
		component.cancelUpload();
		expect(spy).toHaveBeenCalled();
	});
});
