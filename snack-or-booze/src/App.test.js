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

jest.mock('./Api.js');

const mockSnacksData = [{
    "id": "nachos",
    "name": "Nachos",
    "description": "An American classic!",
    "recipe": "Cover expensive, organic tortilla chips with Cheez Whiz.",
    "serve": "Serve in a hand-thrown ceramic bowl, garnished with canned black olives"
},
{
    "id": "hummus",
    "name": "Hummus",
    "description": "Sure to impress your vegan friends!",
    "recipe": "Purchase one container of hummus.",
    "serve": "Place unceremoniously on the table, along with pita bread."
}];
const mockDrinksData = [{
    "id": "martini",
    "name": "Martini",
    "description": "An ice-cold, refreshing classic.",
    "recipe": "Mix 3 parts vodka & 1 part dry vermouth.",
    "serve": "Serve very cold, straight up."
},
{
    "id": "negroni",
    "name": "Negroni",
    "description": "A nice drink for a late night conversation.",
    "recipe": "Mix equal parts of gin, Campari, and sweet vermouth.",
    "serve": "Serve cold, either on the rocks or straight up."
},
{
    "id": "gin-and-tonic",
    "name": "Gin and Tonic",
    "description": "Like regular tonic, but with gin.",
    "recipe": "Mix 2 parts gin & 1 part tonic water.",
    "serve": "Serve in a tall glass over ice, garnished with a lime wedge."
}];

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
        // mocking API responses
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

    it("loads and displays food quantities correctly", async () => {
        // mocking API responses
        SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
        SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);

        // Render the component
        render(<App />);

        // Initially, loading text should be in the document
        expect(screen.getByText(/loading/i)).toBeInTheDocument();

        // Wait for component to finish loading
        await waitFor(() => expect(screen.getByText(/2 Snacks/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/3 Drinks/i)).toBeInTheDocument());

        // After loading is done, loading text should no longer be in the document
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    })
})