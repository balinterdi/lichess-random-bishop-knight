function onError(error) {
  console.error(`Error: ${error}`);
}

const sendMessage = browser.tabs.sendMessage;

function sendCommands(tabs) {
  for (let tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { messageId: 'go-to-editor' })
      .then(({ response }) => {
        if (response === 'on-editor') {
          setTimeout(() => {
            sendMessage(tab.id, { messageId: 'play-with-computer' })
              .then(({ response }) => {
                if (response === 'on-play-modal') {
                  setTimeout(() => {
                    sendMessage(tab.id, { messageId: 'load-fen' })
                      .then(({ response }) => {
                        console.log('Response for on-play-modal', response);
                      });
                  }, 250);
                }
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
    .then(sendCommands)
    .catch(onError);
});
