//Initial code - load films
{
  const url = "https://swapi.py4e.com/api/films";
  const dataContainer = document.querySelector(
    "#data-container"
  );
  const movieRow = document.createElement("div");
  movieRow.setAttribute("class", "row");
  const searchInput =
    document.querySelector("#searchInput");
  const searchButton =
    document.querySelector("#searchButton");
  const searchDiv = document.querySelector(".search");

  const fetchMovieData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log("Data", data);
        data.results.forEach((item) => {
          createMovieComponent(item);
        });
        dataContainer.append(movieRow);
      })
      .catch((error) => {
        console.error(error);
        let div = document.createElement("div");
        div.textContent =
          "An error occured. Please try again.";
        dataContainer.append(div);
      });
  };

  const createMovieComponent = (item) => {
    let cardCol = document.createElement("div");
    let newMovieEntry = document.createElement("div");
    let cardGrid = document.createElement("div");
    let title = document.createElement("h5");
    let director = document.createElement("p");
    let producer = document.createElement("p");
    let release = document.createElement("p");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newMovieEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    title.setAttribute("class", "h5 fw-bold col-6");
    director.setAttribute("class", "p col-6");
    producer.setAttribute("class", "p col-12 small");
    release.setAttribute("class", "p col-12 small");

    title.textContent = `Episode ${item.episode_id} : ${item.title}`;
    director.textContent = `directed by ${item.director}`;
    producer.textContent = `produced by: ${item.producer}`;
    const dateFormat = new Date(
      item.release_date
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    release.textContent = `released on ${dateFormat}`;

    cardGrid.append(title);
    cardGrid.append(director);
    cardGrid.append(producer);
    cardGrid.append(release);

    newMovieEntry.append(cardGrid);
    cardCol.append(newMovieEntry);
    movieRow.append(cardCol);
  };

  //fetchMovieData(url);

  async function fetchData() {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  }

  searchButton.addEventListener("click", async () => {
    const callData = await fetchData();

    //console.log("callData", callData);

    const query = searchInput.value.trim().toLowerCase();

    const existingWarning =
      document.querySelector(".warning-div");
    if (existingWarning) {
      existingWarning.remove();
    }

    if (!query) {
      let warningDiv = document.createElement("div");
      warningDiv.setAttribute("class", "warning-div");
      warningDiv.textContent =
        "Please enter a search term.";
      searchDiv.append(warningDiv);

      setTimeout(() => {
        warningDiv.remove();
      }, 3000);

      return;
    }

    const matches = callData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.director.toLowerCase().includes(query) ||
        item.producer.toLowerCase().includes(query)
    );

    let resultsDiv = document.createElement("div");
    resultsDiv.innerHTML = matches
      .map((item) => `<p>${item.title}</p>`)
      .join("");
    dataContainer.append(resultsDiv);

    //console.log(matches);
  });
}
