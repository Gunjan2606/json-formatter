export const DeviceMockupInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Device Mockup Generator - iPhone & MacBook Frames
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Create professional device mockups instantly with our free online tool. Wrap your screenshots
          in realistic iPhone 15 Pro, MacBook Pro, iPad Pro, and Android device frames. Perfect for
          showcasing apps, websites, and digital products in presentations, portfolios, and marketing materials.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Why Use Our Device Mockup Generator?</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Latest Devices:</strong> iPhone 15 Pro, iPhone 14, MacBook Pro, iPad Pro, Android</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Custom Colors:</strong> Space Black, White, Silver, Gold device frames</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Beautiful Backgrounds:</strong> Transparent, solid colors, or gradients</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Professional Effects:</strong> Realistic shadows and reflections</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>High-Res Export:</strong> Download 2x resolution PNG for crisp mockups</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">How to Create Device Mockups</h3>
        <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
          <li><strong>Upload your screenshot</strong> - Drop your app, website, or design screenshot</li>
          <li><strong>Choose device</strong> - Select iPhone, MacBook, iPad, or Android</li>
          <li><strong>Customize frame</strong> - Pick frame color (Black, White, Silver, Gold)</li>
          <li><strong>Style background</strong> - Choose transparent, solid color, or gradient</li>
          <li><strong>Add effects</strong> - Enable shadows for depth and realism</li>
          <li><strong>Download</strong> - Export high-resolution PNG mockup</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Perfect For</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
          <div>
            <h4 className="font-semibold text-foreground mb-2">App Developers</h4>
            <p>Showcase your mobile apps in App Store screenshots, pitch decks, and marketing sites</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Web Designers</h4>
            <p>Present responsive websites in realistic device contexts for client presentations</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Product Marketers</h4>
            <p>Create compelling product images for social media, landing pages, and ads</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Portfolio Projects</h4>
            <p>Display your design work professionally with realistic device mockups</p>
          </div>
        </div>
      </section>
    </div>
  );
};
