export const ColorPaletteInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Color Palette Generator - Create Beautiful Color Schemes Online
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Generate stunning color palettes with our free online color palette generator. Create random
          palettes, use color harmony modes (complementary, analogous, triadic, monochromatic), lock
          favorite colors, and check WCAG contrast ratios for accessibility. Export as PNG, SVG, CSS
          variables, or hex codes. Perfect for web designers, UI/UX designers, and developers who need
          beautiful, accessible color schemes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Color Harmony Modes</h3>
            <p className="text-sm text-muted-foreground">
              Generate palettes using complementary, analogous, triadic, or monochromatic color theory
              for professional results.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">WCAG Contrast Checker</h3>
            <p className="text-sm text-muted-foreground">
              Built-in accessibility checker shows contrast ratios vs white/black with AA, AAA, and
              large text compliance.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Lock & Export</h3>
            <p className="text-sm text-muted-foreground">
              Lock colors you love, generate new palettes around them. Export as PNG, SVG, CSS
              variables, or hex codes.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Why Use Our Color Palette Generator?</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">5 Color Harmony Modes</h3>
            <p className="text-muted-foreground mb-4">
              Generate palettes based on proven color theory principles. Choose from random generation or
              use color harmony modes for professional, balanced color schemes that work together.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Random</strong> - Generate completely random colors for inspiration</li>
              <li><strong>Complementary</strong> - Colors opposite on the color wheel (high contrast)</li>
              <li><strong>Analogous</strong> - Adjacent colors on the wheel (harmonious, low contrast)</li>
              <li><strong>Triadic</strong> - Three colors evenly spaced on the wheel (vibrant, balanced)</li>
              <li><strong>Monochromatic</strong> - Variations of a single hue (cohesive, elegant)</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Lock Colors You Love</h3>
            <p className="text-muted-foreground mb-4">
              Found a color you love? Lock it by clicking the lock icon, and it will stay while the rest
              of the palette regenerates. Perfect for building palettes around your brand colors or
              specific requirements.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Lock unlimited colors - generate around your favorites</li>
              <li>Visual lock indicator on each color card</li>
              <li>Locked colors remain when changing harmony modes</li>
              <li>Build palettes around brand colors or specific requirements</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">WCAG Contrast Checker Built-In</h3>
            <p className="text-muted-foreground mb-4">
              Ensure your colors are accessible. Our built-in WCAG contrast checker shows contrast ratios
              for each color against white and black backgrounds, with AA, AAA, and large text compliance
              indicators.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>AAA:</strong> 7:1 ratio - Enhanced contrast (best for accessibility)</li>
              <li><strong>AA:</strong> 4.5:1 ratio - Minimum for normal text (WCAG requirement)</li>
              <li><strong>AA Large:</strong> 3:1 ratio - Minimum for large text (18pt or 14pt bold)</li>
              <li>Real-time contrast calculations as you edit colors</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Multiple Export Formats</h3>
            <p className="text-muted-foreground mb-4">
              Export your palette in the format you need. Copy hex codes for design tools, CSS variables
              for web development, or download PNG/SVG for presentations and mockups.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Hex Codes</strong> - Copy comma-separated hex values (#667eea, #764ba2, ...)</li>
              <li><strong>CSS Variables</strong> - Copy :root CSS with --color-1, --color-2, etc.</li>
              <li><strong>PNG Export</strong> - Download 1200x630 image perfect for social media</li>
              <li><strong>SVG Export</strong> - Scalable vector format for presentations and design tools</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Flexible Palette Editing</h3>
            <p className="text-muted-foreground mb-4">
              Full control over your palette. Add up to 10 colors, remove unwanted colors (minimum 2),
              manually adjust any color with color picker or hex input, and see changes in real-time.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Add colors (up to 10) or remove colors (minimum 2)</li>
              <li>Visual color picker for each color</li>
              <li>Manual hex code input for precise colors</li>
              <li>One-click copy for individual color hex codes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Use the Color Palette Generator</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Generate a Palette</h3>
            <p className="text-muted-foreground">
              Click <strong>Generate</strong> to create a random 5-color palette. Or select a
              <strong>Harmony Mode</strong> (Complementary, Analogous, Triadic, Monochromatic) before
              generating for color-theory-based palettes. Each mode creates different color relationships.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Lock Favorite Colors</h3>
            <p className="text-muted-foreground">
              Hover over any color and click the <strong>lock icon</strong> to lock it. Locked colors stay
              when you regenerate the palette. This is perfect for building palettes around your brand
              colors or specific shades you like. You can lock multiple colors at once.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Adjust Colors Manually</h3>
            <p className="text-muted-foreground">
              Each color has a color picker (color circle icon) and hex input at the bottom. Click the
              color picker to choose a color visually, or edit the hex code directly for precise colors
              like brand colors. Changes update the contrast checker instantly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Check Accessibility</h3>
            <p className="text-muted-foreground">
              Scroll down to the <strong>WCAG Contrast Checker</strong> table. It shows contrast ratios
              for each color against white and black backgrounds. Green checkmarks mean the color passes
              WCAG standards (AA or AAA). Use this to ensure text is readable on your color backgrounds.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5. Export Your Palette</h3>
            <p className="text-muted-foreground">
              Choose an export format: <strong>Copy Hex Codes</strong> for Figma/Sketch/Adobe XD,
              <strong>Copy CSS Variables</strong> for web development, <strong>Download PNG</strong> for
              social media or presentations, or <strong>Download SVG</strong> for scalable graphics.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Perfect For...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Web Design & Development</h3>
            <p className="text-sm text-muted-foreground">
              Generate color palettes for websites, dashboards, and web apps. Export as CSS variables to
              use directly in your stylesheets. WCAG contrast checker ensures accessibility compliance.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">UI/UX Design</h3>
            <p className="text-sm text-muted-foreground">
              Create color schemes for mobile apps, SaaS products, and design systems. Copy hex codes
              directly into Figma, Sketch, Adobe XD, or other design tools. Build around brand colors.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Branding & Marketing</h3>
            <p className="text-sm text-muted-foreground">
              Develop brand color palettes for logos, marketing materials, and social media. Download PNG
              exports for mood boards and presentations. Ensure brand consistency with locked colors.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Learning Color Theory</h3>
            <p className="text-sm text-muted-foreground">
              Experiment with complementary, analogous, triadic, and monochromatic color schemes. See how
              color harmony modes create different moods and relationships. Great for design students.
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
              What is the difference between color harmony modes?
            </h3>
            <p className="text-muted-foreground">
              <strong>Complementary</strong> uses colors opposite on the color wheel (e.g., blue & orange)
              for high contrast and vibrant designs. <strong>Analogous</strong> uses adjacent colors (e.g.,
              blue, blue-green, green) for harmonious, calming designs. <strong>Triadic</strong> uses three
              colors evenly spaced (e.g., red, yellow, blue) for balanced, vibrant designs.
              <strong>Monochromatic</strong> uses variations of a single hue (different lightness/saturation)
              for cohesive, elegant designs. <strong>Random</strong> generates any colors for creative
              exploration.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What do the WCAG contrast ratios mean?
            </h3>
            <p className="text-muted-foreground">
              WCAG (Web Content Accessibility Guidelines) defines minimum contrast ratios for text
              accessibility. <strong>4.5:1 (AA)</strong> is the minimum for normal text (under 18pt or
              under 14pt bold). <strong>7:1 (AAA)</strong> is enhanced contrast recommended for better
              accessibility. <strong>3:1 (AA Large)</strong> is the minimum for large text (18pt+ or 14pt+
              bold). Higher contrast makes text easier to read for people with visual impairments or color
              blindness.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I use the lock feature effectively?
            </h3>
            <p className="text-muted-foreground">
              Lock colors when you have specific requirements like brand colors, client-provided colors, or
              shades that perfectly match your vision. For example, if your brand color is #667eea (purple),
              lock it and select <strong>Analogous</strong> harmony mode to generate a palette of similar
              purples and blues. Or lock your brand color and use <strong>Complementary</strong> mode to
              find contrasting accent colors. You can lock multiple colors and generate around them.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What is the ideal number of colors for a design palette?
            </h3>
            <p className="text-muted-foreground">
              Most professional design systems use 5-7 colors: 1-2 <strong>primary brand colors</strong>,
              1-2 <strong>secondary/accent colors</strong> for CTAs and highlights, 2-3
              <strong>neutral colors</strong> (grays) for text and backgrounds. Our generator defaults to
              5 colors which works for most use cases. You can add up to 10 colors for complex design
              systems, but simpler palettes (3-5 colors) are easier to use consistently.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Can I use these palettes commercially?
            </h3>
            <p className="text-muted-foreground">
              Yes! All palettes generated are 100% free to use for any purpose, including commercial
              projects, client work, and products. No attribution required. Colors cannot be copyrighted
              (only specific brand color combinations with trademarks can). Our tool generates mathematical
              color relationships based on color theory, which are not protected by copyright.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I export palettes to design tools like Figma?
            </h3>
            <p className="text-muted-foreground">
              Click <strong>Copy Hex Codes</strong> to copy comma-separated hex values like
              <code>#667eea, #764ba2, #f093fb</code>. In <strong>Figma</strong>, paste hex codes into color
              fields or create color styles. In <strong>Adobe XD</strong>, use the Assets panel to add
              colors. In <strong>Sketch</strong>, add to Document Colors. For web development, use
              <strong>Copy CSS Variables</strong> to get a :root block with --color-1, --color-2, etc.
              that you can paste into your CSS file.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Color Palette Best Practices</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">60-30-10 rule:</strong> Use 60% dominant color
                (backgrounds), 30% secondary color (sections/cards), 10% accent color (CTAs/highlights).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Test with real content:</strong> Colors look different
                with text, images, and UI elements. Test your palette in actual designs, not just swatches.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Check accessibility early:</strong> Use the WCAG
                contrast checker before committing to colors. Fixing contrast issues later is harder than
                choosing accessible colors upfront.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Start with monochromatic:</strong> If unsure where to
                start, use Monochromatic mode to generate a cohesive palette. Add accent colors later using
                Complementary mode.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Consider color psychology:</strong> Blue = trust/calm,
                Red = urgency/energy, Green = growth/health, Purple = luxury/creativity, Yellow =
                optimism/attention.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Save successful palettes:</strong> When you find a
                great palette, copy the hex codes and save them in a design system file or documentation
                for consistency across projects.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
