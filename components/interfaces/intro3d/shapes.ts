import * as THREE from "three";

/** Rounded rectangle centred on the origin, for cards and glowing rims. */
export function roundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

/** Outline points of a rounded rectangle (closed), for line rims. */
export function roundedRectOutline(width: number, height: number, radius: number, segments = 6) {
  return roundedRectShape(width, height, radius).getPoints(segments).map((point) => new THREE.Vector3(point.x, point.y, 0));
}

/** A colour that renders brighter than 1.0 so the bloom pass picks it up. */
export function glowColor(hex: string, intensity: number) {
  return new THREE.Color(hex).multiplyScalar(intensity);
}
