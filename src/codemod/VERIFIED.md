# Verified v5 → v6 change list

Everything here was derived by comparing the **published** packages, not from documentation or a
changelog. Every command below was run; every block quoted is real output.

- `@ui-kitten/components@5.3.1` vs `@ui-kitten/components@6.0.0-beta.2`
- `@eva-design/eva@2.2.0` vs `@ui-kitten/eva@6.0.0-beta.1`
- `@eva-design/dss@2.2.0` / `@eva-design/processor@2.2.0` vs `@ui-kitten/processor@6.0.0-beta.1`
- TypeScript 5.9.3, `@types/react` 19.2.13, React 19.1.0, React Native 0.81.1

---

## 1. Public export surface

Derived with the TypeScript checker (`createProgram` → `getExportsOfModule`), not by grepping
`.d.ts`. v5.3.1 ships compiled JS plus a root `index.d.ts`; v6 ships `lib/typescript/index.d.ts`.

```
# 173 exports from v5/index.d.ts
# 195 exports from v6/lib/typescript/index.d.ts
```

### Removed in v6 — exactly one name

```
=== REMOVED in v6 (present v5, absent v6) ===
styled
```

`styled` is the **only** removed export. It still exists as `export const styled` in the source
(`src/components/theme/style/styled.tsx:108`), but `src/components/theme/index.ts` re-exports only
`type StyledComponentProps` and `type EvaProp` from that module, and the package `exports` map
declares only `.`, `./devsupport` and `./package.json` — so no subpath reaches it. This is a **hard
break**, not a deprecation. `withStyles` is unaffected and still exported.

### Added in v6 — 23 names

```
AutocompleteRef              StyleCacheClass              useStyled
CalendarRef                  ThemeStore                   useStyledDefaultProps
DatepickerRef                ThemeStoreContext            useThemeValue
IconRef                      ThemedThemeType              useThemeValues
InputRef                     UsePopoverMeasurementOptions
ListRef                      UsePopoverMeasurementResult
RangeCalendarRef             UseStyledOptions
RangeDatepickerRef           UseStyledResult
SelectRef                    styleCache
                             usePopoverMeasurement
```

**Exactly 9 ref types are exported.** `ViewPagerRef` and `TabBarRef` are **not** among them — they
are declared internally (`viewPager.component.tsx:42`, `tabBar.component.tsx:40`) but never
re-exported. The brief's list of ten, which includes `ViewPagerRef`, is wrong.

### Declaration-kind changes — 45 names

44 components went `class` → `const` (`ApplicationProvider` went `class` → `function`), plus two
prop types that went `type` → `interface` (`DividerProps`, `ListProps`). The class → const change is
the entire reason ref types are the highest-value transform: in v5 every component name was a class
and therefore usable directly as a type.

**Names absent from the kind-change list because they are still classes in v6** — the must-not-change
set:

```
AutocompleteItem   DrawerGroup   IconRegistry   MenuGroup   SelectGroup
```

Confirmed independently against the repo
(`grep "^export class [A-Z]" src/components/ui/*/*.component.tsx`) and empirically in probe 4 below.

### Component value names are unchanged

No component was renamed. The codemod needs no identifier-rename rule.

---

## 2. Dependency and entry-point delta

