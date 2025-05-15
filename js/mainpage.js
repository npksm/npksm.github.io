//Modal images
{
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
}
