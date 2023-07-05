import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff files with the extension *.json', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = readFile('result.txt');
  console.log(gendiff(file1, file2));
  expect(gendiff(file1, file2)).toEqual(result);
});

test('gendiff files with the extension *.yaml', () => {
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const result = readFile('result.txt');
  expect(gendiff(file1, file2)).toEqual(result);
});

test('gendiff files with the extension *.yml', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const result = readFile('result.txt');
  expect(gendiff(file1, file2)).toEqual(result);
});