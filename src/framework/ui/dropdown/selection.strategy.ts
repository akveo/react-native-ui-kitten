import { DropdownItemType } from './droppdownItem.component';

export interface SelectionStrategy {
  selectedOption: DropdownItemType | DropdownItemType[];
  isSelected: (item: DropdownItemType) => boolean;
  select: (option: DropdownItemType) => void;
  getPlaceholder: (placeholder: string) => string;
  onSelect: (callback?: () => void) => DropdownItemType | DropdownItemType[];
}

export class MultiSelectStrategy implements SelectionStrategy {

  public selectedOption: DropdownItemType[];

  constructor(options: DropdownItemType | DropdownItemType[]) {
    if (Array.isArray(options)) {
      this.selectedOption = options;
    }
  }

  public select(option: DropdownItemType): void {
    const optionAlreadyExist: boolean = this.selectedOption
      .some((item: DropdownItemType) => item === option);
    if (optionAlreadyExist) {
      this.removeOption(option);
    } else {
      this.selectedOption.push(option);
    }
  }

  public getPlaceholder(placeholder: string): string {
    if (this.isSelectedOptionExist()) {
      return this.selectedOption.map((item: DropdownItemType) => item.text).join(', ');
    } else {
      return placeholder;
    }
  }

  public onSelect(): DropdownItemType[] {
    return this.selectedOption;
  }

  public isSelected(item: DropdownItemType): boolean {
    return this.selectedOption.some((option: DropdownItemType) => option === item);
  }

  private isSelectedOptionExist(): boolean {
    return this.selectedOption && this.selectedOption.length !== 0;
  }

  private removeOption(option: DropdownItemType): void {
    const index: number = this.selectedOption
      .findIndex((item: DropdownItemType) => item === option);
    if (index !== -1) {
      this.selectedOption.splice(index, 1);
    }
  }
}

export class SingleSelectStrategy implements SelectionStrategy {

  public selectedOption: DropdownItemType;

  constructor(options: DropdownItemType | DropdownItemType[]) {
    if (!Array.isArray(options)) {
      this.selectedOption = options;
    }
  }

  public select(option: DropdownItemType): void {
    this.selectedOption = option;
  }

  public getPlaceholder(placeholder: string): string {
    if (this.selectedOption) {
      return this.selectedOption.text;
    } else {
      return placeholder;
    }
  }

  public onSelect(callBack: () => void): DropdownItemType {
    callBack();
    return this.selectedOption;
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
