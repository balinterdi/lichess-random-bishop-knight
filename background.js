function onError(error) {
  console.error(`Error: ${error}`);
}

const sendMessage = chrome.tabs.sendMessage;

async function sendCommands(tabs) {
  try {
    for (let tab of tabs) {
      let { response } = await sendMessage(tab.id, { messageId: 'go-to-editor' });
      if (response === 'on-editor') {
        setTimeout(async () => {
          let { response } = await sendMessage(tab.id, { messageId: 'play-with-computer' });
          if (response === 'on-play-modal') {
            setTimeout(async () => {
              let { response } = await sendMessage(tab.id, { messageId: 'load-fen' });
              console.log('Response for on-play-modal', response);
            }, 250);
          }
        }, 250);
      }
    }
  } catch(error) {
    onError(error);
  }
}

chrome.action.onClicked.addListener(async () => {
  try {
    let activeTabs = await chrome.tabs
      .query({
        currentWindow: true,
        active: true,
      });
    await sendCommands(activeTabs);
  } catch(error) {
    onError(error);
  }
});
