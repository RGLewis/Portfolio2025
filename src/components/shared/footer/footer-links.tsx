import { FOOTER_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import { StyledLink, StyledSlash } from "@/atoms/typography/typography.styles";
import { NAVIGATION_DATA_TEST_IDS } from "@/constants";
import { FooterLinksContainer, ListItem } from "./footer.styles";

export const FooterLinks = () => {
  const linksArray = Object.entries(FOOTER_CONTENT.links);

  return (
    <FooterLinksContainer data-testid={NAVIGATION_DATA_TEST_IDS.footerLinks}>
      {linksArray.map(([_, item], index) => {
        const isLastItem = index === linksArray.length - 1;

        const { text, link } = item;

        return (
          <ListItem key={text}>
            <StyledLink
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              variant={TypographyVariants.WHITE}
              data-testid={NAVIGATION_DATA_TEST_IDS.footerLink(text)}
            >
              {text}
            </StyledLink>
            {!isLastItem && <StyledSlash>/</StyledSlash>}
          </ListItem>
        );
      })}
    </FooterLinksContainer>
  );
};
