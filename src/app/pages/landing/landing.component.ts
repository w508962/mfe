import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { HeaderButtonModel } from '@yeti/ui-components';
import { PaymentsService } from 'src/app/payment/shared/services/payments.service';
import { TableWithDetailsPanelComponent } from '@wexinc/phoenix-marketplace-angular-14-components';
import { BasePageComponent } from '../../payment/shared/components/base-page.component';
import {
	DialogService,
	DynamicDialogRef,
	MenuItem
} from '@wexinc/phoenix-angular-14-components';
import { NewPaymentComponent } from '../new-payment/new-payment.component';
import { IOrganizationGroup } from '@yeti/models';
import { selectUserOrgGroup } from 'src/app/+state/auth.selector';
import { Store } from '@ngrx/store';
import { Payment } from 'src/app/payment/shared/models/payment.model';
import { FileUploadDialogComponent } from '../../components/file-upload-dialog/file-upload-dialog.component';

@Component({
	selector: 'payment-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent extends BasePageComponent implements OnInit {
	// user org related code
	userOrgGroup: IOrganizationGroup | null = null;
	userOrgGroup$ = this.store.select(selectUserOrgGroup);
	userHasMultipleOrgs!: boolean;

	widgetImage: string = '';
	displaydata: any;
	widgetDesc: string = '';
	widgetTitle: string = '';
	widgetButton: string = '';
	widgetButtonIcon: string = '';
	widgetButtonRoute: string = '';
	widgetPage: string = 'payments';
	widgetDescClass: string = 'empty-page-desc';
	isloading: boolean = true;
	isTableLoading :boolean = false;
	isOverlayPanel: boolean = false;
	isEmptyResults: boolean = false;
	isErrorButton :boolean = false;
	rowActions:any = [];
	data:Payment[]=[];
	closeTieredMenu: boolean = false;
	panelMenuActions:any = [];
	items: MenuItem[] = [];
	isKebabClickTrue:boolean =false;

	@ViewChild('rowActionMenu', { read: ElementRef })
		rowActionMenu!: ElementRef<HTMLElement>;
	@ViewChild(TableWithDetailsPanelComponent)
		tableWithDetailsPanel!: TableWithDetailsPanelComponent;

	ref: DynamicDialogRef = new DynamicDialogRef();
	isOpenWorkSpace:boolean = false;

	constructor(
		private translocoService: TranslocoService,
		router: Router,
		private store: Store,
		private dialogService:DialogService,
		private paymentService: PaymentsService,
	) {
		super(router);
	}
	@HostListener('document:keydown', ['$event'])
	keyEvent(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if(this.isOpenWorkSpace){
				this.isOpenWorkSpace=false;
			}
			const el: HTMLElement = this.rowActionMenu && this.rowActionMenu.nativeElement;
			if (this.rowActionMenu) {
				if (this.isKebabClickTrue) {
				}
				el.click();
				this.tableWithDetailsPanel?.closePanel();
			}
		}	
	}


	ngOnInit(): void {
		this.displaydata = this.translocoService.getTranslation('en');
		this.widgetImage = 'assets/images/Transaction.png';
		this.widgetDesc = this.displaydata.transactionsDesc;
		this.widgetTitle = this.displaydata.dashboardTitle;
		this.isEmptyResults = this.data.length > 0 ? true : false;
		this.userOrgGroup$?.subscribe((userOrgGroup) => {
			this.userOrgGroup = userOrgGroup;
			this.userHasMultipleOrgs = (this.userOrgGroup?.organizations?.length ?? 0) > 1;
			const orgId = this.getDefaultOrganizationId();
			if(orgId) {
				this.getPaymentsData(orgId);
			} else {
				this.data=[];
			}
			
		});
		
		this.items = [
			{
				label: this.displaydata.details,
				icon: 'fa-regular fa-eye',
				styleClass: 'details-menu'
				
			},{
				label: this.displaydata.resend,
				icon: 'fa-regular fa-arrow-rotate-right',
				styleClass: 'details-menu'
				
			},
			{
				label: this.displaydata.status,
				icon: 'fa-regular fa-tag',
				styleClass: 'details-menu'
				
			}
		];
	}
	getPaymentsData(orgId:number){
		 this.paymentService.getPaymentsData(orgId).subscribe(response =>{
			if(response.payments.data) {
				this.data= response.payments.data;
				this.isloading=false;
			}
		 });
	}
	public getDefaultOrganizationId(): number | null {
		if (this.userOrgGroup?.currentOrg) {
			return this.userOrgGroup.currentOrg.id;
		}
		return this.userOrgGroup?.organizations![0].id ?? null;
	}
	rowKebabClick(){
		this.isKebabClickTrue = true;
	}
	
	buttonClickedEvent(button: HeaderButtonModel): void {
		if (this.headerButtons[0] == button) {
			this.uploadFile();
		}
		if(this.headerButtons[1] == button) {
			this.openPaymentWorkspace();
		}
	}

	openPaymentWorkspace():void {
		const height = window.innerHeight - 24 + 'px';
		this.ref = new DynamicDialogRef();
		this.isOpenWorkSpace = true;
		this.ref = this.dialogService?.open(NewPaymentComponent, {
			header: '',
			width: '1392px',
			height: height,
			contentStyle: { overflow: 'auto' },
			baseZIndex: 10000,
			footer: '',
			closeOnEscape: true,
		});
	}

	uploadFile(): void {
		this.ref = this.dialogService?.open(FileUploadDialogComponent, {
			header: this.displaydata.fileUpload,
			resizable: false,
			showHeader: true,
			dismissableMask: true,
			styleClass: 'file-upload-dialog',
		});
	}
}
