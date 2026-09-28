---
"@ui-kitten/components": patch
"@ui-kitten/eva": patch
---

`Input` spaces its caption from the field again. The Eva mapping's `captionMarginTop` (4 in Eva, back in the
Input block; Material already had it) is applied to the caption text only when a `caption` renders, so an
Input without a caption keeps its height (#1434).
