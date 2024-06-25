import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import App from './App';

// Unit tests 
test('renders without crashing', () => {
    render(<App />);
    const linkElement = screen.getByText(/Inventory/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders Add product button', () => {
    render(<App />);

    const linkElement = screen.getByText(/Add Product/i);
    expect(linkElement).toBeInTheDocument();
});

test('Link changes the state when hovered', async () => {
    render(<App />);

    const linkElement = screen.getByText(/Add Product/i);
    expect(linkElement).toHaveAccessibleName('Link is normal');

    await userEvent.hover(linkElement);
    expect(linkElement).toHaveAccessibleName('Link is hovered');

    await userEvent.unhover(linkElement);
    expect(linkElement).toHaveAccessibleName('Link is normal');
});
