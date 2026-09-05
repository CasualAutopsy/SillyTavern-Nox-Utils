import webp from 'webpack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import TerserPlugin from 'terser-webpack-plugin';

const { defineConfig } = webp;
const __dirname = import.meta.dirname ?? path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    // entry: path.join(__dirname, 'src/index.js'),
    entry: {
        main: {
            import: path.join(__dirname, 'src/index.js'),
            dependOn: ['chance']
        },
        chance: {
            import: path.join(__dirname, 'src/modules/chance/chance.js'),
        }
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: [
                        '@babel/preset-env',
                    ],
                },
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            })
        ],
    },
});
