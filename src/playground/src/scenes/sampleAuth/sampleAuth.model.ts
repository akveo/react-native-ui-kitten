import * as Yup from 'yup';

export class SampleAuthData {

  constructor(readonly email: string,
              readonly password: string,
              readonly role: string,
              readonly termsAccepted: boolean) {

  }

  static empty(): SampleAuthData {
    return new SampleAuthData(
      null,
      null,
      'Developer',
      false,
    );
  }
}

export const SampleAuthRoles: Record<string, string> = {
  developer: 'Developer',
  designer: 'Designer',
  productManager: 'Product Manager',
};

export const SampleAuthSchema = Yup.object().shape({
  email: Yup.string().required().email('Invalid email'),
  password: Yup.string().required().max(8, 'Password must be at least 8 characters'),
  role: Yup.string().required('Role is required'),
  termsAccepted: Yup.boolean().required().oneOf([true]),
});
