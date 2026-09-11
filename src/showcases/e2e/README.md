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
