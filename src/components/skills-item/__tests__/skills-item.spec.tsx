import { SKILLS_ITEM_DATA_TEST_IDS } from "@/constants";
import { renderWithProviders } from "@/test-utils/test-utils";
import { SkillLevels } from "@/types/content-types";
import { screen } from "@testing-library/react";
import { SkillsItem } from "../skills-item";
import { getSkillLevelPercentage } from "../utils";

const comfortableSkill = {
  title: "JavaScript",
  level: SkillLevels.COMFORTABLE,
};
const advancedSkill = { title: "TypeScript", level: SkillLevels.ADVANCED };
const expertSkill = { title: "React", level: SkillLevels.EXPERT };

describe("SkillsItem", () => {
  const { skillsLevel } = SKILLS_ITEM_DATA_TEST_IDS;

  describe("Rendering", () => {
    it.each([
      { skill: comfortableSkill },
      { skill: advancedSkill },
      { skill: expertSkill },
    ])("renders $skill.level skill level", ({ skill }) => {
      renderWithProviders(<SkillsItem data={skill} />);

      expect(screen.getByText(skill.title)).toBeInTheDocument();
      expect(screen.getByText(skill.level)).toBeInTheDocument();
    });

    it.each([
      { skill: comfortableSkill },
      { skill: advancedSkill },
      { skill: expertSkill },
    ])(
      "renders the correct test id for $skill.level with the expected container width",
      ({ skill }) => {
        renderWithProviders(<SkillsItem data={skill} />);

        const levelContainer = screen.getByTestId(skillsLevel(skill.title));

        const expectedWidth = `${getSkillLevelPercentage(skill.level)}%`;

        expect(levelContainer).toHaveStyle(`width: ${expectedWidth}`);
      }
    );
  });
});
