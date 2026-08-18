import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const logoPath = 'static/images/logo/logo.png';
const staticDir = 'static';
const ogPath = 'static/images/og-image.png';

async function generateAllAssets() {
    console.log('Generating website assets...');

    // 1. Generate Favicons & PWA Icons
    const sizes = [
        { name: 'favicon-16x16.png', size: 16 },
        { name: 'favicon-32x32.png', size: 32 },
        { name: 'apple-touch-icon.png', size: 180 },
        { name: 'icon-192.png', size: 192 },
        { name: 'icon-512.png', size: 512 }
    ];

    for (const { name, size } of sizes) {
        await sharp(logoPath)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFile(path.join(staticDir, name));
        console.log(`✓ Created ${name}`);
    }

    // 2. Generate Favicon SVG Copy (or use logo directly)
    await fs.copyFile(logoPath, path.join(staticDir, 'favicon.png'));

    // 3. Generate Open Graph Image (1200x630 on Parchment #f4ede0)
    const bg = await sharp({
        create: {
            width: 1200,
            height: 630,
            channels: 4,
            background: { r: 244, g: 237, b: 224, alpha: 1 }
        }
    }).png().toBuffer();

    const resizedLogo = await sharp(logoPath)
    .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

    await sharp(bg)
    .composite([{ input: resizedLogo, gravity: 'center' }])
    .toFile(ogPath);

    console.log('✓ Created static/images/og-image.png');
    console.log('\nAll metadata assets generated successfully!');
}

generateAllAssets().catch(console.error);
