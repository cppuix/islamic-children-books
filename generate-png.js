import sharp from 'sharp';

// Converts the SVG into a high-res 1024x1124 transparent PNG file
sharp('static/images/logo/logo.svg')
.resize(1024)
.png()
.toFile('wax-seal.png')
.then(() => console.log('Successfully generated wax-seal.png!'))
.catch((err) => console.error(err));
