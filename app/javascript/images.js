document.addEventListener("DOMContentLoaded", function () {
  const imageDiv = document.getElementById("image-div");
  const fileInput = document.getElementById("image-files");

  imageDiv.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (e) {
    let fileList = e.target.files;

    if (fileList.length != 5) {
      return;
    }

    for (let i = 0; i < fileList.length; i++) {
      let url = URL.createObjectURL(fileList[i]);
      let image = document.createElement("img");
      image.src = url;
      image.classList.add("w-[30px]");
      imageDiv.appendChild(image);
    }
  });
});
