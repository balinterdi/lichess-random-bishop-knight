function onError(error) {
  console.error(`Error: ${error}`);
}

const sendMessage = browser.tabs.sendMessage;

function sendSetUpBoard(tabs) {
  for (let tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { messageId: "set-up-board" })
      .then((response) => {
        if (response.response === 'on-play-modal') {
          setTimeout(() => {
            sendMessage(tab.id, { messageId: "load-fen" })
              .then((response) => {
                console.log('Response for on-play-modal', response.response);
              });
          }, 250);
        }
      })
      .catch(onError);
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then(sendSetUpBoard)
    .catch(onError);
});
