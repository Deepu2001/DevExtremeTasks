import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "./Sidebar";
import userEvent from "@testing-library/user-event";

describe("Sidebar", () => {
  test("renders Sidebar component correctly", () => {
    render(<Sidebar />);
    // Assert that the Sidebar component is rendered
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    // Assert that the Sidebar is initially closed
    expect(screen.getByTestId("sidebar")).toHaveClass("close");

    // Assert that the Sidebar toggle button is rendered
    expect(
      screen.getByRole("button", { name: "chevronright" })
    ).toBeInTheDocument();
  });

  test("open sidebar on button click", () => {
    render(<Sidebar />);
    const sidebarToggle = screen.getByRole("button", { name: /chevronright/i });
    fireEvent.click(sidebarToggle);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("open");
  });

  test('applies "close" class when sidebar is closed', () => {
    render(<Sidebar />);
    const sidebarToggle = screen.getByRole("button", { name: /chevronright/i });
    fireEvent.click(sidebarToggle);
    fireEvent.click(sidebarToggle);
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("close");
  });

  test("displays item data when item is clicked", async () => {
    render(<Sidebar />);
    await waitFor(() => {
      const item = screen.getByText("Inpatient");
      userEvent.click(item);
    });
    expect(screen.getByText("This is the data for Item 2")).toBeInTheDocument();
  });

 });
