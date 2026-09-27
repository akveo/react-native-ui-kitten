# Web QA runner

Drives the hidden `QA/Web` story (`stories/qa.stories.tsx`) through the Chrome DevTools Protocol and
asserts behaviour from the instrumented page instead of screenshots: every callback in that story
pushes a line to `window.__qa`, so the runner can check press / pressIn / pressOut / longPress, hover
and focus styles, controlled Input typing, first-open placement of Select / Popover / Tooltip /
OverflowMenu / Datepicker / Modal, context-driven updates (RadioGroup, Menu, TabBar), Enter / Space /
Tab handling and the browser console.

```bash
yarn storybook                                   # :6006
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9333 --remote-debugging-address=127.0.0.1 \
  --user-data-dir=/tmp/qa-chrome --window-size=1000,800 --no-first-run about:blank &
yarn storybook:qa                                # node qa/run.mjs qa/out http://localhost:6006
node qa/taborder.mjs                             # full keyboard Tab order + focusable list
node qa/tabview.mjs                              # TabView: wheel-scrolls tab content, hides/shows the pager (#1397, #1498)
```

`run.mjs` prints one `PASS` / `FAIL` line per check, writes crops of the interesting states into
`qa/out/` (git-ignored) and exits non-zero on any failure. Expectations encode current library
behaviour on react-native-web (`Radio` re-press calls `onChange(false)`, Space does not activate
CheckBox / Toggle / Radio, `ListItem` has no hover state, `Toggle` / `Tab` carry role and state on an
inner element); change them together with the components.

To compare against another branch, run a second Storybook from a git worktree on another port and
pass its base URL (`node qa/run.mjs qa/out-master http://localhost:6007`), then diff the `PASS`/`FAIL`
lines. Chrome gets wedged after many sessions (`/json` lists no pages): kill every `--headless=new` process and start one again, or a stale instance keeps the IPv4 port while the new one binds `[::1]` only.
