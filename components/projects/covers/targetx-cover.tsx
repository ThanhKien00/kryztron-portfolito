import { Arrow, Box, Cover, Cylinder, INK, INK_FAINT, INK_SOFT, Label } from "./primitives";

/**
 * TargetX — drawn from the architecture the tech proposal fixed: two portals
 * enter through one gateway, four modules sit inside a single deploy unit, and
 * the subscriber estimate is answered from pre-computed sketches rather than
 * from the data lake itself. Events leave through a Kafka outbox.
 *
 * The dot matrix is the point of the drawing and the only thing wearing the
 * accent: the accented cells are the segment a filter selected out of the
 * subscriber base. No other cover uses a field of cells, which is what keeps
 * the three from reading as one template recoloured.
 */

const CELL = 8;
const PITCH = 14;
const COLS = 16;
const ROWS = 8;
const GRID_X = 520;
const GRID_Y = 110;

/**
 * Deterministic so the render is stable between server and client — a random
 * pattern would hydrate differently every load. The modulus produces a scatter
 * that reads as a selected audience rather than a repeating texture.
 */
function isSelected(col: number, row: number) {
  return (col * 5 + row * 11) % 9 < 2;
}

export function TargetXCover() {
  const cells = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const selected = isSelected(col, row);
      cells.push(
        <rect
          key={`${col}-${row}`}
          x={GRID_X + col * PITCH}
          y={GRID_Y + row * PITCH}
          width={CELL}
          height={CELL}
          className={selected ? "fill-accent" : "fill-current"}
          fillOpacity={selected ? 1 : INK_FAINT}
        />,
      );
    }
  }

  return (
    <Cover name="TARGETX">
      {/* Two portals, one gateway. The realms are the reason the gateway is
          drawn at all: admin and advertiser authenticate against separate
          identity realms, and the routing decision is made here. */}
      <Label x={40} y={108} size={9} opacity={INK_SOFT}>
        REACT SPA
      </Label>
      <Box x={40} y={118} w={112} h={44} label="ADVERTISER" size={10} />
      <Box x={40} y={190} w={112} h={44} label="ADMIN" size={10} />
      <g stroke="currentColor" strokeOpacity={INK} fill="none">
        <path d="M152 140 H176 V212 H152" />
      </g>
      <Arrow x1={176} y1={176} x2={194} y2={176} />

      <Box x={194} y={132} w={94} h={88} label="GATEWAY" sub="KEYCLOAK" size={10} />
      <Arrow x1={288} y1={176} x2={306} y2={176} />

      {/* One deploy unit, four module boundaries — the rules are the boundaries,
          which is the whole claim of a modular monolith. */}
      <rect
        x={306}
        y={90}
        width={190}
        height={172}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeOpacity={INK}
      />
      <g stroke="currentColor" strokeOpacity={INK_FAINT}>
        <line x1={306} y1={133} x2={496} y2={133} />
        <line x1={306} y1={176} x2={496} y2={176} />
        <line x1={306} y1={219} x2={496} y2={219} />
      </g>
      <Label x={322} y={116} size={12} opacity={0.82}>
        PLATFORM
      </Label>
      <Label x={322} y={159} size={12} opacity={0.82}>
        ADMIN
      </Label>
      <Label x={322} y={202} size={12} opacity={0.82}>
        CORE ADS
      </Label>
      <Label x={322} y={245} size={12} opacity={0.82}>
        MPDL
      </Label>
      <Label x={306} y={282} size={10} opacity={INK_SOFT}>
        MODULAR MONOLITH · JAVA 21
      </Label>

      <Arrow x1={496} y1={176} x2={514} y2={176} />

      {/* Subscriber base — the accent lives here and nowhere else. */}
      <Label x={520} y={100} size={10} opacity={INK_SOFT}>
        DATA LAKE · SPARK ETL
      </Label>
      {cells}
      <Label x={520} y={242} size={11} opacity={INK}>
        ≈80M SUBSCRIBERS
      </Label>
      <Label x={520} y={260} size={10} opacity={INK_SOFT}>
        HLL SKETCH · ±2%
      </Label>

      {/* Stores behind the modules */}
      <line
        x1={40}
        y1={292}
        x2={760}
        y2={292}
        stroke="currentColor"
        strokeOpacity={INK_FAINT}
      />
      <Cylinder x={40} y={306} w={150} h={36} label="POSTGRESQL" />
      <Cylinder x={230} y={306} w={150} h={36} label="REDIS · HLL" />
      <Cylinder x={420} y={306} w={150} h={36} label="CLICKHOUSE" />
      <Cylinder x={610} y={306} w={150} h={36} label="MINIO" />

      {/* Outbox spine: one write path out of the platform, two destinations. */}
      <Label x={40} y={400} size={11} opacity={INK}>
        KAFKA OUTBOX
      </Label>
      <g stroke="currentColor" strokeOpacity={INK} fill="none">
        <line x1={40} y1={416} x2={516} y2={416} />
        <line x1={516} y1={384} x2={516} y2={448} />
      </g>
      <g className="fill-current" fillOpacity={INK}>
        <rect x={176} y={412} width={8} height={8} />
        <rect x={316} y={412} width={8} height={8} />
        <rect x={456} y={412} width={8} height={8} />
      </g>
      <Arrow x1={516} y1={384} x2={538} y2={384} />
      <Arrow x1={516} y1={448} x2={538} y2={448} />
      <Box x={544} y={364} w={216} h={40} label="SMS · PUSH CHANNEL" size={10} />
      <Box x={544} y={428} w={216} h={40} label="REVENUE RECONCILE" size={10} />
    </Cover>
  );
}
