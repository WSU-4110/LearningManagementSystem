import axios from 'axios';
import profilePage from './profilePage.component';

jest.mock('axios');

describe('profilePage', () => {
  let component;

  beforeEach(() => {
    component = new profilePage(); 
    component.setState = jest.fn();
  });

  test('onChangeFirstName updates state', () => {
    const event = { target: { value: 'John' } };
    component.onChangeFirstName(event);
    expect(component.setState).toHaveBeenCalledWith({ firstname: 'John' });
  });

  test('onChangeLastName updates state', () => {
    const event = { target: { value: 'Doe' } };
    component.onChangeLastName(event);
    expect(component.setState).toHaveBeenCalledWith({ lastname: 'Doe' });
  });

  test('onChangeEmail updates state', () => {
    const event = { target: { value: 'john.doe@example.com' } };
    component.onChangeEmail(event);
    expect(component.setState).toHaveBeenCalledWith({ email: 'john.doe@example.com' });
  });

  test('onSubmit prevents default, updates state, and makes API call', async () => {
    const event = { preventDefault: jest.fn() };
    component.setState({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });

    axios.post.mockResolvedValueOnce({ data: 'success' });

    await component.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.setState).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/profilePage/update/' + component.props.match.params.id,
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      }
    );
    expect(window.location).toBe('/');
  });
});