import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "../App";

const url = "https://api.github.com";

const server = setupServer(
  rest.get(`${url}/users/:username/repos`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "github-explorer",
          description: "Github Repositories Explorer",
          stargazers_count: 10,
        },
      ])
    );
  }),
  rest.get(`${url}/search/users`, (req, res, ctx) => {
    return res(
      ctx.json({
        incomplete_results: false,
        items: [
          {
            id: 1,
            login: "hasan",
          },
        ],
        total_count: 1,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/github explorer/i);
  expect(linkElement).toBeInTheDocument();
});

test("input username, click button search, and successfully get all users list with corresponding repository", async () => {
  const utils = render(<App />);
  const input = utils.getByLabelText("username-input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "hasan" } });
  expect(input.value).toBe("hasan");
  const button = utils.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  await waitFor(() => screen.getByRole("listbox"));
  expect(screen.getByText(/hasan/i)).toBeInTheDocument();
  const dropdown = utils.getByTestId("dropdown-label");
  fireEvent.click(dropdown);
  expect(screen.getByText(/github repositories/i)).toBeInTheDocument();
});

test("input username, press key enter, and successfully get all users list with corresponding repository", async () => {
  const utils = render(<App />);
  const input = utils.getByLabelText("username-input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "hasan" } });
  expect(input.value).toBe("hasan");
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" , charCode: 13 });
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  await waitFor(() => screen.getByRole("listbox"));
  expect(screen.getByText(/hasan/i)).toBeInTheDocument();
  const dropdown = utils.getByTestId("dropdown-label");
  fireEvent.click(dropdown);
  expect(screen.getByText(/github repositories/i)).toBeInTheDocument();
});

test("input username, click enter, and failed to get all users list with corresponding repository", async () => {
  server.use(
    rest.get(`${url}/search/users`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  const utils = render(<App />);
  const input = utils.getByLabelText("username-input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "hasan" } });
  expect(input.value).toBe("hasan");
  const button = utils.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  await waitFor(() => screen.getByRole("alert"));
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
