const api = axios.create({
  baseURL: "https://tmdb-proxy.cubos-academy.workers.dev",
  timeout: 5000,
  headers: { "Content-Type": "Application/json" },
});

async function getAllMovie() {
  try {
    const response = await api.get("/3/discover/movie?language=pt-BR");

    return response.data;
  } catch (error) {
    return console.log(error.response.data);
  }
}

async function searchAllMovie(value) {
  try {
    const response = await api.get(
      `/3/search/movie?language=pt-BR&include_adult=false&query=${value}`
    );

    return response.data;
  } catch (error) {
    return console.log(error.response.data);
  }
}

async function generalMovie() {
  try {
    const response = await api.get("/3/movie/436969?language=pt-BR");

    return response.data;
  } catch (error) {
    return console.log(error.response.data);
  }
}

async function getAllVideos() {
  try {
    const response = await api.get("/3/movie/436969/videos?language=pt-BR");

    return response.data;
  } catch (error) {
    return console.log(error.response.data);
  }
}

async function getDataModal(value) {
  try {
    const response = await api.get(`/3/movie/${value}?language=pt-BR`);

    return response.data;
  } catch (error) {
    return console.log(error.response.data);
  }
}
