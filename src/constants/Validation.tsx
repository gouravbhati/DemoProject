const getOnlyNumbers = (str: string) => {
    return str.match(/\d/g)?.join('')
}


const AppValidator = {
    getOnlyNumbers
}

export default AppValidator