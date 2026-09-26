# usage: AGENT_DEVICE_SESSION=<ios|android> bash capture.sh <out-dir>   — screenshot + raw rect dump per section, all 4 theme combos
source "$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)/adlib.sh"
OUT=$1
SECTIONS="Layout Button ButtonGroup Input InputAccessories CheckBox Toggle Radio RadioGroup Card Avatar Spinner ProgressBar CircularProgressBar Divider Icon List ListItem Menu MenuItem Select SelectSize SelectItem Popover Tooltip OverflowMenu Modal TopNavigation TopNavigationAction BottomNavigation BottomNavigationTab Tab TabBar TabView Drawer DrawerItem Calendar CalendarFilters CalendarMoment RangeCalendar RangeCalendarFilters Datepicker RangeDatepicker Autocomplete ViewPager"
combo() { # $1 = dir name; $2 = whether to toggle theme; $3 = mapping
  local d=$OUT/$1; mkdir -p $d; rm -f /tmp/adq-lastdir
  echo "=== $1 label=$(txt theme-label) $(date +%T)"
  gototop
  for s in $SECTIONS; do
    seeId "section-$s-title" >/dev/null || { echo "skip $s"; continue; }
    ad screenshot $d/$s.png >/dev/null
    ad snapshot --raw > $d/$s.raw.txt
  done
}
combo eva-light
pid toggle-theme >/dev/null; settle; combo eva-dark
pid toggle-mapping >/dev/null; settle; combo material-dark
pid toggle-theme >/dev/null; settle; combo material-light
pid toggle-mapping >/dev/null; settle
echo "=== done $(date +%T) label=$(txt theme-label)"
