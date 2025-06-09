// src/pages/api/register.js
import { saveUser } from '../../lib/authStorage';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // In a real app, you should hash the password here!
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Remember to hash this in production!
      createdAt: new Date().toISOString()
    };

    saveUser(newUser);
    
    return res.status(201).json({ 
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}