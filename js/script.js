const input = document.querySelector(".input");
const btnTheme = document.querySelector(".btn-theme");

const btnPrev = document.querySelector(".btn-prev");
const movie = document.querySelector(".movies");
const btnNext = document.querySelector(".btn-next");

const highlight = document.querySelector(".highlight");
const divModal = document.querySelector(".modal");

let filmsData = [];
let filmsDataFilter = [];
let page = 0;
let currentPage = 0;
let generalData = [];
let videoData = [];
let dataModal = [];
let inputEmpty = [];

async function init() {
  filmsData = await getAllMovie();
  filmsDataFilter = filmsData.results;
  renderMovieList(filmsData.results);
}
init();

async function renderMovieList(view) {
  let cardMovie = "";

  if (view.length === 20) {
    view.splice(18, 2);
  }
  console.log(page)
  view.slice(page, page + 6).forEach((element) => {




    cardMovie += `
      <div class="movie" id="${element.id}" style="background-image: url(${element.poster_path
      })">
        <div class="movie__info">
           <span class="movie__title">${element.title}</span>
           <span class="movie__rating">${element.vote_average.toFixed(
        1
      )}<img src="./assets/estrela.svg" alt="Estrela"/>
           </span>
        </div>
      </div>
      `;
  });

  movie.innerHTML = cardMovie;
}

async function pagination() {
  btnNext.addEventListener("click", (event) => {
    event.stopPropagation();
    if (currentPage === 0) {
      currentPage += 1;
      page += 6;

      renderMovieList(filmsDataFilter);
    } else if (currentPage > 0 && currentPage === 1) {
      currentPage += 1;
      page += 6;

      renderMovieList(filmsDataFilter);
    } else if (currentPage > 1 && currentPage === 2) {
      currentPage = 0;
      page = 0;

      renderMovieList(filmsDataFilter);
    }
  });

  btnPrev.addEventListener("click", (event) => {
    event.stopPropagation();
    if (currentPage === 0) {
      currentPage += 2;
      page += 12;

      renderMovieList(filmsDataFilter);
    } else if (currentPage > 1 && currentPage === 2) {
      currentPage -= 1;
      page -= 6;

      renderMovieList(filmsDataFilter);
    } else if (currentPage > 0 && currentPage === 1) {
      currentPage = 0;
      page = 0;

      renderMovieList(filmsDataFilter);
    }
  });
}
pagination();

async function searchFilmes() {
  input.addEventListener("keypress", async (event) => {
    if (event.code === "Enter") {
      page = 0;
      renderMovieList(filmsDataFilter);
      if (input.value.length === 0) {
        inputEmpty = await getAllMovie();

        renderMovieList(inputEmpty.results);
      } else {
        filmsData = await searchAllMovie(input.value);
        filmsDataFilter = filmsData.results;
        renderMovieList(filmsData.results);
      }
    }
  });
  input.addEventListener("change", () => {
    input.value = "";
  });
}
searchFilmes();

