$(document).ready(function () {
  getImages();
  modalNavigationSetup();
  handleModalImageTrigger();
});

let imageList = [];
let currentIndex = 0;

function getImages() {
  $.getJSON("images.json", function (data) {
    imageList = data;
    data.forEach(function (item, index) {
      const full = item.src;
      const thumb = full.replace(
        /=w\d+-h\d+/,
        "=w200-h200"
      );
      const imageHTML = `<img src="${thumb}" alt="${item.alt}" data-full="${full}" data-index="${index}" class="gallery-img modal-trigger" />`;
      $("#imageContainer").append(imageHTML);
    });
  });
}

function modalNavigationSetup() {
  $("#prevImage").on("click", showPreviousImage);
  $("#nextImage").on("click", showNextImage);
}
function showPreviousImage() {
  currentIndex =
    (currentIndex - 1 + imageList.length) %
    imageList.length;
  showModalImage();
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % imageList.length;
  showModalImage();
}

function handleModalImageTrigger() {
  $("#imageContainer").on(
    "click",
    ".modal-trigger",
    function () {
      currentIndex = parseInt($(this).data("index"));
      showModalImage();
    }
  );
}

function showModalImage() {
  const item = imageList[currentIndex];
  if (item) {
    $("#modalImage").attr("src", item.src);
    $("#modalImage").attr("alt", item.alt);
    $("#imageModal").modal("show");
  }
}
