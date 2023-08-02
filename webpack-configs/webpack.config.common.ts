import { Configuration, container } from 'webpack';

const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../tsconfig.json'), [
	/* mapped paths to share */
]);

const webpackConfig: Configuration = {
	output: {
		uniqueName: 'mod_payment',
		publicPath: 'auto',
	},
	resolve: {
		alias: {
			...sharedMappings.getAliases(),
		},
	},
	experiments: {
		outputModule: true,
	},
	optimization: {
		runtimeChunk: false,
	},
	plugins: [
		new container.ModuleFederationPlugin({
			name: 'mod_payment',
			filename: 'remoteEntry.js',
			library: { type: 'module' },
			exposes: {
				'./PaymentsModule': './src/app/payment/payment.module.ts',
			},
			shared: {
				'@angular/animations': {
					singleton: true,
					strictVersion: true,
				},
				'@angular/cdk': {
					singleton: true,
					strictVersion: true,
				},
				'@angular/common': {
					singleton: true,
					strictVersion: true,
				},
				'@angular/compiler': {
					singleton: true,
					strictVersion: true,
				},
				'@angular/core': {
					singleton: true,
					strictVersion: true,
				},
				'@angular/forms': {
					singleton: true,
					strictVersion: true,
				},
				'@angular/router': {
					singleton: true,
					strictVersion: true,
				},
				'@apollo/client': {
					singleton: true,
					strictVersion: true,
				},
				'@ngneat/transloco': {
					singleton: true,
					strictVersion: true,
				},
				'@ngrx/effects': {
					singleton: true,
				},
				'@ngrx/store': {
					singleton: true,
				},
				'apollo-angular': {
					singleton: true,
				},
				'@angular/common/http': {
					singleton: true,
					strictVersion: true,
				},
				'@wexinc/fontawesome/*': {
					singleton: true,
					strictVersion: true,
				},
				'@yeti/service': {
					singleton: true,
				},
				'@yeti/environment': {
					singleton: true,
				},
				graphql: {
					singleton: true,
				},
				...sharedMappings.getDescriptors(),
			},
		}),
		sharedMappings.getPlugin(),
	],
};

export default webpackConfig;
