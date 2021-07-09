// jest 配置文件
import type { Config } from '@jest/types'
const { defaults } = require('jest-config')

const config: Config.InitialOptions = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', 'src/'],
  testEnvironment: 'jsdom',
}

export default config
