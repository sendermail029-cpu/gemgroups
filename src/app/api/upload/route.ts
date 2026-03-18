import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])

function sanitizeFolder(input: FormDataEntryValue | null) {
  if (typeof input !== 'string' || !input.trim()) {
    return 'uploads'
  }

  const segments = input
    .split('/')
    .map((segment) => segment.trim().replace(/[^a-z0-9-_]/gi, '').toLowerCase())
    .filter(Boolean)

  return segments.length ? segments.join('/') : 'uploads'
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const fileEntry = formData.get('file')
    const folder = sanitizeFolder(formData.get('folder'))

    if (!(fileEntry instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.has(fileEntry.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a JPG, PNG, WebP, or AVIF image.' },
        { status: 400 }
      )
    }

    if (fileEntry.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File is too large. Maximum upload size is 10MB.' },
        { status: 400 }
      )
    }

    const bytes = await fileEntry.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create output directory
    const uploadDir = join(process.cwd(), 'public', folder)
    await mkdir(uploadDir, { recursive: true })

    const baseName = fileEntry.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase() || 'image'
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
      folder,
      message: `Image converted to WebP and optimized in ${sizes.length} sizes`,
    })
  } catch (error) {
    console.error('Upload error:', error)
    const detail = error instanceof Error ? error.message : 'Unknown server error.'
    return NextResponse.json({ error: `Failed to process image. ${detail}` }, { status: 500 })
  }
}
