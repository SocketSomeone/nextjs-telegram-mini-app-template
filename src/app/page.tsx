'use client';

import '@telegram-apps/telegram-ui/dist/styles.css';

import { Cell, Image, List, Section } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/Link/Link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';
import { Page } from '@/components/Page';

import tonSvg from './_assets/ton.svg';

export default function Home() {
	const t = useTranslations('i18n');

	return (
		<Page back={false}>
			<List>
				<Section
					header="Features"
				>

					<Link href="/ton-connect">
						<Cell
							before={
								<Image
									src={tonSvg.src}
									alt="TON Connect"
									style={{backgroundColor: '#007AFF'}}
								/>
							}
							subtitle="Connect your TON wallet"
						>
							TON Connect
						</Cell>
					</Link>

				</Section>
				<Section.Footer className="head-section">
					You can use these pages to learn more about features, provided by Telegram Mini Apps and other
					useful projects
				</Section.Footer>
				<Section
					header="Application Launch Data"
					footer="These pages help developer to learn more about current launch information"
				>
					<Link href="/init-data">
						<Cell subtitle="User data, chat information, technical data">
							Init Data
						</Cell>
					</Link>
					<Link href="/launch-params">
						<Cell subtitle="Platform identifier, Mini Apps version, etc.">
							Launch Parameters
						</Cell>
					</Link>
					<Link href="/theme-params">
						<Cell subtitle="Telegram application palette information">
							Theme Parameters
						</Cell>
					</Link>
				</Section>
				<Section header={t('header')} footer={t('footer')}>
					<LocaleSwitcher/>
				</Section>
			</List>
		</Page>
	);
}
