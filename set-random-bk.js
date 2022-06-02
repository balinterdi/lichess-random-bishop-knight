function findActionButtonWithText(text) {
  return [
    ...document.querySelectorAll('.board-editor__tools .actions .button'),
  ].find((button) => {
    return button.innerText.toLowerCase().includes(text);
  });
}

function logElements() {
  console.log(document.querySelector('#modal-wrap'));
  console.log(document.querySelector('cg-board'));
  console.log(document.querySelector('.setup-content'));
  console.log(document.querySelector('.color-submits [title="White"]'));
}

function goToEditor() {
  let editorLink = document.querySelector('a[href="/editor"]');
  editorLink.click();

  /*
  This only returns a Promise when the callback parameter is not specified, and with MV3+. The type inside the Promise is the same as the 1st argument to callback.
  https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage
  */
  chrome.runtime.sendMessage(null, { response: 'on-editor'});
}

function startPlayWithComputer() {
  let continueButton = findActionButtonWithText('continue from here');
  continueButton.click();

  let playWithComputer = document.querySelector('#modal-wrap .button');
  playWithComputer.click();

  chrome.runtime.sendMessage(null, { response: 'on-play-modal' });
}

function loadFen() {
  let fenInput = document.querySelector('#fen-input');
  fenInput.value = randomFenWithBishopKnight();

  let event = new InputEvent('input');
  fenInput.dispatchEvent(event);

  // TODO: Choose the most difficult engine level

  let playAsWhiteButton = document.querySelector('.color-submits [title="White"]');
  playAsWhiteButton.click();

  chrome.runtime.sendMessage(null, { response: 'game-started' });
}

chrome.runtime.onMessage.addListener((request) => {
  let { messageId } = request;

  if (messageId === 'go-to-editor') {
    goToEditor();
    chrome.runtime.sendMessage()
  }

  if (messageId === 'play-with-computer') {
    startPlayWithComputer();
  }

  if (messageId === 'load-fen') {
    loadFen();
  }
});
