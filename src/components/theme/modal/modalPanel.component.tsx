/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, {
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

/**
 * Registry that a `Modal` pushes its presented element into instead of rendering it at the
 * call site. Provided by `ModalPanel`, which `ApplicationProvider` renders around the app.
 *
 * `show` is an upsert: calling it again with the same id replaces the element and keeps the
 * item's position among its siblings.
 */
export interface ModalPanelRegistry {
  show(id: string, element: React.ReactElement, parentId: string | null): void;
  update(id: string, element: React.ReactElement): void;
  hide(id: string): void;
}

interface ModalPanelItem {
  id: string;
  parentId: string | null;
  element: React.ReactElement;
  order: number;
}

type ModalPanelItems = ReadonlyMap<string, ModalPanelItem>;

/**
 * Nearest panel wins. `undefined` means no panel is rendered above (Modal falls back to inline
 * rendering and warns once in development). Render `<ModalPanelContext.Provider value={null}>`
 * to force inline rendering for the subtree below it without a warning.
 */
export const ModalPanelContext = React.createContext<ModalPanelRegistry | null | undefined>(undefined);

/**
 * Identifies the hoisted modal whose content is currently rendering. A `Modal` whose anchor
 * sits inside another hoisted modal registers with that modal as its parent, so its RN Modal
 * is rendered inside the parent's RN Modal (iOS presents one modal chain only).
 */
export const ModalPanelItemContext = React.createContext<{ id: string } | null>(null);

const EMPTY_ITEMS: ModalPanelItems = new Map();

const ModalPanelItemsContext = React.createContext<ModalPanelItems>(EMPTY_ITEMS);

export interface ModalPanelProps {
  children?: React.ReactNode;
}

/**
 * Holds the registry of presented modal elements and renders the root-level ones after
 * `children`, so presented content is a sibling of the app tree rather than a descendant of
 * the view that opened it. Items whose `parentId` points at another item are rendered by the
 * `ModalPanelOutlet` inside that item's RN Modal.
 */
export const ModalPanel: React.FC<ModalPanelProps> = ({ children }) => {
  const [items, setItems] = useState<ModalPanelItems>(EMPTY_ITEMS);
  const nextOrder = useRef(0);

  const registry = useMemo<ModalPanelRegistry>(() => ({
    show: (id, element, parentId) => setItems((prev) => {
      const existing = prev.get(id);
      if (existing && existing.element === element && existing.parentId === parentId) {
        return prev;
      }
      const next = new Map(prev);
      next.set(id, {
        id,
        parentId,
        element,
        order: existing ? existing.order : nextOrder.current++,
      });
      return next;
    }),
    update: (id, element) => setItems((prev) => {
      const existing = prev.get(id);
      // A push that lands after `hide` must not resurrect the item.
      if (!existing || existing.element === element) {
        return prev;
      }
      const next = new Map(prev);
      next.set(id, { ...existing, element });
      return next;
    }),
    hide: (id) => setItems((prev) => {
      if (!prev.has(id)) {
        return prev;
      }
      const next = new Map(prev);
      next.delete(id);
      return next;
    }),
  }), []);

  return (
    <ModalPanelContext.Provider value={registry}>
      <ModalPanelItemsContext.Provider value={items}>
        {children}
        <ModalPanelOutlet parentId={null} />
      </ModalPanelItemsContext.Provider>
    </ModalPanelContext.Provider>
  );
};

ModalPanel.displayName = 'ModalPanel';

interface ModalPanelItemViewProps {
  element: React.ReactElement;
}

// Re-renders only when the pushed element identity changes.
const ModalPanelItemView = React.memo<ModalPanelItemViewProps>(({ element }) => element);

ModalPanelItemView.displayName = 'ModalPanelItem';

export interface ModalPanelOutletProps {
  parentId: string | null;
}

/**
 * Renders the registered items whose `parentId` matches, in the order they were first shown.
 * The panel renders one with `parentId={null}`; every hoisted `Modal` renders one with its own
 * id as the last child of its RN Modal.
 */
export const ModalPanelOutlet = React.memo<ModalPanelOutletProps>(({ parentId }) => {
  const items = useContext(ModalPanelItemsContext);

  const own = useMemo(() => {
    return Array.from(items.values())
      .filter((item) => item.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  }, [items, parentId]);

  return (
    <>
      {own.map((item) => (
        <ModalPanelItemView
          key={item.id}
          element={item.element}
        />
      ))}
    </>
  );
});

ModalPanelOutlet.displayName = 'ModalPanelOutlet';
