import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Add from './Add';


// Mock external dependencies
vi.mock('axios');
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actualReactRouterDom = await vi.importActual('react-router-dom'); // Import the actual module
    return {
      ...actualReactRouterDom, // Spread all original exports
      useNavigate: () => mockNavigate, // Return the mock navigate function
    };
  });
// Test the Add component
describe('Add Component', () => {
  it('submits the form and navigates to the home page', async () => {
    render(
      <MemoryRouter>
        <Add />
      </MemoryRouter>
    );

    // Simulate user input
    await userEvent.type(screen.getByPlaceholderText('name'), 'Test Product');
    await userEvent.type(screen.getByPlaceholderText('cost'), '100');
    await userEvent.type(screen.getByPlaceholderText('quantity'), '5');
    await userEvent.type(screen.getByPlaceholderText('expiration'), '2023-12-31');
    await userEvent.type(screen.getByPlaceholderText('img'), 'http://example.com/test.jpg');

    
    // Simulate form submission
    fireEvent.click(screen.getByText('Add Product'));

    // Assert axios.post was called correctly
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/products", {
      name: 'Test Product',
      cost: '100',
      quantity: '5',
      expiration: '2023-12-31',
      img: 'http://example.com/test.jpg',
    });

    // Assert navigate was called correctly
    // Use waitFor to wait for the mockNavigate to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

  });
});