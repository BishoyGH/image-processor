import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';

// Define the input and output folder paths
const inputFolder = path.join(process.cwd(), 'input');
const outputFolder = path.join(process.cwd(), 'output');

// Ensure the input and output folders exist
await fs.ensureDir(inputFolder);
await fs.ensureDir(outputFolder);

// Get command-line arguments
const args = process.argv.slice(2);
const argMap = Object.fromEntries(
  args.map((arg) => {
    const [key, value] = arg.split('=');
    return [key.toLowerCase(), value];
  })
);

// Parse command-line arguments with default values
const q = argMap.q ? parseInt(argMap.q) : 100;
const scale = argMap.scale ? parseFloat(argMap.scale) : null;
const ext = argMap.ext || 'webp';
const width = argMap.width ? parseInt(argMap.width) : null;
const height = argMap.height ? parseInt(argMap.height) : null;

// Function to convert images with customizable options
const convertAndRenameImage = async (q, scale, ext, width, height) => {
  try {
    // Read all files in the input folder
    const files = await fs.readdir(inputFolder);

    // Loop through each file in the input folder
    for (const file of files) {
      const inputFilePath = path.join(inputFolder, file);

      // Skip processing if not a file
      const fileStat = await fs.stat(inputFilePath);
      if (!fileStat.isFile()) continue;

      // Load the image with sharp to determine original dimensions if width, height, or scale is specified
      const image = sharp(inputFilePath);
      const metadata = await image.metadata();

      // Calculate target width and height based on scale, if provided
      let targetWidth = width || metadata.width;
      let targetHeight = height || metadata.height;
      if (scale) {
        targetWidth = Math.round(metadata.width * scale);
        targetHeight = Math.round(metadata.height * scale);
      }

      // Construct output filename with suffixes for width, height, q, scale, and ext if specified
      const suffixes = [];
      if (width && !scale) suffixes.push(`w${width}`);
      if (height && !scale) suffixes.push(`h${height}`);
      if (scale) suffixes.push(`s${scale * 100}`);
      if (argMap.q) suffixes.push(`q${q}`); // Only add q suffix if explicitly provided

      const newFileName = `${path.parse(file).name}_${suffixes.join(
        '_'
      )}.${ext}`;
      const outputFilePath = path.join(outputFolder, newFileName);

      try {
        // Set up image processing options based on the specified ext
        let outputOptions = {};
        switch (ext) {
          case 'jpg':
          case 'jpeg':
            outputOptions = { quality: q };
            await image
              .resize({
                width: targetWidth,
                height: targetHeight,
                fit: 'inside',
              })
              .jpeg(outputOptions)
              .toFile(outputFilePath);
            break;
          case 'png':
            outputOptions = { quality: q };
            await image
              .resize({
                width: targetWidth,
                height: targetHeight,
                fit: 'inside',
              })
              .png(outputOptions)
              .toFile(outputFilePath);
            break;
          case 'tiff':
            outputOptions = { quality: q };
            await image
              .resize({
                width: targetWidth,
                height: targetHeight,
                fit: 'inside',
              })
              .tiff(outputOptions)
              .toFile(outputFilePath);
            break;
          case 'webp':
          default:
            outputOptions = { quality: q };
            await image
              .resize({
                width: targetWidth,
                height: targetHeight,
                fit: 'inside',
              })
              .webp(outputOptions)
              .toFile(outputFilePath);
            break;
        }

        console.log(
          `Converted ${file} to ${ext.toUpperCase()} with width ${targetWidth}, height ${targetHeight}, quality ${q}.`
        );
        console.log(`Renamed output file to ${newFileName}.`);
      } catch (err) {
        console.error(
          `Failed to convert and rename ${file}:`,
          err.message
        );
      }
    }

    console.log('Conversion and renaming complete!');
  } catch (err) {
    console.error('Error processing files:', err.message);
  }
};

// Run the conversion and renaming with parsed command-line arguments
convertAndRenameImage(q, scale, ext, width, height);
