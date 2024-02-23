const env = {
    REACT_APP_ZU_API_KEY: window.process && window.process.env.REACT_APP_ZU_API_KEY,
    // Add other environment variables here
};

console.log('REACT_APP_ZU_API_KEY:', env.REACT_APP_ZU_API_KEY);

export default env;