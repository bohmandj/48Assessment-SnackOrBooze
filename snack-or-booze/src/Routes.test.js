import {
    render,
    screen,
    waitFor,
    fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as reactRouterDom from "react-router-dom";
import { createMemoryHistory } from "history";
import App from './App';
import SnackOrBoozeApi from './Api';
import { mockSnacksData, mockDrinksData } from './testingMockData';

jest.mock('./Api.js');
jest.mock("react-router-dom", () => {
    const original = jest.requireActual("react-router-dom");
    return {
        ...original,
        useHistory: () => ({
            push: jest.fn()
        }),
    };
});

const findStr = (str) => {
    return screen.getByText((content, node) => {
        const hasText = (node) => node.textContent === str;
        return hasText(node) || hasText(node.parentNode);
    });
}

beforeEach(() => {
    // mocking API responses
    SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
    SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);
})

describe('Routes', () => {
    it("renders home page on default '/' route", async () => {

        await act(async () => {
            render(
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            )
        });
        expect(screen.getByText(/Welcome to Silicon Valley's premier dive cafe!/i)).toBeInTheDocument();
    });

    it("renders Not Found page on '/404' route", async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/404"]} >
                    <App />
                </MemoryRouter>
            )
        });
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });

    it("shows Not Found page on invalid route", async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/invalid"]} >
                    <App />
                </MemoryRouter>
            )
        });
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });

    it("shows Snacks Menu page on /snacks route", async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/snacks"]} >
                    <App />
                </MemoryRouter>
            )
        });
        expect(findStr('Snacks Menu')).toBeInTheDocument();
        expect(screen.getByText(/Nachos/i)).toBeInTheDocument();
    });

    it("shows Drinks Menu page on /drinks route", async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/drinks"]} >
                    <App />
                </MemoryRouter>
            )
        });
        expect(findStr('Drinks Menu')).toBeInTheDocument();
        expect(screen.getByText(/Martini/i)).toBeInTheDocument();
    });


})