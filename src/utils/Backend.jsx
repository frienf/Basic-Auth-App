import bcrypt from 'bcryptjs';

export function signup(userData) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some((u) => u.email === userData.email)) {
    throw new Error('User already exists');
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userData.password, salt);
  const newUser = { ...userData, password: hashedPassword };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return { ...newUser, password: undefined }; // Don't return the hashed password
}

export function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  return { ...user, password: undefined }; // Don't return the hashed password
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