```
## @ui-kitten/components
  v5.3.1 deps         : @eva-design/dss@^2.2.0, @eva-design/processor@^2.2.0, fecha@3.0.3,
                        hoist-non-react-statics@^3.2.1, lodash.merge@^4.6.1
  v6.0.0-beta.2 deps  : @ui-kitten/mapping-base@^6.0.0-beta.1, @ui-kitten/processor@^6.0.0-beta.1,
                        fecha@3.0.3, hoist-non-react-statics@^3.2.1
  v5.3.1 peers        : react-native-svg@*
  v6.0.0-beta.2 peers : react-native-svg@>=13.0.0, react-native@>=0.72.0, react@>=18.2.0
  main   : (unset)  ->  ./lib/module/index.js
  types  : (unset)  ->  ./lib/typescript/index.d.ts
  exports: no       ->  yes

## @ui-kitten/eva-icons
  deps  : react-native-eva-icons@^1.3.1  (unchanged)
  peers : @ui-kitten/components@5.3.1  ->  @ui-kitten/components@^6.0.0-beta.1
  main  : (unset)  ->  ./lib/module/index.js       types: (unset) -> ./index.ts

## @ui-kitten/metro-config
  deps  : (none)  ->  @ui-kitten/mapping-base@^6.0.0-beta.1, @ui-kitten/processor@^6.0.0-beta.1,
                      chalk@^3.0.0, commander@^4.1.1
  peers : (none)  ->  metro-config@*
  main  : (unset)  ->  ./lib/module/index.js       types: (unset) -> ./index.ts

## @ui-kitten/date-fns
  peers : (none)  ->  @ui-kitten/components@^6.0.0-beta.1, date-fns@>=2.0.0

## @ui-kitten/moment
  peers : (none)  ->  @ui-kitten/components@^6.0.0-beta.1, moment@>=2.24.0
```

Consequences for the codemod:

- `lodash.merge` left the dependency list. It was never public API, so an app that imports it
  directly must now declare it itself — **report, do not remove**.
- v5 published **no** `main`/`types`/`exports` at all (resolution fell back to `index.js` /
  `index.d.ts`). v6 is ESM-only with an `exports` map, which is what forces the Jest change.
- v6 declares `react` and `react-native` as peers for the first time, and narrows
  `react-native-svg` from `*` to `>=13.0.0`.

---

## 3. `@eva-design/eva` — resolved

The mappings are the same document apart from one inert string.

```
### eva mapping.json
  identical: false
  .$schema  eva="./node_modules/@eva-design/dss/schema/schema.json"
            uik="./node_modules/@ui-kitten/processor/schema/schema.json"

### eva themes/light.json      identical: true
### eva themes/dark.json       identical: true
### material mapping.json      identical: true

### module shapes
  @eva-design/eva: dark, light, mapping
  @ui-kitten/eva : dark, light, mapping

### component key sets
  eva components: 34, uik components: 34
  only in @eva-design/eva: (none)
  only in @ui-kitten/eva : (none)
  eva strict: 47, uik strict: 47
  only in @eva-design/eva strict: (none)
  only in @ui-kitten/eva strict : (none)
```

`$schema` is never read by the processor:

```
$ grep -rln '\$schema' uikitten-processor/js
(no hits)
```

Runtime equivalence is pinned by a real test in this repo,
`src/components/theme/application/evaDesignCompat.spec.tsx`, which reconstructs the exact shape
`@eva-design/eva` ships and asserts both compiled styles and rendered styles match:

```
PASS src/components/theme/application/evaDesignCompat.spec.tsx
  @eva-design/eva compatibility
    ✓ should compile identical styles regardless of the `$schema` pointer (435 ms)
    ✓ should render identical styles when the mapping carries the `@eva-design/dss` pointer (448 ms)
    ✓ should expose the same module shape as `@eva-design/eva`
```

**Verdict, and it has two halves:**

| context | does `@eva-design/eva` still work? |
|---|---|
| `ApplicationProvider` at runtime | **Yes.** The mapping is identical and `$schema` is inert. |
| `@ui-kitten/metro-config@6` build-time styles | **No.** `EvaConfigService.MAPPING_PACKAGE_NAMES` (`src/metro-config/services/eva-config.service.ts:31`) accepts only `@ui-kitten/eva` and `@ui-kitten/material`; `validateConfigOrWarn` warns and returns `false`, so bootstrapped styles silently stop being generated. In a `.ts` metro config it is a compile error, since `EvaMappingPackageName` is that same two-member union (`:25`). |

So the **import** rewrite is a recommendation (automated but skippable), while the **metro config**
rewrite is a required break.

---

## 4. `@eva-design/dss` and `@eva-design/processor`

```
$ diff -rq evadesign-dss/types uikitten-processor/dss/types
(no output — identical)
```

`@eva-design/dss` exports 19 type names and **zero** runtime values:

```
$ cat evadesign-dss/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
```

