import HttpService from "app/network/apiService";
import { getLastWeekDate } from "app/utils/utils";

export const GetPopularRepositoriesUrl = "/search/repositories";

export const getRepositoriesApi = () => {
  const params = {
    q: `created:>${getLastWeekDate()}`,
    sort: "stars",
    order: "desc",
  };
  return HttpService.get(`${GetPopularRepositoriesUrl}`, { params });
};
