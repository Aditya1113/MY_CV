// Path waypoints (% of viewport) — the golden trail Swarnima walks along
export const PATH_POINTS = [
  { x: 5.2, y: 78 },   // stop 1 (bldg 1)
  { x: 7, y: 75 },
  { x: 9, y: 72 },
  { x: 11, y: 69 },
  { x: 13, y: 66 },
  { x: 15, y: 63 },
  { x: 17.5, y: 61 },  // stop 2 (bldg 2)
  { x: 20, y: 58 },
  { x: 22, y: 55 },
  { x: 24, y: 53 },
  { x: 26, y: 51 },
  { x: 28, y: 49 },
  { x: 30.5, y: 48 },  // stop 3 (bldg 3)
  { x: 33, y: 46 },
  { x: 35, y: 44 },
  { x: 37, y: 43 },
  { x: 39, y: 42 },
  { x: 41, y: 41 },
  { x: 44.5, y: 39 },  // stop 4 (bldg 4)
  { x: 47, y: 38 },
  { x: 49, y: 37 },
  { x: 51, y: 36 },
  { x: 53, y: 35 },
  { x: 55, y: 34 },
  { x: 58.5, y: 32 },  // stop 5 (bldg 5)
  { x: 60, y: 29 },
  { x: 62, y: 26 },
  { x: 64, y: 23 },
  { x: 66, y: 21 },
  { x: 68, y: 20 },    // stop 6 (bldg 6)
  { x: 69, y: 23 },
  { x: 70, y: 26 },
  { x: 70.5, y: 29 },
  { x: 71, y: 32 },
  { x: 71.5, y: 35 },
  { x: 72, y: 38 },
  { x: 73, y: 40 },    // stop 7 (bldg 7)
  { x: 73.5, y: 43 },
  { x: 74, y: 46 },
  { x: 75, y: 49 },
  { x: 76, y: 52 },
  { x: 77, y: 55 },
  { x: 78, y: 58 },    // stop 8 (bldg 8)
  { x: 79, y: 61 },
  { x: 80, y: 64 },
  { x: 81, y: 67 },
  { x: 82, y: 70 },
  { x: 83.5, y: 73 },
  { x: 85, y: 76 },    // stop 9 (bldg 9)

  // CHANGED: 49–53 used to climb back UP to (92, 58.5) before index 54
  // teleported down to (87, 87). The trail detoured away from building 10
  // and snapped back, so Swarnima could never walk into stop 54.
  // These now descend smoothly from building 9 to building 10.
  { x: 85.4, y: 78.5 },
  { x: 85.9, y: 81 },
  { x: 86.3, y: 83 },
  { x: 86.6, y: 85 },
  { x: 86.8, y: 86.5 },
  { x: 87, y: 88 },    // stop 10 (bldg 10)
];

// Which path index corresponds to each building
export const BUILDING_STOPS = {
  1: 0, 2: 6, 3: 12, 4: 18, 5: 24, 6: 29, 7: 36, 8: 42, 9: 48, 10: 54,
};

export const MAX_XP = 22000;
