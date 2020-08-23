export const tokenConfig = getState => {
    
    //Get token from localstorage
    const token = getState().auth.token;

    // Header
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // If token add to header
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}