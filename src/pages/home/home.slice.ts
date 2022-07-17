import { createSlice } from "@reduxjs/toolkit";
import {
  RepositoryReduxInitialStateTypes,
  ResponseItemsTypes,
} from "./home.types";

const localStorageStarredRepositoriesIds = window.localStorage.getItem(
  "starredRepositoriesIds"
);

const handleInitialStatesInitialStarredRepositoriesIds = () => {
  if (localStorageStarredRepositoriesIds) {
    const tempIds: number[] = [];
    const splitIds = localStorageStarredRepositoriesIds.split(",");

    if (splitIds.length > 1) {
      splitIds.pop();

      splitIds?.forEach((id) => {
        tempIds.push(parseInt(id, 10));
      });
    }

    return tempIds;
  }

  return [];
};

const initialState: RepositoryReduxInitialStateTypes = {
  starredRepositoriesIds: handleInitialStatesInitialStarredRepositoriesIds(),
  lastWeekPopularRepositories: [],
  starredRepositoriesList: [],
};

const RepositorySlice = createSlice({
  name: "repositorySlice",
  initialState,
  reducers: {
    toggleRepositoryStarAction: (state, action) => {
      const starredIdsSet = new Set(
        JSON.parse(JSON.stringify(state.starredRepositoriesIds))
      );

      const lastWeekPopularRepositories: ResponseItemsTypes[] = JSON.parse(
        JSON.stringify(state.lastWeekPopularRepositories)
      );

      const lastWeekPopularRepositoriesMap = new Map();

      lastWeekPopularRepositories.forEach((item: ResponseItemsTypes) => {
        lastWeekPopularRepositoriesMap.set(item.id, item);
      });

      if (starredIdsSet.has(action.payload)) {
        starredIdsSet.delete(action.payload);
        const currentRepository = lastWeekPopularRepositoriesMap.get(
          action.payload
        );

        currentRepository.stargazers_count -= 1;

        lastWeekPopularRepositoriesMap.set(action.payload, currentRepository);
      } else {
        starredIdsSet.add(action.payload);
        const currentRepository = lastWeekPopularRepositoriesMap.get(
          action.payload
        );
        currentRepository.stargazers_count += 1;
        lastWeekPopularRepositoriesMap.set(action.payload, currentRepository);
      }

      let stringOfIds = "";

      const starredRepositoriesList: ResponseItemsTypes[] = [];
      starredIdsSet.forEach((item) => {
        stringOfIds += `${item},`;
        starredRepositoriesList.push(lastWeekPopularRepositoriesMap.get(item));
      });

      window.localStorage.setItem("starredRepositoriesIds", stringOfIds);

      return {
        ...state,
        lastWeekPopularRepositories: [
          ...lastWeekPopularRepositoriesMap.values(),
        ],
        starredRepositoriesIds: [...(starredIdsSet as unknown as number[])],
        starredRepositoriesList,
      };
    },
    addLastWeekPopularRepositoriesAction: (state, action) => {
      return {
        ...state,
        lastWeekPopularRepositories: action.payload,
      };
    },
    generateStarredRepositoriesListAction: (state) => {
      const starredIdsSet = new Set(
        JSON.parse(JSON.stringify(state.starredRepositoriesIds))
      );

      const lastWeekPopularRepositories: ResponseItemsTypes[] = JSON.parse(
        JSON.stringify(state.lastWeekPopularRepositories)
      );

      const lastWeekPopularRepositoriesMap = new Map();

      lastWeekPopularRepositories.forEach((item: ResponseItemsTypes) => {
        lastWeekPopularRepositoriesMap.set(item.id, item);
      });

      const starredRepositoriesList: ResponseItemsTypes[] = [];
      starredIdsSet?.forEach((item) => {
        const currentRepository = lastWeekPopularRepositoriesMap.get(item);
        if (currentRepository) {
          currentRepository.stargazers_count += 1;
          lastWeekPopularRepositoriesMap.set(item, currentRepository);
          starredRepositoriesList.push(currentRepository);
        } else {
          window.localStorage.clear();
        }
      });

      return {
        ...state,
        lastWeekPopularRepositories: [
          ...lastWeekPopularRepositoriesMap.values(),
        ],
        starredRepositoriesList: starredRepositoriesList || [],
      };
    },
  },
});

export const {
  toggleRepositoryStarAction,
  generateStarredRepositoriesListAction,
  addLastWeekPopularRepositoriesAction,
} = RepositorySlice.actions;

export default RepositorySlice;
