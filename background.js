function onError(error) {
  console.error(`Error: ${error}`);
}

function sendSetUpBoard(tabs) {
  console.log('sendSetupBoard');
  for (let tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { messageId: "set-up-board" })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
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
