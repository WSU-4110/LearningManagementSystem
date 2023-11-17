import axios from 'axios';
import { handleSaveChanges, handleColorChange } from './settings.component'; // Import your functions

jest.mock('axios');

const mockSetSelectedColor = jest.fn();

const mockState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  notificationSound: false,
};

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState) => [mockState, mockSetSelectedColor],
}));

describe('settings Functions', () => {
  test('handleSaveChanges sends a PUT request with user data', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const firstName = 'John';
    const lastName = 'Doe';
    const notificationSound = true;

    const updatedUser = {
      email,
      password,
      firstName,
      lastName,
      notificationSound,
    };

    axios.put.mockResolvedValueOnce({ data: 'success' });

    await handleSaveChanges(email, password, firstName, lastName, notificationSound);

    expect(axios.put).toHaveBeenCalledWith('http://localhost:5050/users/update', updatedUser);
  });

  test('handleColorChange updates the selected color', () => {
    const selectedColor = 'blue';

    handleColorChange(selectedColor);

    expect(mockSetSelectedColor).toHaveBeenCalledWith(selectedColor);
  });
});
