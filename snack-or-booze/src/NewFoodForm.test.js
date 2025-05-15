import {
    render,
    screen,
    fireEvent,
    waitFor
} from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import * as reactRouterDom from "react-router-dom";
import NewFoodForm from "./NewFoodForm";
import { mockFood } from './testingMockData';

jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useParams: jest.fn(),
        useHistory: () => ({
            push: jest.fn()
        }),
    };
});

describe('NewFoodForm', () => {
    it("renders without crashing with no foodMenu param", async () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: null });
        render(
            <BrowserRouter>
                <NewFoodForm allFood={mockFood} />
            </BrowserRouter>
        );
    });

    it("renders without crashing with valid foodMenu param", async () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: 'snacks' });
        render(
            <BrowserRouter>
                <NewFoodForm allFood={mockFood} />
            </BrowserRouter>
        );
    });

    it("renders content correctly with no foodMenu param", () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: null });
        render(
            <BrowserRouter>
                <NewFoodForm allFood={mockFood} />
            </BrowserRouter>
        );
        expect(screen.getByText("Add a New Food")).toBeInTheDocument();
        expect(screen.getByLabelText("Select a menu:")).toBeInTheDocument();
    });

    it("renders content correctly with valid foodMenu param", () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: 'snacks' });
        render(
            <BrowserRouter>
                <NewFoodForm allFood={mockFood} />
            </BrowserRouter>
        );
        expect(screen.getByText("Adding to Snacks Menu")).toBeInTheDocument();
    });

    it("alerts user if form is incomplete when attempting submit", () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: 'snacks' });
        window.alert = jest.fn();
        render(
            <BrowserRouter>
                <NewFoodForm allFood={mockFood} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /create new item/i }));
        expect(window.alert).toHaveBeenCalledWith("All fields must be filled in order to create the new food item.");
    });

    it("submits form with complete data", async () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: 'snacks' });
        const postNewFood = jest.fn().mockResolvedValue({});
        render(
            <BrowserRouter>
                <NewFoodForm allFood={mockFood} postNewFood={postNewFood} />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test Name" } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Test description" } });
        fireEvent.change(screen.getByLabelText(/recipe/i), { target: { value: "Test recipe" } });
        fireEvent.change(screen.getByLabelText(/serve/i), { target: { value: "Test serving conditions" } });

        fireEvent.click(screen.getByRole("button", { name: /create new item/i }));

        await waitFor(() => {
            expect(postNewFood).toHaveBeenCalledWith("snacks", {
                id: "test-name",
                name: "Test Name",
                description: "Test description",
                recipe: "Test recipe",
                serve: "Test serving conditions"
            });
            expect(window.alert).toHaveBeenCalledWith("New food item 'Test Name' created successfully.");
        });
    });
})