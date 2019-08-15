import { DropdownItemType } from './droppdownItem.component';

export interface SelectionStrategy {
  selectedOption: DropdownItemType | DropdownItemType[];
  isSelected: (item: DropdownItemType) => boolean;
  select: (option: DropdownItemType, callback?: () => void) => DropdownItemType | DropdownItemType[];
  getPlaceholder: (placeholder: string) => string;
}

export class MultiSelectStrategy implements SelectionStrategy {

  public selectedOption: DropdownItemType[];

  constructor(options: DropdownItemType | DropdownItemType[]) {
    if (Array.isArray(options)) {
      this.selectedOption = options;
    }
  }

  public select(option: DropdownItemType, callback?: () => void): DropdownItemType[] {
    const subOptionsExist: boolean = this.areThereSubOptions(option);

    if (subOptionsExist) {
      this.selectOptionWithSubOptions(option);
    } else {
      this.selectDefaultOption(option);
    }

    return this.selectedOption;
  }

  private selectDefaultOption(option: DropdownItemType): void {
    const optionAlreadyExist: boolean = this.selectedOption
      .some((item: DropdownItemType) => {
        return item === option;
      });
    if (optionAlreadyExist) {
      this.removeOption(option);
    } else {
      this.selectedOption.push(option);
    }
  }

  private selectOptionWithSubOptions(option: DropdownItemType): void {
    const subOptionsAlreadyExist: boolean = this.selectedOption
      .some((item: DropdownItemType) => {
        return option.items
          .some((subItem: DropdownItemType) => {
            return subItem === item;
          });
      });

    if (subOptionsAlreadyExist) {
      option.items.forEach((subItem: DropdownItemType) => this.removeOption(subItem));
    } else {
      const enabledItems: DropdownItemType[] = option.items
        .filter((item: DropdownItemType) => {
          return !item.disabled;
        });
      this.selectedOption = this.selectedOption.concat(enabledItems);
    }
  }

  public getPlaceholder(placeholder: string): string {
    if (this.isSelectedOptionExist()) {
      return this.selectedOption
        .map((item: DropdownItemType) => {
          return item && item.text;
        })
        .join(', ');
    } else {
      return placeholder;
    }
  }

  public isSelected(item: DropdownItemType): boolean {
    return this.selectedOption
      .some((option: DropdownItemType) => {
        return option === item;
      });
  }

  private isSelectedOptionExist(): boolean {
    return this.selectedOption && this.selectedOption.length !== 0;
  }

  private removeOption(option: DropdownItemType): void {
    const index: number = this.selectedOption
      .findIndex((item: DropdownItemType) => {
        return item === option;
      });
    if (index !== -1) {
      this.selectedOption.splice(index, 1);
    }
  }

  private areThereSubOptions(option: DropdownItemType): boolean {
    return option.items && option.items.length !== 0;
  }
}

export class SingleSelectStrategy implements SelectionStrategy {

  public selectedOption: DropdownItemType;

  constructor(options: DropdownItemType | DropdownItemType[]) {
    if (!Array.isArray(options)) {
      this.selectedOption = options;
    }
  }

  public select(option: DropdownItemType, callback?: () => void): DropdownItemType {
    this.selectedOption = option;
    callback();
    return this.selectedOption;
  }

  public getPlaceholder(placeholder: string): string {
    if (this.selectedOption) {
      return this.selectedOption.text;
    } else {
      return placeholder;
    }
  }

  public isSelected(item: DropdownItemType): boolean {
    if (this.hasOptionSubItems(item)) {
      return item.items.some((option: DropdownItemType) => {
        return this.isSelected(option);
      });
    } else {
      return this.selectedOption === item;
    }
  }

  private hasOptionSubItems(option: DropdownItemType): boolean {
    return option.items && option.items.length !== 0;
  }
}
