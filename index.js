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
const q = argMap.q ? parseInt(argMap.q) : 100; // quality
const s = argMap.s ? parseFloat(argMap.s) : null; // scale
const ext = argMap.ext || 'webp'; // extension
const w = argMap.w ? parseInt(argMap.w) : null; // width
const h = argMap.h ? parseInt(argMap.h) : null; // height
const fit = argMap.fit || 'inside'; // fit mode (unchanged)

// Function to convert images with customizable options
const convertAndRenameImage = async (q, s, ext, w, h, fit) => {
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
      let targetWidth = w || metadata.width;
      let targetHeight = h || metadata.height;
      if (s) {
        targetWidth = Math.round(metadata.width * s);
        targetHeight = Math.round(metadata.height * s);
      }

      // Construct output filename with suffixes for width, height, quality, scale, and extension if specified
      const suffixes = [];
      if (w && !s) suffixes.push(`w${w}`);
      if (h && !s) suffixes.push(`h${h}`);
      if (s) suffixes.push(`s${s * 100}`);
      if (argMap.q) suffixes.push(`q${q}`); // Only add quality suffix if explicitly provided

      const newFileName = `${path.parse(file).name}_${suffixes.join(
        '_'
      )}.${ext}`;
      const outputFilePath = path.join(outputFolder, newFileName);

      try {
        // Set up image processing options based on the specified extension
        let outputOptions = {};
        switch (ext) {
          case 'jpg':
          case 'jpeg':
            outputOptions = { quality: q };
            await image
              .resize({
                width: targetWidth,
                height: targetHeight,
                fit: fit,
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
                fit: fit,
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
                fit: fit,
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
                fit: fit,
              })
              .webp(outputOptions)
              .toFile(outputFilePath);
            break;
        }

        console.log(
          `Converted ${file} to ${ext.toUpperCase()} with width ${targetWidth}, height ${targetHeight}, quality ${q}, and fit ${fit}.`
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
convertAndRenameImage(q, s, ext, w, h, fit);