async function movieOfTheDay() {
  generalData = await generalMovie();
  videoData = await getAllVideos();

  let typeMovie = generalData.genres;
  let results = "";
  for (item of typeMovie) {
    results += `${item.name},   `;
  }

  let date = new Date(generalData.release_date).toLocaleDateString("pt-br", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  let youtube = `https://www.youtube.com/watch?v=${videoData.results[0].key}`;

  let containerMovieOfDay = `
  <div class="highlight size">
  <a class="highlight__video-link" href="${youtube}" target="_blank"> 
    <div class="highlight__video" style="background-image: url(${generalData.backdrop_path
    })">
      <img src="./assets/play.svg" alt="Play" />
    </div>
  </a>
  <div class="highlight__info">
    <div class="highlight__title-rating">
      <h1 class="highlight__title">${generalData.title}</h1>
      <span class="highlight__rating">${generalData.vote_average.toFixed(
      1
    )}</span>
    </div>
    <div class="highlight__genre-launch">
      <span class="highlight__genres">${results}</span>
      /
      <span class="highlight__launch">${date}</span>
    </div>
    <p class="highlight__description">${generalData.overview}</p>
  </div>
</div>
  `;

  highlight.innerHTML = containerMovieOfDay;
}
movieOfTheDay();

async function modal() {
  movie.addEventListener("click", async (event) => {
    event.stopPropagation();
    dataModal = await getDataModal(event.target.id);

    dataModal.genres.forEach((element) => {
      const span = document.createElement("span");
      span.classList.add("modal__genre");
      span.textContent = element.name;
    });

    divModal.classList.remove("hidden");

    divModal.innerHTML = `
         <div class="modal ">
          <div class="modal__body">
           <img src="./assets/close-dark.svg" alt="Close" class="modal__close" />
           <h3 class="modal__title">${dataModal.title}</h3>
           <img class="modal__img"src="${dataModal.backdrop_path
      }" alt="modal__img"/>
           <p class="modal__description">${dataModal.overview}</p>
           <div class="modal__genre-average">
             <div class="modal__genres"></div>
             <div class="modal__average">${dataModal.vote_average.toFixed(
        1
      )}</div>
           </div>
          </div>
         </div>
     `;

    const modalGenres = document.querySelector(".modal__genres");
    dataModal.genres.forEach((element) => {
      const span = document.createElement("span");
      span.classList.add("modal__genre");
      span.textContent = element.name;

      modalGenres.append(span);
    });

    const closeModal = document.querySelector(".modal__close");

    closeModal.addEventListener("click", (event) => {
      event.stopPropagation();

      divModal.classList.add("hidden");
    });
    divModal.addEventListener("click", (event) => {
      event.stopPropagation();

      divModal.classList.add("hidden");
    });
  });
}

modal();

function theme() {
  let currentTheme = true;
  const root = document.querySelector(":root");
  const logo = document.querySelector(".logo");
  const body = document.querySelector("body");
  const title = document.querySelector(".header__title ");
  const container = document.querySelector(".container");

  btnTheme.addEventListener("click", (event) => {
    event.stopPropagation();
    if (currentTheme === true) {
      root.style.setProperty("--background", "#1b2028");
      root.style.setProperty("--text-color", "#fff");
      root.style.setProperty("--bg-secondary", "#2d3440");
      btnTheme.src = "./assets/dark-mode.svg";
      btnPrev.src = "./assets/arrow-left-light.svg";
      btnNext.src = "./assets/arrow-right-light.svg";
      logo.src = "./assets/logo.svg";

      input.style.border = "1px solid #fff";
      input.classList.add("input_header");
      input.style.backgroundColor = "#2d3440";
      input.style.transition = "700ms";
      body.style.transition = "700ms";
      logo.style.transition = "700ms";
      title.style.transition = "700ms";
      btnNext.style.transition = "700ms";
      btnPrev.style.transition = "700ms";
      highlight.style.transition = "700ms";
      container.style.transition = "700ms";

      currentTheme = false;
      return;
    }

    if (currentTheme === false) {
      root.style.setProperty("--background", "#fff");
      root.style.setProperty("--text-color", "#1b2028");
      root.style.setProperty("--bg-secondary", "#ededed");
      btnTheme.src = "./assets/light-mode.svg";
      btnPrev.src = "./assets/arrow-left-dark.svg";
      btnNext.src = "./assets/arrow-right-dark.svg";
      logo.src = "./assets/logo-dark.png";

      input.style.border = "1px solid #979797";
      input.classList.remove("input_header");
      input.style.backgroundColor = "#fff";
      input.style.transition = "700ms";
      body.style.transition = "700ms";
      logo.style.transition = "700ms";
      title.style.transition = "700ms";
      btnNext.style.transition = "700ms";
      btnPrev.style.transition = "700ms";
      highlight.style.transition = "700ms";
      container.style.transition = "700ms";

      currentTheme = true;
      return;
    }
  });
}

theme();
