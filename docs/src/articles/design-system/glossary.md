# Eva Design System Glossary

This document contains a glossary used to describe a process of styling UI components.

<hr>

## Parameter

Parameter is a single style property that could be applied to a UI component. Each parameter represents a regular CSS key, but unlike CSS, we use a `camelCase` parameter names. For example, `backgroundColor` parameter represents to change the background color of UI component.

<hr>

## Semantic properties

Semantic property defines a set of parameters applied to a UI component using a single property. In terms of Eva Design System we have an `appearance` property and a set of logical properties we call `variant group`.

<hr>

## Appearance

Appearance is a semantic property that define the high level view of related component: its dimensions, shape and main colors. Appearance property can optionally contain a `variantGroups` and `state` keys to describe how component should be styled when other semantic properties are applied to a component or a user interacts with a component. In terms of Eva Design System, there should be at least one appearance property which is going to be used by default. Also it's possible to have more than one appearance to style a component. In this case, any non-default appearance will inherit default appearance.

```json
{
  "Button": {
    "appearances": {
      "filled": { // <-- Defines the `filled` appearance of a Button
        "mapping": {
          "backgroundColor": "black"
        }
      }
    }
  }
}
```

<hr>

## Variant Group

Variant Group is a logical group of keys we call `variant`. Each variant group has a related property key which could be applied to a UI component and a set of values that can be passed to this property.
 
 For example, there is a `status` property that could be passed to a Button. This property is a semantic property describing a variant group. And the variants of this group are `primary`, `success`, `info`,  `warning` and `danger`.
 
```json
{
  "Button": {
    "appearances": {
      "filled": {
        "mapping": {
          "backgroundColor": "black"
        },
        "variantGroups": {
          "status": { // <-- Defines the `status` variant group
            "success": {
              "backgroundColor": "green" // <-- Now we can pass status='success' to a UI component
            }
          } 
        }
      }
    }
  }
}
```

<hr>

## Variant

Variant is a key representing a logical set of parameters. Each variant belongs to a variant group. Variant property can optionally contain a `state` keys to describe how component should be styled when a user interacts with a component.
 
 For example, there are a `tiny`, `small`, `medium`, `large` and `giant` variants of a Button. These variants modify the dimensions with corresponding style properties like `width` and `height` to style a Button.

```json
{
  "Button": {
    "appearances": {
      "filled": {
        "mapping": {
          "backgroundColor": "black"
        },
        "variantGroups": {
          "status": {
            "success": { // <-- Defines the `success` variant group
              "backgroundColor": "green"
            }
          } 
        }
      }
    }
  }
}
```

<hr>

## State

State is a key representing a set of parameters applied to a component for a particular state. The state in terms of Eva Design System is something equal to <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes" target="_blank">CSS pseudo classes</a>, but implemented in a different way. In most cases state describes a user interaction with a component.

```json
{
  "Button": {
    "appearances": {
      "filled": {
        "mapping": {
          "backgroundColor": "black",
          "state": { // <-- Defines an `active` state
            "active": "red"
          }
        }
      }
    }
  }
}
```

