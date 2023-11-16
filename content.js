chrome.scripting.executeScript({
  target: { tabId: tab.id },
  function: fetchData,
});
