import type { PageData } from "@/types/content-types";
import { useLoaderData } from "react-router-dom";

export const AboutView = () => {
  const data = useLoaderData() as PageData;
  console.log("AboutView data:", data);

  return <div>About</div>;
};
