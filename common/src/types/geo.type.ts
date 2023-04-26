// Implementation exactly like RFC 7946.

import type { GeoJSON } from '../enums';

/**
 *
 * GeoJSONPosition type: [longitude, latitude, elevation] | [longitude, latitude]
 *
 * DO NOT PASS `elevation`. THIS DOES NOT SUPPORT IN MONGO `geometric queries`.
 *
 */
export type GeoJSONPosition = [number, number, number] | [number, number];

// The below generic implementation chose the type by the value of T
export type GeoJsonCoordinates<T> = T extends 1
  ? GeoJSONPosition
  : T extends 2
  ? GeoJSONPosition[]
  : T extends 3
  ? GeoJSONPosition[][]
  : T extends 4
  ? GeoJSONPosition[][][]
  : GeoJSONPosition[][][];

export interface GeometryInterface<GeometryType, T extends 1 | 2 | 3 | 4 | 5> {
  type: GeometryType;
  coordinates: GeoJsonCoordinates<T>;
}

export type Point = GeometryInterface<GeoJSON.Point, 1>;
export type LineString = GeometryInterface<GeoJSON.LineString, 2>;
export type Polygon = GeometryInterface<GeoJSON.Polygon, 3>;
export type MultiPoint = GeometryInterface<GeoJSON.MultiPoint, 2>;
export type MultiLineString = GeometryInterface<GeoJSON.MultiLineString, 3>;
export type MultiPolygon = GeometryInterface<'MultiPolygon', 4>;
