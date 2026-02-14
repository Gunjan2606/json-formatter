export const LoremIpsumInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Lorem Ipsum Generator - Multiple Styles & Formats
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Generate placeholder text instantly with our free Lorem Ipsum generator. Choose from 5 text
          styles (Classic, Hipster, Tech, Corporate, Pirate), export in 3 formats (Plain, HTML, Markdown),
          and customize length, headings, and lists. Perfect for designers, developers, and content creators
          who need dummy text for mockups, prototypes, and presentations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">5 Text Styles</h3>
            <p className="text-sm text-muted-foreground">
              Classic Lorem Ipsum, Hipster, Tech jargon, Corporate buzzwords, or Pirate speak. Add variety
              to your mockups.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Smart Formatting</h3>
            <p className="text-sm text-muted-foreground">
              Generate text with headings, lists, and proper HTML/Markdown formatting. Ready to paste into
              your designs.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Custom Limits</h3>
            <p className="text-sm text-muted-foreground">
              Set word or character limits for meta descriptions (160 chars), tweets (280 chars), or any
              specific requirement.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Why Choose Our Lorem Ipsum Generator?</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">5 Text Styles for Variety</h3>
            <p className="text-muted-foreground mb-4">
              Tired of the same boring Lorem Ipsum? We offer 5 distinct text styles to match your project
              context and add personality to your mockups.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Classic</strong> - Traditional Lorem Ipsum in Latin for timeless placeholder text</li>
              <li><strong>Hipster</strong> - Artisanal, craft, sustainable buzzwords for lifestyle brands</li>
              <li><strong>Tech</strong> - API, blockchain, microservice jargon for tech products</li>
              <li><strong>Corporate</strong> - Synergy, leverage, paradigm for business presentations</li>
              <li><strong>Pirate</strong> - Ahoy matey! Fun pirate speak for creative projects</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">3 Output Formats</h3>
            <p className="text-muted-foreground mb-4">
              Export your generated text in the format you need. Plain text for simple mockups, HTML with
              proper tags for web development, or Markdown for documentation.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Plain Text</strong> - Clean paragraphs with no formatting, ready to paste anywhere</li>
              <li><strong>HTML</strong> - Proper &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt; tags for web development</li>
              <li><strong>Markdown</strong> - ## headings, - lists for documentation and CMS</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Smart Formatting Options</h3>
            <p className="text-muted-foreground mb-4">
              Generate text with realistic document structure. Add headings to break up content, include
              lists for variety, and create text that looks like real content—not just lorem ipsum spam.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Optional headings (H2) distributed throughout text</li>
              <li>Bulleted lists for realistic content structure</li>
              <li>Adjustable paragraph length (Short: 2, Medium: 5, Long: 10+)</li>
              <li>Custom paragraph count up to 50 paragraphs</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Word & Character Limits</h3>
            <p className="text-muted-foreground mb-4">
              Need exactly 160 characters for a meta description? Or 50 words for a short paragraph? Set
              precise limits and get exactly the amount of text you need—no manual counting required.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Max word limit for exact word counts</li>
              <li>Max character limit for social media, meta tags, ads</li>
              <li>Pre-calculated stats: words, characters, sentences, paragraphs</li>
              <li>Common presets: Meta descriptions (160 chars), Tweets (280 chars)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Use the Lorem Ipsum Generator</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Choose Your Text Style</h3>
            <p className="text-muted-foreground">
              Select from 5 styles: <strong>Classic</strong> for traditional Lorem Ipsum, <strong>Hipster</strong> for
              lifestyle brands, <strong>Tech</strong> for technology products, <strong>Corporate</strong> for business
              presentations, or <strong>Pirate</strong> for fun creative projects.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Select Output Format</h3>
            <p className="text-muted-foreground">
              Choose <strong>Plain Text</strong> for simple mockups, <strong>HTML</strong> for web development with
              proper &lt;p&gt; and &lt;h2&gt; tags, or <strong>Markdown</strong> for documentation with ## headings
              and - lists.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Set Length</h3>
            <p className="text-muted-foreground">
              Pick a preset: <strong>Short</strong> (2 paragraphs), <strong>Medium</strong> (5 paragraphs),
              <strong>Long</strong> (10 paragraphs), or <strong>Custom</strong> for a specific paragraph count.
              For precise control, set word or character limits.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Add Formatting (Optional)</h3>
            <p className="text-muted-foreground">
              Enable <strong>Include Headings</strong> to add H2 headings throughout the text for realistic
              article structure. Enable <strong>Include Lists</strong> to add bulleted lists for variety.
              Text updates in real-time as you adjust settings.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5. Copy and Use</h3>
            <p className="text-muted-foreground">
              Click <strong>Copy</strong> to copy the generated text to your clipboard. Paste it into Figma,
              Sketch, Adobe XD, WordPress, VS Code, or wherever you need placeholder text. Text regenerates
              automatically when you change settings.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Perfect For...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Web Designers</h3>
            <p className="text-sm text-muted-foreground">
              Fill mockups in Figma, Sketch, or Adobe XD with realistic placeholder text. Test layouts
              with various text lengths without waiting for real content.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Developers</h3>
            <p className="text-sm text-muted-foreground">
              Generate HTML or Markdown text with proper tags for testing frontend layouts, CMS templates,
              and responsive designs before content is ready.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Content Writers</h3>
            <p className="text-sm text-muted-foreground">
              Create placeholder text for article outlines, blog post templates, and content planning. Use
              word limits to match target article lengths.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Marketers</h3>
            <p className="text-sm text-muted-foreground">
              Generate text for ad copy testing, email template mockups, and landing page prototypes. Use
              character limits for social media previews.
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
              What is Lorem Ipsum and where does it come from?
            </h3>
            <p className="text-muted-foreground">
              Lorem Ipsum is placeholder text used in the printing and typesetting industry since the 1500s.
              It comes from sections 1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot; (The Extremes
              of Good and Evil) by Cicero, written in 45 BC. The text has been scrambled and modified to
              remove meaning, making it ideal as neutral placeholder text that won&apos;t distract from design
              evaluation.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Why use Lorem Ipsum instead of &quot;Sample text here&quot;?
            </h3>
            <p className="text-muted-foreground">
              Using &quot;Sample text here&quot; or repeated English phrases makes viewers focus on the words rather
              than the visual design. Lorem Ipsum&apos;s meaningless Latin text allows stakeholders and clients to
              evaluate layout, typography, and visual hierarchy without being distracted by readable content.
              It also provides realistic word lengths and letter frequencies similar to English, making it
              ideal for testing how actual content will look.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              When should I use alternative text styles like Hipster or Tech?
            </h3>
            <p className="text-muted-foreground">
              Alternative text styles are useful when you want placeholder text that better matches your
              project&apos;s context and tone. Use <strong>Tech Ipsum</strong> for SaaS products and developer
              tools to test how technical jargon looks. Use <strong>Hipster Ipsum</strong> for lifestyle brands
              and artisanal products. Use <strong>Corporate Ipsum</strong> for business presentations and
              enterprise software. These alternatives help stakeholders visualize how domain-specific content
              will appear while remaining neutral enough to not be mistaken for final copy.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What&apos;s the ideal paragraph length for web content?
            </h3>
            <p className="text-muted-foreground">
              For web content, paragraphs should typically be 40-70 words (3-5 sentences) for optimal
              readability. Our <strong>Short</strong> preset generates 2 paragraphs (~80-140 words total),
              ideal for brief descriptions. <strong>Medium</strong> generates 5 paragraphs (~200-350 words),
              suitable for blog post sections. <strong>Long</strong> generates 10+ paragraphs (~400-700 words),
              perfect for article mockups. Mobile readers prefer shorter paragraphs, while desktop allows
              slightly longer ones. Test your layout with various lengths to ensure readability.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I use Lorem Ipsum with HTML and Markdown?
            </h3>
            <p className="text-muted-foreground">
              Select <strong>HTML</strong> format to get text wrapped in proper tags: &lt;p&gt; for paragraphs,
              &lt;h2&gt; for headings, and &lt;ul&gt;&lt;li&gt; for lists. This is ready to paste directly into
              HTML files, CMS editors, or component templates. Select <strong>Markdown</strong> format to get
              text with ## for headings and - for lists, perfect for documentation, README files, and Markdown-based
              CMS like Ghost or Hugo. Both formats include <strong>Include Headings</strong> and
              <strong>Include Lists</strong> options for realistic document structure.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What are common character limits I should know?
            </h3>
            <p className="text-muted-foreground">
              Common limits include: <strong>Meta descriptions</strong> - 150-160 characters for Google search
              snippets. <strong>Twitter/X</strong> - 280 characters per tweet. <strong>Instagram captions</strong> -
              2,200 characters. <strong>Facebook posts</strong> - 63,206 characters (though optimal is 40-80).
              <strong>LinkedIn posts</strong> - 3,000 characters. <strong>Email subject lines</strong> - 50-70
              characters for mobile visibility. <strong>Page titles (SEO)</strong> - 50-60 characters (512 pixels).
              Use our character limit feature to generate text that fits these constraints exactly.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Lorem Ipsum Best Practices</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Replace before launch:</strong> Always replace Lorem Ipsum
                with real content before going live. Search engines may penalize sites with placeholder text.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Test edge cases:</strong> Generate very short and very
                long text to test how your layout handles extreme content lengths.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use realistic word counts:</strong> If your final content
                will be 500 words, use 500 words of Lorem Ipsum—not 50 or 5000.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Mix with real content:</strong> Use Lorem Ipsum for body
                text but real headlines and CTAs so stakeholders understand the page purpose.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Consider accessibility:</strong> Lorem Ipsum reads poorly
                with screen readers. Replace it early in accessible design processes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use alternative styles wisely:</strong> Hipster, Tech, and
                Corporate Ipsum are fun but use them strategically—they can be distracting if overused.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
