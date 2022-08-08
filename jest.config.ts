import type {Config} from '@jest/types';
import {defaults} from 'jest-config';

export default async (): Promise<Config.InitialOptions> => {
  return {
    transform : {
      '.(ts|tsx)' : 'ts-jest',
    },
    testRegex : '\\.test\\.tsx?$',
    verbose: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  };
};