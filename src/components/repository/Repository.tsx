import React, { memo } from "react";
import "./repository.style.scss";
import { RepositoryPropsTypes } from "./repository.types";

const Repository: React.FC<RepositoryPropsTypes> = (props) => {
  const { name, url, stars, description, id, onStarChange } = props;

  const onChange = () => onStarChange(id);

  return (
    <div
      className="repository-wrapper flex-center"
      aria-label="repository-wrapper"
    >
      <strong className="repository-wrapper__name flex-center">{name}</strong>
      <small className="repository-wrapper__description flex-center">
        {description || "-"}
      </small>
      <a
        className="repository-wrapper__url flex-center"
        target="_blank"
        href={url}
        rel="noreferrer"
      >
        Link to Github
      </a>
      <div
        className="repository-wrapper__stars flex-center"
        onClick={onChange}
        aria-label="repository-stars"
      >
        ⭐ ️{stars}
      </div>
    </div>
  );
};

export default memo(Repository);
