let mix = require('laravel-mix');

mix
    .options({
        processCssUrls: false,
    })
    .js('src/js/app.js', 'assets')
    .postCss('src/css/app.css', 'assets', [
        require('postcss-import'),
        require('tailwindcss'),
        require('postcss-nested'),
        // require('postcss-preset-env')({ stage: 0 })
    ])
    .sourceMaps();
