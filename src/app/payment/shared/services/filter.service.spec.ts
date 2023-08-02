import { PaymentFilterService } from './filter.service'; // Import the class to be tested
import { FilterService, IFilterableColumn, PagingInfo, SavedFilterGroup, SearchAndFilterInput } from '@yeti/ui-components';
import { Observable } from 'rxjs';

describe('PaymentFilterService', () => {
	let service: PaymentFilterService;
	const savedFilterGroup: SavedFilterGroup = {
		id: undefined,
		name: 'One Filter',
		filterGroup: {
			operator: 'AND',
			filters: [
				{
					stringFieldFilter: {
						fieldName: 'LastFour',
						operator: 'EQUAL',
						value: '2345'
					}
				},
			]
		}
	};

	beforeEach(() => {
		service = new PaymentFilterService();
	});

	it('should throw "Method not implemented." when calling saveFilter()', () => {
		expect(() => service.saveFilter(savedFilterGroup)).toThrowError('Method not implemented.');
	});

	it('should throw "Method not implemented." when calling deleteFilter()', () => {
		expect(() => service.deleteFilter(savedFilterGroup)).toThrowError('Method not implemented.');
	});

	it('should throw "Method not implemented." when calling fetchSavedFiltersIfNotAlreadyFetched()', () => {
		expect(() => service.fetchSavedFiltersIfNotAlreadyFetched()).toThrowError('Method not implemented.');
	});

	it('should throw "Method not implemented." when calling getResourceSavedFilters()', () => {
		expect(() => service.getResourceSavedFilters()).toThrowError('Method not implemented.');
	});

	it('should throw "Method not implemented." when calling getResource()', () => {
		const pagingInfo = { page: 1, pageSize: 10 } as any;
		const searchAndFilterInput = { keyword: 'test', filter: { category: 'example' } } as any;
		expect(() => service.getResource(pagingInfo,searchAndFilterInput)).toThrowError('Method not implemented.');
	});
});
