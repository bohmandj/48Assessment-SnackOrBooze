import {
    render,
    screen
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
    it("renders without crashing", async () => {

        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
    });

    it("renders links to homepage, snacks menu, drinks menu, and new food form pages", async () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByText(/Snack or Booze/i)).toBeInTheDocument();
        expect(screen.getByText(/Snacks/i)).toBeInTheDocument();
        expect(screen.getByText(/Drinks/i)).toBeInTheDocument();
        expect(screen.getByText(/New Food/i)).toBeInTheDocument();
    });
});