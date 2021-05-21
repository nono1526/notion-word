async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function addMouseEvent () {
  const tab = await getCurrentTab()

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['mouseEvent.js']
  })


}

chrome.tabs.onUpdated.addListener(addMouseEvent)

// chrome.runtime.onInstalled.addListener(async () => {


//   // try {
//   //   const tab = await getCurrentTab()
//   //   chrome.scripting.executeScript({
//   //     target: { tabId: tab.id },
//   //     function: onActionClick
//   //   })
//   // } catch (error) {
//   //   console.error(error)
//   // }
//   // console.log(tab)
//   // chrome.contextMenus.create({
//   //   "id": "sampleContextMenu",
//   //   "title": "Sample Context Menu",
//   //   "contexts": ["selection"]
//   // });
//   // chrome.scripting.executeScript({
//   //   target: { tabId: tab.id },
//   //   function: onActionClick
//   // })
// });
