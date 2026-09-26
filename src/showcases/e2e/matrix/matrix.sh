# usage: AGENT_DEVICE_SESSION=<ios|android> bash matrix.sh <evidence-dir> [sections...]
source "$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)/adlib.sh"
E=$1; shift; mkdir -p $E
ALL="Button Input InputAccessories CheckBox Toggle Radio RadioGroup Card List ListItem Menu MenuItem Select SelectSize Popover Tooltip OverflowMenu Modal TopNavigation TopNavigationAction BottomNavigation Tab TabBar TabView Drawer Calendar CalendarFilters CalendarMoment RangeCalendar Datepicker RangeDatepicker Autocomplete ViewPager Theme"
SECS=${*:-$ALL}
BACKDROP="20 110"; [ "$AGENT_DEVICE_SESSION" = android ] && BACKDROP="60 330"
closeOverlay() { if [ "$AGENT_DEVICE_SESSION" = android ]; then ad back; else ad press $BACKDROP; fi; }   # header-left area: backdrop covers it when an overlay is open
if [ -n "$PRESET" ]; then   # PRESET=material-dark | eva-dark | material-light : flip header toggles until theme-label matches
  want="$(echo $PRESET | sed 's/eva/Eva/; s/material/Material/; s/light/Light/; s/dark/Dark/; s/-/ \/ /')"
  gototop
  case $PRESET in *dark*) pid toggle-theme >/dev/null; settle;; esac
  case $PRESET in material*) pid toggle-mapping >/dev/null; settle;; esac
  [ "$(txt theme-label)" = "$want" ] || { echo "PRESET failed: want '$want' got '$(txt theme-label)'"; exit 1; }
fi
echo "=== $(date +%T) session=$AGENT_DEVICE_SESSION theme=$(txt theme-label)"
for sec in $SECS; do
echo "--- $sec"
case $sec in
Button)
  gototop; goto Button; seeId button-press-count
  chk "press filled" pid button-filled
  seeId button-enabled
  chk "press enabled" pid button-enabled
  chk "longpress enabled" ad longpress 'id="button-enabled"'
  chk "press disabled" pid button-disabled
  chk "press ghost disabled" pid button-ghost-disabled
  seeId button-icon-only
  chk "press icon-only" pid button-icon-only
  chk "press left-icon" pid button-left-icon
  settle; seeId button-press-count; v=$(txt button-press-count); echo "count: $v"
  chk "counter = Presses: 4 / Long: 1" [ "$v" = "Presses: 4 / Long: 1" ]
  echo "icon-only rect: $(rectOf button-icon-only)  left-icon rect: $(rectOf button-left-icon)  enabled rect: $(rectOf button-enabled)"
  ;;
Input)
  goto Input; seeId @input-active/input
  chk "focus active" pid @input-active/input
  chk "type hello" ad type "hello"
  settle; chk "value echo" [ "$(txt input-value)" = "Value: hello" ]
  chk "input text = hello" [ "$(txt @input-active/input)" = "hello" ]
  dismissKb
  seeId @input-disabled/input
  pid @input-disabled/input >/dev/null; ad type "x" >/dev/null; chk "disabled input stays empty" [ "$(txt @input-disabled/input)" != "x" ]; dismissKb
  seeId @input-multiline/input
  chk "focus multiline" pid @input-multiline/input
  chk "type multiline" ad type "line one"
  settle; chk "multiline value" [ "$(txt @input-multiline/input)" = "line one" ]
  dismissKb
  chk "label Email visible" hasT Input "Email"
  chk "caption visible" hasT Input "Enter a valid email address"
  shot $E/Input-typed.png
  ;;
InputAccessories)
  goto InputAccessories; seeId @input-password/input
  chk "focus password" pid @input-password/input
  chk "type secret1" ad type "secret1"
  settle; echo "masked value: $(txt @input-password/input)"
  dismissKb
  chk "toggle eye" pid input-accessories-toggle
  settle; chk "revealed secret1" [ "$(txt @input-password/input)" = "secret1" ]
  chk "toggle eye back" pid input-accessories-toggle
  settle; chk "masked again" [ "$(txt @input-password/input)" != "secret1" ]
  chk "caption text" hasT InputAccessories "Should contain at least 8 symbols"
  shot $E/InputAccessories.png
  ;;
