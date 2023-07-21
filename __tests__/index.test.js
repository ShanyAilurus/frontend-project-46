import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYaml1 = getFixturePath('file1.yaml');
const fileYaml2 = getFixturePath('file2.yaml');
const fileYml1 = getFixturePath('file1.yml');
const fileYml2 = getFixturePath('file2.yml');

describe('Difference', () => {
  const formats = [
    { format: 'stylish', result: 'resultStylish.txt' },
    { format: 'plain', result: 'resultPlain.txt' },
    { format: 'json', result: 'resultJson.txt' },
  ];

  formats.forEach(({ format, result }) => {
    const total = readFile(result);

    describe(`gendiff files with ${format}`, () => {
      test.each([
        ['extension *.json', fileJson1, fileJson2],
        ['extension *.yaml', fileYaml1, fileYaml2],
        ['extension *.yml', fileYml1, fileYml2],
      ])('%s', (filename, file1, file2) => {
        expect(gendiff(file1, file2, format)).toBe(total);
      });
    });
  });
});
