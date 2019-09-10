import { SelectOptionType } from './selectOption.component';

export interface SelectionStrategy {
  selectedOption: SelectOptionType | SelectOptionType[];
  isSelected: (item: SelectOptionType) => boolean;
  select: (option: SelectOptionType, callback?: () => void) => SelectOptionType | SelectOptionType[];
  getPlaceholder: (placeholder: string) => string;
}

export class MultiSelectStrategy implements SelectionStrategy {

  public selectedOption: SelectOptionType[];

  constructor(options: SelectOptionType | SelectOptionType[]) {
    if (Array.isArray(options)) {
      this.selectedOption = options;
    }
  }

  public select(option: SelectOptionType, callback?: () => void): SelectOptionType[] {
    const subOptionsExist: boolean = this.areThereSubOptions(option);

    if (subOptionsExist) {
      this.selectOptionWithSubOptions(option);
    } else {
      this.selectDefaultOption(option);
    }

    return this.selectedOption;
  }

  private selectDefaultOption(option: SelectOptionType): void {
    const optionAlreadyExist: boolean = this.selectedOption
      .some((item: SelectOptionType) => {
        return item === option;
      });
    if (optionAlreadyExist) {
      this.removeOption(option);
    } else {
      this.selectedOption.push(option);
    }
  }

  private selectOptionWithSubOptions(option: SelectOptionType): void {
    const subOptionsAlreadyExist: boolean = this.selectedOption
      .some((item: SelectOptionType) => {
        return option.items
          .some((subItem: SelectOptionType) => {
            return subItem === item;
          });
      });

    if (subOptionsAlreadyExist) {
      option.items.forEach((subItem: SelectOptionType) => this.removeOption(subItem));
    } else {
      const enabledItems: SelectOptionType[] = option.items
        .filter((item: SelectOptionType) => {
          return !item.disabled;
        });
      this.selectedOption = this.selectedOption.concat(enabledItems);
    }
  }

  public getPlaceholder(placeholder: string): string {
    if (this.isSelectedOptionExist()) {
      return this.selectedOption
        .map((item: SelectOptionType) => {
          return item && item.text;
        })
        .join(', ');
    } else {
      return placeholder;
    }
  }

  public isSelected(item: SelectOptionType): boolean {
    return this.selectedOption
      .some((option: SelectOptionType) => {
        return option === item;
      });
  }

  private isSelectedOptionExist(): boolean {
    return this.selectedOption && this.selectedOption.length !== 0;
  }

  private removeOption(option: SelectOptionType): void {
    const index: number = this.selectedOption
      .findIndex((item: SelectOptionType) => {
        return item === option;
      });
    if (index !== -1) {
      this.selectedOption.splice(index, 1);
    }
  }

  private areThereSubOptions(option: SelectOptionType): boolean {
    return option.items && option.items.length !== 0;
  }
}

export class SingleSelectStrategy implements SelectionStrategy {

  public selectedOption: SelectOptionType;

  constructor(options: SelectOptionType | SelectOptionType[]) {
    if (!Array.isArray(options)) {
      this.selectedOption = options;
    }
  }

  public select(option: SelectOptionType, callback?: () => void): SelectOptionType {
    this.selectedOption = option;

    if (callback) {
      callback();
    }

    return this.selectedOption;
  }

  public getPlaceholder(placeholder: string): string {
    if (this.selectedOption) {
      return this.selectedOption.text;
    } else {
      return placeholder;
    }
  }

  public isSelected(item: SelectOptionType): boolean {
    if (this.hasOptionSubItems(item)) {
      return item.items.some((option: SelectOptionType) => {
        return this.isSelected(option);
      });
    } else {
      return this.selectedOption === item;
    }
  }

  private hasOptionSubItems(option: SelectOptionType): boolean {
    return option.items && option.items.length !== 0;
  }
}
