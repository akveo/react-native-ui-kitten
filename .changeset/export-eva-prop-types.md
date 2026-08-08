---
"@ui-kitten/components": patch
---

Export the types used by public component props from the package root.

`EvaStatus`, `EvaSize`, `EvaInputSize`, `LiteralUnion`, `RenderProp`, `RenderFCProp` and `ChildrenWithProps` type props such as `ButtonProps.status`, `.size` and `.accessoryLeft`, but were only reachable through `@ui-kitten/components/devsupport` — a path whose name tells users not to import it. Anyone typing a wrapper component needed them.

`RenderProp` and `RenderFCProp` also now default their type parameter, so the documented bare spelling compiles:

```ts
import type { RenderProp } from '@ui-kitten/components';

const accessory: RenderProp = <Icon name='star' />;   // previously: TS2314
```
