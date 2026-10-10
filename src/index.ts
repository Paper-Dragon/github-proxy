import {Router} from 'worktop';
import routes, {bind} from './routes';
import {enabled, issue, verify} from './token';

const mountProxy = (router: Router<Bindings>) => {
	router.mount('/https:/', routes);
	router.mount('/http:/', routes);
	bind(router);
};

const proxy = new Router<Bindings>();
mountProxy(proxy);

const app = new Router<Bindings>();

app.prepare = async (request, context) => {
	if (!enabled()) {
		return;
	}

	const {pathname} = context.url;
	const match = /^\/([^/]+)(\/.+)$/.exec(pathname);
	if (match !== null && await verify(match[1])) {
		const url = new URL(context.url);
		url.pathname = match[2];
		return proxy.run(new Request(url, request), context as Bindings);
	}

	if (pathname !== '/' && pathname !== '/token') {
		return context.bindings.ASSETS.fetch(request);
	}
};

app.add('GET', '/', async (request, context) => {
	const response = await context.bindings.ASSETS.fetch(request);
	if (!enabled()) {
		return response;
	}

	const credential = JSON.stringify(await issue());
	const rewritten = new HTMLRewriter()
		.on('title', {
			element(element) {
				element.before(`<script>window.GHP=${credential};</script>`, {html: true});
			},
		})
		.transform(response);
	const headers = new Headers(rewritten.headers);
	headers.set('Cache-Control', 'no-store');
	return new Response(rewritten.body, {status: rewritten.status, headers});
});

app.add('GET', '/token', async (request, context) => {
	if (!enabled()) {
		return context.bindings.ASSETS.fetch(request);
	}

	return Response.json(await issue(), {headers: {'Cache-Control': 'no-store'}});
});

mountProxy(app);

// eslint-disable-next-line regexp/no-empty-group
app.add('GET', /(?:)/, async (request, context) => context.bindings.ASSETS.fetch(request));

export default app;
