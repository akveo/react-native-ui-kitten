import { Component } from '@angular/core';

@Component({
  selector: 'react-footer',
  styleUrls: ['react-footer.component.scss'],
  template: `
      <div class="socio">
        <a href="https://github.com/akveo/react-native-ui-kitten">
          <img src="assets/githubBigLogo.png">
        </a>
        <a href="https://twitter.com/akveo_inc">
          <img src="assets/twitterLogoSilhouette.png">
        </a>
        <a href="https://www.facebook.com/akveo">
          <img src="assets/facebookLogo.png">
        </a>
      </div>
      <p>
        © 2015-2017 Akveo LLC<br>
        Documentation licensed under CC BY 4.0.
      </p>
      <p>
        Powered by <b>React Native</b>
      </p>
  `,

})

export class ReactFooterComponent {
}
