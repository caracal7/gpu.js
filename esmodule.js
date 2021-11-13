const plugin = {
    name: 'fake-fs-path-gl',
    setup(build) {
        build.onResolve({ filter: /^gl$/ }, args => ({ path: args.path, namespace: 'fake-gl' }))
        build.onResolve({ filter: /^fs$/ }, args => ({ path: args.path, namespace: 'fake-fs' }))
        build.onResolve({ filter: /^path$/ }, args => ({ path: args.path, namespace: 'fake-path' }))
        build.onLoad({ filter: /.*/, namespace: 'fake-gl' }, () => ({ contents: '{}', loader: 'json' }));
        build.onLoad({ filter: /.*/, namespace: 'fake-fs' }, () => ({ contents: '{}', loader: 'json' }));
        build.onLoad({ filter: /.*/, namespace: 'fake-path' }, () => ({ contents: '{}', loader: 'json' }));
    },
}

const plugin2 = {
    name: 'fake-acorn',
    setup(build) {
        build.onResolve({ filter: /^acorn$/ }, args => ({ path: args.path, namespace: 'fake-acorn' }))
        build.onLoad({ filter: /.*/, namespace: 'fake-acorn' }, () => ({ contents: '{}', loader: 'json' }));
    },
}

require('esbuild').build({
    entryPoints: ['src/browser.js'],
    format: 'esm',
    bundle: true,
    minify: false,
    target: ['chrome58','firefox57','safari11','edge18'],
    outfile: 'dist/gpu-browser.esm.js',
    plugins: [plugin],
}).catch(() => process.exit(1));

require('esbuild').build({
    entryPoints: ['src/browser.js'],
    format: 'esm',
    bundle: true,
    minify: true,
    target: ['chrome58','firefox57','safari11','edge18'],
    outfile: 'dist/gpu-browser.esm.min.js',
    plugins: [plugin],
}).catch(() => process.exit(1));

/*
require('esbuild').build({
    entryPoints: ['src/browser.js'],
    format: 'esm',
    bundle: true,
    minify: true,
    target: ['chrome58','firefox57','safari11','edge18'],
    outfile: 'dist/gpu-browser-core.esm.min.js',
    plugins: [plugin, plugin2],
}).catch(() => process.exit(1));

require('esbuild').build({
    entryPoints: ['src/browser.js'],
    format: 'esm',
    bundle: true,
    minify: false,
    target: ['chrome58','firefox57','safari11','edge18'],
    outfile: 'dist/gpu-browser-core.esm.js',
    plugins: [plugin, plugin2],
}).catch(() => process.exit(1));
*/
