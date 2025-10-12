export const validateData = (email, password) => {
  const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,20}$/.test(password);

  if (!validateEmail) return "Email is not valid";
  if (!validatePassword) return "Password is not valid";

  return null;
};
