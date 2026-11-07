// Straight-line (haversine) distance in km between two coordinates.
export type LatLon = { lat: number; lon: number };
export const km = (a: LatLon, b: LatLon) => {
  const r = Math.PI / 180;
  const d = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return Math.round(2 * 6371 * Math.asin(Math.sqrt(d)));
};
