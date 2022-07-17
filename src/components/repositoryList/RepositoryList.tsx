import Repository from "components/repository/Repository";
import React, { memo } from "react";
import { RepositoryListPropsTypes } from "./repositoryList.types";

const RepositoryList: React.FC<RepositoryListPropsTypes> = (props) => {
  const { repositoryList, onStarCallback } = props;

  return (
    <>
      {repositoryList.map((item) => (
        <Repository
          description={item.description}
          name={item.name}
          stars={item.stargazers_count}
          url={item.html_url}
          id={item.id}
          key={`apiResponse-${item.id}`}
          onStarChange={onStarCallback}
        />
      ))}
    </>
  );
};

export default memo(RepositoryList);
