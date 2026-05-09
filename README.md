# firstbase-website

Website and web builder for [Firstbase](https://github.com/Akshay-bendadi/firstbase), a CLI for generating production-ready React and Next.js project foundations.

The site exposes a visual builder for the `create-firstbase-app` CLI and can export generated projects as a ZIP file or push them to a GitHub repository with the same project name.

## Links

- CLI repository: https://github.com/Akshay-bendadi/firstbase
- Website repository: https://github.com/Akshay-bendadi/firstbase-website
- CLI package: https://www.npmjs.com/package/create-firstbase-app
- Current CLI version shown on the site: `0.0.7`

## Stack

- Next.js `16.2.4`
- React `19.2.5`
- TypeScript
- App Router
- Tailwind CSS
- shadcn-style UI primitives
- lucide-react icons

## Features

- Landing page for the Firstbase CLI
- Interactive project builder at `/builder`
- Project-name validation before filesystem writes
- Backend generation jobs with polling
- ZIP download for generated source
- GitHub repository push flow
- Generated output cleanup that excludes dependency folders and repository metadata

## Requirements

- Node.js `>=20.19.0`
- npm
- Optional GitHub token for the push-to-GitHub flow

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

On platforms where Next.js cannot load native Turbopack bindings, use the webpack fallback:

```bash
npx next build --webpack
```

## Quality

```bash
npm run lint
npm run format:check
```

The full check command is:

```bash
npm run check
```

## Project Layout

- `app/` - App Router pages and API routes
- `components/landing/` - Landing page sections
- `components/builder/` - Interactive builder UI
- `components/ui/` - Shared UI primitives
- `lib/generator/` - Generation job store, validation, file walking, ZIP creation, and project writing
- `docs/` - Production and project notes

## GitHub Push Flow

The builder accepts a GitHub token only for the active push request. The server creates a repository using the generated project name, uploads generated files through the GitHub API, and returns the repository URL when complete.

Ignored local folders such as `node_modules`, `.next`, and `.env.local` are not committed or pushed from this website repository.
