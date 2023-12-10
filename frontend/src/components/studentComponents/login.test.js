
//login function
async function login(username, password) {
    if (username === 'user' && password === 'password') {
      return { success: true, message: 'Login successful' };
    } else {
      throw new Error('Invalid credentials');
    }
  }
  
  // login test
  describe('Login Functionality', () => {
    test('should login with correct credentials', async () => {
      const username = 'user';
      const password = 'password';
  
      try {
        const result = await login(username, password);
        expect(result.success).toBe(true);
        expect(result.message).toBe('Login successful');
      } catch (error) {
        // Fail the test if it enters the catch block
        expect(error).toBeNull();
      }
    });
  
    test('should throw an error with incorrect credentials', async () => {
      const username = 'wronguser';
      const password = 'wrongpassword';
  
      try {
        await login(username, password);
        // If the login succeeds with incorrect credentials, fail the test
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid credentials'));
      }
    });
  });
  
  
  // Register function
  async function register(username, password, email) {
    if (username && password && email) {
      return { success: true, message: 'Registration successful' };
    } else {
      throw new Error('Invalid registration details');
    }
  }
  
  // Register test
  describe('Registration Functionality', () => {
    test('should register with valid details', async () => {
      const username = 'newuser';
      const password = 'newpassword';
      const email = 'newuser@example.com';
  
      try {
        const result = await register(username, password, email);
        expect(result.success).toBe(true);
        expect(result.message).toBe('Registration successful');
      } catch (error) {
        expect(error).toBeNull();
      }
    });
  
    test('should throw an error with invalid details', async () => {
      const username = '';
      const password = 'password';
      const email = 'invalidemail.com';
  
      try {
        await register(username, password, email);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid registration details'));
      }
    });
  });
  
  
  // Function for turn in assignement
  function turnInAssignment(studentId, assignmentId) {
    if (!studentId || !assignmentId) {
      throw new Error('Student ID and Assignment ID are required');
    }
  
    return `Assignment ${assignmentId} turned in by student ${studentId}`;
  }
  
  //test for assignement
  describe('turnInAssignment function', () => {
    test('successfully turns in an assignment', () => {
      const studentId = 123;
      const assignmentId = 'xyz123';
  
      const result = turnInAssignment(studentId, assignmentId);
  
      expect(result).toEqual(`Assignment ${assignmentId} turned in by student ${studentId}`);
    });
  
    test('throws an error if studentId or assignmentId is missing', () => {
      expect(() => turnInAssignment(undefined, 'xyz123')).toThrow('Student ID and Assignment ID are required');
  
      expect(() => turnInAssignment(123, undefined)).toThrow('Student ID and Assignment ID are required');
  
      expect(() => turnInAssignment(undefined, undefined)).toThrow('Student ID and Assignment ID are required');
    });

      describe('turnInAssignment function error handling', () => {
  test('throws an error if studentId is not provided', () => {
    expect(() => {
      turnInAssignment(undefined, 'xyz123');
    }).toThrowError('Student ID and Assignment ID are required');
  });

  test('throws an error if assignmentId is not provided', () => {
    expect(() => {
      turnInAssignment(123, undefined);
    }).toThrowError('Student ID and Assignment ID are required');
  });

  test('throws an error if both studentId and assignmentId are not provided', () => {
    expect(() => {
      turnInAssignment(undefined, undefined);
    }).toThrowError('Student ID and Assignment ID are required');
  });
});

  });
