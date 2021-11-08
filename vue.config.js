module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            title: '2048 Puzzle Game'
        }
    },
    lintOnSave: false,
    devServer: {
        proxy: 'http://localhost:3000'
    }
}
