---
"@ui-kitten/metro-config": patch
---

Compile Eva styles when `metro.config.js` is loaded, not on a Metro reporter event.

`MetroConfig.create()` only ran the bootstrap from its `reporter.update` handler when Metro
emitted `initialize_started`. Tools that replace the reporter never delivered that event, so
under Expo CLI (`expo start`, `expo export`) the cache in `node_modules/.cache/ui-kitten/` was
never written and `@ui-kitten/eva/index.js` never received its `exports.styles` line. The
bootstrap now runs eagerly and synchronously inside `create()`; the reporter hook is kept for
bare Metro and still runs it again (idempotently) on `initialize_started`.

Other fixes in the same package:

- The custom-mapping watcher is only installed when `customMappingPath` is a non-empty string
  and the file exists. Previously an absent path resolved to the project root, so
  `fs.watchFile('./')` polled the whole project directory every 100 ms and kept any Node
  process that loaded the config alive.
- A missing or non-JSON custom mapping is reported as a `warn` naming the path that was tried,
  instead of crashing with `TypeError: Cannot read properties of null (reading 'length')`.
- `BootstrapService.run` returns a boolean, and `ui-kitten bootstrap` sets exit code 1 on an
  unknown package, a project without Eva packages or a bad custom mapping, so CI can detect it.
- The `exports.styles` line is appended without accumulating blank lines; the eva index always
  ends with exactly one newline after the append.
