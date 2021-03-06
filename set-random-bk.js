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

function goToEditor(resolve) {
  let editorLink = document.querySelector('a[href="/editor"]');
  editorLink.click();
  resolve({ response: 'on-editor' });
}

function startPlayWithComputer(resolve) {
  let continueButton = findActionButtonWithText('continue from here');
  continueButton.click();

  let playWithComputer = document.querySelector('#modal-wrap .button');
  playWithComputer.click();

  resolve({ response: 'on-play-modal' });
}

function loadFen(resolve) {
  let fenInput = document.querySelector('#fen-input');
  fenInput.value = randomFenWithBishopKnight();

  let event = new InputEvent('input');
  fenInput.dispatchEvent(event);

  let playAsWhiteButton = document.querySelector('.color-submits [title="White"]');
  playAsWhiteButton.click();
  resolve({ response: 'play-as-white' });
}

browser.runtime.onMessage.addListener((request) => {
  return new Promise((resolve, reject) => {
    let { messageId } = request;

    if (messageId === 'go-to-editor') {
      goToEditor(resolve);
    }

    if (messageId === 'play-with-computer') {
      startPlayWithComputer(resolve);
    }

    if (messageId === 'load-fen') {
      loadFen(resolve);
    }
  });
});
