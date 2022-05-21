function findActionButtonWithText(text) {
  return [
    ...document.querySelectorAll(".board-editor__tools .actions .button"),
  ].find((button) => {
    return button.innerText.toLowerCase().includes(text);
  });
}

function clickPlayAsRandom() {
  console.log('clickPlayAsRandom');
  let randomSideButton = document.querySelector('.color-submits [title="Random side"]');
  randomSideButton.click();
}

function logElements() {
  console.log(document.querySelector('#modal-wrap'));
  console.log(document.querySelector('cg-board'));
  console.log(document.querySelector('.setup-content'));
  console.log(document.querySelector('.color-submits [title="Random side"]'));
}

browser.runtime.onMessage.addListener((request) => {
  return new Promise((resolve, reject) => {
    if (request.messageId === "set-up-board") {
      console.log('a');
      /*
      let clearBoardButton = findActionButtonWithText("clear board");
      if (!clearBoardButton) {
        return Promise.reject({ response: "Couldn't find Clear board button" });
      }
      clearBoardButton.click();
      */
      setTimeout(() => {
        console.log('setTimeout 1');
      }, 10);
      let continueButton = findActionButtonWithText('continue from here');
      continueButton.click();

      let playWithComputer = document.querySelector('#modal-wrap .button');
      playWithComputer.click();

      setTimeout(() => {
        console.log('setTimeout 2');
      }, 10);
  
      console.log('2');
      logElements();
      setTimeout(() => {
        console.log('setTimeout 3');
        logElements();
        resolve({ response: 'From inside setTimeout 3'});
        /*
        console.log('3');
        logElements();
        let randomSideButton = document.querySelector('.color-submits [title="Random side"]');
        if (!randomSideButton) {
          console.log('3a');
          reject("Didn't find Random side button");
        }
        console.log('3b');
        randomSideButton.click();
        resolve({ response: "Could click Random side button"});
        */
      }, 50);

      // console.log('2');
      // resolve({ response: 'End'});
  
    //  let fenInput = document.querySelector('#fen-input');
    //  fenInput.value = '4k3/8/8/3B4/8/3K1N2/8/8 w - - 0 1';
    //  fenInput.blur();
  
      // let whiteKnight = document.querySelector('.spare-white [data-role="knight"]');
      // whiteKnight.parentElement.parentElement.click();
  
      // document.querySelector('.copyables .copyable').value = '4k3/8/8/3B4/8/3K1N2/8/8 w - - 0 1';
  
      // return Promise.resolve({ response: "Clicked Clear board button" });
    }
  });
});

