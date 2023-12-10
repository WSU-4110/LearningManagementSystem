import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

function RegisterCourse({ onRegister }) {
  const [courseName, setCourseName] = React.useState('');
  const [registeredCourses, setRegisteredCourses] = React.useState([]);
  const [error, setError] = React.useState(null);

  const handleRegister = async () => {
    if (courseName.trim() === '') {
      setError('Course name is required');
      return;
    }

    try {
      await onRegister(courseName);
      setRegisteredCourses([...registeredCourses, courseName]);
      setCourseName('');
      setError(null);
    } catch (err) {
      setError('Failed to register for the course');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        placeholder="Enter course name"
        data-testid="course-input"
      />
      <button onClick={handleRegister} data-testid="register-button">
        Register
      </button>
      {error && <p role="alert">{error}</p>}
      <div data-testid="registered-courses">
        <h3>Registered Courses:</h3>
        <ul>
          {registeredCourses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

describe('RegisterCourse component', () => {
  test('registers a course successfully', async () => {
    const mockRegister = jest.fn().mockResolvedValueOnce();

    render(<RegisterCourse onRegister={mockRegister} />);

    const courseInput = screen.getByTestId('course-input');
    const registerButton = screen.getByTestId('register-button');

    fireEvent.change(courseInput, { target: { value: 'Mathematics' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('Mathematics');
      const registeredCourse = screen.getByText('Mathematics');
      expect(registeredCourse).toBeInTheDocument();
    });
  });

  test('handles registration with empty course name', async () => {
    const mockRegister = jest.fn();

    render(<RegisterCourse onRegister={mockRegister} />);

    const registerButton = screen.getByTestId('register-button');

    fireEvent.click(registerButton);

    const errorElement = await screen.findByRole('alert');
    expect(errorElement).toHaveTextContent('Course name is required');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  test('handles error during course registration', async () => {
    const mockRegister = jest.fn().mockRejectedValueOnce(new Error('Failed to register'));

    render(<RegisterCourse onRegister={mockRegister} />);

    const courseInput = screen.getByTestId('course-input');
    const registerButton = screen.getByTestId('register-button');

    fireEvent.change(courseInput, { target: { value: 'Physics' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('Physics');
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent('Failed to register for the course');
    });
  });

});
