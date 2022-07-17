import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "app/redux/store";
import Repository from "./Repository";

describe("Repository test cases", () => {
  afterAll(cleanup);

  const MockedRepository = () => {
    return (
      <Provider store={store}>
        <Repository
          name="name"
          description="description"
          url="url"
          stars={1}
          id={1}
          onStarChange={() => {}}
        />
      </Provider>
    );
  };

  it("should render Repository component", () => {
    render(<MockedRepository />);

    const repositoryElement = screen.getByLabelText("repository-wrapper");

    expect(repositoryElement).toBeTruthy();
    expect(repositoryElement.children[0].textContent).toBe("name");
    expect(repositoryElement.children[1].textContent).toBe("description");
    expect(repositoryElement.children[2].textContent).toBe("Link to Github");
    expect(repositoryElement.children[3].textContent).toBe("⭐ ️1");
  });
});
