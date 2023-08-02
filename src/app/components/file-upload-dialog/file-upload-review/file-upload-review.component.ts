import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { faCircleCheck, faEye, faEyeSlash, faTriangleExclamation } from '@wexinc/fontawesome/pro-regular-svg-icons';

import { MessageService } from '@wexinc/phoenix-angular-14-components';

@Component({
	selector: 'payment-file-upload-review',
	templateUrl: './file-upload-review.component.html',
	styleUrls: ['./file-upload-review.component.scss']
})
export class FileUploadReviewComponent implements OnInit {

	@Input() fileName = '';
	@Input() totalSuccessfulItems = 0;
	@Input() totalFailedItems = 0;
	@Input() failedMessages: { record: string, message: string }[] = [];
	@Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
	faCircleCheck = faCircleCheck;
	faTriangleExclamation = faTriangleExclamation;
	faEye = faEye;
	faEyeSlash = faEyeSlash;
	translocoData: any;
	errorsVisible = false;

	constructor(
		private messageService: MessageService,
		private translocoService: TranslocoService,
	) { }

	ngOnInit(): void {
		this.translocoData = this.translocoService.getTranslation('en');
	}

	cancel(): void {
		this.closeDialog.emit();
	}

	upload(): void {
		this.messageService.add({
			key: 'payments-notification',
			severity: 'success',
			summary: this.translocoData['toastheader'],
			detail: this.translocoService.translate('paymentUploadSuccess', { fileName: this.fileName, count: this.totalSuccessfulItems }),
		});
		// this.messageService.add({
		// 	key: 'payments-notification',
		// 	severity: 'error',
		// 	summary: this.translocoData['failed'],
		// 	detail: this.translocoService.translate('paymentUploadFailed', { fileName: this.fileName }),
		// });
		this.closeDialog.emit();
	}
}
