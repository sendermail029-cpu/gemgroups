const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const sourceDir = path.join(process.cwd(), 'public', 'images')
const supportedExtensions = new Set(['.png', '.jpg', '.jpeg'])

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(fullPath)
      return fullPath
    })
  )

  return files.flat()
}

async function shouldConvert(sourcePath, webpPath) {
  try {
    const [sourceStat, webpStat] = await Promise.all([
      fs.promises.stat(sourcePath),
      fs.promises.stat(webpPath),
    ])

    return sourceStat.mtimeMs > webpStat.mtimeMs
  } catch {
    return true
  }
}

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (!supportedExtensions.has(ext)) return null

  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
  if (!(await shouldConvert(filePath, webpPath))) return null

  await sharp(filePath).webp({ quality: 82 }).toFile(webpPath)
  return path.relative(process.cwd(), webpPath)
}

async function main() {
  if (!fs.existsSync(sourceDir)) {
    console.log('No public/images directory found. Skipping WebP generation.')
    return
  }

  const files = await walk(sourceDir)
  const converted = []

  for (const file of files) {
    const output = await convertImage(file)
    if (output) converted.push(output)
  }

  if (converted.length === 0) {
    console.log('WebP images are already up to date.')
    return
  }

  console.log(`Generated ${converted.length} WebP image(s):`)
  converted.forEach((file) => console.log(`- ${file}`))
}

main().catch((error) => {
  console.error('Failed to generate WebP images.')
  console.error(error)
  process.exit(1)
})
