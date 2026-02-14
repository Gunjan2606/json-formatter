export const WatermarkToolInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Watermark Tool - Protect Your Images Online
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Add text or logo watermarks to your images instantly with our free online tool. Perfect for
          photographers, content creators, and businesses who want to protect their work and maintain
          brand identity. Batch process multiple images with custom positioning, opacity, and rotation.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">📝 Text Watermarks</h4>
            <p className="text-sm text-muted-foreground">
              Add copyright text, your name, or any custom text. Choose from 6 fonts with adjustable size and color.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">🖼️ Logo Watermarks</h4>
            <p className="text-sm text-muted-foreground">
              Upload your logo or brand mark. Adjustable size while maintaining aspect ratio.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">📍 Custom Positioning</h4>
            <p className="text-sm text-muted-foreground">
              5 position presets: Top Left, Top Right, Center, Bottom Left, Bottom Right with offset controls.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">🎨 Style Controls</h4>
            <p className="text-sm text-muted-foreground">
              Adjust opacity (0-100%), rotation (-45° to +45°), and fine-tune positioning.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">⚡ Batch Processing</h4>
            <p className="text-sm text-muted-foreground">
              Upload multiple images and apply the same watermark to all. Download as ZIP file.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">🔒 Privacy First</h4>
            <p className="text-sm text-muted-foreground">
              All processing happens in your browser. Your images never leave your device.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">How to Use</h3>
        <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
          <li><strong>Upload images</strong> - Single or multiple images (PNG, JPG, WebP)</li>
          <li><strong>Choose watermark type</strong> - Text or Logo</li>
          <li><strong>Customize text</strong> - Enter your text, select font, size, and color</li>
          <li><strong>Or upload logo</strong> - Upload your logo image and adjust size</li>
          <li><strong>Position watermark</strong> - Select position and adjust offset</li>
          <li><strong>Fine-tune</strong> - Adjust opacity and rotation to your liking</li>
          <li><strong>Download</strong> - Download individual images or all as ZIP</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Perfect For</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Photographers:</strong> Protect portfolio images and client photos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Content Creators:</strong> Brand your social media images and thumbnails</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Businesses:</strong> Add company logos to product photos and marketing materials</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Artists:</strong> Protect artwork and digital illustrations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Bloggers:</strong> Add attribution to blog post images</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Watermark Best Practices</h3>
        <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-3 text-sm text-muted-foreground">
          <p>• <strong>Position:</strong> Bottom right or bottom left are most common and least intrusive</p>
          <p>• <strong>Opacity:</strong> 50-70% allows the watermark to be visible without overwhelming the image</p>
          <p>• <strong>Size:</strong> Large enough to be visible but small enough not to distract from the main subject</p>
          <p>• <strong>Color:</strong> White or black usually works best - choose based on image background</p>
          <p>• <strong>Consistency:</strong> Use the same watermark style across all your images for brand recognition</p>
        </div>
      </section>
    </div>
  );
};
