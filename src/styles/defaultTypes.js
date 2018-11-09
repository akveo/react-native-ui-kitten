import * as ComponentTypes from './componentTypes';

export const DefaultTypes = (theme) => ({
  RkText: ComponentTypes.RkTextTypes(theme),
  RkBadge: ComponentTypes.RkBadgeTypes(theme),
  RkButton: ComponentTypes.RkButtonTypes(theme),
  RkTextInput: ComponentTypes.RkTextInputTypes(theme),
  RkChoice: ComponentTypes.RkChoiceTypes(theme),
  RkChoiceGroup: ComponentTypes.RkChoiceGroupTypes(theme),
  RkCard: ComponentTypes.RkCardTypes(theme),
  RkCalendar: ComponentTypes.RkCalendarTypes(theme),
  RkTabView: ComponentTypes.TabTypes(theme),
  RkTabSet: ComponentTypes.RkTabSetTypes(theme),
  RkGallery: ComponentTypes.RkGalleryTypes(theme),
  RkModalImg: ComponentTypes.RkModalImgTypes(theme),
  RkAvoidKeyboard: ComponentTypes.RkAvoidKeyboardTypes(theme),
  RkPicker: ComponentTypes.RkPickerTypes(theme),
  RkSwitch: ComponentTypes.RkSwitchTypes(theme),
  RkOptionsList: ComponentTypes.RkPickerTypes(theme),
});
