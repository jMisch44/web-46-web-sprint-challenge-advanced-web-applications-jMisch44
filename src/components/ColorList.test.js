import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';

const colorArray = [
  {
    code: { hex: "#99ddbc" },
    color: "limegreen",
    id: 2,
  },
];

test("Renders an empty list of colors without errors", () => {
  render(<ColorList colors={[]} />);
});

test("Renders a list of colors without errors", () => {
  render(<ColorList colors={colorArray} />);

  const color = screen.getByTestId("color");
  expect(color).toBeInTheDocument();
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
  const { rerender } = render(
    <ColorList colors={colorArray} editing={false} />
  );

  let editingForm = screen.queryByTestId("edit_menu");
  expect(editingForm).not.toBeInTheDocument();
  expect(editingForm).toBeFalsy();
  expect(editingForm).not.toBeTruthy();

  rerender(<ColorList colors={colorArray} editing={true} />);
  editingForm = screen.queryByTestId("edit_menu");
  expect(editingForm).toBeInTheDocument();
  expect(editingForm).toBeTruthy();
  expect(editingForm).not.toBeFalsy();
});