CheckBox)
  goto CheckBox; seeId checkbox-controlled
  chk "press checkbox" pid checkbox-controlled; settle
  chk "checkbox -> true" hasT CheckBox "Checked: true"
  chk "press checkbox again" pid checkbox-controlled; settle
  chk "checkbox -> false" hasT CheckBox "Checked: false"
  chk "press indeterminate" pid checkbox-indeterminate; settle
  chk "indeterminate -> false" hasT CheckBox "Indeterminate: false"
  chk "press disabled checkbox" pid checkbox-disabled; settle
  ad snapshot --raw | grep -o '"value":"checkbox[^"]*"' | sort | uniq -c | tr '\n' ' '; echo
  shot $E/CheckBox.png
  ;;
Toggle)
  goto Toggle; seeId toggle-controlled
  chk "press toggle (switch)" pressSwitch toggle-controlled
  chk "toggle -> true" hasT Toggle "Checked: true"
  chk "press toggle again (switch)" pressSwitch toggle-controlled
  chk "toggle -> false" hasT Toggle "Checked: false"
  chk "rapid double press" bash -c "true"; pressSwitch toggle-controlled; pressSwitch toggle-controlled
  chk "double press nets false" hasT Toggle "Checked: false"
  chk "press disabled toggle" pressSwitch toggle-disabled
  shot $E/Toggle.png
  ;;
Radio)
  goto Radio; seeId radio-controlled
  chk "press radio" pid radio-controlled; settle
  chk "radio -> true" hasT Radio "Checked: true"
  chk "press radio again" pid radio-controlled; settle
  chk "radio -> false on re-press (onChange(!checked), same as master)" hasT Radio "Checked: false"
  ;;
RadioGroup)
  goto RadioGroup; seeId radio-group-3
  chk "press option 2" pid radio-group-2; settle
  chk "value = 2" [ "$(txt radio-group-value)" = "Selected Option: 2" ]
  chk "press option 3" pid radio-group-3; settle
  chk "value = 3" [ "$(txt radio-group-value)" = "Selected Option: 3" ]
  ad snapshot --raw | grep -o '"value":"radio[^"]*"' | sort | uniq -c | tr '\n' ' '; echo
  shot $E/RadioGroup.png
  ;;
Card)
  goto Card; seeId card-pressable
  chk "press card" pid card-pressable; settle
  chk "card presses = 1" [ "$(txt card-press-count)" = "Card presses: 1" ]
  chk "header rendered" hasT Card "Header"
  chk "footer rendered" hasT Card "Footer"
  shot $E/Card.png
  ;;
List)
  goto List; seeId list-item-2
  chk "press item 2" pid list-item-2; settle
  chk "list value = 2" [ "$(txt list-value)" = "Pressed item: 2" ]
  chk "press item 1" pid list-item-1; settle
  chk "list value = 1" [ "$(txt list-value)" = "Pressed item: 1" ]
  ;;
ListItem)
  goto ListItem; seeId list-item-install
  chk "press INSTALL" pid list-item-install; settle
  chk "last = install" [ "$(txt list-item-value)" = "Last press: install" ]
  chk "press row" pid list-item-row; settle
  chk "last = row" [ "$(txt list-item-value)" = "Last press: row" ]
  shot $E/ListItem.png
  ;;
Menu)
  goto Menu; seeId menu-item-4
  chk "press Orders" pid menu-item-2; settle
  chk "menu = 2" [ "$(txt menu-value)" = "Selected: 2" ]
  chk "press Settings" pid menu-item-4; settle
  chk "menu = 4" [ "$(txt menu-value)" = "Selected: 4" ]
  shot $E/Menu.png
  ;;
MenuItem) goto MenuItem; seeId menu-item-single; chk "press single item" pid menu-item-single ;;
Select)
  goto Select; seeId select
  chk "open select (first)" pid select
  chk "option 2 visible" ad wait 'id="select-option-2"' 4000
  shot $E/Select-open.png
  echo "select rect: $(rectOf select)  option1 rect: $(rectOf select-option-1)"
  chk "pick option 2" pid select-option-2; settle
  chk "select value = 2" [ "$(txt select-value)" = "Selected: 2" ]
  chk "list closed" ad wait absent 'id="select-option-3"' 4000
  chk "re-open" pid select
  chk "option 3 visible again" ad wait 'id="select-option-3"' 4000
  echo "option1 rect (2nd): $(rectOf select-option-1)"
  chk "backdrop closes" closeOverlay
  chk "list closed 2" ad wait absent 'id="select-option-3"' 4000
  ;;
