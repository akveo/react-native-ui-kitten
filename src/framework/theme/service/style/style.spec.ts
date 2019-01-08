import * as Service from './style.service';
import * as config from './style.spec.config';

describe('@style: service methods checks', () => {

  describe('* styling', () => {

    it('* default theme', () => {
      const style = Service.createThemedStyle(config.mapping, config.theme);

      expect(style).toMatchSnapshot();
    });

    it('* inverse theme', () => {
      const style = Service.createThemedStyle(config.mapping, config.themeInverse);

      expect(style).toMatchSnapshot();
    });

  });

});
