import { SelectOptionType } from './selectOption.component';
import { KeyExtractorType } from './select.component';

export abstract class SelectionStrategy<S> {

  public selectedOption: S;
  protected keyExtractor: KeyExtractorType;

  protected constructor(options: S, data: SelectOptionType[], keyExtractor?: KeyExtractorType) {

    this.selectedOption = options;
    this.keyExtractor = keyExtractor;
    this.verifyData(data);
  }

  public abstract isSelected(item: SelectOptionType): boolean;

  public abstract select(option: SelectOptionType, callback?: () => void): S;

  public abstract getPlaceholder(placeholder: string): string;

  protected abstract verifyData(data: SelectOptionType[]): void;

  protected compareOptions(option1: SelectOptionType, option2: SelectOptionType): boolean {
    if (!this.keyExtractor) {
      return option1 === option2;
    } else {
      return (option1 && option2) && this.keyExtractor(option1) === this.keyExtractor(option2);
    }
  }

  protected hasOptionSubItems(option: SelectOptionType): boolean {
    return option.items && option.items.length !== 0;
  }

  protected processData(data: SelectOptionType[]): string[] {
    return data
      .reduce((acc: string[], current: SelectOptionType) => {
        if (this.hasOptionSubItems(current)) {
          const subTexts: string[] = current.items.map((item: SelectOptionType) => {
            return item.text;
          });
          return acc.concat(subTexts);
        } else {
          acc.push(current.text);
          return acc;
        }
      }, []);
  }
}

export class MultiSelectStrategy extends SelectionStrategy<SelectOptionType[]> {

  constructor(options: SelectOptionType | SelectOptionType[] = [],
              data: SelectOptionType[],
              keyExtractor?: KeyExtractorType) {

    if (Array.isArray(options)) {
      super(options, data, keyExtractor);
    }
  }

  public select(option: SelectOptionType, callback?: () => void): SelectOptionType[] {
    const subOptionsExist: boolean = this.hasOptionSubItems(option);

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
        return this.compareOptions(item, option);
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
        return this.compareOptions(item, option);
      });
  }

  private isSelectedOptionExist(): boolean {
    return this.selectedOption && this.selectedOption.length !== 0;
  }

  private removeOption(option: SelectOptionType): void {
    const index: number = this.selectedOption
      .findIndex((item: SelectOptionType) => {
        return this.compareOptions(item, option);
      });
    if (index !== -1) {
      this.selectedOption.splice(index, 1);
    }
  }

  protected verifyData(data: SelectOptionType[]): void {
    const selectedItemsAreCorrect: boolean = this.processData(data).some((item: string) => {
      return this.selectedOption.some((selected: SelectOptionType) => {
        return selected.text === item;
      });
    });

    if (!selectedItemsAreCorrect && this.selectedOption.length !== 0) {
      const message: string = `Some Option doesn't exist in the data array or you ` +
        'set Main group option selected.';
      throw Error(message);
    }
  }
}

export class SingleSelectStrategy extends SelectionStrategy<SelectOptionType> {

  constructor(options: SelectOptionType | SelectOptionType[],
              data: SelectOptionType[],
              keyExtractor?: KeyExtractorType) {

    if (!Array.isArray(options)) {
      super(options, data, keyExtractor);
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
      return this.compareOptions(item, this.selectedOption);
    }
  }

  protected verifyData(data: SelectOptionType[]): void {
    const selectedItemsAreCorrect: boolean = this.processData(data).some((item: string) => {
      if (this.selectedOption) {
        return item === this.selectedOption.text;
      }
    });

    if (!selectedItemsAreCorrect && this.selectedOption) {
      const message: string = `Option \"${this.selectedOption.text}\" doesn't exist in the data array!`;
      throw Error(message);
    }
  }
}
