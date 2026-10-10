const secret = process.env.GHP_SECRET as string | undefined ?? '';
const ttl = Number(process.env.GHP_TOKEN_TTL as string | undefined ?? '') || 3600;

export const enabled = secret !== '';

let key: Promise<CryptoKey> | undefined;

async function sign(window: number) {
	key ??= crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(secret),
		{name: 'HMAC', hash: 'SHA-256'},
		false,
		['sign'],
	);
	const signature = await crypto.subtle.sign('HMAC', await key, new TextEncoder().encode(String(window)));
	return [...new Uint8Array(signature, 0, 8)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

const currentWindow = () => Math.floor(Date.now() / 1000 / ttl);

// A token stays valid until the end of the window after the one it was issued in.
export async function issue() {
	const window = currentWindow();
	return {token: await sign(window), refresh: (window + 1) * ttl * 1000, expires: (window + 2) * ttl * 1000};
}

export async function verify(token: string) {
	if (!/^[\da-f]{16}$/.test(token)) {
		return false;
	}

	const window = currentWindow();
	const candidates = await Promise.all([sign(window), sign(window - 1)]);
	return candidates.includes(token);
}
