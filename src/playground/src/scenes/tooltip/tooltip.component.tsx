import React from 'react';
import {
  TooltipElement,
  TooltipProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { TooltipShowcase } from './tooltipShowcase.component';
import {
  tooltipSettings,
  tooltipShowcase,
} from './type';

export const TooltipScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: TooltipProps): TooltipElement => (
    <TooltipShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={tooltipShowcase}
      settings={tooltipSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

