import { Component } from '@angular/core';
import { faFileUpload } from '@wexinc/fontawesome/pro-regular-svg-icons';

import { FileUploadSteps } from './file-upload-step';
import { DynamicDialogRef } from '@wexinc/phoenix-angular-14-components';

@Component({
	selector: 'payment-file-upload-wrapper',
	templateUrl: './file-upload-dialog.component.html',
	styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent {

	fileUploadSteps = FileUploadSteps;
	step = FileUploadSteps.File_Upload; // Update based on current Step to display
	maxFileSize: number = 4096000; // byte
	faFileUpload = faFileUpload;
	fileName: string = '';

	// TODO: Remove once we get the actual results from API
	fileReviewMock = FILE_REVIEW;

	constructor(
		private dialogRef: DynamicDialogRef,
	) { }

	handleFileSelection(event: any): void {
		const file = event.files[0];
		this.fileName = file.name;

		if (file.size > this.maxFileSize) {
			// TODO show error
		} else {
			this.step = FileUploadSteps.File_Upload_Validation;
		}
	}

	uploadCompleted(): void {
		this.step = FileUploadSteps.File_Upload_Review;
	}

	cancelUpload(): void {
		this.step = FileUploadSteps.File_Upload;
	}

	closeDialog(): void {
		this.dialogRef.close();
	}
}

// TODO: Remove once we get the actual results from API
const FILE_REVIEW = {
	successfulItems: 95,
	failedItems: 5,
	failedMessages: [
		{
			record: 'Record 3',
			message: 'Valid thru date is required.'
		},
		{
			record: 'Record 9',
			message: 'Invoice amount is required.'
		},
		{
			record: 'Record 12',
			message: 'Invoice date is required.'
		},
		{
			record: 'Record 15',
			message: 'Valid thru date is required.'
		},
		{
			record: 'Record 22',
			message: 'Invoice amount is required.'
		},
	],
};