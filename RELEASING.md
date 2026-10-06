# Releasing

UI Kitten publishes 9 packages from this monorepo with [changesets](https://github.com/changesets/changesets).
Releases are automated: pushing to `master` runs `.github/workflows/release.yml`, which
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
`6.0.0`; their npm entries stay frozen at `5.3.1` and are not part of the release set.

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

`baseBranch` in `.changeset/config.json` must be the branch releases actually run from — `master`.
The v6 line was developed and released from a `next` branch up to `6.0.0`; `master` was fast-forwarded to it
afterwards and is the release branch again. `baseBranch` only affects `changeset add` and
`changeset status`; it does **not** affect `version` or `publish`. If the release branch ever moves,
change it too, or `changeset status` will fail with *"Some packages have been changed but no
changesets were found."*

## Prerelease (beta) mode

`.changeset/pre.json` does not exist right now: `changeset version` deleted it when `6.0.0` was cut.
`yarn changeset pre enter <tag>` recreates it with `"mode": "pre"`. While it is in that mode:

- versions get a `-beta.N` suffix
- publishes go to the `beta` dist-tag
- `latest` for the v5 packages stays at `5.3.1` and must not move until GA

Consumed changesets are recorded in `pre.json.changesets` rather than deleted, so the `.md` files
staying in `.changeset/` after a release is expected.

### Current npm state (verified 2026-09-26, after the 6.0.0 publish)

| Package | `latest` | `beta` | other |
|---|---|---|---|
| `components` | 6.0.0 | 6.0.0-beta.2 | `next: 6.0.0-beta.2` |
| `metro-config` | 6.0.0 | 6.0.0-beta.1 | `next: 6.0.0-beta.1`, `rc: 5.0.0-rc.0` |
| the other seven | 6.0.0 | 6.0.0-beta.1 | |

The stale `beta`, `next` and `rc` dist-tags are known and deliberate — do not "fix" them ad hoc.
Moving or removing a dist-tag needs a non-bypass token plus an OTP, which the release account cannot
currently produce. They are harmless: nobody installs `@beta` or `@next` by accident, and `latest`
is what `npm install` resolves.

## Cutting a stable release after a prerelease line

This is how `6.0.0` was cut on 2026-09-26 (#1871, #1872). Order matters:

1. On the integration branch, exit prerelease mode:
   ```
   yarn changeset pre exit
   ```
   This only rewrites `.changeset/pre.json` (`mode: "exit"`). It does not touch versions.
2. Preview the result locally before pushing: `GITHUB_TOKEN=$(gh auth token) yarn changeset version`,
   inspect the package versions and changelogs, then discard the working tree changes.
3. Merge the integration PR into the release branch. `release.yml` opens a Version Packages PR whose
   versions are plain — **check the PR diff before merging**; this is the last cheap moment to catch
   a mistake. CI does not run on that PR (it is opened with `GITHUB_TOKEN`), so run
   `yarn install --immutable && yarn build` on its branch locally instead.
4. Merge the Version Packages PR. `changeset version` deletes `pre.json` and every consumed
   changeset; `changeset publish` runs without prerelease mode, so every package publishes to the
   `latest` dist-tag.
5. The prerelease dist-tag still points at the last prerelease. Leave it; repointing it needs an npm
   token with 2FA bypass (see below).

Branch protection on `master` requires the `build-and-test` check and one approving
review. Release PRs are merged with `gh pr merge <n> --admin`.

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

Writes to npm from a developer machine (`npm publish`, `npm deprecate`, `npm unpublish`,
`npm dist-tag add|rm`) need an **interactive terminal**: after `npm login` (web flow) every write
command prints `Authenticate your account at: https://www.npmjs.com/auth/cli/...` and waits for the
browser. From a non-interactive shell (CI steps, agents, scripts piped through `yes`) the same
commands return a bare `403 Forbidden`. Reads (`npm view`, `npm info`, `npm access list`) work
with no auth.

### Adding a package to the registry

Trusted publishing only works for packages that already exist on npm, so a **new** `@ui-kitten/*`
package cannot be created by `release.yml`. The first version is published by hand from an
interactive terminal, then the workflow takes over:

1. `yarn workspace @ui-kitten/<name> build`, then `cd src/<name> && npm publish --access public`
   (web auth in the browser).
2. On npmjs.com, open the package → Settings → Trusted publisher, add
   `akveo/react-native-ui-kitten` / workflow `release.yml`.
3. Only then merge the Version PR that bumps it. If the Version PR lands first, `changeset publish`
   fails on that package with `404`/`403` and the run has to be re-triggered after steps 1–2.

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
