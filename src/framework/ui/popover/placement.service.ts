import {
  Frame,
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';

const PLACEMENT_FAMILIES: string[] = [
  PopoverPlacements.BOTTOM.rawValue,
  PopoverPlacements.TOP.rawValue,
  PopoverPlacements.LEFT.rawValue,
  PopoverPlacements.RIGHT.rawValue,
];

export class PopoverPlacementService {

  constructor(private value: PopoverPlacement, private bounds: Frame) {
  }

  public find(options: PlacementOptions): PopoverPlacement {
    const placement: PopoverPlacement = this.findRecursive(this.value, PLACEMENT_FAMILIES, options);

    if (placement) {
      this.value = placement;
    }

    return this.value;
  }

  public getValue(): PopoverPlacement {
    return this.value;
  }

  private findRecursive(placement: PopoverPlacement, families: string[], options: PlacementOptions): PopoverPlacement {
    const oneOfCurrentFamily: PopoverPlacement = this.findFromFamily(placement, options);

    if (oneOfCurrentFamily) {
      return oneOfCurrentFamily;
    }

    const oneOfReversedFamily: PopoverPlacement = this.findFromFamily(placement.reverse(), options);

    if (oneOfReversedFamily) {
      return oneOfReversedFamily;
    }

    delete families[families.indexOf(placement.parent().rawValue)];
    delete families[families.indexOf(placement.reverse().parent().rawValue)];

    const firstTruthy: string = families.filter(Boolean)[0];

    if (firstTruthy) {
      const nextPlacement: PopoverPlacement = PopoverPlacements.parse(firstTruthy);

      return this.findRecursive(nextPlacement, families, options);
    }

    return null;
  }

  private findFromFamily(placement: PopoverPlacement, options: PlacementOptions): PopoverPlacement {
    const preferredFrame: Frame = placement.frame(options);

    if (placement.fits(preferredFrame, this.bounds)) {
      return placement;
    }

    return placement.family().find((familyValue: PopoverPlacement): boolean => {
      const familyFrame = familyValue.frame(options);

      return familyValue.fits(familyFrame, this.bounds);
    });
  }
}
