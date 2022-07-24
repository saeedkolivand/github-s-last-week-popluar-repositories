import { useQuery } from "@tanstack/react-query";
import { getRepositoriesApi } from "./home.api";

export const useRepositoriesList = () =>
  useQuery(["getPopularRepositoriesList"], getRepositoriesApi);
