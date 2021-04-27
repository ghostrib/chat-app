const compare = (string) => {
  return {
    hasLength: {
      test: string.length >= 6,
      message: 'at least 6 characters',
    },
    hasUppers: {
      test: string.match(/[A-Z]+/g) !== null,
      message: 'at least 1 uppercase letter',
    },
    hasLowers: {
      test: string.match(/[a-z]+/g) !== null,
      message: 'at least 1 lowercase letter',
    },
    hasNumbers: {
      test: string.match(/[0-9]+/g) !== null,
      message: 'at least 1 number',
    },
  };
};

export const useError = (string) => {
  if (string.length) {
    const errors = Object.values(compare(string))
      .filter((item) => !item.test)
      .map((error) => error.message);

    return errors;
  }
};
