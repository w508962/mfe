import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from '@wexinc/phoenix-angular-14-components';
import { TranslocoService } from '@ngneat/transloco';

import { FileUploadReviewComponent } from './file-upload-review.component';

describe('FileUploadReviewComponent', () => {
	let component: FileUploadReviewComponent;
	let fixture: ComponentFixture<FileUploadReviewComponent>;

	class MockTranslocoService {
		getTranslation(): any  {
			return {};
		}

		translate(): string {
			return '';
		}
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FileUploadReviewComponent],
			providers: [
				MessageService,
				{
					provide: TranslocoService,
					useClass: MockTranslocoService
				},
			]
		}).compileComponents();

		fixture = TestBed.createComponent(FileUploadReviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should get translation', () => {
		const translocoService = TestBed.inject(TranslocoService);
		const spy = spyOn(translocoService, 'getTranslation');
		component.ngOnInit();
		expect(spy).toHaveBeenCalled();
	});

	it('should cancel file upload', () => {
		const spy = spyOn(component.closeDialog, 'emit');
		component.cancel();
		expect(spy).toHaveBeenCalled();
	});

	it('should confirm file upload', () => {
		const messageService = TestBed.inject(MessageService);
		const spy = spyOn(messageService, 'add');
		component.upload();
		expect(spy).toHaveBeenCalled();
	});
});
