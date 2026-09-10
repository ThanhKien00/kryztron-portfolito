import {
  Arrow,
  Box,
  Cover,
  Cylinder,
  INK,
  INK_FAINT,
  INK_SOFT,
  INK_STRONG,
  Label,
} from "./primitives";

/**
 * Automatic grading — the shape of this system is a *chain*: one artefact (an
 * OMR answer sheet) enters on the left and is transformed stage by stage until
 * it lands in Postgres as a result. The tall portrait sheet on the left is the
 * silhouette that makes this cover unmistakable next to the other two.
 *
 * The accent is the detection box, the single frame the vision model returns —
 * it is the only part of this system that is not ordinary CRUD, and it is the
 * part the drawing is about.
 */

const SHEET_X = 40;
const SHEET_Y = 100;
const SHEET_W = 168;
const SHEET_H = 300;

const BUBBLE_COLS = [72, 108, 144, 180];
const BUBBLE_ROWS = [158, 188, 218, 248, 278, 308, 338, 368];

/** Entities the management side of the system actually owns. */
const ENTITIES = ["STUDENT", "TEACHER", "SUBJECT", "EXAM", "RESULT"];

export function AutoGradingCover() {
  return (
    <Cover name="AUTO GRADING">
      {/* The answer sheet */}
      <rect
        x={SHEET_X}
        y={SHEET_Y}
        width={SHEET_W}
        height={SHEET_H}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeOpacity={INK}
      />
      {/* Registration marks — how the scanner squares the page up */}
      <g className="fill-current" fillOpacity={INK_SOFT}>
        <rect x={52} y={112} width={22} height={8} />
        <rect x={174} y={112} width={22} height={8} />
      </g>
      <line
        x1={SHEET_X}
        y1={136}
        x2={SHEET_X + SHEET_W}
        y2={136}
        stroke="currentColor"
        strokeOpacity={INK_FAINT}
      />

      {BUBBLE_ROWS.map((cy, row) =>
        BUBBLE_COLS.map((cx, col) => {
          // One marked answer per row, walking across the options so the sheet
          // reads as filled in rather than as a regular pattern.
          const marked = (row * 3 + 1) % 4 === col;

          return (
            <circle
              key={`${row}-${col}`}
              cx={cx}
              cy={cy}
              r={6}
              fill={marked ? "currentColor" : "none"}
              fillOpacity={marked ? INK_STRONG : 0}
              stroke="currentColor"
              strokeOpacity={marked ? 0 : INK_SOFT}
            />
          );
        }),
      )}

      {/* Detection frame — the one accent */}
      <rect
        x={52}
        y={200}
        width={144}
        height={36}
        fill="none"
        className="stroke-accent"
        strokeWidth={2}
      />
      <g className="stroke-accent" strokeWidth={2} fill="none">
        <path d="M52 212 V200 H64" />
        <path d="M184 200 H196 V212" />
        <path d="M196 224 V236 H184" />
        <path d="M64 236 H52 V224" />
      </g>

      <Label x={SHEET_X} y={424} size={11} opacity={INK}>
        OMR SHEET
      </Label>

      {/* The chain */}
      <Arrow x1={210} y1={250} x2={246} y2={250} />
      <Box x={248} y={224} w={132} h={52} label="YOLOv8" sub="PYTHON" size={13} />
      <Arrow x1={382} y1={250} x2={410} y2={250} />

      <g className="fill-current" fillOpacity={INK_SOFT}>
        <rect x={412} y={226} width={72} height={9} />
        <rect x={412} y={240} width={72} height={9} />
        <rect x={412} y={254} width={72} height={9} />
        <rect x={412} y={268} width={72} height={9} />
      </g>
      <Label x={412} y={296} size={10} opacity={INK}>
        REDIS QUEUE
      </Label>

      <Arrow x1={486} y1={250} x2={514} y2={250} />
      <Box x={516} y={224} w={132} h={52} label="SPRING API" sub="JAVA 17" size={13} />
      <Arrow x1={650} y1={250} x2={674} y2={250} />
      <Cylinder x={676} y={224} w={84} h={44} label="POSTGRES" size={10} />

      {/* Everything the API manages around the grading flow */}
      <Label x={228} y={340} size={10} opacity={INK_SOFT}>
        MANAGEMENT DOMAIN
      </Label>
      {ENTITIES.map((label, index) => {
        const x = 228 + index * 110;

        return (
          <g key={label}>
            <Box x={x} y={356} w={92} h={38} label={label} size={10} />
            {index < ENTITIES.length - 1 ? (
              <line
                x1={x + 92}
                y1={375}
                x2={x + 110}
                y2={375}
                stroke="currentColor"
                strokeOpacity={INK_SOFT}
              />
            ) : null}
          </g>
        );
      })}
    </Cover>
  );
}
