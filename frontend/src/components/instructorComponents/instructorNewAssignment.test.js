// Function for instructor to make an assignment
function makeAssignment(instructorId, assignmentDetails) {
  if (instructorId === null || assignmentDetails === null) {
    throw new Error('Instructor ID and assignment details are required');
  }

  return `Assignment created by instructor ${instructorId}: ${assignmentDetails}`;
}

// Tests for the makeAssignment function
describe('makeAssignment function', () => {
  test('successfully makes an assignment', () => {
    const instructorId = 456;
    const assignmentDetails = 'Create a report on the assigned topic';

    const result = makeAssignment(instructorId, assignmentDetails);

    expect(result).toEqual(`Assignment created by instructor ${instructorId}: ${assignmentDetails}`);
  });

  test('throws an error if instructorId or assignmentDetails is missing', () => {
    expect(() => makeAssignment(null, 'Create a report')).toThrow('Instructor ID and assignment details are required');

    expect(() => makeAssignment(456, null)).toThrow('Instructor ID and assignment details are required');

    expect(() => makeAssignment(null, null)).toThrow('Instructor ID and assignment details are required');
  });

  test('successfully makes an assignment with complex details', () => {
    const instructorId = 789;
    const assignmentDetails = 'Write a program to solve a given algorithmic problem. Due in 2 weeks.';

    const result = makeAssignment(instructorId, assignmentDetails);

    expect(result).toEqual(`Assignment created by instructor ${instructorId}: ${assignmentDetails}`);
  });

  test('successfully makes an assignment with special characters in details', () => {
    const instructorId = 123;
    const assignmentDetails = 'Create a presentation on "The History of Computer Science"';

    const result = makeAssignment(instructorId, assignmentDetails);

    expect(result).toEqual(`Assignment created by instructor ${instructorId}: ${assignmentDetails}`);
  });

  test('successfully makes an assignment with a long description', () => {
    const instructorId = 789;
    const assignmentDetails = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    const result = makeAssignment(instructorId, assignmentDetails);

    expect(result).toEqual(`Assignment created by instructor ${instructorId}: ${assignmentDetails}`);
  });

  test('successfully makes an assignment with empty assignmentDetails', () => {
    const instructorId = 123;
    const assignmentDetails = '';

    const result = makeAssignment(instructorId, assignmentDetails);

    expect(result).toEqual(`Assignment created by instructor ${instructorId}: ${assignmentDetails}`);
  });
});
