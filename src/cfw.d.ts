import type {Context} from 'worktop';

declare global {
	type Bindings = {
		bindings: {
			ASSETS: Fetcher;
		};
	} & Context;
}
