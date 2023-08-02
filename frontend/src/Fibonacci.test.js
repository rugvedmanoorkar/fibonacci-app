import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import Fibonacci from "./Fibonacci";
import Home from "./Home";

jest.mock("axios");

describe("Fibonacci Component", () => {
  test("renders Fibonacci numbers correctly", async () => {
    const fibNumbers = [0, 1, 1, 2, 3, 5, 8];
    const num = 7;
    const location = {
      state: { num, fibNumbers },
    };

    render(<Fibonacci />, { wrapper: MemoryRouter, initialEntries: ["/fibonacci"], initialIndex: 0 });

    await waitFor(() => {
      const titleElement = screen.getByText(`Fibonacci Numbers for ${num}`);
      const fibNumbersElement = screen.getByText(fibNumbers.join(", "));
      
      expect(titleElement).toBeInTheDocument();
      expect(fibNumbersElement).toBeInTheDocument();
    });
  });

  test("handles empty Fibonacci numbers", async () => {
    const location = {
      state: { num: 10, fibNumbers: [] },
    };

    render(<Fibonacci />, { wrapper: MemoryRouter, initialEntries: ["/fibonacci"], initialIndex: 0 });

    await waitFor(() => {
      const titleElement = screen.getByText(`Fibonacci Numbers for 10`);
      const fibNumbersElement = screen.getByText("");

      expect(titleElement).toBeInTheDocument();
      expect(fibNumbersElement).toBeInTheDocument();
    });
  });
});

describe("Home Component", () => {
  test("generates Fibonacci numbers and navigates to Fibonacci component", async () => {
    const num = 8;
    const fibNumbersResponse = [0, 1, 1, 2, 3, 5, 8, 13];

    axios.post.mockResolvedValueOnce({
      data: { fib_numbers: fibNumbersResponse },
    });

    render(<Home />);

    const inputElement = screen.getByLabelText(/Enter value of n:/i);
    const generateButton = screen.getByText("Generate");

    fireEvent.change(inputElement, { target: { value: num } });
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:8000/fibonacci", {
        num: parseInt(num),
      });

      expect(screen.getByText(`Fibonacci Numbers for ${num}`)).toBeInTheDocument();
      expect(screen.getByText(fibNumbersResponse.join(", "))).toBeInTheDocument();
    });
  });

  test("handles invalid response from the server", async () => {
    axios.post.mockResolvedValueOnce({
      data: {},
    });

    render(<Home />);

    const num = 5;
    const inputElement = screen.getByLabelText(/Enter value of n:/i);
    const generateButton = screen.getByText("Generate");

    fireEvent.change(inputElement, { target: { value: num } });
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:8000/fibonacci", {
        num: parseInt(num),
      });

      expect(screen.getByText(/Invalid response/i)).toBeInTheDocument();
    });
  });
});
