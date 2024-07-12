// TODO: We will handle errors better soon
const validateInputFields = (schema, input) => {
  const { error } = schema.validate(input);

  if (error) {
    return error?.message;
  }
};

module.exports = { validateInputFields };