`@ui-kitten/processor` re-exports the same 19 names from the same (identical) sources, plus
`SchemaProcessor`, `clearProcessorCache`, `getProcessorCacheStats`. `@eva-design/processor` exports
only `SchemaProcessor`, so `@ui-kitten/processor` is a strict superset of both.

Consequences: the `@eva-design/dss` → `@ui-kitten/processor` rewrite is provably side-effect-free
and can safely be emitted as `import type`. The `@eva-design/processor` rewrite is a pure superset
substitution.

**Correction:** `ThemeType` is *not* part of this move. Neither `@eva-design/dss` nor
`@ui-kitten/processor` exports it — it comes from `@ui-kitten/components` in both v5 and v6. No
transform.

---

## 5. Type-level probes

All run against the **published** `@ui-kitten/components@6.0.0-beta.2` tarball with
`tsc --noEmit --strict --jsx react-native`, TypeScript 5.9.3, `@types/react` 19.2.13.

### Probe 1 — `RefObject` nullability (decides R07)

```tsx
export const a: React.RefObject<InputRef> = React.createRef();       // the brief's form
export const b: React.RefObject<InputRef | null> = React.createRef(); // this plan's form
```

```
probe1-refobject.tsx(6,14): error TS2322: Type 'RefObject<InputRef | null>' is not assignable to type 'RefObject<InputRef>'.
    Type 'InputRef | null' is not assignable to type 'InputRef'.
      Type 'null' is not assignable to type 'InputRef'.
```

**The brief's stated v6 form does not compile under `strict`.** Line 8 produced no error.
R07 must emit `React.RefObject<X | null>`.

### Probe 2 — `React.ComponentRef<typeof X>` (decides R04)

The only errors are the deliberate `: never` assignments, which exist to print the resolved type:

```
probe2-componentref.tsx(30,14): error TS2322: Type 'TouchableWeb' is not assignable to type 'never'.
probe2-componentref.tsx(31,14): error TS2322: Type 'ViewPagerRef' is not assignable to type 'never'.
probe2-componentref.tsx(32,14): error TS2322: Type 'TabBarRef' is not assignable to type 'never'.
```

`ComponentRef` resolves correctly for every Group C component, **including `ViewPager` and
`TabBar`**, whose ref types are not exported, and including `Popover`/`Layout` (asserted assignable
from RN `View`, no error). R04 is viable as an automated rule.

### Probe 3 — zero-argument `useRef` (decides R06)

```
probe3-useref.tsx(5,24): error TS2554: Expected 1 arguments, but got 0.
```

Only line 5 (`React.useRef<IconRef>()`) errors. `React.useRef<CalendarRef>(null)` and
`React.useRef<DatepickerRef>(null)` compile clean, so the `D = Date` default carries and bare
generic ref names are valid output.

### Probe 4 — v5 patterns really break, Group E really doesn't

```
probe4-v5patterns.tsx(12,26): error TS2554: Expected 1 arguments, but got 0.
probe4-v5patterns.tsx(12,33): error TS2749: 'Icon' refers to a value, but is being used as a type here.
probe4-v5patterns.tsx(13,33): error TS2749: 'Input' refers to a value, but is being used as a type here.
probe4-v5patterns.tsx(14,35): error TS2749: 'Select' refers to a value, but is being used as a type here.
probe4-v5patterns.tsx(15,33): error TS2749: 'Calendar' refers to a value, but is being used as a type here.
probe4-v5patterns.tsx(16,33): error TS2749: 'List' refers to a value, but is being used as a type here.
probe4-v5patterns.tsx(17,33): error TS2749: 'Autocomplete' refers to a value, but is being used as a type here.
probe4-v5patterns.tsx(18,33): error TS2749: 'Datepicker' refers to a value, but is being used as a type here.
probe4-v5patterns.tsx(30,51): error TS2322: … Property 'ref' does not exist on type 'IntrinsicAttributes & TooltipProps'.
probe4-v5patterns.tsx(31,56): error TS2322: … Property 'ref' does not exist on type 'IntrinsicAttributes & MenuProps & OverflowMenuPopoverProps'.
probe4-v5patterns.tsx(32,28): error TS2322: … Property 'ref' does not exist on type 'IntrinsicAttributes & ModalProps'.
```

