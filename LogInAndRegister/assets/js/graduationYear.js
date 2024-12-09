document.getElementById('graduationYearInput').addEventListener('change', function () {
    const input = this.value;
    const graduationYearList = document.getElementById('graduationYearList');
    const options = Array.from(graduationYearList.options);

    // Check if the input matches one of the options
    const isValid = options.some(option => option.value === input);

    if (!isValid) {
        alert('Please select a valid graduation year or type a valid year.');
        this.value = ''; // Clear invalid input
    }
});
