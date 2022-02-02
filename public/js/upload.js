function upload(event) {
  const uploadButton = document.getElementById("upload-button");

  const formData = new FormData();

  // Append all selected files to formdata
  for (var count = 0; count < uploadButton.files.length; count++) {
    formData.append("files[]", uploadButton.files[count]);
  }

  // Styling
  changeStyle(".js-textbox", "none");
  changeStyle(".js-button", "none");
  changeStyle(".js-progress", "flex");

  // Ajax request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/fileupload");

  // Calculate progress bar
  xhr.upload.addEventListener("progress", function (event) {
    var percent_completed = Math.round((event.loaded / event.total) * 100);
    element(".js-progress__value").style.width = percent_completed + "%";
  });

  // On uploaded
  xhr.addEventListener("load", function (event) {
    // Show success message
    changeStyle(".js-textbox", "block");
    element(".js-textbox__message").innerHTML = "Successed!";

    // Clear selected files and progress value
    uploadButton.value = "";
    element(".js-progress__value").style.width = "0";

    // Styling
    changeStyle(".js-progress", "none");
    changeStyle(".js-button", "inline-block");
  });

  // Upload
  xhr.send(formData);
}

/**
 * Show/Hide elements.
 * @param {String} selectorName CSS claass name of element.
 * @param {String} styleValue Display value.
 */
function changeStyle(selectorName, styleValue) {
  element(selectorName).style.display = styleValue;
}

/**
 * Find element with CSS class name.
 * @param {String} selectorName CSS claass name of element.
 * @returns Found element.
 */
function element(selectorName) {
  return document.querySelector(selectorName);
}
