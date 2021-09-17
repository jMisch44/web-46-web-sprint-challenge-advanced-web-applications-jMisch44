import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

import fetchColorService from "../services/fetchColorService";
jest.mock("../services/fetchColorService");

const testColor = {
  code: { hex: "#99ddbc" },
  color: "limegreen",
  id: 2,
};

const blankColor = {
  code: { hex: "" },
  color: "",
  id: null,
};

test("Renders without errors with blank color passed into component", () => {
  render(<Color color={blankColor} />);
  const color = screen.getByTestId("color");
  expect(color).toBeInTheDocument();
  expect(color).not.toBeFalsy();
  expect(color).toBeTruthy();
});

test("Renders the color passed into component", () => {
  render(<Color color={testColor} />);
  const color = screen.getByTestId("color");
  expect(color).toBeInTheDocument();
  expect(color).not.toBeFalsy();
  expect(color).toBeTruthy();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", async () => {
  fetchColorService.mockResolvedValueOnce(testColor);
  const mockDeleteColor = jest.fn();
  const mockToggleEdit = jest.fn();
  render(
    <Color
      color={testColor}
      toggleEdit={mockToggleEdit}
      deleteColor={mockDeleteColor}
      editing={false}
    />
  );
  let color = screen.getByTestId("color");
  expect(color).toBeInTheDocument();
  const btn = screen.getByTestId("delete");
  userEvent.click(btn);

  await waitFor(() => {
    expect(mockToggleEdit.mock.calls.length).toBe(1);
    expect(mockDeleteColor.mock.calls.length).toBe(1);
  });
});

test("Executes setEditColor and toggleEdit property when color div is clicked", async () => {
  fetchColorService.mockResolvedValueOnce(testColor);
  const mockSetEditColor = jest.fn();
  const mockToggleEdit = jest.fn();

  render(
    <Color
      color={testColor}
      setEditColor={mockSetEditColor}
      toggleEdit={mockToggleEdit}
      editing={false}
    />
  );

  let color = screen.getByTestId("color");
  expect(color).toBeInTheDocument();
  const btn = screen.getByTestId("color");
  userEvent.click(btn);
  await waitFor(() => {
    expect(mockToggleEdit.mock.calls.length).toBe(1);
    expect(mockSetEditColor.mock.calls.length).toBe(1);
  });
});