---
"@ui-kitten/components": patch
---

Hide the non-selected `ViewPager` (and therefore `TabView`) pages from assistive technology. Every page stays mounted and translated off screen, so VoiceOver and TalkBack walked into pages the user could not see; the page wrappers now carry `aria-hidden` (`accessibilityElementsHidden` on iOS, `importantForAccessibility='no-hide-descendants'` on Android) for every index other than `selectedIndex`.
