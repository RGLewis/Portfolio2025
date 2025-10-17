import { HERO_IMAGE_DATA_TEST_IDS } from "@/constants";
import React from "react";
import { StyledHeroImage } from "./styles";

type HeroImageProps = {
  src: string;
  description: string;
  isVerticalTop?: boolean;
};

export const HeroImage: React.FC<HeroImageProps> = ({
  src,
  description,
  isVerticalTop,
}) => {
  const { heroImage } = HERO_IMAGE_DATA_TEST_IDS;

  return (
    <StyledHeroImage
      data-testid={heroImage}
      alt={description}
      src={src}
      isVerticalTop={isVerticalTop}
    />
  );
};
