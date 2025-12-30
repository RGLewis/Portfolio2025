import { SKILLS_ITEM_DATA_TEST_IDS } from "@/constants";
import type { SkillsItem as SkillsItemType } from "@/types/content-types";
import {
  LevelContainer,
  SkillsBar,
  SkillsContainer,
  SkillsLabel,
  SkillsTitle,
} from "./styles";
import { getSkillLevelPercentage } from "./utils";

type SkillsItemProps = {
  data: SkillsItemType;
};

export const SkillsItem = ({ data }: SkillsItemProps) => {
  const { skillsItem, skillsLevel } = SKILLS_ITEM_DATA_TEST_IDS;
  const { title, level } = data;

  return (
    <SkillsContainer data-testid={skillsItem(title)}>
      <SkillsTitle>{title}</SkillsTitle>
      <SkillsBar>
        <LevelContainer
          $level={getSkillLevelPercentage(level)}
          data-testid={skillsLevel(title)}
        >
          <SkillsLabel>{level}</SkillsLabel>
        </LevelContainer>
      </SkillsBar>
    </SkillsContainer>
  );
};
