import React, { useEffect } from "react";
import { useGetNavigationQuery } from "./hooks/use-get-navigation-query";
import { useGetFooterQuery } from "./hooks/use-get-footer-query";

export const App = () => {
  const { data: navData, error: navError } = useGetNavigationQuery();
  const { data: footerData, error: footerError } = useGetFooterQuery();

  useEffect(() => {
    if (navData) {
      console.log("Navigation Data:", navData);
    }
    if (navError) {
      console.error("Navigation Error:", navError);
    }
  }, [navData, navError]);

  useEffect(() => {
    if (footerData) {
      console.log("Footer Data:", footerData);
    }
    if (footerError) {
      console.error("Footer Error:", footerError);
    }
  }, [footerData, footerError]);

  return <div>Portfolio 2025</div>;
};
