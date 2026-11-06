/*
 * Very simplified outlines of Indonesia's main islands (longitude, latitude),
 * used only to generate a stylised dot map for the EMQNET chapter.
 * Illustrative, not cartographically accurate.
 */
type Polygon = readonly (readonly [number, number])[];

const ISLANDS: readonly Polygon[] = [
  // Sumatra
  [[95.2, 5.6], [97.6, 5.2], [100.3, 2.5], [103.8, 0.6], [104.6, -1.6], [106.0, -3.2], [105.8, -5.8], [104.5, -5.9], [102.3, -4.0], [100.4, -1.0], [98.8, 1.6], [97.1, 3.5], [95.4, 4.8]],
  // Java
  [[105.2, -6.8], [106.0, -5.9], [108.3, -6.3], [110.4, -6.9], [112.6, -6.9], [114.4, -7.7], [114.6, -8.6], [112.7, -8.4], [110.6, -8.2], [108.0, -7.8], [106.4, -7.4], [105.3, -6.9]],
  // Bali, Lombok, Sumbawa, Flores
  [[114.4, -8.1], [115.7, -8.3], [115.7, -8.8], [114.5, -8.7]],
  [[115.8, -8.2], [116.7, -8.2], [116.7, -8.9], [115.9, -8.9]],
  [[116.8, -8.1], [119.1, -8.3], [119.1, -8.8], [116.9, -8.9]],
  [[119.8, -8.2], [123.0, -8.2], [123.0, -8.9], [119.9, -8.9]],
  // Timor
  [[123.5, -10.2], [124.6, -9.3], [126.9, -8.3], [127.2, -8.5], [125.0, -9.8], [123.8, -10.4]],
  // Borneo
  [[109.0, 1.8], [110.5, 1.7], [111.8, 2.8], [113.0, 3.2], [114.6, 4.6], [116.1, 6.9], [117.3, 6.6], [119.2, 5.2], [118.0, 4.3], [117.9, 1.0], [118.9, 0.9], [117.5, -0.2], [116.6, -1.5], [116.3, -3.9], [114.6, -4.0], [113.0, -3.2], [111.6, -3.0], [110.1, -2.9], [110.0, -1.3], [109.0, 0.0]],
  // Sulawesi (north arm, core, south-west arm, south-east arm)
  [[120.0, 0.9], [121.5, 1.0], [124.0, 1.4], [125.2, 1.6], [124.5, 0.6], [122.0, 0.5], [120.6, 0.3]],
  [[119.4, -0.5], [120.6, 0.3], [121.4, -0.9], [123.3, -0.8], [123.3, -1.2], [121.2, -1.6], [120.9, -2.6], [119.6, -3.4], [119.0, -2.0]],
  [[119.6, -3.4], [120.4, -3.0], [120.4, -5.6], [119.4, -5.6], [119.4, -3.8]],
  [[121.0, -1.6], [122.4, -2.4], [121.7, -3.0], [122.8, -4.6], [121.9, -5.0], [120.9, -3.0]],
  // Halmahera, Seram, Buru
  [[127.4, 1.8], [128.1, 1.6], [128.0, 0.6], [128.7, 0.3], [128.2, -0.4], [127.6, -0.2], [127.6, 0.8]],
  [[128.0, -2.8], [130.9, -3.1], [130.8, -3.6], [128.2, -3.5]],
  [[125.9, -3.1], [127.2, -3.2], [127.2, -3.9], [126.0, -3.8]],
  // Papua (western New Guinea)
  [[131.0, -1.2], [132.5, -0.4], [134.0, -0.9], [135.4, -3.3], [137.5, -1.5], [141.0, -2.6], [141.0, -9.1], [139.0, -8.1], [138.2, -8.4], [137.6, -5.2], [135.0, -4.4], [133.6, -3.6], [132.0, -2.9], [131.2, -2.0]],
];

function contains(polygon: Polygon, lon: number, lat: number) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

export const MAP_CENTER = { lon: 118, lat: -2.2 };
export const MAP_SCALE = 0.142;

/** Land dots on a regular lon/lat grid, in map-local units (x east, z south). */
export function getIndonesiaDots(spacing = 0.42) {
  const dots: number[] = [];
  for (let lat = 7; lat >= -11; lat -= spacing) {
    for (let lon = 94.5; lon <= 141.5; lon += spacing) {
      if (ISLANDS.some((polygon) => contains(polygon, lon, lat))) {
        dots.push((lon - MAP_CENTER.lon) * MAP_SCALE, 0, -(lat - MAP_CENTER.lat) * MAP_SCALE);
      }
    }
  }
  return new Float32Array(dots);
}

/** 24 station markers spread west to east across the land dots (illustrative positions). */
export function getStationMarkers(dots: Float32Array, count = 24) {
  const points: [number, number, number][] = [];
  const total = dots.length / 3;
  const indices = Array.from({ length: total }, (_, index) => index).sort((a, b) => dots[a * 3] - dots[b * 3]);
  for (let marker = 0; marker < count; marker += 1) {
    const index = indices[Math.floor(((marker + 0.5) / count) * total)];
    points.push([dots[index * 3], 0, dots[index * 3 + 2]]);
  }
  return points;
}
