import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@wexinc/fontawesome/angular-fontawesome';
import { FileUploadModule } from '@wexinc/phoenix-angular-14-components';
import { TranslocoModule } from '@ngneat/transloco';

import { FileUploadDialogComponent } from './file-upload-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ProgressBarComponent } from './progressbar/progressbar.component';
import { FileUploadReviewComponent } from './file-upload-review/file-upload-review.component';

@NgModule({
	declarations: [
		FileUploadDialogComponent,
		FileUploadComponent,
		ProgressBarComponent,
		FileUploadReviewComponent,
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		FileUploadModule,
		TranslocoModule,
	],
})

export class FileUploadDialogModule { }
