/**
 * Knot illustrations are data, not pictures.
 *
 * A strand is a list of points "x,y,z x,y ...". A smooth curve is drawn through them.
 * z = layer of the segment that STARTS at that point (inherited until changed):
 *   1 = behind (under a crossing / behind a post)   2 = normal   3-5 = on top
 * Every segment is drawn with a black outline, so anything on a higher layer
 * "cuts" the rope below it -> real-looking over/under crossings.
 */
export type RopeColor = 'a' | 'b' | 'cord';

export interface Strand {
  pts: string;
  c?: RopeColor;
  /** Index of the first point of the working end (drawn in the working colour). */
  w?: number;
  /** Rope width (default 14). */
  wd?: number;
  /** Doubled rope (a bight). Draws two parallel ropes. */
  dbl?: boolean;
  /** Doubled rope only: draw the bight's loop at the last visible point. */
  loop?: number;
}

export interface Obj {
  /** A post/rail/log/peg drawn as a rounded rectangle. */
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  kind?: 'wood' | 'metal';
}

export interface Frame {
  /** How many points of each strand are shown (undefined/null = all). */
  n?: (number | null)[];
  /** Step text. */
  s: string;
  /** Draw "pull" arrows at the rope ends. */
  pull?: boolean;
  /** Replace the knot's strands for this frame (for knots tied in the bight). */
  strands?: Strand[];
  /** Extra hint arrow (points, drawn dashed). */
  arrow?: string;
}

export type KnotCat = 'loop' | 'hitch' | 'bend' | 'stopper' | 'binding' | 'friction';

export interface Knot {
  id: string;
  name: string;
  cat: KnotCat;
  level: 1 | 2 | 3;
  /** One-line summary. */
  tag: string;
  vb?: string;
  strands: Strand[];
  objs?: Obj[];
  frames: Frame[];
  use: string[];
  check: string[];
  mistakes: string[];
}
