/*
  Minified version of this file inlined into index.html (script element after #uik-dialog-container-template).
*/

(function () {
  var downloadDialogConfig = {
    portalId: '2452262',
    formId: 'f6b2c0c6-d488-4944-bd8b-ee97bb5a8fd5',
    target: '#download-dialog-body',
    submitButtonClass: 'hs-submit-btn btn',
    css: '',
    cssClass: 'hs-custom-form',
    redirectUrl: 'https://github.com/akveo/react-native-ui-kitten'
  };
  var forBusinessDialogConfig = {
    portalId: "2452262",
    formId: "27686f53-ce60-4a92-a789-fe684f6ad941",
    target: '#for-business-dialog-body',
    submitButtonClass: 'hs-submit-btn btn',
    css: '',
    cssClass: 'hs-custom-form',
  };

  createHubspotDialog('download-dialog-button', downloadDialogConfig);
  createHubspotDialog('for-business-dialog-button', forBusinessDialogConfig);

  function createHubspotDialog(openButtonId, hubspotConfig) {
    var dialogContainerElementTemplate = document.getElementById('uik-dialog-container-template');
    var dialogContainerElement = dialogContainerElementTemplate.cloneNode(true);
    dialogContainerElement.removeAttribute('id');
    var dialogBodyElement = dialogContainerElement.querySelector('.uik-dialog-body');
    dialogBodyElement.setAttribute('id', hubspotConfig.target.replace('#', ''));
    document.body.appendChild(dialogContainerElement);

    var openButton = document.getElementById(openButtonId);
    var closeButton = dialogContainerElement.querySelector('.uik-dialog-close');

    openButton.addEventListener('click', showDialog, false);
    closeButton.addEventListener('click', hideDialog, false);

    function showDialog() {
      dialogContainerElement.removeAttribute('hidden');
    }

    function hideDialog() {
      dialogContainerElement.setAttribute('hidden', '');
    }

    hbspt.forms.create(hubspotConfig);
  }
})();
