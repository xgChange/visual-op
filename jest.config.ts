// jest 配置文件
import type { Config } from '@jest/types'
const { defaults } = require('jest-config')

const config: Config.InitialOptions = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
  testMatch: ['**/tests/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', 'src/'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
      babelConfig: true,
    },
  },
  transform: {
    // ...
    // 用 `ts-jest` 处理 `*.ts` 文件
    '^.+\\.tsx?$': 'ts-jest',
  },
}

export default config
