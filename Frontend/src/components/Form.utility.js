const getCurrentDate = () => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}. ${(currentDate.getMonth() + 1 < 10) ? "0" + (currentDate.getMonth() + 1) + "." : currentDate.getMonth() + 1 + "."} ${(currentDate.getDate() < 10) ? "0" + currentDate.getDate() + "." : currentDate.getDate() + "."}`
}

const redirectUser = (target) => {
    setTimeout(() => {
        window.location.replace(target);
    }, 3000)
}

export { getCurrentDate, redirectUser };