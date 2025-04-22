export const register = (req, res) => {
  res.status(200).json({ message: 'User registered successfully' });
  res.end("User registered successfully");
}