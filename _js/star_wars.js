//Initial code - load films
{
  const urlFilms = "https://swapi.py4e.com/api/films";
  const urlPlanets = "https://swapi.py4e.com/api/planets";
  const urlShips = "https://swapi.py4e.com/api/spaceships";
  const urlVehicles = "https://swapi.py4e.com/api/vehicles";
  const urlPeople = "https://swapi.py4e.com/api/people";
  const urlSpecies = "https://swapi.py4e.com/api/species";

  const dataContainer = document.querySelector(
    "#data-container"
  );
  const dataRow = document.createElement("div");
  dataRow.setAttribute("class", "movie row");
  const searchInput =
    document.querySelector("#searchInput");
  const searchButton =
    document.querySelector("#searchButton");
  const searchDiv = document.querySelector(".search");
  const globalCache = {};

  const selectOption =
    document.querySelector("#optionSelect");
  selectOption.addEventListener("change", () => {
    const selectedValue = selectOption.value;

    if (selectedValue === "films") {
      showFilms();
    } else if (selectedValue === "planets") {
      showPlanets();
    } else if (selectedValue === "spaceships") {
      showShips();
    } else if (selectedValue === "vehicles") {
      showVehicles();
    } else if (selectedValue === "people") {
      showPeople();
    } else if (selectedValue === "species") {
      showSpecies();
    }
  });

  const buttonFilms =
    document.querySelector("#buttonFilms");
  const buttonPlanets = document.querySelector(
    "#buttonPlanets"
  );
  const buttonShips =
    document.querySelector("#buttonShips");
  const buttonVehicles = document.querySelector(
    "#buttonVehicles"
  );
  const buttonPeople =
    document.querySelector("#buttonPeople");
  const buttonSpecies = document.querySelector(
    "#buttonSpecies"
  );

  buttonFilms.addEventListener("click", showFilms);
  buttonPlanets.addEventListener("click", showPlanets);
  buttonShips.addEventListener("click", showShips);
  buttonVehicles.addEventListener("click", showVehicles);
  buttonPeople.addEventListener("click", showPeople);
  buttonSpecies.addEventListener("click", showSpecies);

  async function fetchMovieData(films) {
    if (globalCache[films]) {
      return globalCache[films];
    }

    try {
      const response = await fetch(urlFilms);
      const data = await response.json();
      globalCache[films] = data.results;
      return data.results;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchPlanetData(planets) {
    if (globalCache[planets]) {
      return globalCache[planets];
    }

    try {
      const response = await fetch(urlPlanets);
      const data = await response.json();
      globalCache[planets] = data.results;
      return data.results;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function showFilms() {
    dataRow.innerHTML = "";

    const response = await fetchMovieData("films");
    //const callData = response.results();

    response.forEach((item) => {
      createMovieComponent(item);
    });
    dataContainer.append(dataRow);
  }

  async function showPlanets() {
    dataRow.innerHTML = "";

    const response = await fetchPlanetData("planets");

    response.forEach((item) => {
      createPlanetComponent(item);
    });
    dataContainer.append(dataRow);
  }

  async function showShips() {}

  async function showVehicles() {}

  async function showPeople() {}

  async function showSpecies() {}
  /*const fetchMovieData = (url) => {
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
  };*/

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
    dataRow.append(cardCol);
  };

  const createPlanetComponent = (item) => {
    let cardCol = document.createElement("div");
    let newPlanetEntry = document.createElement("div");
    let cardGrid = document.createElement("div");
    let name = document.createElement("h5");
    let pop = document.createElement("p");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newPlanetEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    pop.setAttribute("class", "p col-6");

    name.textContent = item.name;
    const popCheck = item.population;
    pop.textContent =
      !isNaN(popCheck) && popCheck !== "unknown"
        ? `Population ${Number(popCheck).toLocaleString()}`
        : "Population unknown";

    cardGrid.append(name);
    cardGrid.append(pop);

    newPlanetEntry.append(cardGrid);
    cardCol.append(newPlanetEntry);
    dataRow.append(cardCol);
  };

  //fetchMovieData(url);

  searchButton.addEventListener("click", async () => {
    //const loader = document.querySelector(".loader");
    //const searchLoad =
    //document.querySelector(".search-load");

    //searchLoad.setAttribute("class", "d-none");
    //loader.setAttribute("class", "d-block");
    dataRow.innerHTML = "";

    const response = await fetchMovieData();
    //const callData = response.results;

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

    response.results.forEach((item) => {
      const matches =
        item.title.toLowerCase().includes(query) ||
        item.director.toLowerCase().includes(query);

      if (matches) {
        createMovieComponent(item);
        dataContainer.append(dataRow);
      }
    });

    /*const matches = callData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.director.toLowerCase().includes(query) ||
        item.producer.toLowerCase().includes(query)
    );*/

    /*let resultsDiv = document.createElement("div");
    resultsDiv.innerHTML = matches
      .map((item) => `<p>${item.title}</p>`)
      .join("");
    dataContainer.append(resultsDiv);*/

    //console.log(matches);
  });
}
