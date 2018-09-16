// https://developer.chrome.com/extensions/history
// deleteUrl − chrome.history.deleteUrl(object details, function callback)

// https://developer.chrome.com/extensions/declarativeContent
// Why declarative content api?
// Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content. 

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
