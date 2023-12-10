// Modified function to generate a navigation bar with optional items
function generateNavBar(specificItems = ['Courses', 'Assignments', 'Grades', 'Profile', 'Settings']) {
  return specificItems;
}

// Modified tests for the generateNavBar function
describe('generateNavBar function', () => {
  test('successfully generates navigation bar with default items', () => {
    const result = generateNavBar();

    expect(result).toEqual(['Courses', 'Assignments', 'Grades', 'Profile', 'Settings']);
  });

  test('successfully generates navigation bar with specific items', () => {
    const specificItems = ['Dashboard', 'Calendar', 'Messages', 'Help'];
    const result = generateNavBar(specificItems);

    expect(result).toEqual(specificItems);
  });

  test('generated navigation bar contains Courses', () => {
    const result = generateNavBar();

    expect(result).toContain('Courses');
  });

  test('generated navigation bar contains Assignments', () => {
    const result = generateNavBar();

    expect(result).toContain('Assignments');
  });

  test('generated navigation bar contains Grades', () => {
    const result = generateNavBar();

    expect(result).toContain('Grades');
  });

  test('generated navigation bar contains Profile', () => {
    const result = generateNavBar();

    expect(result).toContain('Profile');
  });

  test('generated navigation bar contains Settings', () => {
    const result = generateNavBar();

    expect(result).toContain('Settings');
  });

  test('generated navigation bar does not contain invalid item', () => {
    const result = generateNavBar();

    expect(result).not.toContain('Invalid');
  });

  test('generated navigation bar length is 5', () => {
    const result = generateNavBar();

    expect(result).toHaveLength(5);
  });

  test('generated navigation bar does not include duplicate items', () => {
    const result = generateNavBar();
    const uniqueItems = new Set(result);

    expect(uniqueItems.size).toBe(result.length);
  });
});
