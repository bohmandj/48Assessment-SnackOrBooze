import {
    render,
    screen
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
    it("renders without crashing", async () => {

        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
    });

    it("renders NotFound component with correct content & link to homepage", async () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
        expect(screen.getByText(/The page you are looking for does not exist./i)).toBeInTheDocument();
        expect(screen.getByText(/Return to Homepage/i)).toBeInTheDocument();
    });
});