import { CssVariableService } from './css-variables.service';

describe('CssVariableUtil', () => {

	it('should read the value of a CSS variable correctly', () => {

		document.documentElement.style.setProperty('--phoenix-base-color-slate-blue-70', 'red');

		const cssVariableValue = CssVariableService.getCssVariable('--phoenix-base-color-slate-blue-70');

		expect(cssVariableValue).toBe('red');
	});

	it('should return an empty string if the CSS variable is not defined', () => {
		const cssVariableValue = CssVariableService.getCssVariable('--NON_EXISTING_VARIABLE');

		expect(cssVariableValue).toBe('');
	});
});