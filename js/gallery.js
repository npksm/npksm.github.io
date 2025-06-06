$(document).ready(function () {
  getImages();
  handleModalImageTrigger();
});

function getImages() {
  $.getJSON("images.json", function (data) {
    data.forEach(function (item) {
      const full = item.src;
      const thumb = full.replace(
        /=w\d+-h\d+/,
        "=w200-h200"
      );
      const imageHTML = `<img src="${thumb}" alt="${item.alt}" data-full="${full}"  class="gallery-img modal-trigger" />`;
      $("#imageContainer").append(imageHTML);
    });
  });
}

function handleModalImageTrigger() {
  $("#imageContainer").on(
    "click",
    ".modal-trigger",
    function () {
      const fullImg = $(this).data("full");
      const imgAlt = $(this).data("alt");
      $("#modalImage").attr("src", fullImg);
      $("#modalImage").attr("alt", imgAlt);
      $("#imageModal").modal("show");
    }
  );
}
