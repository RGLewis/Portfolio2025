import { useNavigation } from "@/hooks/use-navigation";
import type { Slugs } from "@/types/content-types";
import { createContext, useContext, useState } from "react";

type NavigationContextValue = {
  activeSection: Slugs | null;
  setActiveSection: (slug: Slugs | null) => void;
  scrollToSection: (slug: Slugs) => void;
  navigateToSection: (slug: Slugs) => void;
};

type NavigationProviderProps = {
  children: React.ReactNode;
};

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined
);

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [activeSection, setActiveSection] = useState<Slugs | null>(null);

  const { scrollToSection, navigateToSection } = useNavigation({
    setActiveSection,
  });

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        setActiveSection,
        scrollToSection,
        navigateToSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigationContext must be used within NavigationProvider"
    );
  }
  return context;
};
