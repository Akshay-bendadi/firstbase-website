# Firstbase Website Requirements

## Product Goal

Firstbase needs a public website for `npx create-firstbase-app@latest` that does two jobs:

- Convert developers who want a production-ready React or Next.js starting point.
- Provide a web-based project configurator that captures the same choices as the CLI, then hands those choices to a project generation backend.

The site should make Firstbase feel broader than a narrow framework starter. Create T3 App is positioned around full-stack, typesafe Next.js choices; Firstbase should be positioned around production scaffolding for React + Vite or Next.js, with Tailwind, API client setup, env handling, formatting, CI/security defaults, docs, and optional advanced modules.

## Source Inputs

- CLI repo: https://github.com/Akshay-bendadi/firstbase
- Package command: `npx create-firstbase-app@latest`
- Current CLI version observed: `0.0.6`
- Node requirement: `>=20.19.0`
- Competitor reference: https://create.t3.gg/
- Design pattern selected from `getdesign-md-patterns`: xAI as the primary futuristic product pattern, with SpaceX-style stark launch-console restraint. The builder can keep workflow/canvas behavior, but the landing page must avoid command pills, decorative cards, GitHub star widgets, and theme switches.

## Web Intake

The web configurator lives on `/builder` and must capture these current CLI answers:

- Project name
- Framework: React + Vite or Next.js
- Language: JavaScript or TypeScript
- Next.js router when framework is Next.js: App Router or Pages Router
- UI library: none or shadcn/ui-compatible primitives
- Husky pre-commit hooks
- Advanced setup mode: skip or go advanced
- Advanced modules: React Query, auth scaffold, forms stack, toast system, i18n, SEO metadata for Next.js, and tests

Project name validation should match the CLI:

- Required
- 80 characters or fewer
- Starts with a letter or number
- Contains only letters, numbers, dashes, and underscores
- Rejects path separators, traversal text, `node_modules`, `dist`, `build`, and `.git`

## Generation Flow

The website should use a backend job instead of generating projects in the browser.

1. User completes the configurator.
2. Website sends the normalized answers to a server-side generation endpoint.
3. Backend creates an isolated temporary workspace.
4. Backend runs the Firstbase scaffold using the selected answers.
5. Backend removes `node_modules` from the generated project.
6. Backend creates a ZIP archive from the project folder.
7. User can download the ZIP.
8. User can optionally connect GitHub and push the generated files into a new repository with the same name as the project.

The current CLI is interactive. For a production backend, prefer one of these implementation paths:

- Export and call `scaffoldProject(answers)` from the package in a server worker.
- Add a supported non-interactive CLI mode such as `create-firstbase-app --config firstbase.json`.

## Landing Page Requirements

- First viewport must identify Firstbase and the `npx` command immediately.
- Show a command strip with copy-friendly package usage.
- Explain what Firstbase generates without marketing-only filler.
- Surface the differentiators: React or Next.js, Tailwind baseline, shadcn-ready primitives, env and API client, formatting, Husky, CI/security, generated docs, advanced modules.
- Include a visible configurator entry point in the first viewport.
- Include a competitor-aware but non-hostile positioning section focused on scope and outputs.

## Configurator Requirements

- Keep the form dense, developer-oriented, and visually connected as a chain/mind-map.
- Use skeleton loading for the builder route and job states for generation.
- Show a live summary of selected framework, language, router, modules, and output.
- Show the CLI command and explain that the current CLI is interactive.
- Provide clear output actions:
  - Download ZIP
  - Push to GitHub repo
- The backend API should start generation jobs, expose status polling, serve ZIP downloads, and provide an authenticated GitHub push endpoint.

## Backend Requirements

- Run jobs in isolated per-request temporary directories.
- Enforce a timeout and maximum output size.
- Remove `node_modules`, lock any archive traversal paths, and only include the generated project folder.
- Block unsafe project names before invoking any filesystem or git operations.
- Avoid storing GitHub tokens beyond the active push session.
- Push to a new repository named from the validated project name.
- Return structured job states: queued, installing, scaffolding, cleaning, zipping, ready, failed.

## Success Criteria

- A developer can understand Firstbase in under ten seconds.
- A developer can configure a project on the web without opening the terminal.
- The selected web choices map directly to the CLI `Answers` shape.
- The generated output path is clear: download a clean ZIP or push to GitHub.
- The design reads like a serious developer tool, not a template gallery.
