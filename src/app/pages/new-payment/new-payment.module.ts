import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPaymentComponent } from './new-payment.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { ReviewPaymentComponent } from './review-payment/review-payment.component';
import { NewPaymentService } from 'src/app/payment/shared/services/new-payment.service';
import { FontAwesomeModule } from '@wexinc/fontawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ChipsModule, ProgressSpinnerModule } from '@wexinc/phoenix-angular-14-components';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaymentsService } from 'src/app/payment/shared/services/payments.service';


@NgModule({
	declarations: [
		NewPaymentComponent,
		PaymentDetailsComponent,
		InvoiceDetailsComponent,
		ReviewPaymentComponent
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		DropdownModule,
		TagModule,
    	MessagesModule,
		ConfirmDialogModule,
		FontAwesomeModule,
		CardModule,
		CalendarModule,
		DropdownModule,
		FormsModule,
		ReactiveFormsModule,
		InputNumberModule,
		InputTextModule,
		KeyFilterModule,
		ProgressSpinnerModule,
		ChipsModule
	],
	providers: [NewPaymentService , PaymentsService]
})
export class NewPaymentModule { }
