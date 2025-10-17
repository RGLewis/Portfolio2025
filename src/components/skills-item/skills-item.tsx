import { SKILLS_ITEM_DATA_TEST_IDS } from "@/constants";
import type { SkillsItem as SkillsItemType } from "@/types/content-types";
import {
  LevelContainer,
  SkillsBar,
  SkillsContainer,
  SkillsLabel,
  SkillsTitle,
} from "./styles";

type SkillsItemProps = {
  data: SkillsItemType;
};

export const SkillsItem = ({ data }: SkillsItemProps) => {
  const { skillsItem, skillsLevel } = SKILLS_ITEM_DATA_TEST_IDS;

  return (
    <SkillsContainer data-testid={skillsItem(data.title)}>
      <SkillsTitle>{data.title}</SkillsTitle>
      <SkillsBar>
        <LevelContainer
          level={data.level}
          data-testid={skillsLevel(data.title)}
        >
          <SkillsLabel>{data.level}</SkillsLabel>
        </LevelContainer>
      </SkillsBar>
    </SkillsContainer>
  );
};
