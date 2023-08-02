import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogRef } from '@wexinc/phoenix-angular-14-components';

import { FileUploadDialogComponent } from './file-upload-dialog.component';
import { FileUploadSteps } from './file-upload-step';

describe('FileUploadComponent', () => {
	let component: FileUploadDialogComponent;
	let fixture: ComponentFixture<FileUploadDialogComponent>;

	class MockDynamicDialogRef {
		close(): void  { }
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FileUploadDialogComponent],
			providers: [
				{
					provide: DynamicDialogRef,
					useClass: MockDynamicDialogRef
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FileUploadDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should select file', () => {
		const event = {
			files: [{
				size: 10000000,
				name: 'test.txt',
			}]
		};
		const file = event.files[0];
		component.handleFileSelection(event);
		expect(component.maxFileSize).toBeLessThan(file.size);
	});

	it('should set uploadStarted to true', () => {
		const event = {
			files: [{
				size: 1000,
				name: 'test.txt',
			}]
		};
		component.handleFileSelection(event);
		expect(component.step).toBe(FileUploadSteps.File_Upload_Validation);
	});

	it('#fxn cancelUpload should set uploadStarted to false', () => {
		component.step = FileUploadSteps.File_Upload_Validation;
		component.cancelUpload();
		expect(component.step).toBe(FileUploadSteps.File_Upload);
	});

	it('should change step on upload complete', () => {
		component.uploadCompleted();
		expect(component.step).toBe(FileUploadSteps.File_Upload_Review);
	});

	it('should close dialog', () => {
		const dynamicDialogRef = TestBed.inject(DynamicDialogRef);
		const spy = spyOn(dynamicDialogRef, 'close');
		component.closeDialog();
		expect(spy).toHaveBeenCalled();
	});
});
