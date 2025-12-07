// This file is normally used for setting up analytics and other
// services that require one-time initialization on the client.

import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { init } from './core/init';
import { mockEnv } from './mockEnv';
import consola from 'consola/browser';

mockEnv().then(async () => {
	try {
		const launchParams = retrieveLaunchParams();
		const { tgWebAppPlatform: platform } = launchParams;
		const debug =
			(launchParams.tgWebAppStartParam || '').includes('debug') ||
			process.env.NODE_ENV === 'development';

		// Configure all application dependencies.
		await init({
			debug,
			eruda: debug && ['ios', 'android'].includes(platform),
			mockForMacOS: platform === 'macos',
		});
	} catch (e) {
		consola.log(e);
	}
});
