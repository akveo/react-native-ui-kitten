# Releasing

UI Kitten publishes 9 packages from this monorepo with [changesets](https://github.com/changesets/changesets).
Releases are automated: pushing to `master` or `next` runs `.github/workflows/release.yml`, which
either opens/updates a **Version Packages** PR or, once that PR is merged, publishes to npm.

There is no staging registry. Merging a Version Packages PR publishes for real.

## The published packages

| Package | Notes |
|---|---|
| `@ui-kitten/components` | the one everybody installs (~55k downloads/month) |
| `@ui-kitten/eva` | |
| `@ui-kitten/eva-icons` | |
| `@ui-kitten/processor` | |
| `@ui-kitten/mapping-base` | |
| `@ui-kitten/material` | |
| `@ui-kitten/metro-config` | |
| `@ui-kitten/moment` | |
| `@ui-kitten/date-fns` | |

`@ui-kitten/showcases` is in `.changeset/config.json`'s `ignore` list.
`@ui-kitten/template-js` and `@ui-kitten/template-ts` were removed from the repository in
`6.0.0-beta.3`; their npm entries stay frozen at `5.3.1` and are not part of the release set.

## When a package bumps

The config uses `linked`, **not** `fixed`:

```json
"linked": [["@ui-kitten/*"]]
```

- A package bumps only if a changeset names it.
- `linked` aligns version numbers *among the packages being released together* — it does not drag
  unchanged packages along.
- So a release where only `components` changed bumps only `components`. The other eight keep their
  current version and are skipped at publish time. **This is correct and the workflow must stay
  green when it happens.**

`fixed` was considered and rejected: it would bump and republish all nine on every release,
producing eight no-op version bumps and eight empty changelog entries each time, purely to avoid a
bug that is now fixed properly (see below).

## Adding a changeset

```
yarn changeset
```

Commit the generated `.changeset/*.md` alongside your change. `changeset status` should exit 0:

```
yarn changeset status
```

`baseBranch` in `.changeset/config.json` must be the branch releases actually run from — currently
`next`, because that is where the v6 line lives and `master` still holds v5. `baseBranch` only
affects `changeset add` and `changeset status`; it does **not** affect `version` or `publish`. If
the release branch ever moves back to `master`, change it back, or `changeset status` will fail with
*"Some packages have been changed but no changesets were found."*

## Prerelease (beta) mode

`.changeset/pre.json` currently has `"mode": "pre", "tag": "beta"`. While it exists:

- versions get a `-beta.N` suffix
- publishes go to the `beta` dist-tag
- `latest` for the v5 packages stays at `5.3.1` and must not move until GA

Consumed changesets are recorded in `pre.json.changesets` rather than deleted, so the `.md` files
staying in `.changeset/` after a release is expected.

### Current npm state (verified 2026-08-08)

| Package | `latest` | `beta` | other |
|---|---|---|---|
| `components` | 5.3.1 | 6.0.0-beta.2 | `next: 6.0.0-beta.2` |
| `eva-icons`, `moment`, `date-fns` | 5.3.1 | 6.0.0-beta.1 | |
| `metro-config` | 5.3.1 | 6.0.0-beta.1 | `next: 6.0.0-beta.1`, `rc: 5.0.0-rc.0` |
| `eva`, `processor`, `mapping-base`, `material` | **6.0.0-beta.1** | 6.0.0-beta.1 | |

Two quirks are known and deliberate — do not "fix" them ad hoc:

- The four packages first published during v6 have `latest` pointing at a beta. npm assigns `latest`
  on a package's first publish regardless of `--tag`, and there is no stable version to point at
  instead. This corrects itself at 6.0.0 GA.
- `metro-config` keeps an orphan `rc: 5.0.0-rc.0`. Removing a dist-tag needs a non-bypass token plus
  an OTP, which the release account cannot currently produce.

## Cutting 6.0.0 stable

All nine packages carry a `major` changeset (`.changeset/v6-beta-release.md`) recorded in
`pre.json`, so all nine land on `6.0.0` together. Order matters:

1. On `next`, exit prerelease mode:
   ```
   yarn changeset pre exit
   ```
   This only rewrites `.changeset/pre.json` (`mode: "exit"`). It does not touch versions.
2. Commit and push that change. `release.yml` opens a Version Packages PR whose versions are plain
   `6.0.0` — **check the PR diff before merging**; this is the last cheap moment to catch a mistake.
3. Merge the PR. `changeset publish` runs without prerelease mode, so every package publishes to the
   `latest` dist-tag. That moves `latest` from `5.3.1` → `6.0.0` for the v5 packages and from
   `6.0.0-beta.1` → `6.0.0` for the four v6-only packages, clearing the "latest points at a beta"
   quirk automatically.
4. After the publish, `beta` still points at the last beta. Leave it or repoint it to `6.0.0`; either
   requires an npm token with 2FA bypass (see below).
5. Delete `.changeset/pre.json` (or run `yarn changeset pre exit` cleanup) before starting the next
   prerelease line.
6. If the release branch moves to `master`, merge `next` → `master` and set `baseBranch` back to
   `"master"`.

## CI and npm auth

`release.yml` publishes over **OIDC trusted publishing**, not a token. A successful run logs:

```
No NPM_TOKEN found, but OIDC is available - using npm trusted publishing
```

`changesets/action` only takes the OIDC path when the `NPM_TOKEN` **environment variable** is
absent. **Do not add `NPM_TOKEN` to the workflow env.** Doing so switches changesets onto the token
path, which dead-ends at:

```
Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

The `NODE_AUTH_TOKEN` env var (from the `NPM_TOKEN` repo secret) is what `actions/setup-node` writes
into `.npmrc`; it is used for registry reads, not for the publish. That secret expires **2026-11-05**
and will need rotating.

Writes to npm from a developer machine do not work at all (same 2FA-bypass error) — `npm publish`,
`npm deprecate`, `npm unpublish` and `npm dist-tag add|rm` all return 403. Reads (`npm view`,
`npm info`, `npm access list`) work with no auth.

## Toolchain constraints — read before bumping either of these

### `@changesets/cli` must stay >= 2.31.1

npm 12.0.0 (2026-07-08) shipped a breaking change: **`npm view --json` now always returns an
array.** `@changesets/cli` <= 2.30.x parsed that output as a single manifest, so
`pkgInfo.versions` came back `undefined`, `publishedVersions` became `[]`, and *every* package
looked unpublished:

```
info @ui-kitten/date-fns is being published because our local version (6.0.0-beta.1) has not been published on npm
...
npm error 403 Forbidden - PUT https://registry.npmjs.org/@ui-kitten%2fmetro-config
You cannot publish over the previously published versions: 6.0.0-beta.1.
```

That is what broke release `6.0.0-beta.2`
([run 31212734849](https://github.com/akveo/react-native-ui-kitten/actions/runs/31212734849)): the
real publish succeeded, the eight redundant ones 403'd, and the job exited 1. It failed silently
rather than loudly — no `Received 404 for npm info` warning is printed on this path.

2.31.x fixes it in two places:

- `normalizeInfoJson()` unwraps npm 12's array before reading `versions`
- an `E403 "cannot publish over the previously published version"` is now treated as
  already-published and skipped gracefully instead of failing the run

### The npm major in CI is pinned

`release.yml` runs `npm install -g npm@12`, not `npm@latest`. npm >= 11.5.1 is required for trusted
publishing, but `npm@latest` is how the runner silently rolled onto npm 12 in the first place.
Bump the pin deliberately, and re-run the check below afterwards.

## Verifying a change to the release pipeline

`changeset publish` has **no `--dry-run` flag**. It accepts only `--otp`, `--tag` and
`--no-git-tag`; since 2.31.0 unknown flags are a hard error, so `changeset publish --dry-run` fails
outright rather than being ignored.

To exercise publish selection without touching the registry, put a stub `npm` first on `PATH` that
forwards `npm info` to the real npm (optionally wrapping its JSON in an array to emulate npm 12) and
refuses every other subcommand. Then:

```
CI=true PATH="/path/to/stub:$PATH" node ./node_modules/@changesets/cli/bin.js publish --no-git-tag
```

With all local versions already on npm, the expected output is nine
`is not being published because version … is already published on npm` warnings,
`No unpublished projects to publish`, and exit 0.