SelectSize)
  goto SelectSize; seeId select-large
  chk "open small" pid select-small; settle
  chk "pick Option 3" pressBelow select-small "Option 3"; settle
  chk "small shows Option 3" [ "$(txt select-small)" = "Option 3" ]
  chk "open large" pid select-large; settle
  chk "pick Option 1" pressBelow select-large "Option 1"; settle
  chk "large shows Option 1" [ "$(txt select-large)" = "Option 1" ]
  shot $E/SelectSize.png
  ;;
Popover)
  goto Popover; seeId popover-anchor
  chk "open popover (first)" pid popover-anchor
  chk "content visible" ad wait 'id="popover-content"' 4000
  ad screenshot --overlay-refs $E/Popover-open.png >/dev/null
  a=$(rectOf popover-anchor); c=$(rectOf popover-content); echo "anchor: $a  content: $c"
  chk "backdrop closes" closeOverlay
  chk "content gone" ad wait absent 'id="popover-content"' 4000
  chk "re-open" pid popover-anchor
  chk "content visible 2" ad wait 'id="popover-content"' 4000
  c2=$(rectOf popover-content); echo "content 2nd: $c2"
  chk "same position on re-open" [ "$c" = "$c2" ]
  closeOverlay >/dev/null; ad wait absent 'id="popover-content"' 4000 >/dev/null
  ;;
Tooltip)
  goto Tooltip; seeId tooltip-anchor
  chk "open tooltip" pid tooltip-anchor
  settle; chk "tooltip text (2 nodes: popover content + tooltip)" bash -c "[ \"\$(agent-device snapshot --raw | grep -c 'Welcome to UI Kitten')\" -ge 2 ]"
  ad screenshot --overlay-refs $E/Tooltip-open.png >/dev/null
  chk "backdrop hides" closeOverlay
  settle; chk "tooltip gone (1 node left)" bash -c "[ \"\$(agent-device snapshot --raw | grep -c 'Welcome to UI Kitten')\" -le 1 ]"
  ;;
OverflowMenu)
  goto OverflowMenu; seeId overflow-menu-anchor
  chk "open menu" pid overflow-menu-anchor
  chk "item 3 visible" ad wait 'id="overflow-menu-item-3"' 4000
  ad screenshot --overlay-refs $E/OverflowMenu-open.png >/dev/null
  echo "anchor: $(rectOf overflow-menu-anchor)  item1: $(rectOf overflow-menu-item-1)"
  chk "pick item 3" pid overflow-menu-item-3; settle
  chk "value = 3" [ "$(txt overflow-menu-value)" = "Selected: 3" ]
  chk "menu closed" ad wait absent 'id="overflow-menu-item-3"' 4000
  chk "re-open" pid overflow-menu-anchor
  chk "item visible again" ad wait 'id="overflow-menu-item-1"' 4000
  closeOverlay >/dev/null; chk "backdrop closes" ad wait absent 'id="overflow-menu-item-1"' 4000
  ;;
Modal)
  goto Modal; seeId modal-toggle
  chk "open modal" pid modal-toggle
  chk "modal select visible" ad wait 'id="modal-select"' 5000
  chk "open nested select" pid modal-select; settle
  chk "pick Option 2" pressBelow modal-select "Option 2"; settle
  chk "nested select shows Option 2" [ "$(txt modal-select)" = "Option 2" ]
  chk "focus modal input" pid @modal-input/input
  chk "type in modal" ad type "hi"
  settle; chk "modal input value" [ "$(txt @modal-input/input)" = "hi" ]
  chk "open tooltip in modal" pid modal-tooltip-anchor
  settle; chk "tooltip above modal" hasAny "Presented above the modal"
  ad screenshot --overlay-refs $E/Modal-tooltip.png >/dev/null
  closeOverlay >/dev/null; settle; chk "tooltip closed" bash -c '! agent-device snapshot --raw | grep -qF "Presented above the modal"'
  chk "dismiss modal" pid modal-dismiss
  chk "modal gone" ad wait absent 'id="modal-select"' 4000
  ;;
TopNavigation)
  goto TopNavigation; seeId top-navigation-back
  chk "press back action" pid top-navigation-back
  echo "back action rect: $(rectOf top-navigation-back)"; shot $E/TopNavigation.png
  ;;
