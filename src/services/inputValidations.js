function validateInput(inputValue, regex) {
    if (typeof inputValue !== 'string') {
        inputValue = inputValue.toString();
    }
    const newInputValue = inputValue.trim();
    return regex.test(newInputValue);
};

export default validateInput;
