module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@models': './src/models',
                    '@database': './src/database',
                    '@controllers': './src/controllers',
                    '@services': './src/services',
                    '@routes': './src/routes',
                    '@utils': './src/utils',
                    '@middlewares': './src/middlewares',
                    '@helpers': './src/helpers'
                }
            }
        ]
    ],
    ignore: ['**/*.spec.ts']
}