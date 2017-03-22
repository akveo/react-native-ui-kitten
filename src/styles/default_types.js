import * as ComponentTypes from './component_types';

export const DefaultTypes = (theme) => {
  return ({
    RkText: ComponentTypes.RkTextTypes(theme),
    RkSeparator: ComponentTypes.RkSeparatorTypes(theme),
    RkButton: ComponentTypes.RkButtonTypes(theme),
    RkTextInput: ComponentTypes.RkTextInputTypes(theme),
    RkChoice: ComponentTypes.RkChoiceTypes(theme),
    RkCard: ComponentTypes.RkCardTypes(theme),
    RkTab: ComponentTypes.TabTypes(theme),
  })

};
