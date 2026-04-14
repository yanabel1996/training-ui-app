const SWAPI_BASE_URL = "https://swapi.dev/api";

export async function fetchFilms() {
  const res = await fetch(`${SWAPI_BASE_URL}/films/`);
  if (!res.ok) throw new Error("Failed to fetch films");
  const data = await res.json();
  return data.results;
}

export async function fetchFilm(id) {
  const res = await fetch(`${SWAPI_BASE_URL}/films/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch film");
  return res.json();
}

export async function fetchNames(urls) {
  const promises = urls.map((url) =>
    fetch(url)
      .then((r) => r.json())
      .then((item) => item.name)
  );
  return Promise.all(promises);
}
