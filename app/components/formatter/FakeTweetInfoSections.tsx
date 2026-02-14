export const FakeTweetInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Fake Tweet Generator - Create Realistic Twitter Screenshots
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Generate realistic fake tweet screenshots with our free online tweet generator. Customize
          profile picture, name, username, verified badge, tweet content, timestamp, and engagement
          stats (likes, retweets, replies, views). Perfect for mockups, tutorials, presentations,
          social media marketing, and educational content. Download as PNG with light or dark mode.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Upload profile image, edit name/username, add verified badge, customize tweet text,
              timestamp, and all engagement metrics.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Realistic Design</h3>
            <p className="text-sm text-muted-foreground">
              Pixel-perfect Twitter/X UI design with light and dark themes. Looks exactly like real
              tweets for mockups and presentations.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Download PNG</h3>
            <p className="text-sm text-muted-foreground">
              Export tweet as high-quality PNG screenshot. Works 100% client-side—your data never
              leaves your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Why Use Our Fake Tweet Generator?</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Complete Customization</h3>
            <p className="text-muted-foreground mb-4">
              Control every aspect of the tweet. Upload your own profile picture or generate a random
              avatar. Edit display name, username, add verified badge, customize tweet text (up to 280
              characters), set timestamp, and adjust all engagement metrics.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Upload custom profile image or generate random avatar</li>
              <li>Edit display name and @username handle</li>
              <li>Add or remove verified blue checkmark badge</li>
              <li>Customize tweet text (supports line breaks and emojis)</li>
              <li>Set custom timestamp or use current time</li>
              <li>Adjust likes, retweets, replies, views counts</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Pixel-Perfect Twitter UI</h3>
            <p className="text-muted-foreground mb-4">
              Our tweet generator uses the exact Twitter/X design with accurate fonts, spacing, colors,
              and icons. Supports both light and dark themes. The result looks indistinguishable from
              real tweets.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Accurate Twitter/X UI design and layout</li>
              <li>Light mode and dark mode support</li>
              <li>Proper font sizing and spacing</li>
              <li>Real Twitter icons (reply, retweet, like, view, share)</li>
              <li>Number formatting (1.2K, 45.6M)</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Download as PNG</h3>
            <p className="text-muted-foreground mb-4">
              Export your fake tweet as a high-quality PNG image with one click. Perfect for embedding
              in presentations, blog posts, social media, or design mockups. Works 100% client-side—no
              server upload required.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>High-quality PNG export (2x resolution)</li>
              <li>Clean background (white for light, black for dark)</li>
              <li>One-click download button</li>
              <li>100% privacy—everything runs in your browser</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Random Avatar Generator</h3>
            <p className="text-muted-foreground mb-4">
              Don&apos;t have a profile image? Use our random avatar generator to create unique cartoon
              avatars instantly. Perfect for tutorials, examples, and placeholder content.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Generate unlimited random avatars</li>
              <li>Cartoon-style avatars (Avataaars library)</li>
              <li>Click shuffle icon for new avatar</li>
              <li>Or upload your own custom image</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Use the Fake Tweet Generator</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Set Up Profile</h3>
            <p className="text-muted-foreground">
              Upload a profile image or click the <strong>shuffle icon</strong> to generate a random
              avatar. Enter the <strong>Display Name</strong> (shown in bold) and
              <strong>Username</strong> (shown as @username). Check <strong>Verified Badge</strong> to
              add the blue checkmark.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Write Tweet Content</h3>
            <p className="text-muted-foreground">
              Enter your tweet text in the <strong>Tweet Text</strong> field (up to 280 characters).
              Press Enter for line breaks. Use emojis if needed. For the timestamp, enter a custom time
              or click the <strong>clock icon</strong> to use the current time.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Set Engagement Stats</h3>
            <p className="text-muted-foreground">
              Adjust the numbers for <strong>Replies</strong>, <strong>Retweets</strong>,
              <strong>Likes</strong>, and <strong>Views</strong>. These are displayed on the tweet
              preview. Higher numbers will be formatted (e.g., 1.2K, 45.6M for better readability).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Choose Theme</h3>
            <p className="text-muted-foreground">
              Select <strong>Light</strong> for white background or <strong>Dark</strong> for black
              background (Twitter dark mode). The preview updates instantly. Choose the theme that
              matches where you&apos;ll use the screenshot.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5. Download Screenshot</h3>
            <p className="text-muted-foreground">
              Click <strong>Download</strong> to export your fake tweet as a PNG image. The file will be
              named &quot;tweet.png&quot; and saved to your downloads folder. Use it in presentations, tutorials,
              mockups, or social media.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Perfect For...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Mockups & Presentations</h3>
            <p className="text-sm text-muted-foreground">
              Create realistic social media mockups for client presentations, pitch decks, and design
              portfolios. Show how tweets will look before launching campaigns.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Tutorials & Education</h3>
            <p className="text-sm text-muted-foreground">
              Generate example tweets for tutorials, courses, and educational content. Demonstrate
              social media concepts without using real accounts or violating terms of service.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Marketing Materials</h3>
            <p className="text-sm text-muted-foreground">
              Create testimonial-style tweets for landing pages, ads, and marketing materials. Show
              social proof and engagement without waiting for real tweets.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Content Creation</h3>
            <p className="text-sm text-muted-foreground">
              Generate tweet screenshots for blog posts, articles, YouTube videos, and social media
              content. Add visual variety and social media context to your content.
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
              Is it legal to create fake tweets?
            </h3>
            <p className="text-muted-foreground">
              Creating fake tweet screenshots is legal for <strong>educational, demonstration, mockup,
              and parody purposes</strong>. However, you <strong>must not</strong> use them to deceive,
              impersonate, defame, or spread misinformation. Always disclose that the tweet is fake if
              posting publicly. For tutorials and mockups, clearly label them as examples or demos. Do
              not use fake tweets to impersonate real people or spread false information.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How realistic do the fake tweets look?
            </h3>
            <p className="text-muted-foreground">
              Our tweet generator uses pixel-perfect Twitter/X UI design with accurate fonts, spacing,
              colors, and icons. Both light and dark themes match the real Twitter interface. The
              screenshots are indistinguishable from real tweets for mockups and presentations. However,
              they lack interactive elements (clickable links, hover effects) since they&apos;re static
              images. For portfolios and mockups, they look completely authentic.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Can I upload my own profile picture?
            </h3>
            <p className="text-muted-foreground">
              Yes! Click <strong>Upload Image</strong> to upload any image from your device (PNG, JPG,
              WebP supported). The image is processed 100% in your browser—it never uploads to our
              servers. Alternatively, click the shuffle icon to generate a random cartoon avatar using
              the Avataaars library. You can switch between uploaded and random avatars anytime.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What&apos;s the character limit for tweets?
            </h3>
            <p className="text-muted-foreground">
              Our generator displays a 280-character counter below the tweet text field, matching
              Twitter&apos;s current limit. However, you can technically type more characters—the tool won&apos;t
              stop you. For realistic mockups, keep it under 280 characters. Twitter Blue subscribers
              have a 4,000-character limit for long tweets, but our generator focuses on standard tweets
              for simplicity.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I add emojis to my fake tweet?
            </h3>
            <p className="text-muted-foreground">
              Copy and paste emojis directly into the tweet text field. On Windows, press
              <strong>Win + .</strong> (period) to open the emoji picker. On Mac, press
              <strong>Cmd + Ctrl + Space</strong>. On mobile, use your keyboard&apos;s emoji button. Emojis
              will display correctly in the tweet preview and downloaded screenshot.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Can I create verified (blue checkmark) tweets?
            </h3>
            <p className="text-muted-foreground">
              Yes! Check the <strong>Verified Badge</strong> checkbox to add the blue checkmark next to
              the display name. This is useful for mockups showing verified accounts, tutorials about
              Twitter verification, or demonstrating how verified tweets look. Remember to clearly label
              these as fake/examples if posting publicly to avoid misleading anyone.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Fake Tweet Best Practices</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Always disclose it&apos;s fake:</strong> When posting
                fake tweets publicly, clearly label them as &quot;mockup&quot;, &quot;example&quot;, &quot;demo&quot;, or &quot;parody&quot;
                to avoid misleading your audience.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use realistic engagement numbers:</strong> Avoid
                absurdly high numbers (10M likes for a small account). Check real accounts of similar
                size for reference.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Match timestamp format:</strong> Use realistic
                timestamps. Twitter format: &quot;12:34 PM · Jan 15, 2024&quot;. Click the clock icon to use
                current time.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Keep usernames lowercase:</strong> Twitter
                usernames are case-insensitive and typically shown lowercase. Use &quot;johndoe&quot;, not
                &quot;JohnDoe&quot; for authenticity.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Choose appropriate theme:</strong> Use light mode
                for professional presentations. Use dark mode for content aimed at power users or
                nighttime contexts.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Don&apos;t impersonate real people:</strong> Never
                create fake tweets impersonating celebrities, politicians, or real users to spread false
                information. This can be illegal.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
