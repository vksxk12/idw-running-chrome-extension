// "use strict";
// chrome.contextMenus.create({title: "T-Dolls:JamaMono"});

chrome.storage.sync.get(["yourBody"], function(items){
  console.log(JSON.stringify(items));
});