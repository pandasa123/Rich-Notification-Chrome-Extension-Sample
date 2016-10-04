// Code by @ArpitNext https://github.com/arpitnext/Rich-Notification-Chrome-Extension-Sample

function notify(message, image) {
  chrome.notifications.create("richnotify", {
        type: "image",
        iconUrl: "icon.png",
        imageUrl: image,
        title: "Notification Title",
        message: message,
        buttons: [{title: "Action 1"}, {title: "Action 2"}]
    }, function () {
          console.log("Notification showed!")
    })
}

function buttonsClicked(notificationId, buttonIndex) {
  if (buttonIndex === 0) { console.log("Action 1 clicked!") }
  if (buttonIndex === 1) { console.log("Action 2 clicked!") }
}

function notificationClicked() {
    console.log("Notification clicked!")
}

function run() {
  // we will use an online image here, and not a local image
  var imageURL = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";  // Requires "permissions" for https://www.google.com/ in manifest.json
  var message = "Sample message ...";

  /* As we can't pass an image URL, we will first convert it to data: URL. See restrictions here: https://developer.chrome.com/extensions/notifications#type-NotificationOptions  */

  convertImgToBase64URL(imageURL, function(base64Img){
    notify(message, base64Img);
  });
}

chrome.notifications.onClicked.addListener(notificationClicked);
chrome.notifications.onButtonClicked.addListener(buttonsClicked);


// Code of this function by Yasser B. from http://stackoverflow.com/questions/29606850/
function convertImgToBase64URL(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function(){
        var canvas = document.createElement("CANVAS"),
        ctx = canvas.getContext("2d"), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}


chrome.runtime.onInstalled.addListener(function(details) {
  run();
});
