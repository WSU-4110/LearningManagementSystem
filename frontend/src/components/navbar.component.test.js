import { render, screen , fireEvent} from '@testing-library/react';
import Navbar from './navbar.component';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

test('Navbar renders Home link and navigates to the Home page', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" component={Navbar} />
            </Routes>
        </MemoryRouter>
    );
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe('/');
});

test('Navbar renders Course link and navigates to the Course page', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const courseLink = screen.getByText('Course');
    expect(courseLink).toBeInTheDocument();

    render(
        <MemoryRouter initialEntries={['/course']}>
            <Routes>
                <Route path="/course" component={Navbar} />
            </Routes>
        </MemoryRouter>
    );
    fireEvent.click(courseLink);
    expect(window.location.pathname).toBe('/');
});

test('Navbar renders Login link and navigates to the Login page', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const loginLink = screen.getByText('Login');
    expect(loginLink).toBeInTheDocument();

    render(
        <MemoryRouter initialEntries={['/login']}>
            <Routes>
                <Route path="/login" component={Navbar} />
            </Routes>
        </MemoryRouter>
    );
    fireEvent.click(loginLink);
    expect(window.location.pathname).toBe('/');
});

test('Navbar renders Register link and navigates to the Register page', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const registerLink = screen.getByText('Register');
    expect(registerLink).toBeInTheDocument();

    render(
        <MemoryRouter initialEntries={['/register']}>
            <Routes>
                <Route path="/register" component={Navbar} />
            </Routes>
        </MemoryRouter>
    );
    fireEvent.click(registerLink);
    expect(window.location.pathname).toBe('/');
});

test('Navbar renders Profile link and navigates to the Profile page', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const profileLink = screen.getByText('Profile');
    expect(profileLink).toBeInTheDocument();

    render(
        <MemoryRouter initialEntries={['/profile']}>
            <Routes>
                <Route path="/profile" component={Navbar} />
            </Routes>
        </MemoryRouter>
    );
    fireEvent.click(profileLink);
    expect(window.location.pathname).toBe('/');
});

test('Navbar renders Settings link and navigates to the Settings page', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
    const settingsLink = screen.getByText('Settings');
    expect(settingsLink).toBeInTheDocument();

    render(
        <MemoryRouter initialEntries={['/settings']}>
            <Routes>
                <Route path="/settings" component={Navbar} />
            </Routes>
        </MemoryRouter>
    );
    fireEvent.click(settingsLink);
    expect(window.location.pathname).toBe('/');
});