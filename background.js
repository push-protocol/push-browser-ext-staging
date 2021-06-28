/*global chrome*/
chrome.runtime.onInstalled.addListener(function () {
  console.log('Installed')
})
const channel = new BroadcastChannel('sw-messages')
channel.addEventListener('message', (event) => {
  // chrome.storage.local.get(['epnsNot'], function (result)
  if (event.data.data) console.log('Noti')
  console.log(event.data.data)
  chrome.storage.local.set(
    { epnsNot: event.data.data.notification },
    function () {},
  )
  console.log('Received', event.data.data.notification)
//   setNotify(event.data.data.notification)
})
