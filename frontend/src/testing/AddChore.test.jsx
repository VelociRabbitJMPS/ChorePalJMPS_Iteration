import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import AddChore from '../components/AddChore';
import { addChore, fetchChores } from '../redux/choreSlice';

//jest.fn() is mock func by jest, it mock the useDispatch n it is replacing the with jest.fn function
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
//mocking the choreSlice module
jest.mock('../redux/choreSlice', () => ({
  addChore: jest.fn(() => ({ type: 'ADD_CHORE' })),
  fetchChores: jest.fn(() => ({ type: 'FETCH_CHORES' })),
}));
//simulate the Redux dispatch function
describe('Adding Form', () => {
  const mockDispatch = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    //tell the mock useDispatch to return mockDispatch
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });
  // Follow the arrange-act-assert (AAA) pattern Arrange, Act and Assert
  it('renders form fields and buttons correctly', () => {
    //arrange
    render(<AddChore day='monday' onClose={mockOnClose} />);
    //assert
    expect(screen.getByText(/Add New Chore for MONDAY/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Chore Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Child Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add Chore/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('shows alert when field are empty on submit', () => {
    //Arrange
    window.alert = jest.fn();
    render(<AddChore day='monday' onClose={mockOnClose} />);
    //Act
    fireEvent.click(screen.getByRole('button', { name: /Add Chore/i }));
    //Assert
    expect(window.alert).toHaveBeenCalledWith('Please fill in both fields.');
  });
  it('call onClose when cancel is hit', () => {
    render(<AddChore day='monday' onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockOnClose).toHaveBeenCalledWith(expect.any(Object));
  });

  it('dispatches actions and closes form on submit', async () => {
    const choreName = 'Do Dishes';
    const childName = 'Alice';

    render(<AddChore day='monday' onClose={mockOnClose} />);
    fireEvent.change(screen.getByLabelText(/Chore Name/i), {
      target: { value: choreName },
    });
    fireEvent.change(screen.getByLabelText(/Child Name/i), {
      target: { value: childName },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add Chore/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'ADD_CHORE' })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'FETCH_CHORES' })
      );
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
// aferEach(()=>{
//     jest.restoreAllMocks();
// })
