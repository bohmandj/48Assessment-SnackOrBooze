import {
    render,
    screen,
    waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import * as reactRouterDom from "react-router-dom";
import FoodMenu from './FoodMenu';
import { mockFood } from './testingMockData';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe('FoodMenu', () => {
    it("renders without crashing", async () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: "snacks" });

        render(
            <BrowserRouter>
                <FoodMenu allFood={mockFood} />
            </BrowserRouter>
        );
    });

    it("renders menu component with links to snacks, and link to new snack item form", async () => {
        reactRouterDom.useParams.mockReturnValue({ foodMenu: "snacks" });

        render(
            <BrowserRouter>
                <FoodMenu allFood={mockFood} />
            </BrowserRouter>
        );
        await waitFor(() => expect(screen.getByText(/Some quick example text/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Nachos/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/Add New Item to Snacks Menu/i)).toBeInTheDocument());
    });
});