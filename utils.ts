/**
 * Function to read and evaluate input keyword from user
 * @return {string} Input keyword from user
 */
const getUserInput = () => {
    let inputStr = '';
    const args = process.argv;
    for (let i = 0; i < args.length; i++) {
        if (i >= 2) inputStr += ((i === args.length - 1) ? args[i] : `${args[i]} `);
    }
    return inputStr;
}

export default {
    getUserInput,
}