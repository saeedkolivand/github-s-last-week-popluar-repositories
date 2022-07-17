import { act, cleanup, render, screen } from "@testing-library/react";
import { initLoadingPortal } from "ui-components/loading/loading.test";
import { initErrorModalPortal } from "ui-components/error/error.test";
import store from "app/redux/store";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import RepositorySlice, {
  addLastWeekPopularRepositoriesAction,
  toggleRepositoryStarAction,
} from "./home.slice";
import { RepositoryReduxInitialStateTypes } from "./home.types";
import { mockedApiResponse } from "../../../__mocks__/apiResponse";
import Home from "./Home";
import { useRepositoriesList } from "./home.hooks";

const mockedUseRepositoriesList = useRepositoriesList as jest.Mock<any>;
jest.mock("./home.hooks");

describe("Home test cases", () => {
  beforeAll(() => {
    initLoadingPortal();
    initErrorModalPortal();
    const div = document.createElement("div");
    const body = document.querySelector("body")!;
    div.setAttribute("id", "root");
    body.appendChild(div);
  });

  afterAll(cleanup);

  afterEach(() => {
    jest.clearAllMocks();
  });

  const MockedContainer = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Home />
        </Provider>
      </QueryClientProvider>
    );
  };

  it("should show loading", () => {
    mockedUseRepositoriesList.mockImplementation(() => ({
      isLoading: true,
      data: {},
    }));
    render(<MockedContainer />);

    const loadingElement = screen.getByLabelText("loading-wrapper");

    expect(loadingElement.classList.contains("show-loading")).toBeTruthy();
  });

  it("should HIDE loading", () => {
    mockedUseRepositoriesList.mockImplementation(() => ({ isLoading: false }));

    render(<MockedContainer />);

    const loadingElement = screen.getByLabelText("loading-wrapper");

    expect(loadingElement.classList.contains("hide-loading")).toBeTruthy();
  });

  it("should SHOW Error", () => {
    mockedUseRepositoriesList.mockImplementation(() => ({
      isError: true,
    }));

    render(<MockedContainer />);

    const errorElement = screen.getByLabelText("error-wrapper");

    expect(errorElement.classList.contains("show-error")).toBeTruthy();
  });

  it("should HIDE Error", () => {
    mockedUseRepositoriesList.mockImplementation(() => ({
      isError: false,
    }));

    render(<MockedContainer />);

    const errorElement = screen.getByLabelText("error-wrapper");

    expect(errorElement.classList.contains("hide-error")).toBeTruthy();
  });

  it("should show Data", () => {
    mockedUseRepositoriesList.mockImplementation(() => ({
      isLoading: false,
      isError: false,
    }));

    act(() => {
      store.dispatch(addLastWeekPopularRepositoriesAction(mockedApiResponse));
    });

    render(<MockedContainer />);

    const repositoriesElements = screen.getAllByLabelText("repository-wrapper");

    expect(repositoriesElements.length).toBe(2);
  });
});

describe("Home Redux test cases", () => {
  afterAll(cleanup);
  const { reducer } = RepositorySlice;

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      starredRepositoriesIds: [],
      lastWeekPopularRepositories: [],
      starredRepositoriesList: [],
    });
  });

  it("should add the last week popular repositories to store", () => {
    const previousState: RepositoryReduxInitialStateTypes = {
      starredRepositoriesIds: [],
      lastWeekPopularRepositories: [],
      starredRepositoriesList: [],
    };

    expect(
      reducer(
        previousState,
        addLastWeekPopularRepositoriesAction(mockedApiResponse)
      )
    ).toEqual({
      starredRepositoriesIds: [],
      lastWeekPopularRepositories: mockedApiResponse,
      starredRepositoriesList: [],
    });
  });

  it("should add a starred repository from store", () => {
    const previousState: RepositoryReduxInitialStateTypes = {
      starredRepositoriesIds: [],
      lastWeekPopularRepositories: mockedApiResponse,
      starredRepositoriesList: [],
    };

    expect(
      reducer(
        previousState,
        toggleRepositoryStarAction(mockedApiResponse[0].id)
      )
    ).toEqual({
      starredRepositoriesIds: [mockedApiResponse[0].id],
      lastWeekPopularRepositories: [
        {
          ...mockedApiResponse[0],
          stargazers_count: 2619,
        },
        mockedApiResponse[1],
      ],
      starredRepositoriesList: [
        {
          ...mockedApiResponse[0],
          stargazers_count: 2619,
        },
      ],
    });
  });

  it("should remove a starred repository from store", () => {
    const previousState: RepositoryReduxInitialStateTypes = {
      starredRepositoriesIds: [mockedApiResponse[0].id],
      lastWeekPopularRepositories: mockedApiResponse,
      starredRepositoriesList: [mockedApiResponse[0]],
    };

    expect(
      reducer(
        previousState,
        toggleRepositoryStarAction(mockedApiResponse[0].id)
      )
    ).toEqual({
      starredRepositoriesIds: [],
      lastWeekPopularRepositories: [
        {
          ...mockedApiResponse[0],
          stargazers_count: mockedApiResponse[0].stargazers_count - 1,
        },
        mockedApiResponse[1],
      ],
      starredRepositoriesList: [],
    });
  });
});
