const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, email, password, age } = req.body;

  if (!firstName || !email || !password) {
    throw new Error(
      "Enter all required fields firstName, email, password and age"
    );
  }

  if (firstName.length < 1 && firstName.length > 50) {
    throw new Error(
      "firstName should be greater than 1 charecter and less than 50 characters"
    );
  }

  if (!validator.isEmail(email)) {
    throw new Error("Valid email is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Need strong password");
  }
};

const validateUserEditData = (req) => {
  const editableFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];

  const isEditable = Object.keys(req.body).every((key) =>
    editableFields.includes(key)
  );

  return isEditable;
};

module.exports = {
  validateSignUpData,
  validateUserEditData,
};
