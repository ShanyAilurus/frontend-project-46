### Hexlet tests and linter status:
[![Actions Status](https://github.com/ShanyAilurus/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/ShanyAilurus/frontend-project-46/actions) 
[![Maintainability](https://api.codeclimate.com/v1/badges/d94e8fee2a6d7c86e7da/maintainability)](https://codeclimate.com/github/ShanyAilurus/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d94e8fee2a6d7c86e7da/test_coverage)](https://codeclimate.com/github/ShanyAilurus/frontend-project-46/test_coverage)

# Вычилитель отличий (JavaScript)

"Gendiff" - это программа, которая определяет разницу между двумя файлами и выводит результаты в консоль.

Это второй проект на JavaScript под руководством менторов из <a href="https://ru.hexlet.io/">Hexlet</a>.

Особенности утилиты:
- может работать с файлами json и yaml/yml;
- умеет работать как с относительными, так и абсолютными путями до файлов;
- генерация отчетов в виде обычного текста(plain), stylish и json.

Для установки необходимо ввести:

```
$ make install
```

## Работа с утилитой:

### Для получения краткого описания утилиты и её аргументов:

```
$ gendiff -h
```
<a href="https://asciinema.org/a/596549" target="_blank"><img src="https://asciinema.org/a/596549.svg" /></a>

### Сравнение двух файлов с форматом "stylish" (этот формат используется по умолчанию):

```
$ gendiff file1.json file2.json
```

#### пример работы:
<a href="https://asciinema.org/a/596550" target="_blank"><img src="https://asciinema.org/a/596550.svg" /></a>

Отсутствие плюса или минуса говорит, что ключ есть в обоих файлах, и его значения совпадают. Во всех остальных ситуациях значение по ключу либо отличается, либо ключ есть только в одном файле. В примере выше ключ timeout есть в обоих файлах, но имеет разные значения, proxy находится только в file1, а verbose только в file2.

Сравниваемые файлы могут быть с данными более сложной степенью вложенности:
<a href="https://asciinema.org/a/596574" target="_blank"><img src="https://asciinema.org/a/596574.svg" /></a>


### Сравнение двух файлов с форматом "plain":

```
$ gendiff -f plain file1.json file2.json
```
или 

```
$ gendiff --format plain file1.json file2.json
```

#### пример работы:
<a href="https://asciinema.org/a/596562" target="_blank"><img src="https://asciinema.org/a/596562.svg" /></a>

Если новое значение свойства является составным, то пишется [complex value]
Если свойство вложенное, то отображается весь путь до корня, а не только с учетом родителя. Например выше это: common.setting6.ops.

### Сравнение двух файлов с форматом "json":

```
$ gendiff -f json file1.json file2.json
```
или 

```
$ gendiff --format json file1.json file2.json
```

#### пример работы:
<a href="https://asciinema.org/a/596570" target="_blank"><img src="https://asciinema.org/a/596570.svg" /></a>

Вывод в структурированном формате, таком как json