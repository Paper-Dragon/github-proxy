export const auth = (request: Request) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Basic ')) {
        return new Response('Authentication required', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="GitHub Proxy"' }
        });
    }

    const expected = '123123:123123';
    const actual = atob(authHeader.slice(6));
    
    if (actual !== expected) {
        return new Response('Invalid credentials', {
            status: 401,
            headers: { 'WWW-Authenticate': 'Basic realm="GitHub Proxy"' }
        });
    }

    return null;
};