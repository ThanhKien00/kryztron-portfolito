import type { ComponentType } from "react";
import type { ProjectKey } from "@/content/profile";
import { AutoGradingCover } from "./auto-grading-cover";
import { SmePortalCover } from "./sme-portal-cover";
import { TargetXCover } from "./targetx-cover";

/**
 * Typed as `Record<ProjectKey, …>`, so adding a project to `profile.ts` without
 * drawing it a cover is a compile error rather than a blank frame in the work
 * section.
 */
export const projectCovers: Record<ProjectKey, ComponentType> = {
  targetx: TargetXCover,
  smePortal: SmePortalCover,
  autoGrading: AutoGradingCover,
};
