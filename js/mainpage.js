$(document).ready(function () {
  setupLinkHandlers();
  setupBeepoCarousel();
  handleModalImageTrigger();
  $("form").on("submit", handleFormSubmit);
});
$(window).resize(handleModalImageTrigger);

function setupLinkHandlers() {
  $(".delayed-anchor").on("click", delayedDirect);
}

function delayedDirect(event) {
  event.preventDefault();
  const targetUrl = $(this).attr("href");
  alert(
    "I have one gallery example set up for now. There is an explanation on the page!"
  );
  window.location.href = targetUrl;
}

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
    {
      src: "https://lh3.googleusercontent.com/pw/AP1GczPDGjDdR-UhYyJ06ZaHrpsPsWNyhfvOSp-jAiwWRuoO18jhSgbYipzokgCuw6SeQBiIR5ufeFblzFDSbqUa7isjgKuPfJnNZZXVDHIXX9HL56APVr6AP434uQiI37ETbjtELftzf7XdXsALChD4MAJQJw=w455-h606-s-no-gm?authuser=0",
      alt: "Beepo the black cat with a crinkle toy under the bed",
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

function handleModalImageTrigger() {
  const $img = $("#responsiveModalImage");
  if ($(window).width() >= 768) {
    $img
      .removeAttr("data-bs-toggle data-bs-target role")
      .css("cursor", "default");
  } else {
    $img
      .attr({
        "data-bs-toggle": "modal",
        "data-bs-target": "#beepoModal",
        role: "button",
      })
      .css("cursor", "pointer");
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = $("#inputName").val();
  const email = $("#inputEmail").val();
  const message = $("#messageText").val();

  $("#modalName").text(name);
  $("#modalEmail").text(email);
  $("#modalMessage").text(message);

  const modal = new bootstrap.Modal(
    document.getElementById("formModal")
  );
  modal.show();

  const feedbackDiv =
    document.getElementById("formFeedback");
  const messageDiv = document.createElement("div");
  messageDiv.setAttribute("class", "message");
  messageDiv.textContent = "✅ Thank you for your message!";
  feedbackDiv.append(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 8000);
}
