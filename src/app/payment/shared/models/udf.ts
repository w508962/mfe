import { AbstractPojo } from '@yeti/models';

export class UDF  extends AbstractPojo<UDF>{
	label!: string;
	required!: string;
	datatype!: string;
	options!:string;
}