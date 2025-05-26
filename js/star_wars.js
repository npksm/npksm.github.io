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

  /**
   * Fetch Data
   * @param {*} films
   * @returns
   */

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

      if (!response.ok) {
        console.error(
          `Fetch failed with status: ${response.status}`
        );
        const text = await response.text();
        console.error(`Response text: ${text}`);
        return null;
      }

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

  /**
   * Call for data and insert
   */

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

    const response = await fetchSpeciesData("species");

    response.forEach((item) => {
      createSpeciesComponent(item);
    });
    dataContainer.append(dataRow);
  }

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
    let residentList = document.createElement("ul");
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
    leftDiv.setAttribute("class", "col-6 border-end");
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
    residentList.setAttribute("class", "list-group");

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

    res.addEventListener("click", async () => {
      if (residentList.children.length > 0) return;

      residentList.innerHTML = "";

      if (!item.residents.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No residents";
        residentList.appendChild(li);
        return;
      }

      const resArray = await Promise.all(
        item.residents.map((resUrl) =>
          fetchSinglePeopleData(resUrl)
        )
      );

      resArray.forEach((person) => {
        if (person) {
          const li = document.createElement("li");
          li.setAttribute("class", "list-group-item");
          li.textContent = person.name;
          residentList.appendChild(li);
        }
      });
    });

    planetFilmButton.addEventListener("click", async () => {
      if (filmList.children.length > 0) return;

      filmList.innerHTML = "";

      if (!item.films.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No film appearances";
        filmList.appendChild(li);
        return;
      }

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
    terrain.textContent = `Terrain: ${
      item.terrain.charAt(0).toUpperCase() +
      item.terrain.slice(1)
    }`;
    climate.textContent = `Climate: ${
      item.climate.charAt(0).toUpperCase() +
      item.climate.slice(1)
    }`;
    let rotationCheck = item.rotation_period;
    if (isNumeric(rotationCheck)) {
      rotationCheck =
        Number(rotationCheck).toLocaleString();
      rotation.textContent = `Rotation Period: ${rotationCheck}`;
    } else {
      rotation.textContent = `Rotation Period: ${
        rotationCheck.charAt(0).toUpperCase() +
        rotationCheck.slice(1)
      }`;
    }
    let orbitalCheck = item.orbital_period;
    if (isNumeric(orbitalCheck)) {
      orbitalCheck = Number(orbitalCheck).toLocaleString();
      orbital.textContent = `Orbital period: ${orbitalCheck}`;
    } else {
      orbital.textContent = `Orbital period: ${
        orbitalCheck.charAt(0).toUpperCase() +
        orbitalCheck.slice(1)
      }`;
    }
    let waterCheck = item.surface_water;
    if (typeof waterCheck === "string") {
      waterCheck =
        waterCheck.charAt(0).toUpperCase() +
        waterCheck.slice(1);
    }
    water.textContent = `Suface Water: ${waterCheck}`;
    gravity.textContent = `Gravity: ${item.gravity}`;
    diameter.textContent = `Diameter: ${Number(
      item.diameter
    ).toLocaleString()}`;

    res.textContent = "Residents";
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
    residents.append(residentList);
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
    let length = document.createElement("p");
    let manufacturer = document.createElement("p");
    let maxAtmospheringSpeed = document.createElement("p");
    let model = document.createElement("p");
    let crew = document.createElement("p");
    let passengers = document.createElement("p");
    let consumables = document.createElement("p");
    let hyperdrive = document.createElement("p");
    let mglt = document.createElement("p");
    let shipClass = document.createElement("p");
    let cargoCapacity = document.createElement("p");
    let rightDiv = document.createElement("div");
    let leftDiv = document.createElement("div");

    let pilotButton = document.createElement("button");
    let pilots = document.createElement("div");
    let pilotList = document.createElement("ul");
    let filmButton = document.createElement("button");
    let filmDiv = document.createElement("div");
    let filmList = document.createElement("ul");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newShipEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    cost.setAttribute("class", "fw-bold col-6");
    manufacturer.setAttribute("class", "col-12");
    maxAtmospheringSpeed.setAttribute("class", "p");
    length.setAttribute("class", "p");
    model.setAttribute("class", "p");
    crew.setAttribute("class", "p");
    passengers.setAttribute("class", "p");
    consumables.setAttribute("class", "p");
    hyperdrive.setAttribute("class", "p");
    mglt.setAttribute("class", "p");
    shipClass.setAttribute("class", "p");

    rightDiv.setAttribute("class", "col-6");
    leftDiv.setAttribute("class", "col-6 border-end");
    cargoCapacity.setAttribute("class", "p");

    pilotButton.setAttribute(
      "class",
      "btn btn-primary col-sm-12 col-md-6"
    );
    pilotButton.setAttribute("type", "button");
    pilotButton.setAttribute("data-bs-toggle", "collapse");
    pilotButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Pilots`
    );
    pilots.setAttribute("class", "collapse");
    pilots.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Pilots`
    );
    pilotList.setAttribute("class", "list-group");
    filmButton.setAttribute(
      "class",
      "btn btn-secondary col-sm-12 col-md-6"
    );
    filmButton.setAttribute("type", "button");
    filmButton.setAttribute("data-bs-toggle", "collapse");
    filmButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Films`
    );
    filmDiv.setAttribute("class", "collapse");
    filmDiv.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Films`
    );
    filmList.setAttribute("class", "list-group");

    pilotButton.addEventListener("click", async () => {
      if (pilotList.children.length > 0) return;

      pilotList.innerHTML = "";

      if (!item.pilots.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No pilots";
        pilotList.appendChild(li);
        return;
      }

      const pilotArray = await Promise.all(
        item.pilots.map((pilUrl) =>
          fetchSinglePeopleData(pilUrl)
        )
      );

      pilotArray.forEach((pilot) => {
        if (pilot) {
          const li = document.createElement("li");
          li.setAttribute("class", "list-group-item");
          li.textContent = pilot.name;
          pilotList.appendChild(li);
        }
      });
    });

    filmButton.addEventListener("click", async () => {
      if (filmList.children.length > 0) return;

      filmList.innerHTML = "";

      if (!item.films.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No film appearances";
        filmList.appendChild(li);
        return;
      }

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
        : "Cargo capacity: Unknown";
    model.textContent = item.model;
    model.textContent = item.model;
    length.textContent = `Length: ${item.length}`;
    shipClass.textContent = `Ship class: ${
      item.starship_class.charAt(0).toUpperCase() +
      item.starship_class.slice(1)
    }`;
    crew.textContent = `Crew: ${item.crew}`;
    passengers.textContent = `Passengers: ${item.passengers}`;
    consumables.textContent = `Consumables: ${item.consumables}`;
    hyperdrive.textContent = `Hyperdrive rating: ${item.hyperdrive_rating}`;
    mglt.textContent = `Megalight per hour: ${item.MGLT}`;

    pilotButton.textContent = "Pilots";
    filmButton.textContent = "Films";

    cardGrid.append(name);
    cardGrid.append(cost);
    cardGrid.append(manufacturer);
    leftDiv.append(shipClass);
    leftDiv.append(model);
    leftDiv.append(maxAtmospheringSpeed);
    leftDiv.append(hyperdrive);
    leftDiv.append(mglt);
    cardGrid.append(leftDiv);
    rightDiv.append(crew);
    rightDiv.append(passengers);
    rightDiv.append(consumables);
    rightDiv.append(cargoCapacity);
    rightDiv.append(length);
    cardGrid.append(rightDiv);

    cardGrid.append(pilotButton);
    cardGrid.append(pilots);
    pilots.append(pilotList);
    cardGrid.append(filmButton);
    cardGrid.append(filmDiv);
    filmDiv.append(filmList);

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
    let consumables = document.createElement("p");
    let vehicleClass = document.createElement("p");
    let leftDiv = document.createElement("div");
    let rightDiv = document.createElement("div");
    let cargoCapacity = document.createElement("p");

    let pilotButton = document.createElement("button");
    let pilots = document.createElement("div");
    let pilotList = document.createElement("ul");
    let filmButton = document.createElement("button");
    let filmDiv = document.createElement("div");
    let filmList = document.createElement("ul");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newVehicleEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    cost.setAttribute("class", "fw-bold col-6");
    manufacturer.setAttribute("class", "fw-bold col-12");
    leftDiv.setAttribute("class", "col-6 border-end");
    model.setAttribute("class", "p");
    maxAtmospheringSpeed.setAttribute("class", "p");
    length.setAttribute("class", "p");
    vehicleClass.setAttribute("class", "p");
    rightDiv.setAttribute("class", "col-6");
    crew.setAttribute("class", "p");
    passengers.setAttribute("class", "p");
    consumables.setAttribute("class", "p");
    cargoCapacity.setAttribute("class", "p");

    pilotButton.setAttribute(
      "class",
      "btn btn-primary col-sm-12 col-md-6"
    );
    pilotButton.setAttribute("type", "button");
    pilotButton.setAttribute("data-bs-toggle", "collapse");
    pilotButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Pilots`
    );
    pilots.setAttribute("class", "collapse");
    pilots.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Pilots`
    );
    pilotList.setAttribute("class", "list-group");
    filmButton.setAttribute(
      "class",
      "btn btn-secondary col-sm-12 col-md-6"
    );
    filmButton.setAttribute("type", "button");
    filmButton.setAttribute("data-bs-toggle", "collapse");
    filmButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Films`
    );
    filmDiv.setAttribute("class", "collapse");
    filmDiv.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Films`
    );
    filmList.setAttribute("class", "list-group");

    pilotButton.addEventListener("click", async () => {
      if (pilotList.children.length > 0) return;

      pilotList.innerHTML = "";

      if (!item.pilots.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No pilots";
        pilotList.appendChild(li);
        return;
      }

      const pilotArray = await Promise.all(
        item.pilots.map((pilUrl) =>
          fetchSinglePeopleData(pilUrl)
        )
      );

      pilotArray.forEach((pilot) => {
        if (pilot) {
          const li = document.createElement("li");
          li.setAttribute("class", "list-group-item");
          li.textContent = pilot.name;
          pilotList.appendChild(li);
        }
      });
    });

    filmButton.addEventListener("click", async () => {
      if (filmList.children.length > 0) return;

      filmList.innerHTML = "";

      if (!item.films.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No film appearances";
        filmList.appendChild(li);
        return;
      }

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
    vehicleClass.textContent = `Vehicle class: ${
      item.vehicle_class.charAt(0).toUpperCase() +
      item.vehicle_class.slice(1)
    }`;
    crew.textContent = `Crew: ${item.crew}`;
    passengers.textContent = `Passengers: ${item.passengers}`;
    consumables.textContent = `Consumables: ${item.consumables}`;

    pilotButton.textContent = "Pilots";
    filmButton.textContent = "Films";

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
    rightDiv.append(consumables);
    rightDiv.append(cargoCapacity);
    cardGrid.append(rightDiv);

    cardGrid.append(pilotButton);
    cardGrid.append(pilots);
    pilots.append(pilotList);
    cardGrid.append(filmButton);
    cardGrid.append(filmDiv);
    filmDiv.append(filmList);

    newVehicleEntry.append(cardGrid);
    cardCol.append(newVehicleEntry);
    dataRow.append(cardCol);
  };

  const createPeopleComponent = async (item) => {
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

    let filmButton = document.createElement("button");
    let filmDiv = document.createElement("div");
    let filmList = document.createElement("ul");
    let vehicleButton = document.createElement("button");
    let vehicles = document.createElement("div");
    let vehicleList = document.createElement("ul");
    let shipButton = document.createElement("button");
    let ships = document.createElement("div");
    let shipList = document.createElement("ul");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    newPeopleEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    birthYear.setAttribute("class", "p col-6");
    leftDiv.setAttribute("class", "div col-6");
    rightDiv.setAttribute("class", "div col-6");
    height.setAttribute("class", "p");
    mass.setAttribute("class", "p");
    hairColor.setAttribute("class", "p");
    skinColor.setAttribute("class", "p");
    eyeColor.setAttribute("class", "p");
    gender.setAttribute("class", "p");
    homeworld.setAttribute("class", "p");
    species.setAttribute("class", "p");

    filmButton.setAttribute(
      "class",
      "btn btn-secondary col-sm-12 col-md-6"
    );
    filmButton.setAttribute("type", "button");
    filmButton.setAttribute("data-bs-toggle", "collapse");
    filmButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Films`
    );
    filmDiv.setAttribute("class", "collapse");
    filmDiv.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Films`
    );
    filmList.setAttribute("class", "list-group");
    vehicleButton.setAttribute(
      "class",
      "btn btn-primary col-sm-12 col-md-6"
    );
    vehicleButton.setAttribute("type", "button");
    vehicleButton.setAttribute(
      "data-bs-toggle",
      "collapse"
    );
    vehicleButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Vehicles`
    );
    vehicles.setAttribute("class", "collapse");
    vehicles.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Vehicles`
    );
    vehicleList.setAttribute("class", "list-group");
    shipButton.setAttribute(
      "class",
      "btn btn-info col-sm-12 col-md-6"
    );
    shipButton.setAttribute("type", "button");
    shipButton.setAttribute("data-bs-toggle", "collapse");
    shipButton.setAttribute(
      "data-bs-target",
      `#${item.name.replace(/\s+/g, "")}Ships`
    );
    ships.setAttribute("class", "collapse");
    ships.setAttribute(
      "id",
      `${item.name.replace(/\s+/g, "")}Ships`
    );
    shipList.setAttribute("class", "list-group");

    filmButton.addEventListener("click", async () => {
      if (filmList.children.length > 0) return;

      filmList.innerHTML = "";

      if (!item.films.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No film appearances";
        filmList.appendChild(li);
        return;
      }

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

    vehicleButton.addEventListener("click", async () => {
      if (vehicleList.children.length > 0) return;

      vehicleList.innerHTML = "";

      if (!item.vehicles.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No vehicles";
        vehicleList.appendChild(li);
        return;
      }

      const vehicleArray = await Promise.all(
        item.vehicles.map((vehUrl) =>
          fetchSingleVehicleData(vehUrl)
        )
      );

      vehicleArray.forEach((vehicle) => {
        if (vehicle) {
          const li = document.createElement("li");
          li.setAttribute("class", "list-group-item");
          li.textContent = vehicle.name;
          vehicleList.appendChild(li);
        }
      });
    });

    shipButton.addEventListener("click", async () => {
      if (shipList.children.length > 0) return;

      shipList.innerHTML = "";

      if (!item.starships.length) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.textContent = "No starships";
        shipList.appendChild(li);
        return;
      }

      const shipArray = await Promise.all(
        item.starships.map((shipUrl) =>
          fetchSingleShipData(shipUrl)
        )
      );

      shipArray.forEach((ship) => {
        if (ship) {
          const li = document.createElement("li");
          li.setAttribute("class", "list-group-item");
          li.textContent = ship.name;
          shipList.appendChild(li);
        }
      });
    });

    name.textContent = `${item.name}`;
    birthYear.textContent = `Birth Year: ${item.birth_year}`;
    height.textContent = `Height: ${item.height}`;
    mass.textContent = `Mass: ${item.mass}`;
    let hairValue = item.hair_color;
    if (hairValue.toLowerCase() != "n/a") {
      hairValue =
        hairValue.charAt(0).toUpperCase() +
        hairValue.slice(1);
    }
    hairColor.textContent = `Hair Color: ${hairValue}`;
    let skinValue = item.skin_color;
    if (skinValue.toLowerCase() != "n/a") {
      skinValue =
        skinValue.charAt(0).toUpperCase() +
        skinValue.slice(1);
    }
    skinColor.textContent = `Skin Color: ${skinValue}`;
    let eyeValue = item.eye_color;
    if (eyeValue.toLowerCase() != "n/1") {
      eyeValue =
        eyeValue.charAt(0).toUpperCase() +
        eyeValue.slice(1);
    }
    eyeColor.textContent = `Eye Color: ${eyeValue}`;
    let genderValue = item.gender;
    if (genderValue.toLowerCase() != "n/a") {
      genderValue =
        genderValue.charAt(0).toUpperCase() +
        genderValue.slice(1);
    }
    gender.textContent = `Gender: ${genderValue}`;
    if (item.homeworld) {
      const worldLink = await fetchSinglePlanetData(
        item.homeworld
      );
      homeworld.textContent = `Homeworld: ${worldLink.name}`;
    } else {
      homeworld.textContent = `Homeworld: Unknown`;
    }
    if (item.species) {
      const speciesLink = await fetchSingleSpeciesData(
        item.species
      );
      species.textContent = `Species: ${speciesLink.name}`;
    } else {
      species.textContent = `Species: Unknown`;
    }

    filmButton.textContent = "Films";
    shipButton.textContent = "Starships";
    vehicleButton.textContent = "Vehicles";

    cardGrid.append(name);
    cardGrid.append(birthYear);
    leftDiv.append(height);
    leftDiv.append(mass);
    leftDiv.append(gender);
    cardGrid.append(leftDiv);
    rightDiv.append(skinColor);
    rightDiv.append(hairColor);
    rightDiv.append(eyeColor);
    cardGrid.append(rightDiv);

    cardGrid.append(vehicleButton);
    cardGrid.append(vehicles);
    vehicles.append(vehicleList);
    cardGrid.append(shipButton);
    cardGrid.append(ships);
    ships.append(shipList);
    cardGrid.append(filmButton);
    cardGrid.append(filmDiv);
    filmDiv.append(filmList);

    newPeopleEntry.append(cardGrid);
    cardCol.append(newPeopleEntry);
    dataRow.append(cardCol);
  };

  const createSpeciesComponent = async (item) => {
    let cardCol = document.createElement("div");
    let newSpeciesEntry = document.createElement("div");
    let cardGrid = document.createElement("div");
    let name = document.createElement("p");
    let classification = document.createElement("p");
    let designation = document.createElement("p");
    let avgHeight = document.createElement("p");
    let skinColors = document.createElement("p");
    let hairColors = document.createElement("p");
    let eyeColors = document.createElement("p");
    let avgLifespan = document.createElement("p");
    let homeworld = document.createElement("p");
    let language = document.createElement("p");
    let leftDiv = document.createElement("div");
    let rightDiv = document.createElement("div");

    cardCol.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-xl-4"
    );
    leftDiv.setAttribute("class", "col-6");
    rightDiv.setAttribute("class", "col-6");
    newSpeciesEntry.setAttribute("class", "card m-2");
    cardGrid.setAttribute("class", "row p-2");
    name.setAttribute("class", "h5 fw-bold col-6");
    classification.setAttribute("class", "p col-6");

    skinColors.setAttribute("class", "p");
    hairColors.setAttribute("class", "p");
    eyeColors.setAttribute("class", "p");

    designation.setAttribute("class", "p");
    avgLifespan.setAttribute("class", "p");
    avgHeight.setAttribute("class", "p");
    homeworld.setAttribute("class", "p");
    language.setAttribute("class", "p");

    name.textContent = item.name;
    classification.textContent =
      item.classification.charAt(0).toUpperCase() +
      item.classification.slice(1);
    skinColors.textContent = `Skin colors: ${item.skin_colors}`;
    hairColors.textContent = `Hair colors: ${item.hair_colors}`;
    eyeColors.textContent = `Eye colors: ${item.eye_colors}`;
    designation.textContent = `Designation: ${
      item.designation.charAt(0).toUpperCase() +
      item.designation.slice(1)
    }`;
    let lifespan = item.average_lifespan;
    if (typeof lifespan === "string") {
      lifespan =
        lifespan.charAt(0).toUpperCase() +
        lifespan.slice(1);
    }
    avgLifespan.textContent = `Average Lifespan: ${lifespan}`;

    avgHeight.textContent = `Average Height: ${item.average_height}`;
    if (item.homeworld) {
      const worldLink = await fetchSinglePlanetData(
        item.homeworld
      );
      homeworld.textContent = `Homeworld: ${worldLink.name}`;
    } else {
      homeworld.textContent = `Homeworld: n/a`;
    }
    language.textContent = `Language: ${item.language}`;

    cardGrid.append(name);
    cardGrid.append(classification);
    cardGrid.append(skinColors);
    cardGrid.append(hairColors);
    cardGrid.append(eyeColors);

    leftDiv.append(designation);
    leftDiv.append(avgLifespan);
    leftDiv.append(avgHeight);
    cardGrid.append(leftDiv);
    rightDiv.append(homeworld);
    rightDiv.append(language);
    cardGrid.append(rightDiv);

    newSpeciesEntry.append(cardGrid);
    cardCol.append(newSpeciesEntry);
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

  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
}
