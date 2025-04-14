import { init as initSDK, initData, miniApp, mountBackButton, setDebug, themeParams, viewport, } from '@telegram-apps/sdk-react';


/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
	// Set @telegram-apps/sdk-react debug mode.
	setDebug(debug);

	// Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
	// Also, configure the package.
	initSDK();

	// Mount all components used in the project.

	mountBackButton.ifAvailable()

	if (!miniApp.isMounted()) {
		miniApp.mountSync();
		miniApp.bindCssVars();
		themeParams.bindCssVars();
	}

	if (!themeParams.isMounted()) {
		themeParams.mountSync();
	}

	initData.restore();

	if (!viewport.isMounting() && !viewport.isMounted()) {
		void viewport.mount()
			.then(() => {
				viewport.bindCssVars();
			})
			.catch(e => {
				console.error('Something went wrong mounting the viewport', e);
			});
	}


	// Add Eruda if needed.
	if (debug) {
		import('eruda')
			.then((lib) => lib.default.init())
			.catch(console.error);
	}
}
