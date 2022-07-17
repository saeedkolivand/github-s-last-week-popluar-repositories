import React, { useCallback, useEffect } from "react";
import Container from "ui-components/container/Container";
import "./home.style.scss";
import Divider from "ui-components/divider/Divider";
import Tabs from "ui-components/tabs/Tabs";
import { useDispatch, useSelector } from "app/hooks/hooks";
import RepositoryList from "components/repositoryList/RepositoryList";
import { useRepositoriesList } from "./home.hooks";
import {
  addLastWeekPopularRepositoriesAction,
  generateStarredRepositoriesListAction,
  toggleRepositoryStarAction,
} from "./home.slice";

const Home: React.FC = () => {
  const { data, isLoading, isError, refetch } = useRepositoriesList();

  const { lastWeekPopularRepositories, starredRepositoriesList } = useSelector(
    (state) => state.repositoryReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data && data?.data.items) {
      dispatch(addLastWeekPopularRepositoriesAction(data.data.items));
      dispatch(generateStarredRepositoriesListAction());
    }
  }, [data]);

  const onStarCallback = useCallback(
    (id: number) => dispatch(toggleRepositoryStarAction(id)),
    []
  );

  return (
    <Container
      className="home-wrapper"
      loading={isLoading}
      hasError={isError}
      errorMessage="Something went wrong"
      errorRetryFunction={refetch}
    >
      <div className="home-wrapper--header flex-center">
        <strong>Last Week&apos;s</strong>&nbsp;GitHub Popular Repositories
      </div>

      <Divider />

      <Tabs
        tabs={["Repositories", "Starred"]}
        panels={[
          <RepositoryList
            repositoryList={lastWeekPopularRepositories}
            onStarCallback={onStarCallback}
          />,
          <RepositoryList
            repositoryList={starredRepositoriesList}
            onStarCallback={onStarCallback}
          />,
        ]}
      />
    </Container>
  );
};

export default Home;
