module.exports = async () => {
    return {
        verbose: true,
        moduleFileExtensions: ['js'],
        transform: {
            "^.+\\.jsx?$": "babel-jest"
        },
        testEnvironment: 'node'
    };
};