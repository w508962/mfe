import { FilterService, IFilterableColumn, PagingInfo, SavedFilterGroup, SearchAndFilterInput } from '@yeti/ui-components';
import { Observable } from 'rxjs';

export class PaymentFilterService implements FilterService<any>{

	filterableColumns: IFilterableColumn[] = [];
	savedFilters: SavedFilterGroup[] = [];

	saveFilter(savedFilterGroup: SavedFilterGroup): Observable<boolean> {
		throw new Error('Method not implemented.');
	}
	deleteFilter(savedFilterGroup: SavedFilterGroup): Observable<boolean> {
		throw new Error('Method not implemented.');
	}
	fetchSavedFiltersIfNotAlreadyFetched(): void {
		throw new Error('Method not implemented.');
	}
	getResource(pagingInfo: PagingInfo, searchAndFilterInput?: SearchAndFilterInput | undefined): Observable<any> {
		throw new Error('Method not implemented.');
	}
	getResourceSavedFilters(): Observable<SavedFilterGroup[]> {
		throw new Error('Method not implemented.');
	}

}