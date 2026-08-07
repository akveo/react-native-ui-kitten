---
"@ui-kitten/components": patch
---

Declare the `./devsupport` subpath in `exports` and stop the package importing itself.

Four internal modules imported through the package's own name — `progressBar` and
`circularProgressBar` pulled from `@ui-kitten/components` itself, a circular import of the
package barrel, while `modal` and `calendarHeader` reached in via undeclared subpaths.
Metro reported these as `not listed in the "exports"` and fell back to file-based
resolution; they now use relative imports.

`./devsupport` is a real public surface (`RenderProp`, `TouchableWebElement`) and is now a
declared export with its own types, react-native, source, and default conditions.
Bundling a consumer app produces no `exports` warnings.
