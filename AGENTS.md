# Agent instructions

## Repo shape

Yarn 3.6.4 + Turborepo monorepo publishing `@ui-kitten/*` packages from `src/*`.
The library is `src/components`. `src/showcases` is an Expo 54 app that renders every
component's "simple usage" showcase on one scrollable screen, with header buttons that
toggle theme (light/dark) and mapping (Eva/Material). It is the surface for on-device QA.

Commands: `yarn lint`, `yarn typecheck`, `yarn test` (jest, `--runInBand`), `yarn build`.

## agent-device (on-device QA)

Use agent-device only for app/device automation tasks.
For a normal app-driving task, start immediately. Do not probe first with `--help`, `--version`,
`devices`, `appstate`, `snapshot`, or `screenshot`; open the requested app in the foreground and
continue from its initial interactive snapshot.
For exploratory QA, read `agent-device help dogfood`.
For logs, network, audio, traces, or runtime failures, read `agent-device help debugging`.
For React Native component trees, props/state/hooks, slow renders, or rerenders, read
`agent-device help react-devtools`.
For React Native JavaScript heap growth, heap snapshots, or retained-object leaks, read
`agent-device help cdp`.
For React Native apps, overlays, Metro/Fast Refresh blockers, and routing to React DevTools or
debugging evidence, read `agent-device help react-native`.

Use the CLI in the integrated terminal.
If `agent-device` is not on PATH but the user installed it globally in another shell, resolve the
absolute binary path instead of using `npx -y agent-device@latest`.
Prefer `open -> snapshot -i -> act -> re-snapshot -> verify -> close` where supported.
Keep mutating commands against one session serial.

### Showcase app facts

- iOS bundle id / Android package: `com.uikitten.showcases`. Deep-link scheme: `uikitten-showcases`.
- Build + install (debug, needs Metro): `yarn showcases:ios` / `yarn showcases:android`.
  Metro: `yarn showcases:start`. Release build embeds the bundle and needs no Metro.
- Open: `agent-device open com.uikitten.showcases --platform ios --relaunch`.
- Every component lives in a `<Section>` with `testID="section-<Name>"` and a heading
  `testID="section-<Name>-title"` (names match the `Section title=` props in
  `src/showcases/navigation/app.navigator.tsx`). Scroll `id="showcase-scroll"` until the section is
  visible, then interact inside it.
- Header: `id="toggle-theme"` flips light/dark, `id="toggle-mapping"` flips Eva/Material,
  `id="theme-label"` shows `<Mapping> / <Theme>`. Run a sweep in all four combinations when
  hunting styling regressions.
- Replay suite: `src/showcases/e2e/*.ad`, run with `yarn e2e:ios` (or `agent-device test
  src/showcases/e2e --platform ios`). Record new scripts with `open ... --save-script <path>`.
- A RedBox / LogBox overlay is a finding. Capture it (`screenshot --overlay-refs`,
  `react-devtools errors`), then `agent-device react-native dismiss-overlay` and continue.
- Full regression procedure: `.claude/skills/showcase-qa/SKILL.md`.
