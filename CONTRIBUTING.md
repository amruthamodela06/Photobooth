# Contributing

## Local setup

```bash
npm install
npm install --prefix client
cp .env.example .env        # then edit MONGO_URI etc.
npm start                   # server + Vite client + Electron
```

MongoDB must be running locally (or point `MONGO_URI` at a remote instance).

## Branches

Branch from `master` and open a pull request; don't push directly to `master`.

| Prefix      | Use for                         |
|-------------|---------------------------------|
| `feature/`  | New user-facing functionality   |
| `fix/`      | Bug fixes                       |
| `chore/`    | Tooling, config, dependencies   |
| `docs/`     | Documentation only              |

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>
```

- **type**: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `ci`
- **scope**: area of the code, e.g. `server`, `settings`, `camera`, `gallery`, `stickers`
- Keep each commit focused on one change.

Examples:

```
feat(gallery): add Lightbox preview with keyboard navigation
fix(camera): release webcam tracks on unmount
```

## Before opening a PR

- `npm run build` succeeds (CI runs this on every PR)
- New endpoints are documented in [docs/API.md](docs/API.md)
- No secrets or `.env` files are committed
