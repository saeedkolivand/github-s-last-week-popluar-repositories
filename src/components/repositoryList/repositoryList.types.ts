import { ResponseItemsTypes } from "pages/home/home.types";

export interface RepositoryListPropsTypes {
  repositoryList: ResponseItemsTypes[];
  onStarCallback: (id: number) => void;
}
