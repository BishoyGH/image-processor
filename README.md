# Image Conversion and Resizing Script

This Node.js script uses the `sharp` package to batch convert images in a specified input folder to a specified format, resize them based on width, height, or scale, and save them to an output folder. The script also supports custom quality settings and optional fit modes for resizing behavior.

If no input or output folders are found, the script will automatically create them, making setup simple and convenient.

## Features

- **Image Conversion**: Convert images to various formats (default is `webp`).
- **Resizing Options**: Resize by width, height, scale, or percentage, preserving aspect ratio.
- **Quality Control**: Adjust image quality with a `quality` parameter.
- **Fit Modes**: Use `fit` options (`inside`, `outside`, `cover`, etc.) for flexible resizing behavior.
- **Auto Folder Creation**: Creates input and output folders if they don’t exist.
- **Customizable Filenames**: Output filenames include suffixes for the width, height, scale, and quality used, if provided.

## Installation

To use this script, you’ll need Node.js installed on your machine. You’ll also need to install the required dependencies using npm.

1. Install Node.js if it’s not already installed.
2. Clone or download this script.
3. Navigate to the script directory in your terminal and run:

   ```bash
   npm install fs-extra sharp
   ```

## Usage

Place the images you want to convert inside the `input` folder. After configuring the parameters, the converted images will appear in the `output` folder.

Run the script using:

```bash
node index.js [parameter=value]
```

### Parameters

| Parameter | Short Form | Description                                                                              | Default  |
| --------- | ---------- | ---------------------------------------------------------------------------------------- | -------- |
| quality   | `q`        | Sets the quality of the output image (only applies to lossy formats like JPEG and WebP). | 100      |
| scale     | `s`        | Resizes image based on a scale factor (e.g., `0.5` for half size).                       | None     |
| extension | `ext`      | Sets the output image format (`webp`, `jpg`, `png`, `tiff`).                             | `webp`   |
| width     | `w`        | Sets the width of the output image.                                                      | Original |
| height    | `h`        | Sets the height of the output image.                                                     | Original |
| fit       | `fit`      | Sets the resizing behavior: `inside`, `outside`, `cover`, `contain`, `fill`.             | `inside` |

> **Note**: Only add width, height, scale, or quality suffixes to the filename if you specify these values.

### Example Use Cases

1. **Basic Conversion to WebP with Quality Control**

   Convert images to WebP format with a quality of 80:

   ```bash
   node index.js q=80
   ```

2. **Resize to Specific Width and Height**

   Resize all images to a width of 500px and height of 300px:

   ```bash
   node index.js w=500 h=300
   ```

3. **Resize Based on Scale Factor and Change Format**

   Resize all images to 50% of their original size and convert them to JPEG:

   ```bash
   node index.js s=0.5 ext=jpg
   ```

4. **Use Fit Mode to Control Resizing**

   Resize images to a width of 600px and height of 400px, using the `cover` fit mode to crop to fit:

   ```bash
   node index.js w=600 h=400 fit=cover
   ```

5. **Combined Options**

   Convert images to WebP format, set quality to 75, resize to a width of 800px, and scale down by 50%:

   ```bash
   node index.js q=75 w=800 s=0.5
   ```

The output folder will contain resized and converted images, with filenames reflecting the applied parameters. This makes the script especially useful for batch processing images for web use, improving both loading speeds and visual quality.

## License

This project is licensed under the MIT License.

---

This `README.md` file provides an overview, installation instructions, parameter descriptions, and examples to help users understand and apply the script effectively.
