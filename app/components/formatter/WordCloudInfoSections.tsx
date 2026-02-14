export const WordCloudInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Word Cloud Generator - Beautiful Text Visualizations
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Create stunning word clouds from any text with our free online generator. Visualize word
          frequency, analyze text patterns, and make your data beautiful. Perfect for presentations,
          reports, social media, and data analysis. Automatic stop word filtering ensures meaningful results.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">🎨 Custom Shapes</h4>
            <p className="text-sm text-muted-foreground">
              Choose from rectangle, circle, ellipse, or triangle shapes to match your presentation style
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">🌈 Color Schemes</h4>
            <p className="text-sm text-muted-foreground">
              6 built-in color schemes (Blue, Rainbow, Warm, Cool, Monochrome) or create custom colors
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">📊 Smart Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Automatic word frequency calculation with stop word filtering for meaningful insights
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">✍️ Font Customization</h4>
            <p className="text-sm text-muted-foreground">
              7 font families, adjustable sizes (12-72px), and automatic sizing based on frequency
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">📁 File Upload</h4>
            <p className="text-sm text-muted-foreground">
              Upload .txt or .md files directly instead of copy-pasting large texts
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">💾 High Quality Export</h4>
            <p className="text-sm text-muted-foreground">
              Download as PNG (800×600) with transparent or custom background colors
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">How to Create a Word Cloud</h3>
        <ol className="space-y-3 text-muted-foreground list-decimal list-inside">
          <li><strong>Enter your text</strong> - Paste text or upload a .txt/.md file</li>
          <li><strong>Choose a shape</strong> - Rectangle, circle, ellipse, or triangle</li>
          <li><strong>Select colors</strong> - Pick a color scheme or create custom colors</li>
          <li><strong>Customize font</strong> - Choose font family and adjust size range</li>
          <li><strong>Adjust settings</strong> - Set max words (10-100) and background color</li>
          <li><strong>Download</strong> - Export your word cloud as PNG</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">What Are Word Clouds?</h3>
        <p className="text-muted-foreground leading-relaxed">
          Word clouds (also called tag clouds or text clouds) are visual representations of text data
          where the size of each word indicates its frequency or importance. More frequent words appear
          larger, making it easy to identify key themes and patterns at a glance.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our generator automatically filters out common stop words (like &ldquo;the&rdquo;, &ldquo;and&rdquo;, &ldquo;is&rdquo;) to focus
          on meaningful content words. This makes your word cloud more informative and visually appealing.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Perfect For</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Presentations:</strong> Visualize survey responses, customer feedback, or research data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Content Analysis:</strong> Identify themes in articles, books, or social media posts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Education:</strong> Create visual summaries of essays, lectures, or study materials</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Marketing:</strong> Analyze brand mentions, customer reviews, or competitor content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span><strong>Social Media:</strong> Create eye-catching graphics for posts and stories</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foreground">Tips for Best Results</h3>
        <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-3 text-sm text-muted-foreground">
          <p>• Use at least 100 words for meaningful visualization</p>
          <p>• Longer text produces better word frequency distribution</p>
          <p>• Try different shapes to match your presentation theme</p>
          <p>• Use monochrome colors for professional/formal contexts</p>
          <p>• Use rainbow colors for creative/playful contexts</p>
          <p>• Adjust max words to control density (fewer words = cleaner)</p>
          <p>• Increase font size range for more dramatic visual contrast</p>
        </div>
      </section>
    </div>
  );
};
