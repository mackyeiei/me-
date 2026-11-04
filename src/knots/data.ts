import type { Knot } from './types';

// Geometry notes: viewBox 0 0 300 300. See types.ts for the point/layer format.
// Steps reveal the rope point by point, so the drawing always matches the final knot.

const POST = { x: 125, y: 8, w: 50, h: 284, z: 2 } as const;
const RAIL_TOP = { x: 14, y: 30, w: 272, h: 38, z: 2 } as const;

const FIG8 =
  '10,180,2 45,180,4 85,180,2 100,180,1 130,180,2 160,180,4 195,168,2 215,135 195,100 155,95 132,105,1 119,140,2 ' +
  '115,165,4 113,198,2 100,228 75,238 55,220 55,200,1 62,160,2 78,135 100,128,4 140,140,2 172,165,1 200,190,2 240,205 290,210';

const FIG8_LOOP =
  '10,180,2 45,180,4 85,180,2 100,180,1 130,180,2 160,180,4 195,168,2 215,135 195,100 155,95 132,105,1 119,140,2 ' +
  '115,165,4 113,198,2 100,228 75,238 55,220 55,200,1 62,160,2 78,135 100,128,4 140,140,2 172,165,1 200,190,2 232,204';

const BOWLINE =
  '150,6,2 150,30,4 150,70,1 149,100 147,135 158,158,4 180,163 202,148,2 208,120 196,96,1 172,84,4 150,99 128,114,1 ' +
  '108,150,2 98,200 112,248 152,268 196,250 214,205 200,178,1 186,128,2 182,100,4 172,66,2 162,50,1 136,46,2 118,62 ' +
  '112,95,4 128,135 163,148,1 168,180,2 170,215';

const CLOVE =
  '8,232,4 125,222 175,214 190,206,1 150,199 110,192 120,186,4 175,152 190,146,1 150,139 110,132 120,127,3 ' +
  '138,136 150,166 168,196 205,204,2 292,206';

const CONSTRICTOR =
  '8,232,4 130,222 170,214 184,207,1 150,200 116,193 124,187,4 170,152 184,146,1 150,139 116,132 124,127,3 ' +
  '140,140 148,172 156,206,1 166,232,2 210,244 292,246';

const TWO_HALF =
  '120,296,2 120,120 120,72 122,40 132,22 150,26,1 165,50 172,80,2 170,100 150,112,4 120,118 100,124 96,134,1 ' +
  '120,140 140,146 146,156,4 120,170 100,184 96,194,1 120,200 140,205 146,214,3 128,196 112,170 96,152 70,150,2 30,160';

const ROUND_TURN =
  '104,296,2 104,120 104,72 106,40 116,22 130,26,1 128,52 134,86,2 142,60 146,36 156,22 170,26,1 176,52 180,82,2 ' +
  '176,100 150,112,4 104,118 84,124 80,134,1 104,140 124,146 130,156,4 104,170 84,184 80,194,1 104,200 124,205 ' +
  '130,214,3 112,196 96,170 80,152 54,150,2 20,160';

// Doubled cord: 3 helical wraps = 6 bands across the rope, then the loop hangs down.
const PRUSIK =
  '150,74,1 120,80,1 118,88 128,94,4 150,98 172,104 182,114,1 150,120,1 118,126,1 128,134,4 150,138 172,144 ' +
  '182,154,1 150,160,1 118,166,1 128,174,4 150,178 172,184 182,194,1 165,210,1 170,240,2 178,258';

const TAUT =
  '120,4,2 120,90 120,230 128,250,4 150,262 178,252,2 185,220 184,190 182,150 165,138,4 120,145 100,152 100,162,1 ' +
  '120,166 150,170 158,178,4 120,184 100,190 100,200,1 120,204 148,207 162,196,5 170,150 165,118 140,108 100,100 ' +
  '100,88,1 120,84 142,88 150,96,3 162,112 200,110,2 232,122';

const TIMBER =
  '292,214,2 180,212 120,206 100,190,4 100,140 104,104 118,96,1 125,140 122,182,2 135,200,4 142,226 162,228 ' +
  '166,208,1 156,186,5 120,170 82,160,3 120,148,5 82,136,3 120,124,2 132,120';

