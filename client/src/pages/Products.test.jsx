import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Products from './Products';
import { BrowserRouter } from 'react-router-dom';

// Mock axios
vi.mock('axios');

// 
describe('Products Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  // Render component with router context
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  // Test the Products component with mock data and router context 
  it('fetches products on component mount', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product', price: '10.00' }];
    axios.get.mockResolvedValue({ data: mockProducts });

    renderWithRouter(<Products />);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/products"); // expect axios.get to be called with the correct URL
    await screen.findByText('Test Product');
    expect(screen.getByText('Test Product')).toBeInTheDocument();  // expect the product name to be displayed on the page
  });

  // Test 2
  it('fetches products on component mount', async () => {
    const mockProducts = [{ id: 2, name: 'Apples', price: '3.99' }];
    axios.get.mockResolvedValue({ data: mockProducts });

    renderWithRouter(<Products />);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/products");
    await screen.findByText('Apples');
    expect(screen.getByText('Apples')).toBeInTheDocument();
  });

  


});