import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import BubblePage from './BubblePage';

import fetchColorService from "../services/fetchColorService";
jest.mock("../services/fetchColorService");

test("Renders without errors", () => {
  fetchColorService.mockResolvedValueOnce({
    data: [],
  });
  render(<BubblePage />);
});

test("Renders appropriate number of colors passed in through mock", async () => {
  //   Keep in mind that our service is called on mount for this component.
  fetchColorService.mockResolvedValueOnce({
    data: [
      {
        code: { hex: "#99ddbc" },
        color: "limegreen",
        id: 2,
      },
      {
        code: { hex: "#fff" },
        color: "white",
        id: 1,
      },
    ],
  });
  render(<BubblePage />);
  let colors = await screen.findAllByTestId("color");
  expect(colors).toHaveLength(2);
});