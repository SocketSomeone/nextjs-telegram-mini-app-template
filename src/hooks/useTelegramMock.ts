import { useClientOnce } from '@/hooks/useClientOnce';
import { isTMA, mockTelegramEnv, retrieveLaunchParams, retrieveRawInitData, } from '@telegram-apps/sdk-react';

/**
 * Mocks Telegram environment in development mode.
 */
export function useTelegramMock(): void {
	useClientOnce(async () => {
		if (!sessionStorage.getItem('env-mocked') && isTMA()) {
			return;
		}

		// Determine which launch params should be applied. We could already
		// apply them previously, or they may be specified on purpose using the
		// default launch parameters transmission method.
		let themeParams: string | undefined;
		let initDataRaw: string | undefined;
		try {
			const launchParams = retrieveLaunchParams();
			themeParams = JSON.stringify(launchParams.tgWebAppThemeParams);
			initDataRaw = retrieveRawInitData();
		} catch (e) {
			console.error('Failed to retrieve launch parameters:', e);
			const initDataRawMock = new URLSearchParams([
				[
					'user',
					JSON.stringify({
						id: 99281932,
						first_name: 'Andrew',
						last_name: 'Rogue',
						username: 'rogue',
						language_code: 'en',
						is_premium: true,
						allows_write_to_pm: true,
					}),
				],
				['auth_date', (new Date().getTime() / 1000 | 0).toString()],
				[
					'signature',
					'6fbdaab833d39f54518bd5c3eb3f511d035e68cb',
				],
				[
					'hash',
					'89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
				],
				['start_param', 'debug'],
				['chat_type', 'sender'],
				['chat_instance', '8428209589180549439'],
			]).toString();

			const themeParamsMock = {
				accent_text_color: '#6ab2f2',
				bg_color: '#17212b',
				button_color: '#5288c1',
				button_text_color: '#ffffff',
				destructive_text_color: '#ec3942',
				header_bg_color: '#17212b',
				hint_color: '#708499',
				link_color: '#6ab3f3',
				secondary_bg_color: '#232e3c',
				section_bg_color: '#17212b',
				section_header_text_color: '#6ab3f3',
				subtitle_text_color: '#708499',
				text_color: '#f5f5f5',
			} as const;

			themeParams = JSON.stringify(themeParamsMock);
			initDataRaw = initDataRawMock;
		}

		// if (!themeParams || !initDataRaw) {
		// 	console.error('Failed to retrieve launch parameters');
		// 	return;
		// }

		// console.log(initDataRaw);

		sessionStorage.setItem('env-mocked', '1');
		mockTelegramEnv({
			launchParams: new URLSearchParams([
				['tgWebAppThemeParams', themeParams ?? ''],
				['tgWebAppData', initDataRaw ?? ''],
				['tgWebAppPlatform', 'tdesktop'],
				['tgWebAppVersion', '8']
			])
		});
		console.warn(
			'⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
		);
	});
}
