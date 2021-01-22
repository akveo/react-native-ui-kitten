/*
  Minified version of this file inlined into index.html (script element after #uik-dialog-container).
*/

(function () {
  var dialogContainerElement = document.getElementById('uik-dialog-container');
  var downloadButton = document.getElementById('download-dialog-button');
  var closeButton = document.getElementById('uik-dialog-close');

  downloadButton.addEventListener('click', showDownloadDialog);
  closeButton.addEventListener('click', hideDialog);

  function showDownloadDialog() {
    dialogContainerElement.removeAttribute('hidden');
  }

  function hideDialog() {
    dialogContainerElement.setAttribute('hidden', '');
  }

  hbspt.forms.create({
    portalId: '2452262',
    formId: 'f6b2c0c6-d488-4944-bd8b-ee97bb5a8fd5',
    target: '#uik-dialog-body',
    submitButtonClass: 'hs-submit-btn btn',
    css: '',
    cssClass: 'hs-custom-form',
    redirectUrl: 'https://github.com/akveo/react-native-ui-kitten'
  });
})();
