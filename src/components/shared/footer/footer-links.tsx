import { FOOTER_CONTENT } from "@/assets/content";
import { TypographyVariants } from "@/atoms/typography/types";
import { StyledLink, StyledSlash } from "@/atoms/typography/typography.styles";
import { FooterLinksContainer, ListItem } from "./footer.styles";

export const FooterLinks = () => {
  const linksArray = Object.entries(FOOTER_CONTENT.links);

  return (
    <FooterLinksContainer>
      {linksArray.map(([_, item], index) => {
        const isLastItem = index === linksArray.length - 1;

        return (
          <ListItem key={item.text}>
            <StyledLink
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variant={TypographyVariants.WHITE}
            >
              {item.text}
            </StyledLink>
            {!isLastItem && <StyledSlash>/</StyledSlash>}
          </ListItem>
        );
      })}
    </FooterLinksContainer>
  );
};
