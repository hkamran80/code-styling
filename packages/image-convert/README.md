# `@hkamran/image-convert`
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL3.0-green.svg)](../../LICENSE.md) [![npm version](https://badge.fury.io/js/%40hkamran%2Fimage-convert.svg)](https://badge.fury.io/js/%40hkamran%2Fimage-convert.svg)

Convert images to the AVIF and WebP file formats

## Usage
```bash
$ npx @hkamran/image-convert
```

### Options
- `--input` (default: `*.{jpg,jpeg,tif,tiff,png,gif,svg}`): Input filename(s), supports globs/wildcards
- `--output` (optional, defaults to current directory): Output directory
- `--quality` (default: 50): Quality vs file size, 1 (lowest/smallest) to 100 (highest/largest)
- `--speed` (default: 5): CPU effort vs file size, 0 (slowest/smallest) to 8 (fastest/largest)
- `--lossless` (default: false): Use lossless compression
- `--chromaSubsampling` (default: `4:4:4`): Set to `'4:2:0'` to use chroma subsampling
- `--overwrite` (default: false): Allow existing files to be overwritten
- `--verbose` (default: false): Write progress to stdout