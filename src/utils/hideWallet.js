export const hideWallet = (str) => {
    if (str.length <= 8) {
        return str;
    }
    const hiddenChars = str.slice(4, -4).replace(/./g, '*');
    return str.slice(0, 4) + hiddenChars + str.slice(-4);
}