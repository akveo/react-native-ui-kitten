import { KeyExtractorType } from './select.component';
import { SelectOptionType } from './selectOption.component';

type Options = SelectOptionType | SelectOptionType[];

interface SelectStrategy<T = Options> {
  select: (option: SelectOptionType, selectedOptions: T) => T;
  isSelected: (option: SelectOptionType, selectedOptions: T) => boolean;
  toStringOptions: (options: T) => string;
}

interface SelectServiceOptions {
  multiSelect?: boolean;
  keyExtractor?: (option: SelectOptionType) => string;
}

export class SelectService {

  private strategy: SelectStrategy;

  constructor(options: SelectServiceOptions = {}) {
    const { multiSelect, keyExtractor } = options;
    this.strategy = multiSelect ? new MultiSelectStrategy(keyExtractor) : new SingleSelectStrategy(
      keyExtractor);
  }

  public select = (option: SelectOptionType, selectedOptions: Options): Options => {
    return this.strategy.select(option, selectedOptions);
  };

  public isSelected = (option: SelectOptionType, options: Options): boolean => {
    return this.strategy.isSelected(option, options);
  };

  public toStringOptions = (options: Options): string => {
    return options && this.strategy.toStringOptions(options);
  };

  static isGroup = (option: SelectOptionType): boolean => {
    return option.items && option.items.length > 0;
  };

  static toStringOption = (option: SelectOptionType): string => {
    return option.text;
  };

  static isEqualOptions = (lhs: SelectOptionType,
                           rhs: SelectOptionType,
                           keyExtractor?: KeyExtractorType): boolean => {

    if (keyExtractor) {
      return (lhs && rhs) && keyExtractor(lhs) === keyExtractor(rhs);
    }

    return lhs === rhs;
  };
}

class SingleSelectStrategy implements SelectStrategy<SelectOptionType> {

  constructor(private keyExtractor: KeyExtractorType) {
  }

  public select = (option: SelectOptionType): SelectOptionType => {
    return option;
  };

  public isSelected = (option: SelectOptionType, selectedOption: SelectOptionType): boolean => {
    if (SelectService.isGroup(option)) {
      return option.items.some(groupOption => this.isSelected(groupOption, selectedOption));
    }
    return SelectService.isEqualOptions(selectedOption, option, this.keyExtractor);
  };

  public toStringOptions = (option: SelectOptionType): string => {
    return SelectService.toStringOption(option);
  };
}

class MultiSelectStrategy implements SelectStrategy<SelectOptionType[]> {

  constructor(private keyExtractor: KeyExtractorType) {
  }

  public select = (option: SelectOptionType,
                   selectedOptions: SelectOptionType[] = []): SelectOptionType[] => {

    if (SelectService.isGroup(option)) {
      return this.selectOptionGroup(option, selectedOptions);
    } else {
      return this.selectOption(option, selectedOptions);
    }
  };

  public isSelected = (option: SelectOptionType,
                       selectedOptions: SelectOptionType[] = []): boolean => {

    return this.isOptionSelected(option, selectedOptions);
  };

  public toStringOptions = (options: SelectOptionType[] = []): string => {
    return options.map(SelectService.toStringOption).join(', ');
  };

  private selectOptionGroup = (option: SelectOptionType,
                               selectedOptions: SelectOptionType[]): SelectOptionType[] => {

    if (this.isGroupSelected(option, selectedOptions)) {
      return this.removeOptionGroup(option, selectedOptions);
    } else {
      return this.addOptionGroup(option, selectedOptions);
    }
  };

  private selectOption = (option: SelectOptionType,
                          selectedOptions: SelectOptionType[]): SelectOptionType[] => {

    if (this.isOptionSelected(option, selectedOptions)) {
      return this.removeOption(selectedOptions, option);
    } else {
      return this.addOption(option, selectedOptions);
    }
  };

  private isGroupSelected = (group: SelectOptionType,
                             selectedOptions: SelectOptionType[]): boolean => {

    return selectedOptions.some((selectedOption: SelectOptionType): boolean => {
      return this.isOptionSelected(selectedOption, group.items);
    });
  };

  private isOptionSelected = (option: SelectOptionType,
                              selectedOptions: SelectOptionType[]): boolean => {

    return selectedOptions.some((selectedOption: SelectOptionType): boolean => {
      return SelectService.isEqualOptions(selectedOption, option, this.keyExtractor);
    });
  };

  private addOptionGroup = (option: SelectOptionType,
                            selectedOptions: SelectOptionType[]): SelectOptionType[] => {

    const options: SelectOptionType[] = option.items.filter(groupOption => !groupOption.disabled);

    return selectedOptions.concat(options);
  };

  private addOption = (option: SelectOptionType,
                       selectedOptions: SelectOptionType[]) => {

    return selectedOptions.concat(option);
  };

  private removeOptionGroup = (option: SelectOptionType,
                               selectedOptions: SelectOptionType[]): SelectOptionType[] => {

    return option.items.reduce(this.removeOption, selectedOptions);
  };

  private removeOption = (selectedOptions: SelectOptionType[],
                          option: SelectOptionType): SelectOptionType[] => {

    return selectedOptions.filter((selectedOption: SelectOptionType): boolean => {
      return !SelectService.isEqualOptions(selectedOption, option, this.keyExtractor);
    });
  };
}

