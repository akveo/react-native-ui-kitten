import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  Card,
  CardElement,
  CardProps,
  CardFooterElement,
  CardHeaderElement,
} from './card.component';
import { CardHeader } from './cardHeader.component';
import {
  mapping,
  theme,
} from '../support/tests';


