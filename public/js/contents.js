// "use strict";

var obj = {};
var interval;
var doll;
var fp;
var show;

function init_vals(o) {
  console.log(this);
  interval = o["interval"] || 5.0;
  doll = o["doll"] || "IDWMod";
  fp = o["footprint"] || "shoes";
  show = o["show"] || "0";

  console.log(interval);
  console.log("doll", doll);
  console.log(fp);
  console.log(show);

}

function load_data() {
  // if (!chrome.storage || !chrome.storage.sync) {
  //   console.log("not ready.");
  //   setTimeout(function () {
  //     load_data();
  //   }, 1000);
  //   return;
  // }
  chrome.storage.sync.get("settings", function (items) {
    obj = items["settings"];
    init_vals(obj);
    run();
  });
}

$(function () {
  // init_vals(obj);
  load_data();
});


function run() {
  // console.log(this);
  // console.log("doll", doll);

  let doll_url = "images/dolls/" + doll + "-move.gif";

  console.log("doll_url=", doll_url);

  let $body = $('body');
  let $cat_running = $('<img width="200">');
  let imgRunningUrl = chrome.extension.getURL(doll_url);
  $cat_running.attr("src", imgRunningUrl);
  $cat_running.css({
    position: "fixed",
    top: -200,
    left: -200,
    zIndex: "9999998",
    width: '200px',
    pointerEvents: "none"
  });
  $body.append($cat_running);

  // setInterval(running, 3000);
  setTimeout(running, 1000);

  var sid = 0;

  function running(start, end) {

    if ("all" == show) {
    } else if (document.hasFocus()) {
    } else {
      setTimeout(running, interval * 1000);
      return;
    }

    const size = 200;
    let direction = rand(1, 4);
    var $window = $(window);
    var start = {};
    var end = {};
    var radian = 0;
    switch (direction) {
      case 1:
        start = {top: rand(1, $window.height() - size), left: -1 * size};
        end = {top: rand(1, $window.height()), left: $window.width() + size};
        break;
      case 2:
        start = {
          top: rand(1, $window.height() - size),
          left: $window.width() + size
        };
        end = {top: rand(1, $window.height()), left: -1 * size};
        break;
      case 3:
        start = {top: -1 * size, left: rand(1, $window.width() - size)};
        end = {
          top: $window.height() + size,
          left: rand(1, start.left + size)
        };
      case 4:
        start = {top: -1 * size, left: rand(1, $window.width() - size)};
        end = {
          top: $window.height() + size,
          left: rand(1, start.left - size)
        };
        break;
      default:
    }
    if (start.left < end.left) {
      $cat_running.css({
        transform: "scale(1, 1)"
      });
    } else {
      $cat_running.css({
        transform: "scale(-1, 1)"
      });
    }
    radian = getRadian(start, end);
    var degree = radian * (180 / Math.PI);
    $cat_running.css(start);

    let url = "images/footprints/" + fp + ".png";

    sid = setInterval(() => {
      let $footstamp = $('<img style="width:60px;height:60px;">');
      let imgFootstampUrl = chrome.extension.getURL(url);
      let offset = $cat_running.offset();
      $footstamp.attr("src", imgFootstampUrl);
      $footstamp.css({
        position: "fixed",
        transform: "rotate(" + degree + "deg)",
        top: offset.top + 130 - $window.scrollTop(),
        left: offset.left + 100,
        width: '45px',
        height: '45px',
        zIndex: "9999997",
        pointerEvents: "none"
      });
      $body.append($footstamp);
      setTimeout(function () {
        $footstamp.fadeOut(200);
      }, 2000);
    }, 250);

    $cat_running.animate(end, 5000, function () {
      clearInterval(sid);
      setTimeout(running, interval * 1000);

    });
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRadian(start, end) {
    let radian = Math.atan2(end.top - start.top, end.left - start.left);
    return radian;
  }

}


