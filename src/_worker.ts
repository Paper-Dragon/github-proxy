import {start} from 'worktop/cfw';
import {env, type Environment} from './env';
import app from '.';

const worker = start(app.run);

export default {
	async fetch(request: Request, bindings: Bindings['bindings'] & Environment, context: ExecutionContext) {
		Object.assign(env, bindings);
		return worker.fetch(request, bindings, context);
	},
};
