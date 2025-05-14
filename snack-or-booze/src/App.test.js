import {
    render,
    screen,
    waitFor,
    fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import App from './App';
import SnackOrBoozeApi from './Api';
import { mockSnacksData, mockDrinksData } from './testingMockData';

jest.mock('./Api.js');

describe('App', () => {
    it("renders without crashing", async () => {
        // mocking API responses
        SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
        SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);

        await act(async () => {
            render(<App />);
        });
    });

    it("matches snapshot", async () => {
        SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
        SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);

        await act(async () => {
            render(<App />);
        });
        const { asFragment } = render(<App />);
        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });

    it("loads homepage and displays food quantities correctly", async () => {
        SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
        SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);

        render(<App />);

        // Initially, loading text should be in the document
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for component to finish loading
        await waitFor(() => expect(screen.getByText(/2 Snacks/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/3 Drinks/i)).toBeInTheDocument());

        // After loading is done, loading text should no longer be in the document
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
})