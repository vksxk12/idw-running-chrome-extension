
function init_popup() {
  let fpslct = $("#footprint");
  footprints.forEach((fp, i) => {
    if (fp.name) {
      fpslct.append(
          "<option value='" + fp.v + "' >" + fp.name + "</option>"
      );
    }
  });
  let dslct = $("#doll");
  dolls.forEach((d, i) => {
    if (d.name) {
      dslct.append(
          "<option value='" + d.v + "' >" + d.name + "</option>"
      );
    }
  });

  load_data();

}

function load_data() {
  chrome.storage.sync.get("settings", function (items) {
    let obj = items["settings"] || {};
    let debugmsg = JSON.stringify(items);
    let interval = obj["interval"] || 5.0;
    let doll = obj["doll"] || "IDWMod";
    let fp = obj["footprint"] || "shoes";
    let show = obj["show"] || "";
    $("#interval").val(interval);
    $("#doll").val(doll);
    $("#footprint").val(fp);
    $("#show").val(show);

    $("#debug").text("debug: " + debugmsg + " " + new Date());

  });
}

function save_data() {

  let interval = $("#interval").val();
  let doll = $("#doll").val();
  let footprint = $("#footprint").val();
  let show = $("#show").val();
  let obj = {
    interval:interval,
    doll:doll,
    footprint:footprint,
    show:show
  };

  chrome.storage.sync.set({"settings":obj}, function () {
    // need_to_save = false;
  });
}

$(function() {
  init_popup();

  $("#interval").on("change", function () {
    save_data();
  });
  $("#doll").on("change", function () {
    save_data();
  });
  $("#footprint").on("change", function () {
    save_data();
  });
  $("#show").on("change", function () {
    save_data();
  });

});

var loaded = false;
var need_to_save = false;

// window.onfocus = function(){
//   load_data();
// };

// window.onblur = function() {
//   save_data();
// }