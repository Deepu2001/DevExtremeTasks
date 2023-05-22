import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DiagnosticCriteria from "./DiagnosticCriteria";
import userEvent from "@testing-library/user-event";


describe("DiagnosticCriteria", () => {
  test("renders the component", () => {
    render(<DiagnosticCriteria />);
    
    // Assert that the component is rendered
    const linkElement = screen.getByText(/Select Criteria/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("displays 'Select Criteria' initially", () => {
    render(<DiagnosticCriteria />);

    // Assert that 'Select Criteria' is displayed initially
    const selectCriteriaButton = screen.getByTestId("select-criteria-button");
    expect(selectCriteriaButton).toHaveTextContent("Select Criteria");
  });

  
  test("opens the popup when 'Select Criteria' button is clicked",async () => {
    render(<DiagnosticCriteria />);
    let popupContent;
    await waitFor(()=>{
        // Simulate click on 'Select Criteria' button
        const selectCriteriaButton = screen.getByTestId("select-criteria-button");
        fireEvent.click(selectCriteriaButton);
              // Assert that the popup content is displayed
         popupContent = screen.getByText("Note");
    })
        expect(popupContent).toBeInTheDocument();
  });
  const handleDelete = jest.fn();   
  });
