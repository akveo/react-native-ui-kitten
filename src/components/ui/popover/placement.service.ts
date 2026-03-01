/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';
import { Frame } from '../../devsupport';

const PLACEMENT_FAMILIES: string[] = [
  PopoverPlacements.BOTTOM.rawValue,
  PopoverPlacements.TOP.rawValue,
  PopoverPlacements.LEFT.rawValue,
  PopoverPlacements.RIGHT.rawValue,
  PopoverPlacements.INNER.rawValue,
];

/**
 * Service for finding the best popover placement that fits within bounds.
 * Tries preferred placement first, then falls back to alternatives.
 */
export class PopoverPlacementService {

  public find(preferredValue: PopoverPlacement, options: PlacementOptions): PopoverPlacement {
    const placement = this.findRecursive(preferredValue, [...PLACEMENT_FAMILIES], options);
    return placement || preferredValue;
  }

  private findRecursive(
    placement: PopoverPlacement,
    families: string[],
    options: PlacementOptions,
  ): PopoverPlacement | null {
    // Try to find a fitting placement in the current family
    const oneOfCurrentFamily = this.findFromFamily(placement, options);
    if (oneOfCurrentFamily) {
      return oneOfCurrentFamily;
    }

    // Try the reversed family (e.g., if bottom doesn't fit, try top)
    const oneOfReversedFamily = this.findFromFamily(placement.reverse(), options);
    if (oneOfReversedFamily) {
      return oneOfReversedFamily;
    }

    // Remove tried families and try the next one
    // Fix: Using filter instead of delete to avoid array holes
    const remainingFamilies = families.filter(
      (f) => f !== placement.parent().rawValue && f !== placement.reverse().parent().rawValue
    );

    if (remainingFamilies.length > 0) {
      const nextPlacement = PopoverPlacements.parse(remainingFamilies[0]);
      return this.findRecursive(nextPlacement, remainingFamilies, options);
    }

    return null;
  }

  private findFromFamily(placement: PopoverPlacement, options: PlacementOptions): PopoverPlacement | null {
    const preferredFrame: Frame = placement.frame(options);

    if (placement.fits(preferredFrame, options.bounds)) {
      return placement;
    }

    return placement.family().find((familyValue: PopoverPlacement): boolean => {
      const familyFrame = familyValue.frame(options);
      return familyValue.fits(familyFrame, options.bounds);
    }) || null;
  }
}
