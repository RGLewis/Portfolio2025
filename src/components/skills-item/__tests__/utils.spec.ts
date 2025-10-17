import { SkillLevels } from "@/types/content-types";
import { getSkillLevelPercentage, SKILL_LEVELS_ORDER } from "../utils";

describe("skills-item utils", () => {
  describe("getSkillLevelPercentage", () => {
    it.each([
      {
        level: SkillLevels.COMFORTABLE,
        expectedPercentage: 33.33333333333333,
        description: "calculates 33.33% for COMFORTABLE",
      },
      {
        level: SkillLevels.ADVANCED,
        expectedPercentage: 66.66666666666666,
        description: "calculates 66.66% for ADVANCED",
      },
      {
        level: SkillLevels.EXPERT,
        expectedPercentage: 100,
        description: "calculates 100% for EXPERT",
      },
    ])("$description", ({ level, expectedPercentage }) => {
      expect(getSkillLevelPercentage(level)).toBe(expectedPercentage);
    });

    it("calculates evenly distributed percentages", () => {
      const totalLevels = SKILL_LEVELS_ORDER.length;

      SKILL_LEVELS_ORDER.forEach((level, index) => {
        const expectedPercentage = ((index + 1) / totalLevels) * 100;
        expect(getSkillLevelPercentage(level)).toBe(expectedPercentage);
      });
    });
  });

  describe("SKILL_LEVELS_ORDER", () => {
    it("maintains correct order of skill levels", () => {
      expect(SKILL_LEVELS_ORDER).toEqual([
        SkillLevels.COMFORTABLE,
        SkillLevels.ADVANCED,
        SkillLevels.EXPERT,
      ]);
    });

    it("has 3 skill levels", () => {
      expect(SKILL_LEVELS_ORDER).toHaveLength(3);
    });
  });
});
