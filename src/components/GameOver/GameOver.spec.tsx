import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameOver } from "components/GameOver/GameOver";

describe("<GameOver />", () => {
  it("should display the end score", () => {
    render(<GameOver score={10} onRestartClick={() => {}} />);
    expect(screen.getByText(/Your final score: 10/i)).toBeInTheDocument();
  });
  it("should call restartGame when pressing restart button", async () => {
    const restartGame = jest.fn();
    render(<GameOver score={5} onRestartClick={restartGame} />);
    await userEvent.click(screen.getByRole("button", { name: "restart" }));
    expect(restartGame).toHaveBeenCalledTimes(1);
  });
});
