export function signup(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u) => u.email === userData.email)) {
      throw new Error('User already exists');
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return userData;
  }
  
  export function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return user;
  }
  
  export function googleLogin(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((u) => u.email === userData.email);
    if (!user) {
      user = { ...userData, authSource: 'google' };
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
    return user;
  }