import {
    render,
    screen,
    waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import * as reactRouterDom from "react-router-dom";
import FoodItem from './FoodItem';
import { mockFood } from './testingMockData';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe('FoodItem', () => {
    it("renders without crashing", async () => {
        reactRouterDom.useParams.mockReturnValue({ foodItem: "snacks", itemId: "nachos" });

        render(
            <BrowserRouter>
                <FoodItem allFood={mockFood} />
            </BrowserRouter>
        );
    });

    it("renders food item component with correct content", async () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: "snacks", itemId: "nachos" });

        render(
            <BrowserRouter>
                <FoodItem allFood={mockFood} />
            </BrowserRouter>
        );
        await waitFor(() => expect(screen.getByText(/Nachos/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Cheez Whiz/i)).toBeInTheDocument());
    });
});