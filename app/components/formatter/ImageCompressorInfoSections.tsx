export const ImageCompressorInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Online Image Compressor - No Limits, 100% Private
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Compress PNG, JPG, WebP, GIF, AVIF, and SVG images with our free, unlimited online tool.
          Unlike TinyPNG and other competitors, we have no file size limits, no image count restrictions,
          and process everything locally in your browser for complete privacy. Reduce image file sizes
          by up to 80% while maintaining visual quality with adjustable compression settings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Unlimited Compression</h3>
            <p className="text-sm text-muted-foreground">
              No 20-image limit, no 5MB file size cap, no monthly restrictions. Compress as many images
              as you need, whenever you need.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">100% Client-Side</h3>
            <p className="text-sm text-muted-foreground">
              All compression happens in your browser using JavaScript. Your images never leave your
              device—complete privacy guaranteed.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Quality Control</h3>
            <p className="text-sm text-muted-foreground">
              Adjust compression quality from 1-100%. Choose lossy or lossless compression. Resize images
              to specific dimensions.
            </p>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Why Choose Our Image Compressor?</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">No Artificial Limits</h3>
            <p className="text-muted-foreground mb-4">
              Tired of TinyPNG&apos;s 20-image limit and 5MB file size restriction? We don&apos;t have any.
              Compress hundreds of images in batch, upload 50MB RAW files, process as many images as you
              need—all for free, forever.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Unlimited images per session (not 20 like TinyPNG)</li>
              <li>No file size limit (not 5MB like competitors)</li>
              <li>No monthly quotas or premium upsells</li>
              <li>Batch download as ZIP for easy management</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">6 Image Formats Supported</h3>
            <p className="text-muted-foreground mb-4">
              Unlike TinyPNG which only supports PNG, JPG, and WebP, we support all major image formats
              including modern formats like AVIF and vector formats like SVG.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>PNG</strong> - Lossless transparency support, perfect for logos and graphics</li>
              <li><strong>JPEG/JPG</strong> - Lossy compression for photos with adjustable quality</li>
              <li><strong>WebP</strong> - Modern format with superior compression (40% smaller than JPEG)</li>
              <li><strong>GIF</strong> - Animated GIF support with frame preservation</li>
              <li><strong>AVIF</strong> - Next-gen format with 50% better compression than JPEG</li>
              <li><strong>SVG</strong> - Vector graphics optimization and minification</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Adjustable Quality Settings</h3>
            <p className="text-muted-foreground mb-4">
              Unlike TinyPNG which gives you no control, we let you fine-tune compression to your exact
              needs. Choose between maximum compression or maximum quality based on your use case.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Quality slider from 1-100% for precise control</li>
              <li>Resize images to specific dimensions (1920px, 1280px, 800px, custom)</li>
              <li>Choose output format: Keep original or convert to JPEG/PNG/WebP</li>
              <li>Option to preserve or strip EXIF metadata</li>
              <li>Before/After preview to verify quality before downloading</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Complete Privacy & Security</h3>
            <p className="text-muted-foreground mb-4">
              All image compression happens locally in your browser using JavaScript. We never upload
              your images to our servers, meaning your photos, designs, and sensitive documents remain
              100% private on your device.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Client-side processing only—images never leave your browser</li>
              <li>No server uploads, no cloud storage, no logging</li>
              <li>Works offline after initial page load</li>
              <li>Perfect for confidential documents, client work, and personal photos</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Compress Images Online</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Upload Your Images</h3>
            <p className="text-muted-foreground">
              Click <strong>Upload Images</strong> or drag and drop multiple images into the upload area.
              Supports PNG, JPG, WebP, GIF, AVIF, and SVG. No file size limits, no image count restrictions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Adjust Settings (Optional)</h3>
            <p className="text-muted-foreground">
              Click <strong>Settings</strong> to customize compression:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li><strong>Quality:</strong> Set compression level (1-100%). Lower = smaller file, higher = better quality.</li>
              <li><strong>Max Dimension:</strong> Resize images to specific width/height (1920px, 1280px, 800px, etc.).</li>
              <li><strong>Output Format:</strong> Keep original format or convert to JPEG, PNG, or WebP.</li>
              <li><strong>EXIF Metadata:</strong> Choose to preserve camera data and geolocation, or strip it for privacy.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Compress & Download</h3>
            <p className="text-muted-foreground">
              Click <strong>Compress All</strong> to process all images. View compression stats (original
              size, compressed size, savings percentage). Preview before/after quality using the zoom icon.
              Download individually or click <strong>Download All</strong> to get a ZIP file with all
              compressed images.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Perfect For...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Web Developers</h3>
            <p className="text-sm text-muted-foreground">
              Optimize images for faster page load speeds. Reduce bandwidth costs. Pass Google PageSpeed
              Insights checks. Compress hero images, thumbnails, and assets without quality loss.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Photographers</h3>
            <p className="text-sm text-muted-foreground">
              Share high-quality photos via email or social media without size limits. Reduce storage
              requirements. Create web-optimized galleries while preserving EXIF metadata.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">E-commerce Businesses</h3>
            <p className="text-sm text-muted-foreground">
              Compress product photos for faster checkout pages. Reduce hosting costs. Improve mobile
              shopping experience. Batch-process entire catalogs.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Designers & Marketers</h3>
            <p className="text-sm text-muted-foreground">
              Optimize graphics for email campaigns. Compress social media images. Reduce presentation
              file sizes. Create web-ready assets from design files.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How does online image compression work?
            </h3>
            <p className="text-muted-foreground">
              Our tool uses browser-native JavaScript compression algorithms to reduce image file sizes
              without uploading to servers. We use the Canvas API and browser-image-compression library
              to apply lossy or lossless compression based on your quality settings. For lossy compression,
              we remove redundant pixel data while preserving visual quality. For lossless compression,
              we optimize file structure and encoding without any quality loss.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Is my image data safe and private?
            </h3>
            <p className="text-muted-foreground">
              Yes, 100%. All compression happens locally in your browser using JavaScript—your images
              never get uploaded to our servers or any cloud service. We don&apos;t store, view, or have any
              access to your images. This is fundamentally different from TinyPNG and similar tools that
              upload images to their servers for processing. You can even use our tool offline after the
              initial page load.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What&apos;s the difference between lossy and lossless compression?
            </h3>
            <p className="text-muted-foreground">
              <strong>Lossy compression</strong> (quality 1-99%) removes some pixel data to achieve smaller
              file sizes. This results in minor quality loss that&apos;s usually imperceptible at 80% quality
              or higher. Best for photos and images where slight quality reduction is acceptable.
              <strong> Lossless compression</strong> (quality 100%) optimizes file structure without
              removing any pixel data, resulting in perfect quality but less size reduction. Best for
              logos, graphics, and images where quality cannot be compromised.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Why is WebP recommended for web images?
            </h3>
            <p className="text-muted-foreground">
              WebP is a modern image format developed by Google that provides superior compression compared
              to JPEG and PNG. WebP images are typically 25-35% smaller than equivalent quality JPEGs, and
              26% smaller than PNGs. WebP supports transparency (like PNG) and animation (like GIF) while
              maintaining smaller file sizes. Modern browsers (Chrome, Firefox, Safari, Edge) all support
              WebP, making it ideal for web use to improve page load speeds.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What quality setting should I use?
            </h3>
            <p className="text-muted-foreground">
              For most use cases, <strong>80% quality</strong> provides the best balance between file size
              and visual quality—images are 40-60% smaller with imperceptible quality loss. For photos
              going on websites, 75-85% is recommended. For hero images or portfolio work, use 90-95%.
              For thumbnails or social media, 60-75% is sufficient. For logos and graphics with text,
              use 90-100% or lossless compression to maintain sharp edges.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How much can I reduce my image file sizes?
            </h3>
            <p className="text-muted-foreground">
              Compression results depend on image type and settings. Typical savings: <strong>Photos (JPEG)</strong>
              —40-60% reduction at 80% quality, up to 80% when converting to WebP. <strong>Graphics (PNG)</strong>
              —30-50% reduction with lossless compression, 60-70% with lossy. <strong>Screenshots</strong>—
              50-70% reduction by converting to WebP or using lower quality. Large high-resolution images
              see the most dramatic savings. Our tool shows exact savings for each image before downloading.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Image Compression Tips</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Start with high quality originals:</strong> Compress
                from the highest quality source file available. Compressing an already-compressed image
                will degrade quality faster.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use the right format:</strong> JPEG for photos,
                PNG for graphics with transparency, WebP for best compression, SVG for logos and icons.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Resize before compressing:</strong> If you need
                800px images, resize from 4000px first—this saves more space than compression alone.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Test quality settings:</strong> Use our preview
                feature to compare before/after quality. Find the lowest quality setting that looks
                acceptable to you.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Strip EXIF for privacy:</strong> Metadata can include
                GPS location, camera serial numbers, and edit history. Strip it unless you specifically
                need it.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Batch process for efficiency:</strong> Upload all
                images at once, adjust settings once, compress all, download as ZIP. Much faster than
                one-by-one.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
