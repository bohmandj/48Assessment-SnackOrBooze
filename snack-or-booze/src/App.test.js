import {
    render,
    screen,
    waitFor,
    fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { act } from 'react';
import App from './App';
import SnackOrBoozeApi from './Api';
import { mockSnacksData, mockDrinksData } from './testingMockData';

jest.mock('./Api.js');

beforeEach(() => {
    // mocking API responses
    SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
    SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);
})

describe('App', () => {
    it("renders without crashing", async () => {

        await act(async () => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        });
    });

    it("matches snapshot", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            );
        });
        const { asFragment } = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it("loads homepage and displays food quantities correctly", async () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );

        // Initially, loading text should be in the document
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for component to finish loading
        await waitFor(() => expect(screen.getByText(/2 Snacks/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/3 Drinks/i)).toBeInTheDocument());

        // After loading is done, loading text should no longer be in the document
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
})