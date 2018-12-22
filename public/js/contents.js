// "use strict";

$(function () {
  var $visible = $(":visible").not('html').not('body').not('div').not('br');
  $visible.each((v, idx) => {
    let $tgt = $($visible[idx]);
    if ($tgt.prop("tagName") == 'DIV' && !$tgt.innerText) {
      $visible.splice(idx, 1);
    }
  });

  let $body = $('body');
  let $cat_running = $('<img width="200">');
  let imgRunningUrl = chrome.extension.getURL("images/idw-move.gif");
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
  setTimeout(running, 2000);
  // setTimeout(blocker, 1000);
  // init();


  var sid = 0;

  function running(start, end) {

    // if (!document.hasFocus()) return;

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
    sid = setInterval(() => {
      let $footstamp = $('<img width="60">');
      let imgFootstampUrl = chrome.extension.getURL("images/footstamp.png");
      let offset = $cat_running.offset();
      $footstamp.attr("src", imgFootstampUrl);
      $footstamp.css({
        position: "fixed",
        transform: "rotate(" + degree + "deg)",
        top: offset.top + 150 - $window.scrollTop(),
        left: offset.left + 100,
        width: '60px',
        zIndex: "9999997",
        pointerEvents: "none"
      });
      $body.append($footstamp);
      setTimeout(function () {
        $footstamp.fadeOut(200);
      }, 3000);
    }, 250);

    $cat_running.animate(end, 5000, function () {
      clearInterval(sid);

      setTimeout(running, 3000);

    });
  }

  function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRadian(start, end) {
    let radian = Math.atan2(end.top - start.top, end.left - start.left);
    return radian;
  }

})
