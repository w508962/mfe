import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { IOrganizationGroup } from '@yeti/models';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { selectUserOrgGroup } from 'src/app/+state/auth.selector';
import { NewPaymentService } from 'src/app/payment/shared/services/new-payment.service';
import { PaymentsService } from 'src/app/payment/shared/services/payments.service';



@Component({
	selector: 'payment-payment-details',
	templateUrl: './payment-details.component.html',
	styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {

	paymentDetailsForm!: FormGroup;
	translocoData: any;
	userOrgGroup: IOrganizationGroup | null = null;
	userOrgGroupSubscription!: Subscription;
	userOrgGroup$ = this.store.select(selectUserOrgGroup);
	suppliers!: any[];
	paymentData!:any ;
	userHasMultipleOrgs!: boolean;
	minDate: any;
	effectiveMinDate!: Date;
	selectedSupplierName!:any;
	selectedEmail!:string[];
	deliveryData = '';
	selectedFax:any;
	faxSpecial: RegExp = /^[0-9+]+$/;
	private valueChangesSub: Subscription = Subscription.EMPTY;
	@Output() firstStepComplete: EventEmitter<any> = new EventEmitter();
	@Input() existingFormValues: any;
	constructor(private service: TranslocoService, private store: Store, public changeDetector: ChangeDetectorRef,
    private newPaymentService: NewPaymentService , private paymentServiceObj:PaymentsService) {
		this.minDate = moment().toDate();
		this.effectiveMinDate = moment().add(1, 'days').toDate();
		this.paymentDetailsForm = new FormGroup(
			{
				organizationId: new FormControl<number | null>(null),
				selectedSupplierName: new FormControl('', [Validators.required]),
				validFrom: new FormControl(this.minDate, [Validators.required]),
				validThru: new FormControl('', [Validators.required]),
				mccField: new FormControl(''),    
				selectedEmail: new FormControl(''),
				selectedFax: new FormControl(''),                                                                                                                                                                                            
			}
		);
	}

	ngOnInit(): void {

		this.updateDefaultPaymentsForm();
		this.service.load('en').subscribe((response) => {
			this.translocoData = response;
		});
		this.subscribeToUserOrgGroup();
		this.subscribeToFormValueChanges();
		this.existingFormValues;
		this.populateExistingFormValues(this.existingFormValues);
	}
	public subscribeToUserOrgGroup(): void {
		this.userOrgGroupSubscription = this.userOrgGroup$?.subscribe((userOrgGroup) => {
			this.userOrgGroup = userOrgGroup;
			this.userHasMultipleOrgs = (this.userOrgGroup?.organizations?.length ?? 0) > 1;
			const orgId = this.getDefaultOrganizationId();
			this.newPaymentService.getPaymentCreationData(orgId).subscribe(data => {
				this.suppliers = data.suppliers;
				this.paymentData = data.mcc;
				this.paymentDetailsForm.controls['mccField'].setValue(this.paymentData);
			});
			this.changeDetector.detectChanges();
		});
	}
	public getDefaultOrganizationId(): number | null {
		if (this.userOrgGroup?.currentOrg) {
			return this.userOrgGroup.currentOrg.id;
		}
		return this.userOrgGroup?.organizations![0].id ?? null;
	}
	organizationChanged(event: any) {
		// TODO need to enable following code once after we receive data from BFF.
		// this.paymentServiceObj.getSupplierListByOrgId(event.value).subscribe(suppliers =>{
		// 	this.suppliers = suppliers.data;
		// });
		this.newPaymentService.getPaymentCreationData(event.value).subscribe(data => {
			this.suppliers = data.suppliers;
			this.paymentData = data.mcc;
			this.paymentDetailsForm.controls['mccField'].setValue(this.paymentData);
			this.changeDetector.detectChanges();
		});
	}
	checkIsValid(): boolean {
  	return this.paymentDetailsForm.controls['validThru'].value == '' ||
			this.paymentDetailsForm.controls['validThru'].value == null;
	}
	updateDefaultPaymentsForm() {
  	const transactionExpirationDays = 2;
  	const transactionExpirationDate = new Date(new Date().getTime() + transactionExpirationDays * 24 * 60 * 60 * 1000);
  	this.paymentDetailsForm.patchValue({
  		validThru: transactionExpirationDate,
  	});
	}
	updateValidThruDate(event: Date): void {
  	if (event) {
  		const validThru = new Date(event);
			const transactionExpirationDate = 3;
  		validThru.setDate(validThru.getDate() + transactionExpirationDate);
  		this.paymentDetailsForm.controls['validThru'].setValue(validThru);
  	}
    
	}
	selectSupplierName(event:any){
		this.newPaymentService.getDeliveryData().subscribe(data => {
			this.deliveryData = data.email;
			this.selectedFax = data.fax;
			this.selectedEmail = this.deliveryData.split(';');
			this.changeDetector.detectChanges();
		});
	}
	private subscribeToFormValueChanges() {
		this.valueChangesSub = this.paymentDetailsForm.valueChanges.subscribe(() => {
			this.firstStepComplete.emit(this.paymentDetailsForm);
		});
	}
	populateExistingFormValues(formValue: any) {
		if(this.paymentDetailsForm && formValue) {
			this.paymentDetailsForm.patchValue({
				organizationId: formValue.organizationId,
			});
			this.paymentDetailsForm.patchValue({
				selectedSupplierName: formValue.selectedSupplierName,
			});
			this.paymentDetailsForm.patchValue({
				validFrom: new Date(formValue.validFrom),
			});
			this.paymentDetailsForm.patchValue({
				validThru: new Date(formValue.validThru),
			});
			this.paymentDetailsForm.patchValue({
				mccField: formValue.mccField,
			});
			this.paymentDetailsForm.patchValue({
				selectedEmail: formValue.selectedEmail,
			});
			this.paymentDetailsForm.patchValue({
				selectedFax: formValue.selectedFax,
			});
		}
	}
	ngOnDestroy(): void {
		this.valueChangesSub.unsubscribe();
	}
}
