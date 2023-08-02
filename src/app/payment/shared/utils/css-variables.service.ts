
export class CssVariableService {
	public static getCssVariable(variableName: string): string {
		const element = document.documentElement;
		const style = getComputedStyle(element);
		const variableValue = style.getPropertyValue(variableName);
		return variableValue.trim();
	}
}
