# agent-device replay suite

Deterministic `.ad` scripts replayed by `agent-device test` against the showcase app
(`com.uikitten.showcases`). Run locally with `yarn e2e:ios` after `yarn showcases:ios`
(and `yarn showcases:start` for a debug build). CI runs the same suite from
`.github/workflows/agent-device-qa.yml` on PRs labeled `agent-qa`.

Rules for scripts here:

- First line `context platform=ios` (or `android`); `test --platform` filters on it.
- Use durable selectors (`id="..."`, `label="..."`), never `@e` refs.
- End with `close` so the suite owns cleanup.
- Record with `agent-device open com.uikitten.showcases --platform ios --relaunch --save-script src/showcases/e2e/<name>.ad`
  then replace refs with selectors before committing.

Recording writes `# agent-device:target-v1 {...}` evidence lines above each action. They bind the
target to its recorded ancestry and fail the replay when the tree shape differs (for example when
the LogBox overlay was present while recording). Delete those lines before committing so the plain
`id=` / `label=` selectors drive the replay; also trim the `context` line to `platform=ios` plus
`timeout=`, and drop `--metro-*` flags from `open` so the script works against a Release build.

Reaching a section: open `uikitten-showcases://section/<Title>` (the `title` of the section in
`src/showcases/navigation/app.navigator.tsx`) once the app is up, then wait for
`id="section-<Title>-title"`. The showcase scrolls that section to the top, so the script does not
depend on how many sections sit above it (`popover-android.ad` does this). A fixed number of
`scroll` steps breaks whenever a section is added higher up.

Running against a local Metro on a port other than 8081: `agent-device test` clears the app's
dev-server binding when a script's `open` has no `--metro-*` flags, so a debug build falls back to
`:8081` even with `test --metro-port`. Add the flags to the `open` lines of a scratch copy of the
scripts (never to the committed ones, which must work against a Release build).
