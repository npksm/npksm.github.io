//Modal images
/*{
  function createImage() {
    const information =
      document.querySelector("#information");
    let image1 = document.createElement("img");

    image1.setAttribute("class", "img d-block w-100");
    image1.setAttribute(
      "src",
      "https://lh3.googleusercontent.com/pw/AP1GczPbFk_lBGc63mViAOJBtECfjRN-g0U5OdwenxaJu7zX2k4ddANj6TQpV6QT8H9Y5BVg52TuoI6_EWsxg6UcGbtRwfny4H1McfseL8Vf27VuSrREtzZnwM33T00o7TRN8U9oLOQdeZ1tgPCRdoKD84p5=w1231-h923-s-no-gm?authuser=0"
    );
    image1.setAttribute(
      "alt",
      "Beepo the black kitten with a feather toy"
    );

    information.append(image1);
  }

  createImage();
}*/

//Jquery
$(document).ready(function () {
  setupBeepoCarousel();
});

function setupBeepoCarousel() {
  const imageUrls = [
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczPbFk_lBGc63mViAOJBtECfjRN-g0U5OdwenxaJu7zX2k4ddANj6TQpV6QT8H9Y5BVg52TuoI6_EWsxg6UcGbtRwfny4H1McfseL8Vf27VuSrREtzZnwM33T00o7TRN8U9oLOQdeZ1tgPCRdoKD84p5=w1231-h923-s-no-gm?authuser=0",
      alt: "Beepo the black kitten with a feather toy",
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczPe3N4Ck2E7UuAWyCTcVu-yvZaZvlarZUVa-T5PjMo8Kzb_0KqFkgXLKgmFWBmLJJU5oRE2mTJ67yHqnKPhFGH36PnalO8t1rKYw2YZI3AVaE-8yaD-6TG4CrL6QyqWsdMe_mRE2UhYM8O2LEG60Id6=w1231-h923-s-no-gm?authuser=0",
      alt: "Beepo the black kitten sleeping",
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczOCeJ4LMHUXe8IusFex7UVi_EoIXwwCfkfVGqYqlypWf7s8AjeFJ2ityPE0e-NU76OIC3HioPppfe6mNi-z-lKkGP1VUbCMHIGkAjzpNVzHSjrSd3GNgVABtGcipfGLYXOhpruZxFwzwqqZ5ZQ06j18=w692-h923-s-no-gm?authuser=0",
      alt: "Beepo the black kitten looking up",
    },
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczMxa1wBrZ7sJVw2lpX__a69EVjGN8u3s1J6A9dFnFc7qUWPX_QHxhagifO__sF0zXaRI-l_X5bzzviKkkxDT7z8vN1xgDLkS_c4ng0R45-eEUi6BMQPipopAeoIT8DFWyTk4Jl1wv5cxvzto3lMSJBfmQ=w1060-h795-s-no-gm?authuser=0",
      alt: "Beepo flops wearing a harness",
    },
  ];

  $("#beepoModal").on("show.bs.modal", function () {
    const $carouselInner = $(
      "#beepoCarousel .carousel-inner"
    );
    $carouselInner.empty();

    imageUrls.forEach((img, index) => {
      const isActive = index === 0 ? "active" : "";
      const itemHtml = `<div class="carousel-item ${isActive}"> <img src="${img.src}" class="d-block w-100" alt="${img.alt}" /> </div>`;
      $carouselInner.append(itemHtml);
    });
  });
}
