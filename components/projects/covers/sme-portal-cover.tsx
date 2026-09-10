import { Box, Cover, Cylinder, INK, INK_SOFT, Label } from "./primitives";

/**
 * SME Portal — the shape of this system is a *comb*: one Kafka event bus runs
 * the full width, and every bounded context hangs off it as a service with its
 * own database. Three portals enter through one gateway that carries auth and
 * tenant routing; the dashed enclosure is the Kubernetes boundary.
 *
 * The service list is the one from the database design set, one document per
 * service, so the teeth are the real bounded contexts rather than a tidied
 * summary of them.
 *
 * The accent is the event bus, because "these services only talk through
 * events" is the one architectural claim this project is making. Structurally
 * this is a horizontal spine with repeated identical teeth — nothing like
 * TargetX's dot matrix or the grading pipeline's left-to-right chain.
 */

// 8 slots of 88px, centred in the 800 canvas: 7 × 88 + 76 = 692, inset 54.
const SERVICES = [
  { x: 54, label: "IAM" },
  { x: 142, label: "TENANT" },
  { x: 230, label: "CUSTOMER" },
  { x: 318, label: "CATALOG" },
  { x: 406, label: "ORDER" },
  { x: 494, label: "PAYMENT" },
  { x: 582, label: "TICKET" },
  { x: 670, label: "AI" },
];

const SERVICE_W = 76;
const BUS_Y = 236;
const SERVICE_Y = 256;
const SERVICE_H = 54;
const DB_Y = 336;

export function SmePortalCover() {
  return (
    <Cover name="SME PORTAL">
      {/* Three portals, one entry point */}
      <Box x={40} y={92} w={226} h={42} label="CUSTOMER" size={11} />
      <Box x={286} y={92} w={226} h={42} label="PARTNER" size={11} />
      <Box x={532} y={92} w={226} h={42} label="ADMIN" size={11} />
      <g stroke="currentColor" strokeOpacity={INK} fill="none">
        <line x1={153} y1={134} x2={153} y2={152} />
        <line x1={399} y1={134} x2={399} y2={152} />
        <line x1={645} y1={134} x2={645} y2={152} />
      </g>

      <Box
        x={40}
        y={152}
        w={720}
        h={44}
        label="API GATEWAY"
        sub="KEYCLOAK · OIDC · MULTI-TENANT"
        size={11}
      />
      <g stroke="currentColor" strokeOpacity={INK} fill="none">
        <line x1={400} y1={196} x2={400} y2={BUS_Y} />
      </g>

      {/* Kubernetes boundary, drawn first so the comb sits on top of it */}
      <rect
        x={44}
        y={246}
        width={712}
        height={136}
        rx={2}
        fill="none"
        stroke="currentColor"
        strokeOpacity={INK_SOFT}
        strokeDasharray="4 6"
      />

      {/* The event bus — the one accent in this drawing */}
      <Label x={40} y={226} size={11} opacity={INK}>
        KAFKA EVENT BUS
      </Label>
      <line
        x1={40}
        y1={BUS_Y}
        x2={760}
        y2={BUS_Y}
        className="stroke-accent"
        strokeWidth={2}
      />
      <g className="fill-accent">
        {[186, 362, 538, 714].map((x) => (
          <rect key={x} x={x} y={BUS_Y - 4} width={8} height={8} />
        ))}
      </g>

      {/* Service per bounded context, database per service */}
      {SERVICES.map(({ x, label }) => {
        const cx = x + SERVICE_W / 2;

        return (
          <g key={label}>
            <line
              x1={cx}
              y1={BUS_Y}
              x2={cx}
              y2={SERVICE_Y}
              stroke="currentColor"
              strokeOpacity={INK}
            />
            <Box x={x} y={SERVICE_Y} w={SERVICE_W} h={SERVICE_H} label={label} size={9} />
            <line
              x1={cx}
              y1={SERVICE_Y + SERVICE_H}
              x2={cx}
              y2={DB_Y}
              stroke="currentColor"
              strokeOpacity={INK}
            />
            <Cylinder x={cx - 30} y={DB_Y} w={60} h={26} label="DB" size={9} />
          </g>
        );
      })}

      <Label x={44} y={410} size={11} opacity={INK}>
        KUBERNETES · GITLAB CI
      </Label>
      <Label x={756} y={410} size={11} opacity={INK} anchor="end">
        DB PER SERVICE · DDD
      </Label>
      <Label x={44} y={440} size={10} opacity={INK_SOFT}>
        PAYMENT GATEWAY · E-INVOICE · EMAIL / SMS / ZALO
      </Label>
    </Cover>
  );
}
