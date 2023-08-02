import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
	let component: FileUploadComponent;
	let fixture: ComponentFixture<FileUploadComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FileUploadComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(FileUploadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit event when file is selected', () => {
		spyOn(component.fileSelected, 'emit');
		const event = {
			files: [{
				size: 4096000,
				name: 'test.txt',
			}]
		};
		component.onSelect(event);
		expect(component.fileSelected.emit).toHaveBeenCalled();
	});
});
