browser.runtime.onMessage.addListener((request) => {
  if (request.messageId === "set-up-board") {
    let clearBoardButton = [
      ...document.querySelectorAll(".board-editor__tools .actions .button"),
    ].find((button) => {
      return button.innerText.toLowerCase().includes("clear board");
    });
    if (!clearBoardButton) {
      return Promise.reject({ response: "Couldn't find Clear board button" });
    }
    clearBoardButton.click();
    return Promise.resolve({ response: "Clicked Clear board button" });
  }
});
