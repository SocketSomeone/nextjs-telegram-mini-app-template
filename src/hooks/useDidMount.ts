import { useEffect, useState } from 'react';

/**
 * @return True, if component was mounted.
 */
export function useDidMount(): boolean {
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		setDidMount(true); // eslint-disable-line react-hooks/set-state-in-effect
	}, []);

	return didMount;
}
