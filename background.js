function onError(error) {
  console.error(`Error: ${error}`);
}

const sendMessage = chrome.tabs.sendMessage;
const onMessage = chrome.runtime.onMessage;

onMessage.addListener(({ response }, sender) => {
  // console.log('Message received: ', response, 'from ', sender.tab.id);
  if (response === 'on-editor') {
    setTimeout(() => {
      sendMessage(sender.tab.id, { messageId: 'play-with-computer' });
    }, 250);
  }

  if (response === 'on-play-modal') {
    setTimeout(() => {
      sendMessage(sender.tab.id, { messageId: 'load-fen' });
    }, 250);
  }
});

function sendCommands(tabs) {
  try {
    for (let tab of tabs) {
      sendMessage(tab.id, { messageId: 'go-to-editor' });
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
