import * as ComponentTypes from './componentTypes';

export const DefaultTypes = (theme) => {
  return ({
    RkText: ComponentTypes.RkTextTypes(theme),
    RkSeparator: ComponentTypes.RkSeparatorTypes(theme),
    RkButton: ComponentTypes.RkButtonTypes(theme),
    RkTextInput: ComponentTypes.RkTextInputTypes(theme),
    RkChoice: ComponentTypes.RkChoiceTypes(theme),
    RkChoiceGroup: ComponentTypes.RkChoiceGroupTypes(theme),
    RkCard: ComponentTypes.RkCardTypes(theme),
    RkTab: ComponentTypes.TabTypes(theme),
    RkModalImg: ComponentTypes.RkModalImgTypes(theme)
  })

};
