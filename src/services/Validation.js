const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateForm = (values) => {
    const error = {};
    if (!values.name) {
        error.name = 'Name is a required field';
    }
    if (!values.email) {
        error.email = 'Email is a required field';
    }
    if (!emailRegex.test(values.email)) {
        error.email = 'Enter a valid email ';
    }
    if (!values.password) {
        error.password = 'Password is a required field';
    }
    return error;
}

export const validateFormForForgotPassword = (data) => {
    const error = {};
    if (!data.email) {
        error.email = 'Email is a required field';
    }
    if (!emailRegex.test(data.email)) {
        error.email = 'Enter a valid email ';
    }
    return error;
}



