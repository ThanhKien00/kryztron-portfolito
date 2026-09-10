// Regenerates `components/ui/tech-logos.ts` from the `simple-icons` package
// (CC0-1.0 icon data). Run with `npm run logos:generate` after adding a slug
// below — the generated file is committed so the runtime bundle never depends
// on `simple-icons`.
import { readFileSync, writeFileSync } from "node:fs";
import * as si from "simple-icons";

// `simple-icons` does not export its own package.json, so read it off disk.
const { version } = JSON.parse(
  readFileSync(new URL("../node_modules/simple-icons/package.json", import.meta.url), "utf8"),
);

/** simple-icons slugs used by the skills section, in render order. */
const SLUGS = [
  "openjdk",
  "spring",
  "springboot",
  "springsecurity",
  "postgresql",
  "mysql",
  "redis",
  "apachekafka",
  "rabbitmq",
  "docker",
  "kubernetes",
  "git",
  "gitlab",
  "jenkins",
  "junit5",
  "sonarqubeserver",
  "keycloak",
  "openid",
  "claude",
  "githubcopilot",
];

/** WCAG relative luminance, used to detect marks that vanish on dark surfaces. */
function luminance(hex) {
  const channels = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

/** Mixes `hex` toward white by `amount` (0-1). */
function lighten(hex, amount) {
  const mixed = [0, 2, 4]
    .map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16);
      return Math.round(c + (255 - c) * amount)
        .toString(16)
        .padStart(2, "0");
    })
    .join("");
  return mixed.toUpperCase();
}

/**
 * Near-black marks (OpenJDK, Kafka, GitHub Copilot) would be invisible on the
 * dark background, so they get a lightened variant instead of the brand hex.
 */
function darkVariant(hex) {
  let out = hex;
  let guard = 0;
  while (luminance(out) < 0.25 && guard++ < 12) out = lighten(out, 0.25);
  return out;
}

const entries = SLUGS.map((slug) => {
  const icon = si[`si${slug[0].toUpperCase()}${slug.slice(1)}`];
  if (!icon) throw new Error(`Unknown simple-icons slug: ${slug}`);
  return `  ${slug}: {
    title: ${JSON.stringify(icon.title)},
    hex: "#${icon.hex}",
    hexDark: "#${darkVariant(icon.hex)}",
    path: ${JSON.stringify(icon.path)},
  },`;
});

const file = `// GENERATED FILE — do not edit by hand.
// Source: simple-icons v${version} icon data (CC0-1.0), https://simpleicons.org
// Regenerate with: npm run logos:generate

export type BrandLogo = {
  title: string;
  /** Brand hex, used on hover in light mode. */
  hex: string;
  /** Brand hex lightened when the original is too dark for the dark theme. */
  hexDark: string;
  /** 24x24 fill path. */
  path: string;
};

export const brandLogos = {
${entries.join("\n")}
} as const satisfies Record<string, BrandLogo>;

export type BrandLogoSlug = keyof typeof brandLogos;
`;

writeFileSync(new URL("../components/ui/tech-logos.ts", import.meta.url), file);
console.log(`Wrote ${SLUGS.length} brand logos.`);
