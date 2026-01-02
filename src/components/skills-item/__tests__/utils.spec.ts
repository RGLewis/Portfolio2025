import { SkillLevels } from "@/types/content-types";
import { SkillLevelPercentages } from "../types";
import { getSkillLevelPercentage } from "../utils";

describe("skills-item utils", () => {
  describe("getSkillLevelPercentage", () => {
    it.each([
      {
        level: SkillLevels.COMFORTABLE,
        expectedPercentage: SkillLevelPercentages.COMFORTABLE,
      },
      {
        level: SkillLevels.ADVANCED,
        expectedPercentage: SkillLevelPercentages.ADVANCED,
      },
      {
        level: SkillLevels.EXPERT,
        expectedPercentage: SkillLevelPercentages.EXPERT,
      },
    ])(
      "calculates $expectedPercentage% for $level",
      ({ level, expectedPercentage }) => {
        expect(getSkillLevelPercentage(level)).toBe(expectedPercentage);
      }
    );
  });
});
