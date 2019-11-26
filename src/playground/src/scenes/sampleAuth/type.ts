export class SampleAuthData {

  constructor(readonly roles: string[]) {

  }

  static mocked(): SampleAuthData {
    return new SampleAuthData([
      'Developer',
      'Designer',
      'Product Manager',
    ]);
  }
}
