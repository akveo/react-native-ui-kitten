Q="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/q.py"
ad() { # run agent-device with a watchdog; retry when the iOS runner reports RUNNER_BUSY (heavy capture still finishing)
  local out rc n=0
  while :; do
    out=$(perl -e 'alarm 120; exec @ARGV' agent-device "$@" 2>&1); rc=$?
    if [ $n -lt 4 ] && printf '%s' "$out" | grep -q RUNNER_BUSY; then n=$((n+1)); sleep 6; continue; fi
    printf '%s\n' "$out"; return $rc
  done
}
gototop() { ad scroll top >/dev/null; ad scroll top >/dev/null; }
chk() { local name="$1"; shift; local out; out=$("$@"); local rc=$?; if [ $rc -eq 0 ]; then echo "PASS $name"; else echo "FAIL $name :: $(echo "$out" | grep -v '^Hint\|^Diagnostic\|^Snapshot\|^Page\|^App\|^iOS' | head -2 | tr '\n' ' ' | cut -c1-220)"; fi; }
chkfail() { local name="$1"; shift; local out; out=$("$@"); local rc=$?; if [ $rc -ne 0 ]; then echo "PASS $name (rejected as expected)"; else echo "FAIL $name :: action unexpectedly succeeded"; fi; }
pid() { ad press "id=\"$1\""; }
txt() { ad get text "id=\"$1\"" | head -1; }
has() { python3 $Q has "$1" "$2" >/dev/null; }
hasT() { local out; out=$(python3 $Q has "$1" "$2"); [ "$out" = yes ]; }
pressIn() { local c; c=$(LAST=${3:-0} NTH=$4 python3 $Q center "$1" "$2") || { echo "pressIn: no '$2' in $1"; return 1; }; ad press $c >/dev/null; ad wait stable >/dev/null; }
rectOf() { python3 $Q rect "$1"; }
shot() { ad screenshot "$1" >/dev/null; }
settle() { ad wait stable >/dev/null; }


goto() { CUR="$1"; local n=0 r; while [ $n -lt 90 ]; do r=$(python3 $Q to "section-$1-title"); case "$r" in ok) return 0;; down\ *) ad scroll down --pixels ${r#down } >/dev/null;; up\ *) ad scroll up --pixels ${r#up } >/dev/null;; *) echo "goto $1: $r"; return 1;; esac; n=$((n+1)); done; echo "goto $1: FAILED ($r)"; return 1; }
seeId() { local n=0 r noid=0 stuck=0 before after; while [ $n -lt 90 ]; do r=$(python3 $Q to "$1"); case "$r" in ok) ad wait stable >/dev/null; return 0;; down\ *|up\ *) before=$(rectOf "$1" 2>/dev/null); ad scroll ${r%% *} --pixels ${r#* } >/dev/null; after=$(rectOf "$1" 2>/dev/null); if [ -n "$before" ] && [ "$before" = "$after" ]; then stuck=$((stuck+1)); [ $stuck -ge 2 ] && { ad wait stable >/dev/null; return 0; }; else stuck=0; fi;; NOID) noid=$((noid+1)); if [ $noid -eq 1 ] && [ -n "$CUR" ]; then goto "$CUR" >/dev/null; else ad scroll down --pixels 500 >/dev/null; fi; if [ $noid -gt 8 ]; then echo "seeId $1: NOID"; return 1; fi;; esac; n=$((n+1)); done; echo "seeId $1: FAILED ($r)"; return 1; }

hasAny() { agent-device snapshot --raw | grep -qF -- "$1"; }

pressBelow() { local c; c=$(python3 $Q below "$1" "$2") || { echo "pressBelow: no $2 below $1"; return 1; }; ad press $c >/dev/null; ad wait stable >/dev/null; }

dismissKb() { # tap the list's left padding above the keyboard: FlatList keyboardShouldPersistTaps=never swallows it and closes the keyboard
  if [ "$AGENT_DEVICE_SESSION" = android ]; then ad press 20 800 >/dev/null; else ad press 8 300 >/dev/null; fi; ad wait stable >/dev/null; }

pressAt() { # pressAt <testID> <dx> <dy> : tap at an offset from the node's top-left (dx/dy in rect units)
  local x y w h; read -r x y w h <<< "$(rectOf "$1")" || return 1
  ad press $(( x + $2 )) $(( y + $3 )) >/dev/null; ad wait stable >/dev/null
}
pressSwitch() { # Toggle's testID is on the row View; its touchable is the switch on the left, the label is outside it
  if [ "$AGENT_DEVICE_SESSION" = android ]; then pressAt "$1" 60 42; else pressAt "$1" 22 16; fi
}

pressNear() { local c; c=$(python3 $Q near "$1" "$2") || { echo "pressNear: no $2 near $1"; return 1; }; ad press $c >/dev/null; ad wait stable >/dev/null; }

alignTop() { # alignTop <testID> : scroll so the node sits just under the header, so a tall section fits one screenshot
  local x y w h top=130; [ "$AGENT_DEVICE_SESSION" = android ] && top=300
  read -r x y w h <<< "$(rectOf "$1")" || return 0
  if [ "$y" -gt $(( top + 40 )) ]; then ad scroll down --pixels $(( y - top )) >/dev/null; ad wait stable >/dev/null; fi
  return 0
}
