import type { PageData } from "@/types/content-types";
import { useLoaderData } from "react-router-dom";

export const ExperienceView = () => {
  const data = useLoaderData() as PageData;

  console.log("ExperienceView data:", data);

  return <div>Experience</div>;
};
