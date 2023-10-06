const formValidator = (title, text) => {
    if (title.length <= 0 || text.length <= 0) {
        return false;
    }
    return true;
}

export default formValidator;