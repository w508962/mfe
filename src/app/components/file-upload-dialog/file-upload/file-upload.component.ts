import { Component, EventEmitter, Output } from '@angular/core';
import { faFileUpload } from '@wexinc/fontawesome/pro-regular-svg-icons';

@Component({
	selector: 'payment-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

	@Output() fileSelected: EventEmitter<any> = new EventEmitter<any>();

	faFileUpload = faFileUpload;
	uploadStarted: boolean = false;
	maxFileSize = 4096000; // byte
	acceptedFileTypes = ['.csv', '.dat', '.eft', '.xlsx', '.xml', '.fdf', '.file', '.gpg', '.pgp', '.txt'];

	onSelect(event: any): void {
		const file = event.files[0];
		if (file.size <= this.maxFileSize &&
			this.acceptedFileTypes.includes(file.name.toLowerCase().substring(file.name.toLowerCase().lastIndexOf('.')))
		) {
			this.fileSelected.emit(event);
		}
	}
}
