import { Color, ImageSource } from '@nativescript/core'

const cache = new Map<string, Color | null>()

function readAverageColor(image: any /*UIImage*/): Color | null {
  // Guard for non-iOS environments and missing image.
  if (!image || typeof UIGraphicsBeginImageContextWithOptions !== 'function') {
    return null
  }
  try {
    // Downsample the image to a single pixel — CoreGraphics' bilinear
    // interpolation gives a reasonable approximation of the average color
    // without the cost of CIAreaAverage's pipeline.
    UIGraphicsBeginImageContextWithOptions(CGSizeMake(1, 1), false, 1)
    image.drawInRect(CGRectMake(0, 0, 1, 1))
    const small = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    if (!small) return null

    const cgImage = small.CGImage
    const provider = CGImageGetDataProvider(cgImage)
    const data = CGDataProviderCopyData(provider)
    if (!data) return null

    // CFData is toll-free bridged to NSData. Walk its bytes as uint8 to read
    // the single RGBA pixel we drew above.
    const ref = new interop.Reference<number>(
      interop.types.uint8,
      (data as any).bytes,
    ) as any
    return new Color(255, ref[0], ref[1], ref[2])
  } catch {
    return null
  }
}

export function sampleAverageColor(artworkPath: string): Color | null {
  if (cache.has(artworkPath)) return cache.get(artworkPath) ?? null
  let color: Color | null = null
  const src = ImageSource.fromFileSync(artworkPath)
  if (src?.ios) color = readAverageColor(src.ios)
  cache.set(artworkPath, color)
  return color
}

export function isLightColor(color: Color): boolean {
  // ITU-R BT.601 luma weights — perceptually decent and cheap. >0.6 reads as
  // "light enough that dark text wins."
  const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255
  return luminance > 0.6
}
