const path = require('path')
const fs = require('fs')
const requireHacker = require('require-hacker')
const glob = require('glob')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
function setupRequireHacker () {
  const webjs = '.web.js'
  const webModules = ['antd-mobile', 'rmc-picker'].map(m => path.join('node_modules', m))

  requireHacker.hook('js', filename => {
    if (filename.endsWith(webjs) || webModules.every(p => !filename.includes(p))) return

    const webFilename = filename.replace(/\.js$/, webjs)
    if (!fs.existsSync(webFilename)) return

    return fs.readFileSync(webFilename, { encoding: 'utf8' })
  })

  requireHacker.hook('svg', filename => {
    return requireHacker.to_javascript_module_source(`#${path.parse(filename).name}`)
  })
}

setupRequireHacker()

function moduleDir (m) {
  return path.dirname(require.resolve(`${m}/package.json`))
}

module.exports = {
  webpack: (config) => {
    config.output.publicPath = `/prefix${config.output.publicPath}`;
    return config;
  },
  webpack: (config, { dev }) => {
    config.resolve.extensions = ['.web.js', '.js', '.json']
	config.plugins.push(
      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )
    config.module.rules.push(
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
          moduleDir('antd-mobile'),
          __dirname
        ]
      },{
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }
    ,
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )

    return config
  }
}
