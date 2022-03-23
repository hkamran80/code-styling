#!/usr/bin/env node

import { promisify } from "util";
import globC from "glob";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { stat } from "fs/promises";
import { basename, extname, join, dirname } from "path";
import sharp from "sharp";

const glob = promisify(globC);

const { argv } = yargs(hideBin(process.argv))
    .usage("Convert images to AVIF/WebP")
    .option("input", {
        type: "string",
        default: "*.{jpg,jpeg,tif,tiff,png,gif,svg}",
        description: "Input file name(s), supports globs/wildcards",
    })
    .option("output", {
        type: "string",
        default: "",
        description: "Output directory, default is same directory as input",
    })
    .option("quality", {
        type: "number",
        default: 50,
        description:
            "Quality vs file size, 1 (lowest/smallest) to 100 (highest/largest)",
    })
    .option("speed", {
        type: "number",
        default: 5,
        description:
            "CPU effort vs file size, 0 (slowest/smallest) to 8 (fastest/largest)",
    })
    .option("lossless", {
        type: "boolean",
        default: false,
        description: "Use lossless compression",
    })
    .option("chromaSubsampling", {
        type: "string",
        default: "4:4:4",
        description: "Set to '4:2:0' to use chroma subsampling",
    })
    .option("overwrite", {
        type: "boolean",
        default: false,
        description: "Allow existing output files to be overwritten",
    })
    .option("verbose", {
        type: "boolean",
        default: false,
        description: "Write progress to stdout",
    })
    .help("h")
    .alias("h", "help")
    .recommendCommands()
    .version();

const files = await glob(argv.input);
if (argv.verbose) {
    process.stdout.write(`Found ${files.length} file(s) matching ${input}\n`);
}

const convert = async ({
    input,
    output,
    lossless,
    quality,
    speed,
    chromaSubsampling,
    overwrite,
    verbose,
    format,
}) => {
    const outputFilename = basename(input).replace(
        extname(input),
        `.${format}`,
    );

    const outputPath = join(output ? output : dirname(input), outputFilename);

    try {
        const exists = (await stat(outputPath)).isFile();

        if (exists && !overwrite) {
            if (verbose) {
                process.stdout.write(
                    `${input}: ${outputPath} already exists\n`,
                );
            }

            return;
        }
    } catch (err) {}

    try {
        if (format === "avif") {
            await sharp(input)
                .avif({ quality, speed, lossless, chromaSubsampling })
                .toFile(outputPath);
        } else if (format === "webp") {
            await sharp(input)
                .webp({ quality, speed, lossless, chromaSubsampling })
                .toFile(outputPath);
        }

        if (verbose) {
            process.stdout.write(`${input}: created ${outputPath}\n`);
        }

        return true;
    } catch (err) {
        process.stderr.write(`${input}: ${err.message}\n`);

        return false;
    }
};

const results = Promise.all(
    files.map((file) =>
        convert({
            input: file,
            output: argv.output,
            lossless: argv.lossless,
            quality: argv.quality,
            speed: argv.speed,
            chromaSubsampling: argv.chromaSubsampling,
            overwrite: argv.overwrite,
            verbose: argv.verbose,
            format: "avif",
        }),
    ),
    files.map((file) =>
        convert({
            input: file,
            output: argv.output,
            lossless: argv.lossless,
            quality: argv.quality,
            speed: argv.speed,
            chromaSubsampling: argv.chromaSubsampling,
            overwrite: argv.overwrite,
            verbose: argv.verbose,
            format: "webp",
        }),
    ),
);
