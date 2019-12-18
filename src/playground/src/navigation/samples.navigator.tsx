import { createStackNavigator } from 'react-navigation-stack';
import { SamplesScreen } from '@pg/scenes/samples/samples.component';
import { SampleAuthScreen } from '@pg/scenes/sampleAuth/sampleAuth.component';

export const SamplesNavigator = createStackNavigator({
  ['Samples']: SamplesScreen,
  ['Auth']: SampleAuthScreen,
}, {
  headerMode: 'none',
});
