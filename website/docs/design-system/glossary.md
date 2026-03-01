---
id: glossary
title: Design System Glossary
sidebar_label: Design System Glossary
description: This document contains a glossary used to describe a process of styling UI components in UI Kitten.
keywords:
  - React Native
  - UI Kitten
  - Eva Design System
  - glossary
---

# Eva Design System Glossary

This document contains a glossary used to describe a process of styling UI components.

---

## Parameter

Parameter is a single style property that could be applied to a UI component. Each parameter represents a regular CSS key, but unlike CSS, we use `camelCase` parameter names. For example, `backgroundColor` parameter represents to change the background color of UI component.

---

## Semantic properties

Semantic property defines a set of parameters applied to a UI component using a single property. In terms of Eva Design System we have an `appearance` property and a set of logical properties we call `variant group`.

---

## Appearance

Appearance is a semantic property that define the high level view of related component: its dimensions, shape and main colors. Appearance property can optionally contain a `variantGroups` and `state` keys to describe how component should be styled when other semantic properties are applied to a component or a user interacts with a component. In terms of Eva Design System, there should be at least one appearance property which is going to be used by default. Also it's possible to have more than one appearance to style a component. In this case, any non-default appearance will inherit default appearance.

```json
{
  "Button": {
    "appearances": {
      "filled": {
        "mapping": {
          "backgroundColor": "black"
        }
      }
    }
  }
}
```

---

## Variant Group

Variant Group is a logical group of keys we call `variant`. Each variant group has a related property key which could be applied to a UI component and a set of values that can be passed to this property.

For example, there is a `status` property that could be passed to a Button. This property is a semantic property describing a variant group. And the variants of this group are `primary`, `success`, `info`, `warning` and `danger`.

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
            "success": {
              "backgroundColor": "green"
            }
          }
        }
      }
    }
  }
}
```

---

## Variant

Variant is a key representing a logical set of parameters. Each variant belongs to a variant group. Variant property can optionally contain `state` keys to describe how component should be styled when a user interacts with a component.

For example, there are `tiny`, `small`, `medium`, `large` and `giant` variants of a Button. These variants modify the dimensions with corresponding style properties like `width` and `height` to style a Button.

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
            "success": {
              "backgroundColor": "green"
            }
          }
        }
      }
    }
  }
}
```

---

## State

State is a key representing a set of parameters applied to a component for a particular state. The state in terms of Eva Design System is something equal to [CSS pseudo classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes), but implemented in a different way. In most cases state describes a user interaction with a component.

```json
{
  "Button": {
    "appearances": {
      "filled": {
        "mapping": {
          "backgroundColor": "black",
          "state": {
            "active": "red"
          }
        }
      }
    }
  }
}
```
