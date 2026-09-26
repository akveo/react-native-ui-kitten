---
"@ui-kitten/metro-config": patch
---

`@ui-kitten/metro-config` no longer replaces Metro's default reporter. `create()` returned its own
`reporter` even when the project passed none, which shadowed Metro's `TerminalReporter` and silenced
every bundler log line and warning (#1763). A reporter the project supplies is still wrapped so the
`initialize_started` re-bootstrap keeps working.
