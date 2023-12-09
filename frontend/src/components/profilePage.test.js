import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProfilePage from './profilePage.component';

describe('ProfilePage Component', () => {
  test('renders user profile form', () => {
    render(<ProfilePage />);
    expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Update Profile/i)).toBeInTheDocument();
  });

  test('initializes with empty input fields', () => {
    render(<ProfilePage />);
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('');
  });

  test('displays update button', () => {
    render(<ProfilePage />);
    expect(screen.getByText(/Update Profile/i)).toBeInTheDocument();
  });

  test('updates first name on input change', () => {
    render(<ProfilePage />);
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('John');
  });

  test('updates last name on input change', () => {
    render(<ProfilePage />);
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue('Doe');
  });

  // Add a new easy test
  test('displays email label', () => {
    render(<ProfilePage />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });
});
