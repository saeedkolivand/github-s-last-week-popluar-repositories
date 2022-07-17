import { useQuery } from "react-query";
import { getRepositoriesApi } from "./home.api";

export const useRepositoriesList = () =>
  useQuery("getPopularRepositoriesList", getRepositoriesApi);
