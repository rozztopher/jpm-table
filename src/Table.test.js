import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Table from "./components/Table";

describe("table", () => {
  test("Does the table render", () => {
    render(<Table />);
  });

  test('Header displays', async () => {
    render(<Table />);
    const header = await waitFor(() => screen.getByTestId('table-head'));
    expect(header).toBeInTheDocument();
  });

  test('Body displays', async () => {
    render(<Table />);
    const header = await waitFor(() => screen.getByTestId('table-body'));
    expect(header).toBeInTheDocument();
  });

  test('Has correct data loaded', async () => {
    render(<Table />);
    const rows = await waitFor(() => screen.findAllByTestId('data-row'));
    expect(rows).toHaveLength(18);
  });

  test('Has sorted correclty', async () => {
    render(<Table />);
    const rows = await waitFor(() => screen.findAllByTestId('data-row'));
    expect(rows[0]).toHaveProperty("id", "BETA_3791.37_Equities_0")
    // Use smaller sample and fill in the blanks
    expect(rows[17]).toHaveProperty("id", "EPSILON_1168.46_Credit_17")
  });

  test('Has sorted by ticker', async () => {
    render(<Table />);
    const header = await waitFor(() => screen.getByTestId('ticker-head'));
    fireEvent.click(header)
    const rows = await waitFor(() => screen.findAllByTestId('data-row'));
    expect(rows[0]).toHaveProperty("id", "ALPHA_3150.67_Credit_0")
    // Use smaller sample and fill in the blanks
    expect(rows[17]).toHaveProperty("id", "ZETA_2716.78_Credit_17")
  });

  test('Has sorted by price', async () => {
    render(<Table />);
    const header = await waitFor(() => screen.getByTestId('price-head'));
    fireEvent.click(header)
    const rows = await waitFor(() => screen.findAllByTestId('data-row'));
    expect(rows[0]).toHaveProperty("id", "BETA_3791.37_Equities_0")
    // Use smaller sample and fill in the blanks
    expect(rows[17]).toHaveProperty("id", "THETA_1075.44_Macro_17")
  });

  test('Has sorted by asset class', async () => {
    render(<Table />);
    const header = await waitFor(() => screen.getByTestId('assetclass-head'));
    fireEvent.click(header)
    const rows = await waitFor(() => screen.findAllByTestId('data-row'));
    expect(rows[0]).toHaveProperty("id", "BETA_3791.37_Equities_0")
    // Use smaller sample and fill in the blanks
    expect(rows[17]).toHaveProperty("id", "EPSILON_1168.46_Credit_17")
  });
});
