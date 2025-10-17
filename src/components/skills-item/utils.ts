import { SkillLevels } from "@/types/content-types";

export const SKILL_LEVELS_ORDER = [
  SkillLevels.COMFORTABLE,
  SkillLevels.ADVANCED,
  SkillLevels.EXPERT,
] as const;

/**
 * Calculates the width percentage for a skill level bar.
 * Percentages are evenly distributed based on the order of skill levels.
 *
 * @param level - The skill level to calculate percentage for
 * @returns The percentage width (e.g., 33.33 for COMFORTABLE, 66.66 for ADVANCED, 100 for EXPERT)
 *
 * @example
 * getSkillLevelPercentage(SkillLevels.COMFORTABLE) // returns 33.33...
 * getSkillLevelPercentage(SkillLevels.ADVANCED) // returns 66.66...
 * getSkillLevelPercentage(SkillLevels.EXPERT) // returns 100
 */
export const getSkillLevelPercentage = (level: SkillLevels): number => {
  const index = SKILL_LEVELS_ORDER.indexOf(level);
  const totalLevels = SKILL_LEVELS_ORDER.length;
  return ((index + 1) / totalLevels) * 100;
};
