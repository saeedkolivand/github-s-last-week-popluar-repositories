import { cleanup, render, screen } from "@testing-library/react";
import RepositoryList from "./RepositoryList";
import { mockedApiResponse } from "../../../__mocks__/apiResponse";

describe("RepositoryList test cases", () => {
  afterAll(cleanup);

  it("should render two items in list", () => {
    render(
      <RepositoryList
        repositoryList={mockedApiResponse}
        onStarCallback={() => {}}
      />
    );

    const repositoryElement = screen.getAllByLabelText("repository-wrapper");

    expect(repositoryElement.length).toBe(2);
  });
});