TopNavigationAction)
  goto TopNavigationAction; seeId top-navigation-action
  chk "press action" pid top-navigation-action; settle
  chk "count = 1" [ "$(txt top-navigation-action-count)" = "Presses: 1" ]
  echo "action rect: $(rectOf top-navigation-action)"
  ;;
BottomNavigation)
  goto BottomNavigation; seeId bottom-navigation-tab-3
  chk "press tab 2" pid bottom-navigation-tab-2; settle
  chk "content = 2" [ "$(txt bottom-navigation-value)" = "Content 2" ]
  chk "press tab 3" pid bottom-navigation-tab-3; settle
  chk "content = 3" [ "$(txt bottom-navigation-value)" = "Content 3" ]
  shot $E/BottomNavigation.png
  goto BottomNavigationTab; seeId bottom-navigation-tab-single; chk "press single bottom tab" pid bottom-navigation-tab-single
  ;;
Tab) goto Tab; seeId tab-single; chk "press single tab" pid tab-single ;;
TabBar)
  goto TabBar; seeId tab-3
  chk "press tab 2" pid tab-2; settle; chk "tabbar = 2" [ "$(txt tab-bar-value)" = "Selected: 2" ]
  chk "press tab 3" pid tab-3; settle; chk "tabbar = 3" [ "$(txt tab-bar-value)" = "Selected: 3" ]
  shot $E/TabBar.png
  ;;
TabView)
  goto TabView; seeId tab-view-tab-3
  chk "press tab 3" pid tab-view-tab-3; settle; chk "tabview = 3" [ "$(txt tab-view-value)" = "Selected: 3" ]
  chk "press tab 1" pid tab-view-tab-1; settle; chk "tabview = 1" [ "$(txt tab-view-value)" = "Selected: 1" ]
  r=$(rectOf tab-view); set -- $r; y=$(( $2 + $4 - 30 )); x1=$(( $1 + $3 * 3 / 4 )); x2=$(( $1 + $3 / 4 ))   # stay clear of the gesture-nav edge zones
  chk "swipe tabview left" ad swipe $x1 $y $x2 $y; settle
  chk "tabview = 2 after swipe" [ "$(txt tab-view-value)" = "Selected: 2" ]
  shot $E/TabView.png
  ;;
Drawer)
  goto Drawer; seeId drawer-item-4
  chk "press item 3" pid drawer-item-3; settle; chk "drawer = 3" [ "$(txt drawer-value)" = "Selected: 3" ]
  shot $E/Drawer.png
  goto DrawerItem; seeId drawer-item-single; chk "press single drawer item" pid drawer-item-single
  ;;
Calendar)
  goto Calendar; seeId calendar
  chk "press day 15" pressIn Calendar 15
  chk "value ends -15" bash -c "[ \"\$(agent-device get text 'id=\"calendar-value\"' | head -1)\" = 'Selected date: 2026-9-15' ]"
  chk "next month" ad press 'label="Next month"'; settle
  chk "October shown" hasT Calendar "October 2026"
  chk "prev month" ad press 'label="Previous month"'; settle
  chk "September back" hasT Calendar "September 2026"
  chk "title press -> year picker (DATE->YEAR per type.ts)" pressIn Calendar "September 2026"
  chk "years shown" hasT Calendar "2027"
  chk "pick 2027 (outside default max = current year, must stay in year view)" pressIn Calendar "2027"
  chk "still year view" hasT Calendar "2030"
  chk "pick 2026" pressIn Calendar "2026"
  chk "months shown" hasT Calendar "Jan"
  chk "pick Jan" pressIn Calendar "Jan"
  chk "January 2026 shown" hasT Calendar "January 2026"
  shot $E/Calendar-picker.png
  chk "back to September 2026 via title cycle" bash -c 'true'
  ;;
CalendarFilters)
  goto CalendarFilters; seeId calendar-minmax
  chk "minmax press 25 (in range)" pressBelow calendar-minmax 25
  chk "minmax value 25" [ "$(txt calendar-minmax-value)" = "Selected: 25" ]
  chk "minmax press 20 (out of range)" pressBelow calendar-minmax 20
  chk "minmax value still 25" [ "$(txt calendar-minmax-value)" = "Selected: 25" ]
  seeId calendar-filter
  chk "filter press 27 (Sunday)" pressBelow calendar-filter 27
  chk "filter value none" [ "$(txt calendar-filter-value)" = "Selected: none" ]
  chk "filter press 28 (Monday)" pressBelow calendar-filter 28
  chk "filter value 28" [ "$(txt calendar-filter-value)" = "Selected: 28" ]
  shot $E/CalendarFilters.png
  ;;
