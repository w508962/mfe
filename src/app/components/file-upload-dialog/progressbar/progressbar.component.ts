import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFileExcel, faTimes } from '@wexinc/fontawesome/pro-regular-svg-icons';

@Component({
	selector: 'payment-upload-progressbar',
	templateUrl: './progressbar.component.html',
	styleUrls: ['./progressbar.component.scss']
})
export class ProgressBarComponent implements OnInit {

	faFileExcel = faFileExcel;
	faTimes = faTimes;
	value: number = 10;
	uploadTimeout: any; // TODO: Remove. Only used for testing purposes

	@Output() uploadCancelled: EventEmitter<void> = new EventEmitter<void>();
	@Output() uploadCompleted: EventEmitter<void> = new EventEmitter<void>();
	@Input() fileName: string = '';

	ngOnInit(): void {
		this.uploadTimeout = setTimeout(() => {
			this.uploadCompleted.emit();
		}, 5000);
	}

	cancelUpload(): void {
		if (this.uploadTimeout) {
			clearTimeout(this.uploadTimeout);
		}
		this.uploadCancelled.emit();
	}
}
