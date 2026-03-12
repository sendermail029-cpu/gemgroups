import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'uploads'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create output directory
    const uploadDir = join(process.cwd(), 'public', folder)
    await mkdir(uploadDir, { recursive: true })

    const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const timestamp = Date.now()

    // Convert to WebP with Sharp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 85 })
      .toBuffer()

    // Generate responsive sizes
    const sizes = [
      { width: 400, suffix: '-sm' },
      { width: 800, suffix: '-md' },
      { width: 1200, suffix: '-lg' },
      { width: 1920, suffix: '-xl' },
    ]

    const outputs = await Promise.all(
      sizes.map(async ({ width, suffix }) => {
        const fileName = `${baseName}-${timestamp}${suffix}.webp`
        const filePath = join(uploadDir, fileName)
        const resized = await sharp(buffer)
          .resize(width, undefined, { withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer()
        await writeFile(filePath, resized)
        return { size: width, path: `/${folder}/${fileName}` }
      })
    )

    // Save original as WebP
    const originalName = `${baseName}-${timestamp}.webp`
    const originalPath = join(uploadDir, originalName)
    await writeFile(originalPath, webpBuffer)

    return NextResponse.json({
      success: true,
      original: `/${folder}/${originalName}`,
      responsive: outputs,
      message: `Image converted to WebP and optimized in ${sizes.length} sizes`,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}
