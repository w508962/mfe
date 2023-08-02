import { Configuration } from 'webpack';
import common from './webpack.config.common';

const prodConfig: Configuration = { ...common };

export default prodConfig;
