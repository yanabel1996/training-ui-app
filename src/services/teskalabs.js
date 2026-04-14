const TESKALABS_BASE_URL = "/api";

export async function fetchTableData() {
  const res = await fetch(`${TESKALABS_BASE_URL}/data`);
  if (!res.ok) throw new Error("Failed to fetch table data");
  return res.json();
}

export async function fetchDetailData(id) {
  const res = await fetch(`${TESKALABS_BASE_URL}/detail/${id}`);
  if (!res.ok) throw new Error("Failed to fetch detail data");
  return res.json();
}
