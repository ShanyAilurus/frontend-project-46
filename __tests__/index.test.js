import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const files = [['file1.json', 'file2.json']];

test.each(files)('gendiff', (file1, file2) => {
  const file1path = getFixturePath(file1);
  const file2path = getFixturePath(file2);
  const result = readFile('resultJson.txt');
  expect(gendiff(file1path, file2path)).toEqual(result);
});
