import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Formik,
  FormikConfig,
  FormikProps,
} from 'formik';
import {
  Button,
  CheckBox,
  Icon,
  IconElement,
  Input,
  Select,
  SelectOptionType,
  StyleType,
} from '@ui-kitten/components';
import {
  SampleAuthData,
  SampleAuthRoles,
} from './sampleAuth.model';

export type SampleAuthFormProps = FormikConfig<SampleAuthData>;

export const SampleAuthForm = (props: SampleAuthFormProps): React.ReactElement<SampleAuthFormProps> => {

  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const roleOptions: SelectOptionType[] = Object.keys(SampleAuthRoles).map((roleKey: string): SelectOptionType => ({
    text: SampleAuthRoles[roleKey],
  }));

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (style: StyleType): IconElement => (
    <Icon
      {...style}
      name={passwordVisible ? 'eye' : 'eye-off'}
    />
  );

  const renderForm = (formik: FormikProps<SampleAuthData>): React.ReactFragment => (
    <React.Fragment>
      <Input
        style={styles.formInput}
        label='Email'
        placeholder='contact@akveo.com'
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
      />
      <Input
        style={styles.formInput}
        secureTextEntry={!passwordVisible}
        label='Password'
        placeholder='********'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        icon={renderPasswordIcon}
        onIconPress={onPasswordIconPress}
      />
      <Select
        style={styles.formInput}
        label='Role'
        data={roleOptions}
        selectedOption={{ text: formik.values.role }}
        onSelect={(option: SelectOptionType) => formik.setFieldValue('role', option.text)}
      />
      <CheckBox
        style={styles.termsCheckbox}
        checked={formik.values.termsAccepted}
        onChange={(checked) => formik.setFieldValue('termsAccepted', checked)}
        text='I agree to Terms & Conditions'
      />
      <Button
        style={styles.signInButton}
        disabled={formik.isValid}
        onPress={() => formik.handleSubmit()}>
        SIGN UP
      </Button>
    </React.Fragment>
  );

  return (
    <Formik {...props}>
      {renderForm}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formInput: {
    marginVertical: 4,
  },
  termsCheckbox: {
    marginVertical: 8,
  },
  signInButton: {
    marginTop: 24,
  },
});
