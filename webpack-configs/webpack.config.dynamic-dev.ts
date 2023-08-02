import { Configuration } from 'webpack';
import common from './webpack.config.common';

const dynamicDevConfig: Configuration = {
	...common, 
	output: {
		uniqueName: 'mod_payment',
		publicPath: 'auto'
	}
};

export default dynamicDevConfig;