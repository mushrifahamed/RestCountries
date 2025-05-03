import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryCard from "../components/CountryCard";

const mockCountry = {
  cca3: "USA",
  name: { common: "United States" },
  flags: { png: "flag.png" },
  population: 331000000,
  region: "Americas",
  capital: ["Washington, D.C."],
};

test("renders country card with correct details", () => {
  render(
    <MemoryRouter>
      <CountryCard country={mockCountry} />
    </MemoryRouter>
  );

  expect(screen.getByText("United States")).toBeInTheDocument();
  expect(screen.getByText(/Population: 331,000,000/)).toBeInTheDocument();
  expect(screen.getByText("Region: Americas")).toBeInTheDocument();
  expect(screen.getByText("Capital: Washington, D.C.")).toBeInTheDocument();
});