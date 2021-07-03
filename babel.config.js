module.exports = {
  presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-typescript'],
  plugins: [['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }]],
}
