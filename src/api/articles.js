const BASE_URL = "https://dev.to/api";

async function request(path, signal) {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export function getArticles({ page = 1, perPage = 4, tag } = {}, signal) {
  const params = new URLSearchParams({ page, per_page: perPage });
  if (tag) params.set("tag", tag);
  return request(`/articles?${params}`, signal);
}

export function getArticle(id, signal) {
  return request(`/articles/${id}`, signal);
}
