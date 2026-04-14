const TESKALABS_BASE_URL = "/api";

export async function fetchDetailData(id) {
  const res = await fetch(`${TESKALABS_BASE_URL}/detail/${id}`);
  if (!res.ok) throw new Error("Failed to fetch detail data");
  return res.json();
}
