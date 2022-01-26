function upload(event) {
  var uploadButton = document.getElementById("upload-button");

  var formData = new FormData();

  // Append all selected files to formdata
  for (var count = 0; count < uploadButton.files.length; count++) {
    formData.append("files[]", uploadButton.files[count]);
  }

  // Hide textbox (if shown) and upload button
  document.getElementById("textbox").style.display = "none";
  document.getElementById("upload-label").style.display = "none";

  // Show progress bar
  document.getElementById("progress").style.display = "flex";

  var ajax_request = new XMLHttpRequest();

  ajax_request.open("POST", "backend.php");

  // Calculate progress bar
  ajax_request.upload.addEventListener("progress", function (event) {
    var percent_completed = Math.round((event.loaded / event.total) * 100);

    document.getElementById("progress-bar").style.width =
      percent_completed + "%";
  });

  // On uploaded
  ajax_request.addEventListener("load", function (event) {
    // Show success message
    document.getElementById("textbox").style.display = "block";
    document.getElementById("message").innerHTML = "Successed!";

    // Clear selected files and progress value
    uploadButton.value = "";
    document.getElementById("progress-bar").style.width = "0";

    // Hide progress bar
    document.getElementById("progress").style.display = "none";

    // Show upload button
    document.getElementById("upload-label").style.display = "inline-block";
  });

  // Upload
  ajax_request.send(formData);
}
