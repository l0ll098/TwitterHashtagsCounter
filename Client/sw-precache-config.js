module.exports = {
    maximumFileSizeToCacheInBytes: 20971520,    // 20MB
    staticFileGlobs: [
    'dist/**.html',
    'dist/**.js',
    'dist/**.css',
    "dist/**.json",
    'dist/assets/images/*',
    'dist/assets/icons/*'
    ],
    root: 'dist',
    stripPrefix: 'dist/',
    navigateFallback: '/index.html',
    runtimeCaching: [
        {
            urlPattern: /localhost:3000/,
            handler: 'networkFirst'
        },
        {
            urlPattern: /rankingit\.azurewebsites\.net/,
            handler: 'networkFirst'
        }
    ]
};