Every v5 ref pattern is a hard error. Every Group D `ref=` is a hard error. And the five Group E
lines — `useRef<MenuGroup>`, `<SelectGroup>`, `<DrawerGroup>`, `<AutocompleteItem>`,
`<IconRegistry>` — produced **no** errors, confirming they are still classes and must not be
touched.

---

## 6. v5 generic arity (shapes R02 vs R03)

From `v5/ui/*/*.d.ts`:

```
class Autocomplete    extends React.Component<AutocompleteProps, State>
class Calendar<D = Date>        extends BaseCalendarComponent<CalendarProps<D>, D>
class RangeCalendar<D = Date>   extends BaseCalendarComponent<RangeCalendarProps<D>, D>
class Datepicker<D = Date>      extends BaseDatepickerComponent<DatepickerProps<D>, D>
class RangeDatepicker<D = Date> extends BaseDatepickerComponent<RangeDatepickerProps<D>, D>
class Icon<T>                   extends React.Component<IconProps<T>>
class Input                     extends React.Component<InputProps>
class List<ItemT = any>         extends React.Component<ListProps<ItemT>>
class Select                    extends React.Component<SelectProps, State>
class TabBar                    extends React.Component<TabBarProps>
class ViewPager<ChildrenProps = {}> extends React.Component<ViewPagerProps<ChildrenProps>>
```

Note `Icon<T>` has **no default** type parameter in v5, so v5 code always writes `Icon<Something>` —
the `useRef<Icon<Partial<ImageProps>>>()` form is not an edge case, it is the only valid v5 form.
`IconRef` and `ListRef` are non-generic in v6, so their type arguments must be **dropped**; the four
calendar/datepicker ref types stay generic with the same `D = Date` default, so their arguments are
**preserved**.

---

## 7. Rule dropped as a result of verification

The brief proposes an optional cleanup for props "widened" to `string | number`, on the theory that
v5 users wrapped bare strings in `<Text>` to satisfy the types. **The premise is false.** From
`v5/ui/*/*.d.ts`:

```
v5/ui/button/button.component.d.ts:16          children?: RenderProp<TextProps> | React.ReactText;
v5/ui/select/select.component.d.ts:19          value?: RenderProp<TextProps> | React.ReactText;
v5/ui/select/select.component.d.ts:21          placeholder?: RenderProp<TextProps> | React.ReactText;
v5/ui/select/select.component.d.ts:22          label?: RenderProp<TextProps> | React.ReactText;
v5/ui/select/select.component.d.ts:23          caption?: RenderProp<TextProps> | React.ReactText;
v5/ui/datepicker/baseDatepicker.component.d.ts:17   label?: RenderProp<TextProps> | React.ReactText;
v5/ui/datepicker/baseDatepicker.component.d.ts:18   caption?: RenderProp<TextProps> | React.ReactText;
v5/ui/datepicker/baseDatepicker.component.d.ts:23   placeholder?: RenderProp<TextProps> | React.ReactText;
```

`React.ReactText` **was** `string | number`. v5 already accepted bare strings and numbers on these
props; the only v6 change is that `TextElement` joined the union. There is no v5 workaround to clean
up, so this rule does not exist.

---

## 8. Reproducing this

```
bash <scratch>/pack.sh          # npm pack all 17 tarballs
bash <scratch>/extract.sh       # unpack + entry-point diff
bash <scratch>/run-exports.sh   # checker-derived export delta
node  <scratch>/eva-diff.cjs    # deep-diff the two eva mappings
node  <scratch>/siblings.cjs    # dependency delta for every sibling package
bash  <scratch>/probe/setup.sh  # install published v6 into a scratch project
bash  <scratch>/probe/run.sh    # the four tsc probes
yarn jest src/components/theme/application/evaDesignCompat.spec.tsx --runInBand
```

`npm pack`, `npm view` and `npm install` are reads; nothing here publishes.
