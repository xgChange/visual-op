// jest 配置文件
import type { Config } from '@jest/types'
const { defaults } = require('jest-config')

const config: Config.InitialOptions = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
  testMatch: ['**/test/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', 'src/'],
}

export default config
