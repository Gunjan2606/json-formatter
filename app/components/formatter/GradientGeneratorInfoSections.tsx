export const GradientGeneratorInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free CSS Gradient Generator - Create Beautiful Gradients Online
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Generate stunning CSS gradients with our free online gradient generator. Create linear, radial,
          and conic gradients with unlimited color stops. Get instant CSS code, preview in real-time, and
          download as PNG or SVG. Perfect for web designers and developers who need beautiful gradients for
          websites, backgrounds, and UI designs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">3 Gradient Types</h3>
            <p className="text-sm text-muted-foreground">
              Linear, radial, and conic gradients with full control over angle, shape, and position.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Unlimited Colors</h3>
            <p className="text-sm text-muted-foreground">
              Add unlimited color stops, adjust positions, randomize colors, or reverse gradient direction.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Export Options</h3>
            <p className="text-sm text-muted-foreground">
              Copy CSS code, download as 1200x630 PNG for social media, or export as scalable SVG.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Why Use Our CSS Gradient Generator?</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Visual Gradient Editor</h3>
            <p className="text-muted-foreground mb-4">
              Create gradients visually without writing code. See live preview as you adjust colors, positions,
              angles, and shapes. No need to remember complex CSS syntax—just pick colors and copy the code.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Real-time preview updates as you edit</li>
              <li>Color picker for easy color selection</li>
              <li>Drag or input exact position percentages (0-100%)</li>
              <li>Add unlimited color stops for complex gradients</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">3 Gradient Types</h3>
            <p className="text-muted-foreground mb-4">
              Generate linear, radial, or conic gradients. Each type has unique controls for maximum
              flexibility and creative possibilities.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Linear Gradient</strong> - Straight-line color transition with 0-360° angle control</li>
              <li><strong>Radial Gradient</strong> - Circular or elliptical gradient from center outward</li>
              <li><strong>Conic Gradient</strong> - Radial sweep gradient rotating around a center point</li>
              <li>Position control (center, top, bottom, corners) for radial and conic</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">8 Beautiful Presets</h3>
            <p className="text-muted-foreground mb-4">
              Start with curated gradient presets designed by professionals. Load a preset and customize it,
              or use as inspiration for your own gradients.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Purple Bliss, Sunset, Ocean, Forest themes</li>
              <li>Fire, Cotton Candy, Royal, Rainbow gradients</li>
              <li>Click any preset to instantly load it</li>
              <li>Customize preset colors and positions after loading</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Export & Download</h3>
            <p className="text-muted-foreground mb-4">
              Get your gradient in multiple formats. Copy CSS code for web development, download PNG for
              social media backgrounds, or export SVG for scalable graphics.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>CSS Code</strong> - One-click copy with background property</li>
              <li><strong>PNG Export</strong> - 1200x630px perfect for Open Graph images</li>
              <li><strong>SVG Export</strong> - Scalable vector format for any size</li>
              <li>All exports work 100% client-side—no server upload</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Advanced Controls</h3>
            <p className="text-muted-foreground mb-4">
              Fine-tune every aspect of your gradient with advanced tools. Randomize for inspiration, reverse
              direction, or adjust individual color stops precisely.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Randomize colors button for instant inspiration</li>
              <li>Reverse gradient direction with one click</li>
              <li>Remove color stops (minimum 2 required)</li>
              <li>Reset to default gradient anytime</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Use the CSS Gradient Generator</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Choose Gradient Type</h3>
            <p className="text-muted-foreground">
              Select <strong>Linear</strong> for standard top-to-bottom or angled gradients (most common),
              <strong>Radial</strong> for circular center-outward gradients (great for spotlights), or
              <strong>Conic</strong> for pie-chart-style rotating gradients.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Add and Edit Color Stops</h3>
            <p className="text-muted-foreground">
              Click the color picker to choose colors, or enter hex codes directly. Adjust the position
              percentage (0-100%) to control where each color appears. Click <strong>+ Add</strong> to add
              more color stops for complex multi-color gradients. Click the trash icon to remove a stop.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Adjust Settings</h3>
            <p className="text-muted-foreground">
              For <strong>Linear</strong> gradients, use the angle slider (0-360°) to rotate the gradient
              direction. For <strong>Radial</strong> gradients, choose Circle or Ellipse shape and set
              position (center, top, corners). For <strong>Conic</strong>, adjust rotation angle and center
              position.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Use Presets (Optional)</h3>
            <p className="text-muted-foreground">
              Browse the 8 preset gradients at the bottom. Click any preset to load it instantly. Presets
              include Purple Bliss, Sunset, Ocean, Forest, Fire, Cotton Candy, Royal, and Rainbow. After
              loading a preset, customize colors and settings to make it your own.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5. Copy CSS or Download</h3>
            <p className="text-muted-foreground">
              Click <strong>Copy CSS</strong> to copy the <code>background: linear-gradient(...)</code> code
              to your clipboard. Paste it directly into your CSS file or style tag. Or click <strong>PNG</strong>
              to download a 1200x630 image, or <strong>SVG</strong> to export a scalable vector graphic.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Perfect For...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Website Backgrounds</h3>
            <p className="text-sm text-muted-foreground">
              Create beautiful gradient backgrounds for hero sections, headers, and full-page layouts. Linear
              gradients work great for modern website designs and landing pages.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">UI Components</h3>
            <p className="text-sm text-muted-foreground">
              Design gradient buttons, cards, and overlays. Subtle gradients add depth to UI elements without
              distracting from content. Perfect for call-to-action buttons.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Social Media Graphics</h3>
            <p className="text-sm text-muted-foreground">
              Download 1200x630 PNG gradients for Open Graph images, Twitter cards, and Instagram posts.
              Create branded gradient backgrounds for quotes and announcements.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">CSS Learning</h3>
            <p className="text-sm text-muted-foreground">
              Understand how CSS gradients work by experimenting with the visual editor. See how angle,
              color stops, and positions affect the final result. Great for teaching and learning.
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
              What is the difference between linear, radial, and conic gradients?
            </h3>
            <p className="text-muted-foreground">
              <strong>Linear gradients</strong> transition colors in a straight line, controlled by angle
              (0-360°). Common examples: top-to-bottom (180°), left-to-right (90°), diagonal (45° or 135°).
              <strong>Radial gradients</strong> transition from a center point outward in a circle or ellipse,
              like a spotlight effect. <strong>Conic gradients</strong> rotate colors around a center point
              like a color wheel or pie chart. Linear is most common for backgrounds, radial for spotlight
              effects, and conic for creative designs.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How many color stops can I add to a gradient?
            </h3>
            <p className="text-muted-foreground">
              You can add unlimited color stops. However, most gradients use 2-4 colors for clean, readable
              designs. Our presets range from 2 colors (Purple Bliss, Ocean) to 7 colors (Rainbow). For web
              performance, stick to 2-5 color stops. CSS gradients require a minimum of 2 color stops, so
              you cannot delete a color stop if only 2 remain.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What is the best angle for linear gradients?
            </h3>
            <p className="text-muted-foreground">
              Common angles: <strong>180°</strong> (top to bottom, most popular), <strong>90°</strong> (left
              to right), <strong>0°</strong> (bottom to top), <strong>135°</strong> (diagonal top-left to
              bottom-right), <strong>45°</strong> (diagonal bottom-left to top-right). For hero sections,
              180° or 135° work best. For sidebar accents, try 90°. Experiment with the angle slider to find
              what looks best for your design.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Can I use these gradients in production websites?
            </h3>
            <p className="text-muted-foreground">
              Yes! CSS gradients are fully supported in all modern browsers (Chrome, Firefox, Safari, Edge)
              since 2012. No vendor prefixes needed for gradients anymore. The generated CSS code works in
              production without modification. Browser support: Chrome 26+, Firefox 16+, Safari 7+, Edge 12+.
              For very old browsers (IE9), gradients will not display but background will default to solid
              color.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I create a gradient with transparency?
            </h3>
            <p className="text-muted-foreground">
              To create transparent gradients, use colors with alpha transparency. In the hex color input,
              enter an 8-digit hex code where the last 2 digits control opacity: <code>#667eeaFF</code> is
              fully opaque, <code>#667eea00</code> is fully transparent. Or use the color picker which
              supports alpha. Transparent gradients are perfect for overlays on images, fading elements out,
              or creating glass-morphism effects.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What size should I download PNG gradients for social media?
            </h3>
            <p className="text-muted-foreground">
              Our PNG export is 1200x630 pixels, which is the optimal size for Open Graph images (Facebook,
              LinkedIn, Twitter cards) and social media posts. This 1.91:1 aspect ratio works across all
              platforms. For Instagram posts, you may want to crop to 1080x1080 (square) or 1080x1350
              (portrait). For Twitter headers, use 1500x500. For full-screen backgrounds, export as SVG and
              scale to any size without quality loss.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">CSS Gradient Best Practices</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use subtle gradients:</strong> Gentle 2-color gradients
                look more professional than harsh multi-color gradients. Try colors from the same hue family.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Test contrast:</strong> Ensure text is readable on
                gradient backgrounds. Use light text on dark gradients and vice versa. Test with WCAG
                contrast checkers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Avoid too many stops:</strong> Gradients with 5+ color
                stops can look chaotic. Stick to 2-3 colors for clean, modern designs unless creating
                intentionally vibrant effects.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use presets as starting points:</strong> Don&apos;t start
                from scratch—load a preset and tweak colors to match your brand. Faster and often better
                results.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Combine with CSS backdrop-filter:</strong> Layer gradients
                over images with <code>backdrop-filter: blur()</code> for modern glass-morphism effects.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Export SVG for scalability:</strong> If using gradients
                in design tools (Figma, Illustrator) or need to scale, export as SVG instead of PNG for
                perfect quality at any size.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
