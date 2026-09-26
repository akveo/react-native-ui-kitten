# Interaction matrix (agent-device)

Scripted on-device regression of every showcase section, driven by the `testID`s the showcases
expose (`button-enabled`, `select-option-2`, `calendar-value`, ...). Unlike the `.ad` replays this
is a bash loop over `agent-device` commands, so it navigates by accessibility rects instead of
recorded scroll counts and prints one `PASS`/`FAIL` line per check.

```bash
yarn showcases:start                       # Metro (debug builds)
agent-device open com.uikitten.showcases --platform ios --relaunch --session ios
AGENT_DEVICE_SESSION=ios bash src/showcases/e2e/matrix/matrix.sh .agent-device/qa/ios [Section ...]

adb reverse tcp:8081 tcp:8081
agent-device open com.uikitten.showcases --platform android --relaunch --metro-host localhost --metro-port 8081 --session android
AGENT_DEVICE_SESSION=android bash src/showcases/e2e/matrix/matrix.sh .agent-device/qa/android
```

Or `yarn e2e:matrix:ios` / `yarn e2e:matrix:android` (they open the session for you). Pass section
names to run a subset (`Button Select Popover`); the `Theme` pseudo-section flips theme/mapping and
greps the tree for raw `$token` strings.

Files:

- `matrix.sh` — the checks, one `case` block per section. Expectations encode current library
  semantics (for example `Radio` re-press calls `onChange(false)`, `Calendar` title press opens the
  year picker first).
- `adlib.sh` — helpers: `goto <Section>` / `seeId <testID>` scroll by pixel deltas computed from
  the raw snapshot (`--pixels`), `pressIn <Section> <label>` / `pressBelow <testID> <label>` press by
  coordinates when a node is `[other]` and selectors do not match, `hasT <Section> <text>` checks
  text inside one section's vertical band, `closeOverlay` taps the backdrop on iOS and sends `back`
  on Android.
- `q.py` — raw-snapshot queries (`to`, `center`, `below`, `has`, `rect`, `dump`). iOS exposes
  off-screen nodes with negative `y`; Android exposes only visible nodes, so `q.py to` falls back to
  the section order to pick a scroll direction.
- `capture.sh` — screenshot + raw rect dump of every section in all four theme/mapping combos, for
  a master-vs-branch parity diff with `compare.py <masterDir> <branchDir> <outDir>` (needs Pillow; aligns screenshots by content and writes `parity.md` plus master/branch/diff triptychs).

Gotchas learned while writing it: a tap outside a focused `TextInput` only dismisses the keyboard
(the showcase `FlatList` keeps `keyboardShouldPersistTaps='never'`), so dismiss before pressing an
accessory; `find "<text>" press` cannot be scoped, prefer `pressIn`/`pressBelow`; never edit these
scripts while a run is in progress (bash reads them incrementally).
