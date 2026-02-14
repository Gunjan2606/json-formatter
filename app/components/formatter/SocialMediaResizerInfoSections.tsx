export const SocialMediaResizerInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Social Media Image Resizer - All Platform Sizes
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Upload one image and instantly get all the right sizes for every social media platform.
          Perfect dimensions for Instagram posts and stories, Twitter images, LinkedIn banners,
          Facebook covers, YouTube thumbnails, Pinterest pins, and TikTok videos. Download individually
          or get all sizes as a ZIP file.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Supported Platforms & Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">📸 Instagram</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Post: 1080×1080 (square)</li>
              <li>• Story/Reel: 1080×1920 (vertical)</li>
              <li>• Landscape: 1080×566</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">🐦 Twitter/X</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Post: 1200×675</li>
              <li>• Header: 1500×500</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">💼 LinkedIn</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Post: 1200×627</li>
              <li>• Banner: 1584×396</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">👍 Facebook</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Post: 1200×630</li>
              <li>• Cover: 820×312</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">▶️ YouTube</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Thumbnail: 1280×720</li>
              <li>• Banner: 2560×1440</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">📌 Pinterest & TikTok</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Pinterest Pin: 1000×1500</li>
              <li>• TikTok Video: 1080×1920</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">How to Use</h3>
        <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
          <li><strong>Upload your image</strong> - Any photo, graphic, or design</li>
          <li><strong>Choose fit mode</strong> - Cover (fills frame) or Contain (shows full image)</li>
          <li><strong>Select platforms</strong> - Pick which sizes you need or keep all selected</li>
          <li><strong>Preview all sizes</strong> - See how your image looks at each dimension</li>
          <li><strong>Download</strong> - Get individual images or download all as ZIP</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Cover vs Contain</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">📐 Cover Mode</h4>
            <p className="text-sm text-muted-foreground">
              Fills the entire frame, may crop edges. Best for photos where the center subject matters most.
              Ensures no white space around your image.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">🖼️ Contain Mode</h4>
            <p className="text-sm text-muted-foreground">
              Fits the entire image within the frame, may show white space. Best for graphics, logos,
              or images where you need to show everything without cropping.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Perfect For</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Social Media Managers:</strong> Prepare content for all platforms at once</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Content Creators:</strong> Resize videos thumbnails, photos, and graphics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Marketers:</strong> Create campaign assets for cross-platform distribution</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Businesses:</strong> Maintain consistent branding across all social channels</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
