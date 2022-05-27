function findActionButtonWithText(text) {
  return [
    ...document.querySelectorAll(".board-editor__tools .actions .button"),
  ].find((button) => {
    return button.innerText.toLowerCase().includes(text);
  });
}

function logElements() {
  console.log(document.querySelector("#modal-wrap"));
  console.log(document.querySelector("cg-board"));
  console.log(document.querySelector(".setup-content"));
  console.log(document.querySelector('.color-submits [title="White"]'));
}

function startPlayWithComputer(resolve) {
  let continueButton = findActionButtonWithText("continue from here");
  continueButton.click();

  let playWithComputer = document.querySelector("#modal-wrap .button");
  playWithComputer.click();

  resolve({ response: 'on-play-modal' });
}

function loadFen(resolve) {
  let fenInput = document.querySelector("#fen-input");
  fenInput.value = "4k3/8/8/3B4/8/3K1N2/8/8 w - - 0 1";
  let event = new InputEvent('input');
  fenInput.dispatchEvent(event);

  let playAsWhiteButton = document.querySelector('.color-submits [title="White"]');
  playAsWhiteButton.click();
  resolve({ response: 'play-as-white' });
}

browser.runtime.onMessage.addListener((request) => {
  // One needs to be on Board Editor /editor for the following to work
  // TODO: The first step should be to go to /editor
  return new Promise((resolve, reject) => {
    let { messageId } = request;
    if (messageId === "set-up-board") {
      startPlayWithComputer(resolve);
    }

    if (messageId === "load-fen") {
      loadFen(resolve);
    }
  });
});