export const KNOTS: Knot[] = [
  {
    id: 'bowline',
    name: 'Bowline',
    cat: 'loop',
    level: 2,
    tag: 'Fixed loop at the end of a rope. Will not slip or jam.',
    strands: [{ pts: BOWLINE, w: 19 }],
    frames: [
      { n: [21], s: 'Make a small loop with the working side ON TOP. Leave a big loop below it.' },
      { n: [24], s: 'Bring the end UP through the small loop (the rabbit comes out of the hole).' },
      { n: [27], s: 'Take it AROUND BEHIND the standing part (around the tree).' },
      { s: 'Go back DOWN through the small loop (back into the hole).' },
      { s: 'Hold the end and the loop side together. Pull the standing part hard to set it.', pull: true }
    ],
    use: ['Loop around your waist or a person for rescue', 'Tie a rope to a ring, tree or post', 'Hang a bag or tarp line'],
    check: ['The tail ends up INSIDE the big loop.', 'The collar wraps snugly around the standing part.', 'Leave a tail at least 10× the rope width.'],
    mistakes: ['Small loop made with the working side underneath: the knot falls apart.', 'Tail outside the loop ("cowboy bowline"): weaker, can snag.', 'Can shake loose when not loaded: add a stopper knot on the tail.']
  },
  {
    id: 'clove-hitch',
    name: 'Clove hitch',
    cat: 'hitch',
    level: 1,
    tag: 'Fast hitch to a post or pole. Easy to adjust.',
    objs: [POST],
    strands: [{ pts: CLOVE, w: 4 }],
    frames: [
      { n: [6], s: 'Wrap the end around the post.' },
      { n: [11], s: 'Cross diagonally OVER the first wrap and go around again, higher up.' },
      { s: 'Tuck the end UNDER the diagonal. You should see an X.' },
      { s: 'Pull both ends. They leave the middle in opposite directions.', pull: true }
    ],
    use: ['Start or finish lashings', 'Tie a line to a pole or railing quickly', 'Hang things where you need to adjust height'],
    check: ['One diagonal crosses over two parallel wraps.', 'The two ends come out of the middle, opposite directions.'],
    mistakes: ['Slips on square posts or when the pole rotates.', 'Can work loose when the load keeps changing: add a half hitch.', 'Not for climbing or life safety.']
  },
  {
    id: 'two-half-hitches',
    name: 'Two half hitches',
    cat: 'hitch',
    level: 1,
    tag: 'Tie a line to a ring, rail or tree. Simple and secure.',
    objs: [RAIL_TOP],
    strands: [{ pts: TWO_HALF, w: 7 }],
    frames: [
      { n: [9], s: 'Pass the end around the rail (or through the ring).' },
      { n: [13], s: 'First hitch: across the FRONT of the standing part, then around behind it.' },
      { n: [19], s: 'Cross diagonally down over it and go around behind again, lower.' },
      { s: 'Tuck the end UNDER the diagonal. Two half hitches = a clove hitch on the standing part.' },
      { s: 'Slide the hitches up snug to the rail and pull tight.', pull: true }
    ],
    use: ['Tie a guy line or clothesline to a tree', 'Secure a tarp to a ring or rail', 'Tie off the end of other knots'],
    check: ['Both hitches wrap the SAME direction (it looks like a clove hitch on the rope).', 'Hitches are snug up against the rail.'],
    mistakes: ['Wrapping in opposite directions makes a cow hitch that slips.', 'Leaving them loose and far from the rail.']
  },
  {
    id: 'round-turn',
    name: 'Round turn & two half hitches',
    cat: 'hitch',
    level: 1,
    tag: 'Strong tie-off that you can untie under load.',
    objs: [RAIL_TOP],
    strands: [{ pts: ROUND_TURN, w: 7 }],
    frames: [
      { n: [8], s: 'Pass the end around the rail once.' },
      { n: [15], s: 'Go around a SECOND time. This round turn takes the load.' },
      { n: [19], s: 'First half hitch: across the front of the standing part and around behind.' },
      { n: [25], s: 'Second half hitch: diagonally over, around behind again, lower.' },
      { s: 'Tuck the end UNDER the diagonal and pull snug.', pull: true }
    ],
    use: ['Tie a heavy load or boat to a post or ring', 'Anchor a ridgeline for a tarp', 'Hang a hammock or food bag'],
    check: ['Two full wraps lie side by side on the rail.', 'The half hitches go the same direction.'],
    mistakes: ['Only one wrap: then it is just two half hitches and grips less.', 'Crossing the two wraps over each other.']
  },
  {
    id: 'taut-line',
    name: 'Taut-line hitch',
    cat: 'friction',
    level: 2,
    tag: 'Adjustable loop that holds tension. Great for tent lines.',
    objs: [{ x: 138, y: 236, w: 24, h: 64, z: 2 }],
    strands: [{ pts: TAUT, w: 5 }],
    frames: [
      { n: [9], s: 'Pass the end around the stake and back up beside the line.' },
      { n: [16], s: 'Wrap the end around the line, INSIDE the loop (wrapping toward the stake).' },
      { n: [22], s: 'Wrap a second time, below the first.' },
      { n: [29], s: 'Bring the end up and wrap once more ABOVE the first two (outside the loop).' },
      { s: 'Tuck the end under itself. Slide the knot to tighten or loosen the line.', pull: true }
    ],
    use: ['Tent and tarp guy lines', 'Tighten a clothesline', 'Any line that needs re-tensioning'],
    check: ['Two wraps inside the loop, one above it.', 'The knot slides when pushed, but holds when the line pulls.'],
    mistakes: ['Wrapping the last turn on the wrong side: it will not grip.', 'Very slippery modern rope may need an extra inside wrap.']
  },
  {
    id: 'square-knot',
    name: 'Square knot (reef)',
    cat: 'binding',
    level: 1,
    tag: 'Join two ends around something: bandages, bundles.',
    strands: [
      { pts: '8,120,2 80,120,1 150,120,2 190,122,4 208,140 211,150 208,160 190,178,2 150,180,1 80,180,2 8,180', c: 'a' },
      { pts: '292,120,2 250,124 222,138,1 190,140,2 140,140 118,130,4 100,110,2 86,135 85,150 86,165,4 100,190,2 118,170 140,160 190,160,1 222,162,2 250,176 292,180', c: 'b' }
    ],
    frames: [
      { n: [null, 2], s: 'Classic way: right over left and under, then left over right and under. Easy way: make a U-bend in rope A.' },
      { n: [null, 7], s: 'Feed rope B in UNDER the end of the U, then OVER the top leg.' },
      { n: [null, 12], s: 'Around and OVER the bottom leg.' },
      { s: 'Back out UNDER the end of the U, beside itself.' },
      { s: 'Pull. Each rope makes a U that hugs the other. Both short ends on the same side.', pull: true }
    ],
    use: ['Tie a bandage or sling', 'Close a bag or bundle firewood', 'Reef a sail or tie a package'],
    check: ['Two interlocking U shapes.', 'Each rope’s two parts come out on the SAME side of the other U.'],
    mistakes: ['Granny knot (same over twice): slips. Remember right-over-left, then left-over-right.', 'NEVER use it to join two ropes that carry weight. Use a sheet bend or double fisherman’s.']
  },
  {
    id: 'sheet-bend',
    name: 'Sheet bend',
    cat: 'bend',
    level: 1,
    tag: 'Join two ropes, even of different thickness.',
    strands: [
      { pts: '50,120,2 60,120,4 95,120,1 178,122,4 200,135 205,150 200,165 178,178,1 100,180,4 60,180,2 10,180', c: 'b', wd: 17 },
      { pts: '292,150,2 240,150 220,150,1 185,150,3 155,145 135,135,4 115,105,2 92,96 78,110,1 76,150 80,192,2 100,210 128,205 142,190,4 150,168,1 160,130,4 166,100,2 172,72', c: 'a', w: 6, wd: 12 }
    ],
    frames: [
      { n: [null, 0], s: 'Make a U-bend (bight) in the THICKER rope.' },
      { n: [null, 7], s: 'Bring the thin rope’s end UP through the U, from behind.' },
      { n: [null, 13], s: 'Wrap it around BEHIND both legs of the U.' },
      { s: 'Tuck it UNDER itself but OVER the U.' },
      { s: 'Pull all four parts tight. The two short ends should be on the same side.', pull: true }
    ],
    use: ['Join two ropes to make a longer line', 'Tie a rope to a tarp corner or net', 'Join thick and thin rope'],
    check: ['Thin rope makes a collar around both legs of the U.', 'Short ends on the same side (top).'],
    mistakes: ['Ends on opposite sides: weaker (left-handed sheet bend).', 'Can loosen when not loaded: use a double sheet bend (two wraps) for slippery rope.']
  },
  {
    id: 'figure-eight',
    name: 'Figure-eight',
    cat: 'stopper',
    level: 1,
    tag: 'Stopper knot. Stops a rope sliding out of a hole or hand.',
    strands: [{ pts: FIG8, w: 4 }],
    frames: [
      { n: [15], s: 'Make a loop: lay the end OVER the standing part.' },
      { n: [20], s: 'Take the end around BEHIND the standing part.' },
      { s: 'Feed the end through the first loop from the FRONT.' },
      { s: 'Pull both ends. It should look like an 8.', pull: true }
    ],
    use: ['Stop a rope end pulling through a pulley, grommet or your hand', 'Back-up on the tail of other knots', 'Base for the figure-eight loop'],
    check: ['You can see a clear "8" shape.', 'Easy to untie even after loading.'],
    mistakes: ['Only one turn = an overhand knot (jams, weaker).', 'Tail too short: leave a few cm.']
  },
  {
    id: 'figure-eight-loop',
    name: 'Figure-eight loop',
    cat: 'loop',
    level: 2,
    tag: 'Very strong fixed loop. Easy to inspect.',
    strands: [{ pts: FIG8_LOOP, dbl: true, wd: 8, loop: 40 }],
    frames: [
      { n: [4], s: 'Double the rope to make a long bight (U).' },
      { n: [15], s: 'Make a loop with the bight, crossing OVER the doubled rope.' },
      { n: [20], s: 'Wrap the bight around BEHIND the doubled rope.' },
      { s: 'Push the bight through the first loop from the front.' },
      { s: 'Dress it: strands side by side, no crossings. Pull all 4 strands.', pull: true }
    ],
    use: ['Strong anchor loop', 'Clip a carabiner or hook', 'Loop to pull a heavy object'],
    check: ['A clean doubled "8" with parallel strands.', 'Tail at least 10 cm.'],
    mistakes: ['Strands crossed inside the knot: weaker and harder to inspect.', 'Hard to untie after a heavy load (that is normal).']
  },
  {
    id: 'truckers-hitch',
    name: 'Trucker’s hitch',
    cat: 'hitch',
    level: 3,
    tag: 'Pulley knot. Cinch loads and tarps really tight.',
    objs: [{ x: 30, y: 258, w: 240, h: 30, z: 2, kind: 'metal' }],
    strands: [
      {
        pts:
          '100,0,2 100,70 100,92,1 110,125,2 135,130 150,110 140,88 118,92,4 100,125,2 105,170 110,232,4 118,268 ' +
          '138,292,1 150,262 152,248,2 155,200 150,150,1 135,108,2 128,75,4 135,55,2 160,50 178,75 185,140 182,196 ' +
          '170,206,4 152,210 136,214 136,226,1 152,230 170,232 172,242,4 152,245 136,248 136,258,1 160,262 196,266',
        w: 9
      }
    ],
    frames: [
      { n: [9], s: 'Make a fixed loop in the standing part (alpine butterfly is best).' },
      { n: [16], s: 'Pass the end around the anchor (hook, rail, tie-down point).' },
      { n: [21], s: 'Bring the end back up THROUGH the loop. This is your 2:1 pulley.' },
      { n: [25], s: 'Pull DOWN hard to tension the line. Pinch it to hold.' },
      { s: 'Lock it with two half hitches around the line below the loop.', pull: true }
    ],
    use: ['Tie loads down on a truck or bike', 'Make a ridgeline tight for a tarp', 'Tension a clothesline'],
    check: ['The loop is a real fixed loop, not just a twist.', 'Line is tight before you tie off.'],
    mistakes: ['Using a simple twist as the loop: it can capsize.', 'Rope rubbing on itself in the loop wears it fast: a carabiner helps.']
  },
  {
    id: 'prusik',
    name: 'Prusik',
    cat: 'friction',
    level: 3,
    tag: 'Grips a rope when loaded, slides when not.',
    strands: [{ pts: '150,0 150,300', c: 'a', wd: 30 }],
    frames: [
      {
        s: 'Take a loop of thinner cord. Put it behind the main rope, with the bight sticking out one side.',
        strands: [
          { pts: '150,0 150,300', c: 'a', wd: 30 },
          { pts: '235,268,2 205,205 175,160,1 120,152 100,150', c: 'cord', wd: 7, dbl: true, loop: 22 }
        ]
      },
      {
        s: 'Pass the bight around the rope and through itself. Repeat for 3 neat wraps, each one inside the last.',
        strands: [
          { pts: '150,0 150,300', c: 'a', wd: 30 },
          { pts: PRUSIK, c: 'cord', wd: 7, dbl: true, loop: 24 }
        ]
      },
      {
        s: 'Dress it: wraps side by side, nothing crossed. Pull the loop to grip. Push the knot body (not the loop) to slide it.',
        pull: true,
        strands: [
          { pts: '150,0 150,300', c: 'a', wd: 30 },
          { pts: PRUSIK, c: 'cord', wd: 7, dbl: true, loop: 24 }
        ]
      }
    ],
    use: ['Climb or haul up a fixed rope (with training)', 'Adjustable tie-out point on a ridgeline', 'Backup grip on a rope'],
    check: ['Cord is clearly thinner than the main rope (about 60–70%).', '3 neat wraps; it grips hard when you pull the loop.'],
    mistakes: ['Cord too thick or too thin: slips or will not slide.', 'Life-safety climbing needs proper training and gear. Do not learn it on a real drop.']
  },
  {
    id: 'timber-hitch',
    name: 'Timber hitch',
    cat: 'hitch',
    level: 1,
    tag: 'Grab and drag a log, pole or bundle.',
    objs: [{ x: 14, y: 108, w: 272, h: 64, z: 2 }],
    strands: [{ pts: TIMBER, w: 5 }],
    frames: [
      { n: [9], s: 'Pass the end around the log.' },
      { n: [14], s: 'Take it around the standing part.' },
      { s: 'Twist the end around its own loop at least 3 times.' },
      { s: 'Pull the standing part. The loop cinches onto the log.', pull: true }
    ],
    use: ['Drag a log or bundle of bamboo', 'Start a diagonal lashing', 'Lift a pole'],
    check: ['At least 3 twists, following the rope’s twist.', 'Falls apart easily once tension is off (that is the point).'],
    mistakes: ['Too few twists: it slips.', 'For long drags, add a half hitch further along the log so it pulls straight.']
  },
  {
    id: 'double-fisherman',
    name: 'Double fisherman’s',
    cat: 'bend',
    level: 2,
    tag: 'Very secure join for two ropes or to make a cord loop.',
    strands: [
      { pts: '5,135,2 150,135 225,135 245,124 240,110,4 212,182 200,192,1 198,112 190,108,4 164,182 152,192,1 150,110 148,118,3 175,150 232,150 292,150,2', c: 'a' },
      { pts: '295,165,2 150,165 75,165 55,176 60,190,4 88,118 100,108,1 102,188 110,192,4 136,118 148,108,1 150,190 152,182,3 125,150 68,150 8,150,2', c: 'b' }
    ],
    frames: [
      { n: [4, 4], s: 'Overlap the two ends, side by side.' },
      { n: [12, 4], s: 'Wrap end A twice around BOTH ropes, working back toward its own side.' },
      { n: [null, 4], s: 'Tuck end A back through both wraps. That is a double overhand.' },
      { s: 'Do the same with end B on the other side.' },
      { s: 'Pull the standing parts: the two knots slide together.', pull: true }
    ],
    use: ['Join two ropes for a heavy load', 'Make a prusik loop or sling from cord', 'Repair a snapped line'],
    check: ['Each side shows an X on one face and 4 parallel lines on the other.', 'The two knots sit snug against each other.'],
    mistakes: ['Wraps crossed or loose: weaker.', 'Very hard to untie after load. That is normal.']
  },
  {
    id: 'alpine-butterfly',
    name: 'Alpine butterfly',
    cat: 'loop',
    level: 3,
    tag: 'Fixed loop in the MIDDLE of a rope. Takes pull in any direction.',
    strands: [],
    frames: [
      { s: 'Make a long bight (U) in the middle of the rope.', strands: [{ pts: '5,245 90,245 125,230 135,160 140,90 150,60 160,90 165,160 175,230 210,245 295,245' }] },
      {
        s: 'Twist the bight one full turn, then once more, the same way. You get a figure 8.',
        strands: [{ pts: '5,245,2 100,245 135,222,4 165,190,2 178,165 160,145,1 135,125,2 120,95 130,62 150,52 170,62 180,95 165,125,4 140,150,2 122,165 135,190,1 165,222,2 200,245 295,245' }]
      },
      {
        s: 'Fold the top loop DOWN in front, then push it back through the lower opening (between the two twists).',
        strands: [{ pts: '5,245,2 100,245 135,222,4 165,190,2 178,165 160,145,1 135,125,2 120,95 130,62 150,52 170,62 180,95 165,125,4 140,150,2 122,165 135,190,1 165,222,2 200,245 295,245' }],
        arrow: '150,48 190,110 168,200 152,172'
      },
      {
        s: 'Pull the loop through, then pull the two ends apart hard to set it. The loop sits between two Xs.',
        pull: true,
        strands: [{ pts: '5,245,2 100,245 135,222,4 165,190,2 178,165 160,145,1 138,128,2 126,138,5 136,165 138,190,0 128,232 150,276 172,232 162,190 164,165,5 174,140 165,125,4 140,150,2 122,165 135,190,1 165,222,2 200,245 295,245' }]
      }
    ],
    use: ['Loop in the middle of a line to clip or hang gear', 'Isolate a damaged section of rope', 'Loop for a trucker’s hitch'],
    check: ['The ends leave in opposite directions.', 'Pulling both ends does not shrink the loop. Load-test before trusting it.'],
    mistakes: ['Twists in opposite directions: the knot falls apart.', 'Practice at home: it is easy to get wrong the first few times.']
  },
  {
    id: 'constrictor',
    name: 'Constrictor',
    cat: 'binding',
    level: 2,
    tag: 'Grips like a vice. Closes bags, holds bundles, whips rope ends.',
    objs: [{ x: 130, y: 8, w: 40, h: 284, z: 2 }],
    strands: [{ pts: CONSTRICTOR, w: 4 }],
    frames: [
      { n: [6], s: 'Wrap the end around the object.' },
      { n: [11], s: 'Cross diagonally OVER and go around again.' },
      { s: 'Tuck the end under the diagonal AND under the first wrap (like a clove hitch, one tuck further).' },
      { s: 'Pull both ends HARD. It locks tight.', pull: true }
    ],
    use: ['Tie off a sack or bag neck', 'Clamp a hose or bundle', 'Temporary whipping on a fraying rope end'],
    check: ['The diagonal holds an overhand knot underneath it.', 'Does not loosen when you let go.'],
    mistakes: ['Very hard to untie: often you have to cut it. Use a slipped version if you need to undo it.', 'Not good on flat or square objects.']
  }
];

export const CAT_LABEL: Record<string, string> = {
  loop: 'Loop',
  hitch: 'Hitch',
  bend: 'Bend (join)',
  stopper: 'Stopper',
  binding: 'Binding',
  friction: 'Friction'
};
