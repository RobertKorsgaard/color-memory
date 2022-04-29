import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ICard } from "types/ICard";
import { Card, CardTestIds } from "./Card";

const mockCard: ICard = {
  color: "red",
  open: false,
  solved: false,
};

const mockCardClick = jest.fn();

describe("<Card>", () => {
  it("should call onClick callback when clicked", async () => {
    render(<Card onClick={mockCardClick} card={mockCard} />);
    fireEvent.click(await screen.findByTestId(CardTestIds.root));
    expect(mockCardClick).toHaveBeenCalledTimes(1);
  });
});
