import {
    render,
    screen,
    waitFor,
    fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
        useParams: jest.fn(),
        useHistory: () => ({
            push: jest.fn()
        }),
    };
});

beforeEach(() => {
    // mocking API responses
    SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
    SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);
})

describe('Routes', () => {
    it("renders home page on default '/' route", async () => {

        await act(async () => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            )
        });
        expect(screen.getByText(/Welcome to Silicon Valley's premier dive cafe!/i)).toBeInTheDocument();
    });

    it("renders Not Found page on '/404' route", async () => {
        window.history.pushState({}, "", "/404");
        await act(async () => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            )
        });
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });

    it("shows Not Found page on invalid route", async () => {
        window.history.pushState({}, "", "/invalid");
        reactRouterDom.useParams.mockReturnValue({ foodMenu: 'invalid' });
        await act(async () => {
            render(
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            )
        });
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    });
})