// src/lib/authStorage.js
export const saveUser = (user) => {
  if (typeof window !== 'undefined') {
    const users = JSON.parse(localStorage.getItem('authUsers') || []);
    const existingIndex = users.findIndex(u => u.email === user.email);
    
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem('authUsers', JSON.stringify(users));
  }
};

export const getUserByEmail = async (email) => {
  if (typeof window !== 'undefined') {
    const users = JSON.parse(localStorage.getItem('authUsers') || []);
    return users.find(user => user.email === email);
  }
  return null;
};

export const getAllUsers = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('authUsers') || []);
  }
  return [];
};