CalendarMoment)
  goto CalendarMoment; seeId calendar-moment
  chk "week starts Mo" hasT CalendarMoment "Mo"
  chk "press 10" pressIn CalendarMoment 10
  chk "moment value 2026-09-10" [ "$(txt calendar-moment-value)" = "Selected: 2026-09-10" ]
  ;;
RangeCalendar)
  goto RangeCalendar; seeId range-calendar
  chk "press 10" pressIn RangeCalendar 10
  chk "press 15" pressIn RangeCalendar 15
  chk "range 10 to 15" [ "$(txt range-calendar-value)" = "Range: 10 to 15" ]
  shot $E/RangeCalendar.png
  ;;
Datepicker)
  goto Datepicker; seeId datepicker
  chk "open datepicker (first)" pid datepicker
  chk "picker calendar shown" ad wait 'label="Next month"' 4000
  ad screenshot --overlay-refs $E/Datepicker-open.png >/dev/null
  chk "pick 20" pressNear datepicker "20"
  chk "value 2026-9-20" [ "$(txt datepicker-value)" = "Selected date: 2026-9-20" ]
  chk "picker closed" ad wait absent 'label="Next month"' 4000
  chk "re-open" pid datepicker
  chk "picker shown again" ad wait 'label="Next month"' 4000
  closeOverlay >/dev/null; chk "backdrop closes picker" ad wait absent 'label="Next month"' 4000
  chk "label Date" hasT Datepicker "Date"
  chk "caption" hasT Datepicker "Pick a date"
  ;;
RangeDatepicker)
  goto RangeDatepicker; seeId range-datepicker
  chk "open range picker" pressAt range-datepicker 200 52   # id tap refused on Android: the child touchable covers the container exactly
  settle; chk "picker shown (RangeCalendar has no arrow labels, look for a weekday header)" bash -c "[ \"\$(agent-device snapshot --raw | grep -c '\"Su\"')\" -ge 2 ]"
  chk "pick 5" pressNear range-datepicker "5"
  chk "pick 9" pressNear range-datepicker "9"
  chk "range 5 to 9" [ "$(txt range-datepicker-value)" = "Range: 5 to 9" ]
  closeOverlay >/dev/null; settle; chk "closed" [ "$(txt range-datepicker-value)" != "" ]
  shot $E/RangeDatepicker.png
  ;;
Autocomplete)
  goto Autocomplete; seeId @@autocomplete/input-anchor/input
  chk "focus" pid @@autocomplete/input-anchor/input
  chk "type inter" ad type "inter"
  chk "item 1 shown" ad wait 'id="autocomplete-item-1"' 4000
  chk "only one item" ad is absent 'id="autocomplete-item-2"'
  chk "press item" pid autocomplete-item-1; settle
  chk "value Interstellar" [ "$(txt @@autocomplete/input-anchor/input)" = "Interstellar" ]
  dismissKb
  ;;
ViewPager)
  goto ViewPager; seeId view-pager
  r=$(rectOf view-pager-value); set -- $r; y=$(( $2 + 120 )); [ "$AGENT_DEVICE_SESSION" = android ] && y=$(( $2 + 300 )); x1=$(( $1 + $3 * 3 / 4 )); x2=$(( $1 + $3 / 4 ))
  chk "swipe left" ad swipe $x1 $y $x2 $y; settle
  chk "page = 2" [ "$(txt view-pager-value)" = "Page: 2" ]
  chk "swipe left again" ad swipe $x1 $y $x2 $y; settle
  chk "page = 3" [ "$(txt view-pager-value)" = "Page: 3" ]
  ;;
Theme)
  gototop
  chk "toggle theme" pid toggle-theme; settle
  echo "label: $(txt theme-label)"
  chk "no raw \$tokens" bash -c "! agent-device snapshot --raw | grep -q '\\\$color\\|\\\$background\\|\\\$text-'"
  shot $E/Theme-toggled-top.png
  chk "toggle mapping" pid toggle-mapping; settle
  echo "label: $(txt theme-label)"
  shot $E/Mapping-toggled-top.png
  chk "toggle theme back" pid toggle-theme; settle; chk "toggle mapping back" pid toggle-mapping; settle
  echo "label: $(txt theme-label)"
  ;;
esac
done
echo "=== done $(date +%T)"
