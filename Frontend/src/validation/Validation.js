export const validateUser = (user) => {
  const { name, email, age } = user;

  if (!name.trim()) {
    return "Name is required";
  }

  if (!email.trim()) {
    return "Email is required";
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  if (!age) {
    return "Age is required";
  }

  if (isNaN(age)) {
    return "Age must be a number";
  }

  if (Number(age) < 18) {
    return "Age must be at least 18";
  }

  return null; 
};
