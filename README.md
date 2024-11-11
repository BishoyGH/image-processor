# Image Conversion and Resizing Script

This Node.js script uses the `sharp` package to batch convert and resize images for various use cases, including social media, web optimization, and Open Graph meta tags. It allows customization for quality, resizing dimensions, scale, and format.

## Features

- **Social Media Image Sizing**: Quickly resize and optimize images for social media platforms.
- **Web Optimization**: Compress images for faster loading times on websites.
- **Open Graph Meta Tag Optimization**: Prepare images to meet Open Graph size recommendations for rich link previews.
- **Flexible Output Control**: Supports quality adjustments, format conversions, width/height specifications, scale, and resizing fit modes.
- **Auto Folder Creation**: Automatically creates input and output folders if they don’t exist.
- **Customizable Filenames**: Output filenames include suffixes for the applied parameters (width, height, quality, scale).

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed, then install the required dependencies:

```bash
npm install fs-extra sharp
```

## Usage

Place images in the `input` folder. Run the script with desired parameters, and images will be saved in the `output` folder.

```bash
node index.js [parameter=value]
```

### Parameters

| Parameter | Short Form | Description                                                                | Default  |
| --------- | ---------- | -------------------------------------------------------------------------- | -------- |
| quality   | `q`        | Image quality (for lossy formats like JPEG, WebP).                         | 100      |
| scale     | `s`        | Scale factor for resizing (e.g., `0.5` for 50%).                           | None     |
| extension | `ext`      | Output image format (`webp`, `jpg`, `png`, `tiff`).                        | `webp`   |
| width     | `w`        | Width of the output image in pixels.                                       | Original |
| height    | `h`        | Height of the output image in pixels.                                      | Original |
| fit       | `fit`      | Fit mode for resizing: `inside`, `outside`, `cover`, `contain`, or `fill`. | `inside` |

> **Note**: Only specify width, height, quality, or scale suffixes in the filename if these parameters are set.

## Common Use Cases

### 1. Social Media Image Resizing

| Platform      | Recommended Size     | Command Example                         |
| ------------- | -------------------- | --------------------------------------- |
| **Instagram** | 1080x1080 (Square)   | `node index.js w=1080 h=1080 fit=cover` |
| **Facebook**  | 1200x630 (Landscape) | `node index.js w=1200 h=630 fit=cover`  |
| **Twitter**   | 1200x675 (Landscape) | `node index.js w=1200 h=675 fit=cover`  |
| **LinkedIn**  | 1104x736 (Landscape) | `node index.js w=1104 h=736 fit=cover`  |
| **Pinterest** | 1000x1500 (Portrait) | `node index.js w=1000 h=1500 fit=cover` |

Each command resizes images to the specified platform’s preferred dimensions, cropping as necessary with the `cover` fit mode to ensure the image fills the entire space.

### 2. Web Optimization for Faster Loading

For faster website performance, use WebP format with lower quality (e.g., `75`) and resize large images to a maximum width:

- **High Quality for Product Images**: Resize and compress for clear product displays at `q=85`:

  ```bash
  node index.js w=800 q=85 ext=webp
  ```

- **Lower Quality for Backgrounds**: For background images, keep the file size minimal with `q=60`:

  ```bash
  node index.js w=1920 q=60 ext=webp
  ```

- **Thumbnail Images**: Generate thumbnails for faster gallery loading:

  ```bash
  node index.js w=300 h=300 q=80 ext=webp
  ```

These commands optimize images for various web display needs, helping to keep website loading times low without sacrificing too much visual quality.

### 3. Open Graph Meta Tag Optimization

Open Graph (OG) images are used in link previews on platforms like Facebook and LinkedIn. The ideal size for OG images is `1200x630`, with a landscape orientation:

```bash
node index.js w=1200 h=630 q=80 fit=cover
```

This command resizes images to meet Open Graph recommendations, ensuring images are clear and correctly cropped in link previews. Adjust `quality` as needed for file size control.

## Additional Examples

1. **Convert Images to JPEG and Resize to Half Original Dimensions**

   Resize all images to 50% of their original size, saving them in JPEG format:

   ```bash
   node index.js s=0.5 ext=jpg
   ```

2. **Set Custom Quality for PNG Format**

   Convert images to PNG with a quality setting of `80`:

   ```bash
   node index.js q=80 ext=png
   ```

3. **Resize and Apply Custom Fit Mode**

   Resize images to 500x500 pixels, using `contain` to ensure the image fits within these dimensions, adding padding if necessary:

   ```bash
   node index.js w=500 h=500 fit=contain
   ```

4. **Resize by Width Only**

   Set a maximum width of `600px` while preserving the original aspect ratio:

   ```bash
   node index.js w=600
   ```

Each example demonstrates how to resize and format images to meet common digital requirements, particularly useful for web developers, social media managers, and content creators.

## License

This project is licensed under the MIT License.
