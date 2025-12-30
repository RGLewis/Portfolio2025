import { SkillLevels } from "@/types/content-types";
import type { SkillLevelPercentages } from "./types";

const SKILL_LEVELS_ORDER = [
  SkillLevels.COMFORTABLE,
  SkillLevels.ADVANCED,
  SkillLevels.EXPERT,
] as const;

/**
 * Calculates the width percentage for a skill level bar.
 * Percentages are evenly distributed based on the order of skill levels.
 * @param level - The skill level to calculate percentage for
 * @returns The percentage width rounded to 2 decimal places
 * @example
 * ```tsx
 * getSkillLevelPercentage(SkillLevels.COMFORTABLE) // returns 33.33
 * getSkillLevelPercentage(SkillLevels.ADVANCED) // returns 66.67
 * getSkillLevelPercentage(SkillLevels.EXPERT) // returns 100
 * ```
 */
export const getSkillLevelPercentage = (
  level: SkillLevels
): SkillLevelPercentages => {
  const index = SKILL_LEVELS_ORDER.indexOf(level);
  const totalLevels = SKILL_LEVELS_ORDER.length;
  const percentage = ((index + 1) / totalLevels) * 100;

  return Math.round(percentage * 100) / 100;
};
