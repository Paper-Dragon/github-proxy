# github-proxy

Properly implemented proxy for GitHub running on Cloudflare Workers,
trying to be feature-rich while not bloated.

## Key Features

- Native GitHub domain proxy (github.com, gist.githubusercontent.com, etc.)
- Automatic handling of raw files and large downloads
- TypeScript-based implementation

## Usage Guide

### Installation

```bash
pnpm install
```

### Configuration

### Deployment

```bash
pnpm run build && pnpm run deploy
```

## Acknowledgements

- [hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)
- [FastGit](https://github.com/FastGitORG/cfworker) for stripping down the original worker script.

## License

[MIT License](LICENSE)
