//Initial code - load films
{
  const urlFilms = "https://swapi.py4e.com/api/films";
  const urlPlanets = "https://swapi.py4e.com/api/planets";
  const urlShips = "https://swapi.py4e.com/api/starships";
  const urlVehicles = "https://swapi.py4e.com/api/vehicles";
  const urlPeople = "https://swapi.py4e.com/api/people";
  const urlSpecies = "https://swapi.py4e.com/api/species";

  const dataContainer = document.querySelector(
    "#data-container"
  );
  const dataRow = document.createElement("div");
  dataRow.setAttribute("class", "data row");
  const searchInput =
    document.querySelector("#searchInput");
  const searchButton =
    document.querySelector("#searchButton");
  const searchDiv = document.querySelector(".search");
  const globalCache = {
    filmByUrl: {},
    planetByUrl: {},
    shipsByUrl: {},
    vehiclesByUrl: {},
    peopleByUrl: {},
    speciesByUrl: {},
  };

  const selectOption =
    document.querySelector("#optionSelect");
  selectOption.addEventListener("change", () => {
    const selectedValue = selectOption.value;

    if (selectedValue === "films") {
      showFilms();
    } else if (selectedValue === "planets") {
      showPlanets();
    } else if (selectedValue === "starships") {
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
    if (globalCache.filmsList) {
      return globalCache.filmsList;
    }

    try {
      const response = await fetch(urlFilms);
      const data = await response.json();
      globalCache.filmsList = data.results;

      data.results.forEach((film) => {
        globalCache.filmByUrl[film.url] = film;
      });

      return data.results;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchSingleMovieData(filmUrl) {
    if (globalCache.filmByUrl[filmUrl]) {
      return globalCache.filmByUrl[filmUrl];
    }

    try {
      const response = await fetch(filmUrl);
      const data = await response.json();
      globalCache.filmByUrl[filmUrl] = data;

      if (globalCache.filmsList) {
        const exists = globalCache.filmsList.some(
          (film) => film.url === filmUrl
        );
        if (!exists) {
          globalCache.filmsList.push(data);
        }
      }

      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchPlanetData(planets) {
    if (globalCache.planetList) {
      return globalCache.planetList;
    }

    let nextUrl = urlPlanets;
    let allResults = [];

    try {
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();

        allResults = allResults.concat(data.results);

        data.results.forEach((planet) => {
          globalCache.planetByUrl[planet.url] = planet;
        });

        nextUrl = data.next;
      }

      globalCache.planetList = allResults;
      return allResults;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchSinglePlanetData(planetUrl) {
    if (globalCache.planetByUrl[planetUrl]) {
      return globalCache.planetByUrl[planetUrl];
    }

    try {
      const response = await fetch(planetUrl);
      const data = await response.json();
      globalCache.planetByUrl[planetUrl] = data;

      if (globalCache.planetList) {
        const exists = globalCache.planetList.some(
          (planet) => planet.url === planetUrl
        );
        if (!exists) {
          globalCache.planetList.push(data);
        }
      }
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchShipsData(ships) {
    if (globalCache.shipList) {
      return globalCache.shipList;
    }

    let nextUrl = urlShips;
    let allResults = [];

    try {
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();

        allResults = allResults.concat(data.results);

        data.results.forEach((ship) => {
          globalCache.shipsByUrl[ship.url] = ship;
        });

        nextUrl = data.next;
      }

      globalCache.shipList = allResults;
      return allResults;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchSingleShipData(shipUrl) {
    if (globalCache.shipsByUrl[shipUrl]) {
      return globalCache.shipsByUrl[shipUrl];
    }

    try {
      const response = await fetch(shipUrl);
      const data = await response.json();
      globalCache.shipsByUrl[shipUrl] = data;

      if (globalCache.shipList) {
        const exists = globalCache.shipsList.some(
          (ship) => ship.url === shipUrl
        );
        if (!exists) {
          globalCache.shipsList.push(data);
        }
      }
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchVehicleData(vehicles) {
    if (globalCache.vehicleList) {
      return globalCache.vehicleList;
    }

    let nextUrl = urlVehicles;
    let allResults = [];

    try {
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();

        allResults = allResults.concat(data.results);

        data.results.forEach((vehicle) => {
          globalCache.vehiclesByUrl[vehicle.url] = vehicle;
        });

        nextUrl = data.next;
      }

      globalCache.vehicleList = allResults;
      return allResults;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchSingleVehicleData(vehicleUrl) {
    if (globalCache.vehiclesByUrl[vehicleUrl]) {
      return globalCache.vehiclesByUrl[vehicleUrl];
    }

    try {
      const response = await fetch(vehicleUrl);
      const data = await response.json();
      globalCache.vehiclesByUrl[vehicleUrl] = data;

      if (globalCache.vehicleList) {
        const exists = globalCache.vehicleList.some(
          (vehicle) => vehicle.url === vehicleUrl
        );
        if (!exists) {
          globalCache.vehicleList.push(data);
        }
      }

      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchPeopleData(people) {
    if (globalCache.peopleList) {
      return globalCache.peopleList;
    }

    try {
      const response = await fetch(urlPeople);
      const data = await response.json();
      globalCache.peopleList = data.results;

      data.results.forEach((person) => {
        globalCache.peopleByUrl[person.url] = person;
      });

      return data.results;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchSinglePeopleData(personUrl) {
    if (globalCache.peopleByUrl[personUrl]) {
      return globalCache.peopleByUrl[personUrl];
    }

    try {
      const response = await fetch(personUrl);
      const data = await response.json();
      globalCache.peopleByUrl[personUrl] = data;

      if (globalCache.peopleList) {
        const exists = globalCache.peopleList.some(
          (person) => person.url === personUrl
        );
        if (!exists) {
          globalCache.peopleList.push(data);
        }
      }

      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchSpeciesData(species) {
    if (globalCache.speciesList) {
      return globalCache.speciesList;
    }

    try {
      const response = await fetch(urlSpecies);
      const data = await response.json();
      globalCache.speciesList = data.results;

      data.results.forEach((specie) => {
        globalCache.speciesByUrl[specie.url] = specie;
      });

      return data.results;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function fetchSingleSpeciesData(speciesUrl) {
    if (globalCache.speciesByUrl[speciesUrl]) {
      return globalCache.speciesByUrl[speciesUrl];
    }

    try {
      const response = await fetch(speciesUrl);
      const data = await response.json();
      globalCache.speciesByUrl[speciesUrl] = data;

      if (globalCache.speciesList) {
        const exists = globalCache.speciesList.some(
          (specie) => specie.url === speciesUrl
        );
        if (!exists) {
          globalCache.speciesList.push(data);
        }
      }

      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return null;
    }
  }

  async function showFilms() {
    dataRow.innerHTML = "";

    const response = await fetchMovieData("films");

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

  async function showShips() {
    dataRow.innerHTML = "";

    const response = await fetchShipsData("ships");

    response.forEach((item) => {
      createShipComponent(item);
    });
    dataContainer.append(dataRow);
  }

  async function showVehicles() {
    dataRow.innerHTML = "";

    const response = await fetchVehicleData("vehicles");

    response.forEach((item) => {
      createVehicleComponent(item);
    });
    dataContainer.append(dataRow);
  }

  async function showPeople() {
    dataRow.innerHTML = "";

    const response = await fetchPeopleData("people");

    response.forEach((item) => {
      createPeopleComponent(item);
    });
    dataContainer.append(dataRow);
  }

  async function showSpecies() {
    dataRow.innerHTML = "";

    const response = await fetchMovieData("films");

    response.forEach((item) => {
      createMovieComponent(item);
    });
    dataContainer.append(dataRow);
  }
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
    let leftDiv = document.createElement("div");
    let terrain = document.createElement("p");
    let climate = document.createElement("p");
    let rightDiv = document.createElement("div");
    let rotation = document.createElement("p");
    let orbital = document.createElement("p");
    let water = document.createElement("p");
    let gravity = document.createElement("p");
    let diameter = document.createElement("p");

    let res = document.createElement("button");
    let residents = document.createElement("div");
    let planetFilmButton = document.createElement("button");
    let filmDiv = document.createElement("div");
    let filmList = document.createElement("ul");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newPlanetEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    pop.setAttribute("class", "p col-6");
    leftDiv.setAttribute("class", "col-6");
    terrain.setAttribute("class", "p");
    climate.setAttribute("class", "p");
    water.setAttribute("class", "p");
    rightDiv.setAttribute("class", "col-6");
    rotation.setAttribute("class", "p");
    orbital.setAttribute("class", "p");
    gravity.setAttribute("class", "p");
    diameter.setAttribute("class", "p");

    res.setAttribute(
      "class",
      "btn btn-primary col-sm-12 col-md-6"
    );
    res.setAttribute("type", "button");
    res.setAttribute("data-bs-toggle", "collapse");
    res.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Residents`
    );
    residents.setAttribute("class", "collapse");
    residents.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Residents`
    );

    planetFilmButton.setAttribute(
      "class",
      "btn btn-secondary col-sm-12 col-md-6"
    );
    planetFilmButton.setAttribute("type", "button");
    planetFilmButton.setAttribute(
      "data-bs-toggle",
      "collapse"
    );
    planetFilmButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Films`
    );
    filmDiv.setAttribute("class", "collapse");
    filmDiv.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Films`
    );
    filmList.setAttribute("class", "list-group");

    planetFilmButton.addEventListener("click", async () => {
      filmList.innerHTML = "";

      const filmArray = await Promise.all(
        item.films.map((filmUrl) =>
          fetchSingleMovieData(filmUrl)
        )
      );

      filmArray.forEach((film) => {
        if (film) {
          const li = document.createElement("li");
          li.setAttribute("class", "list-group-item");
          li.textContent = film.title;
          filmList.appendChild(li);
        }
      });
    });

    name.textContent = item.name;
    const popCheck = item.population;
    pop.textContent =
      !isNaN(popCheck) && popCheck !== "unknown"
        ? `Population ${Number(popCheck).toLocaleString()}`
        : "Population unknown";
    terrain.textContent = `Terrain: ${item.terrain}`;
    climate.textContent = `Climate: ${item.climate}`;
    rotation.textContent = `Rotation Period: ${Number(
      item.rotation_period
    ).toLocaleString()}`;
    orbital.textContent = `Orbital period: ${Number(
      item.orbital_period
    ).toLocaleString()}`;
    water.textContent = `Suface Water: ${item.surface_water}`;
    gravity.textContent = `Gravity: ${item.gravity}`;
    diameter.textContent = `Diameter: ${Number(
      item.diameter
    ).toLocaleString()}`;

    res.textContent = "Residents";
    residents.textContent = `${item.name} Placeholder`;
    planetFilmButton.textContent = "Films";

    cardGrid.append(name);
    cardGrid.append(pop);
    leftDiv.append(climate);
    leftDiv.append(terrain);
    leftDiv.append(water);
    cardGrid.append(leftDiv);
    rightDiv.append(rotation);
    rightDiv.append(orbital);
    rightDiv.append(gravity);
    rightDiv.append(diameter);
    cardGrid.append(rightDiv);

    cardGrid.append(res);
    cardGrid.append(residents);
    cardGrid.append(planetFilmButton);
    cardGrid.append(filmDiv);
    filmDiv.append(filmList);

    newPlanetEntry.append(cardGrid);
    cardCol.append(newPlanetEntry);
    dataRow.append(cardCol);
  };

  const createShipComponent = (item) => {
    let cardCol = document.createElement("div");
    let newShipEntry = document.createElement("div");
    let cardGrid = document.createElement("div");
    let name = document.createElement("h5");
    let cost = document.createElement("p");
    let manufacturer = document.createElement("p");
    let maxAtmospheringSpeed = document.createElement("p");
    let speedTitle = document.createElement("p");
    let speedStack = document.createElement("div");
    let cargoStack = document.createElement("div");
    let cargoCapacity = document.createElement("p");
    let cargoTitle = document.createElement("p");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newShipEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    cost.setAttribute("class", "fw-bold col-6");
    manufacturer.setAttribute("class", "col-12");
    maxAtmospheringSpeed.setAttribute("class", "fw-bold");
    speedStack.setAttribute(
      "class",
      "vstack col-5 text-center border-end"
    );
    cargoStack.setAttribute(
      "class",
      "vstack col-5 text-center"
    );
    cargoCapacity.setAttribute("class", "fw-bold");

    name.textContent = item.name;

    const costCheck = item.cost_in_credits;
    cost.textContent =
      !isNaN(costCheck) && costCheck !== "unknown"
        ? `${Number(costCheck).toLocaleString()} credits`
        : "Cost unknown";
    manufacturer.textContent = `Manufactured by ${item.manufacturer}`;
    const rawSpeed = item.max_atmosphering_speed;
    const speedCheck = rawSpeed && rawSpeed.match(/\d+/);
    maxAtmospheringSpeed.textContent =
      speedCheck && rawSpeed !== "n/a"
        ? `${Number(speedCheck[0]).toLocaleString()}`
        : "N/A";
    cargoCapacity.textContent = `${Number(
      item.cargo_capacity
    ).toLocaleString()}`;
    speedTitle.textContent = "Max atmosphering speed";
    cargoTitle.textContent = "Cargo capacity";

    cardGrid.append(name);
    cardGrid.append(cost);
    cardGrid.append(manufacturer);
    cardGrid.append(speedStack);
    speedStack.append(maxAtmospheringSpeed);
    speedStack.append(speedTitle);
    cardGrid.append(cargoStack);
    cargoStack.append(cargoCapacity);
    cargoStack.append(cargoTitle);

    newShipEntry.append(cardGrid);
    cardCol.append(newShipEntry);
    dataRow.append(cardCol);
  };

  const createVehicleComponent = (item) => {
    let cardCol = document.createElement("div");
    let newVehicleEntry = document.createElement("div");
    let cardGrid = document.createElement("div");
    let name = document.createElement("h5");
    let cost = document.createElement("p");
    let manufacturer = document.createElement("p");
    let maxAtmospheringSpeed = document.createElement("p");
    let model = document.createElement("p");
    let length = document.createElement("p");
    let crew = document.createElement("p");
    let passengers = document.createElement("p");
    let consumbales = document.createElement("p");
    let vehicleClass = document.createElement("p");
    let leftDiv = document.createElement("div");
    let rightDiv = document.createElement("div");
    let cargoCapacity = document.createElement("p");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newVehicleEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    cost.setAttribute("class", "fw-bold col-6");
    manufacturer.setAttribute("class", "fw-bold col-12");
    leftDiv.setAttribute("class", "col-6");
    model.setAttribute("class", "p");
    maxAtmospheringSpeed.setAttribute("class", "p");
    length.setAttribute("class", "p");
    vehicleClass.setAttribute("class", "p");
    rightDiv.setAttribute("class", "col-6");
    crew.setAttribute("class", "p");
    passengers.setAttribute("class", "p");
    consumbales.setAttribute("class", "p");
    cargoCapacity.setAttribute("class", "p");

    name.textContent = item.name;

    const costCheck = item.cost_in_credits;
    cost.textContent =
      !isNaN(costCheck) && costCheck !== "unknown"
        ? `${Number(costCheck).toLocaleString()} credits`
        : "Cost unknown";
    manufacturer.textContent = `Manufactured by ${item.manufacturer}`;
    const rawSpeed = item.max_atmosphering_speed;
    const speedCheck = rawSpeed && rawSpeed.match(/\d+/);
    maxAtmospheringSpeed.textContent =
      speedCheck && rawSpeed !== "n/a"
        ? `Max atmosphering speed: ${Number(
            speedCheck[0]
          ).toLocaleString()}`
        : "Max atmosphering speed: N/A";

    const cargoCheck = item.cargo_capacity;
    cargoCapacity.textContent =
      !isNaN(cargoCheck) && cargoCheck !== "unknown"
        ? `Cargo capacity: ${Number(
            cargoCheck
          ).toLocaleString()}`
        : "Unknown capacity";
    model.textContent = item.model;
    length.textContent = `Length: ${item.length}`;
    vehicleClass.textContent = `Vehicle class: ${item.vehicle_class}`;
    crew.textContent = `Crew: ${item.crew}`;
    passengers.textContent = `Passengers: ${item.passengers}`;
    consumbales.textContent = `Consumables: ${item.consumables}`;

    cardGrid.append(name);
    cardGrid.append(cost);
    cardGrid.append(manufacturer);
    leftDiv.append(model);
    leftDiv.append(length);
    leftDiv.append(maxAtmospheringSpeed);
    leftDiv.append(vehicleClass);
    cardGrid.append(leftDiv);
    rightDiv.append(crew);
    rightDiv.append(passengers);
    rightDiv.append(consumbales);
    rightDiv.append(cargoCapacity);
    cardGrid.append(rightDiv);

    newVehicleEntry.append(cardGrid);
    cardCol.append(newVehicleEntry);
    dataRow.append(cardCol);
  };

  const createPeopleComponent = (item) => {
    let cardCol = document.createElement("div");
    let newPeopleEntry = document.createElement("div");
    let cardGrid = document.createElement("div");
    let name = document.createElement("h5");
    let height = document.createElement("p");
    let mass = document.createElement("p");
    let hairColor = document.createElement("p");
    let skinColor = document.createElement("p");
    let eyeColor = document.createElement("p");
    let birthYear = document.createElement("p");
    let gender = document.createElement("p");
    let homeworld = document.createElement("p");
    let species = document.createElement("p");
    let leftDiv = document.createElement("div");
    let rightDiv = document.createElement("div");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newPeopleEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    leftDiv.setAttribute("class", "div col-6");
    rightDiv.setAttribute("class", "div col-6");
    height.setAttribute("class", "p");
    mass.setAttribute("class", "p");
    hairColor.setAttribute("class", "p");
    skinColor.setAttribute("class", "p");
    eyeColor.setAttribute("class", "p");
    birthYear.setAttribute("class", "p");
    gender.setAttribute("class", "p");
    homeworld.setAttribute("class", "p");
    species.setAttribute("class", "p");

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

    newPeopleEntry.append(cardGrid);
    cardCol.append(newPeopleEntry);
    dataRow.append(cardCol);
  };

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
