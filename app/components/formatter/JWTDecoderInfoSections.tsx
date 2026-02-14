export const JWTDecoderInfoSections = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Overview Section */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Free Online JWT Decoder & Validator
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Decode, verify, and generate JSON Web Tokens (JWTs) with our free, privacy-first online tool.
          Get instant security analysis, validate signatures, and understand JWT structure without uploading
          your tokens to any server. Perfect for developers debugging authentication flows, security auditors
          analyzing token security, and teams implementing JWT-based auth systems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">100% Client-Side</h3>
            <p className="text-sm text-muted-foreground">
              All JWT decoding, verification, and generation happens in your browser. Your tokens and
              secrets never leave your device.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Security Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Automatic detection of security issues: algorithm &quot;none&quot; attacks, missing expiration,
              sensitive data exposure, and more.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">9 Algorithm Support</h3>
            <p className="text-sm text-muted-foreground">
              Supports HMAC (HS256/384/512), RSA (RS256/384/512), and ECDSA (ES256/384/512) algorithms
              for complete JWT ecosystem coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Key Capabilities</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Decode JWT Tokens</h3>
            <p className="text-muted-foreground mb-4">
              Instantly decode any JWT token to view its header, payload, and signature. Our decoder
              parses the Base64URL-encoded parts and displays them in human-readable JSON format with
              syntax highlighting.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Color-coded header, payload, and signature sections</li>
              <li>Standard claim tooltips (iss, sub, aud, exp, nbf, iat, jti)</li>
              <li>Timestamp conversion for exp, nbf, and iat claims</li>
              <li>Copy individual sections or the full decoded JSON</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Verify JWT Signatures</h3>
            <p className="text-muted-foreground mb-4">
              Validate JWT signatures to ensure tokens haven&apos;t been tampered with. Enter your secret
              key, select the algorithm, and get instant verification results with detailed error messages
              if validation fails.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Support for symmetric (HMAC) and asymmetric (RSA, ECDSA) algorithms</li>
              <li>Clear validation status with color-coded results</li>
              <li>Detailed error messages for debugging failed validations</li>
              <li>No server round-trips — instant local verification</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Generate New JWTs</h3>
            <p className="text-muted-foreground mb-4">
              Create custom JWT tokens for testing and development. Define your header, add standard or
              custom claims to the payload, and generate properly signed tokens with your chosen algorithm.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Add unlimited custom claims with automatic JSON parsing</li>
              <li>Support for all 9 standard JWT algorithms</li>
              <li>Generated tokens ready to use in Authorization headers</li>
              <li>Instant generation — no API calls or rate limits</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">Security Warnings</h3>
            <p className="text-muted-foreground mb-4">
              Automatic security analysis detects common JWT vulnerabilities and best practice violations.
              Get real-time warnings about token security issues before they become production problems.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Critical: Algorithm &quot;none&quot; attack detection</li>
              <li>Warning: Missing or expired expiration claims</li>
              <li>Warning: Sensitive data patterns in payload (passwords, SSN, etc.)</li>
              <li>Info: Large token sizes affecting performance</li>
              <li>Info: Not-before (nbf) claim validation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Privacy & Security</h2>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <p className="text-muted-foreground">
            Your JWT tokens and secret keys are highly sensitive. Unlike other online JWT tools that may
            send your data to servers for processing, our tool operates entirely in your browser.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">What We DO:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Process everything locally in JavaScript</li>
                <li>Use Web Crypto API for secure operations</li>
                <li>Provide security warnings and best practices</li>
                <li>Support all standard JWT algorithms</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">What We DON&apos;T DO:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Upload your tokens or secrets to any server</li>
                <li>Store tokens in cookies or localStorage</li>
                <li>Make external API calls with your data</li>
                <li>Track or log your JWT contents</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-muted-foreground border-t border-border pt-4">
            <strong>Security Note:</strong> While our tool is safe for development and testing, always follow
            JWT security best practices in production: use strong secrets, set appropriate expiration times,
            validate signatures, and never store sensitive data in JWT payloads (JWTs are signed, not encrypted).
          </p>
        </div>
      </section>

      {/* How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">How to Use the JWT Decoder</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Decode a JWT Token</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Click the <strong>Decode</strong> tab</li>
              <li>Paste your JWT token into the input field</li>
              <li>View the decoded header, payload, and signature below</li>
              <li>Check for security warnings at the top of the page</li>
              <li>Copy individual sections or decoded values as needed</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Verify a JWT Signature</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Click the <strong>Verify</strong> tab</li>
              <li>Paste your JWT token into the input field</li>
              <li>Enter your secret key (for HMAC) or public key (for RSA/ECDSA)</li>
              <li>Select the matching algorithm from the dropdown</li>
              <li>View the verification result — green for valid, red for invalid</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Generate a New JWT Token</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Click the <strong>Generate</strong> tab</li>
              <li>Select your desired algorithm from the dropdown</li>
              <li>Enter your secret key (keep this secure!)</li>
              <li>Click <strong>Add Claim</strong> to add payload claims</li>
              <li>Enter claim names (e.g., sub, exp, iss) and values</li>
              <li>Click <strong>Generate JWT Token</strong> to create your token</li>
              <li>Copy the generated token for use in your application</li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Is it safe to decode production JWTs in an online tool?
            </h3>
            <p className="text-muted-foreground">
              Our JWT decoder is 100% client-side, meaning your tokens never leave your browser or get
              uploaded to any server. However, for production tokens containing sensitive data, we recommend
              using this tool only in secure environments. If you&apos;re concerned about security, you can use
              this tool offline by saving the page locally, or use command-line JWT tools for maximum security.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What does the &quot;Algorithm is &apos;none&apos;&quot; warning mean?
            </h3>
            <p className="text-muted-foreground">
              The algorithm &quot;none&quot; is a critical security vulnerability. It indicates that the JWT has no
              signature verification, meaning anyone can create or modify the token without needing a secret
              key. This is a severe security risk and should never be used in production. If you see this
              warning, the token is likely invalid or part of a security exploit attempt.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Why is my JWT signature verification failing?
            </h3>
            <p className="text-muted-foreground">
              Signature verification can fail for several reasons: (1) The secret key is incorrect, (2) The
              wrong algorithm is selected, (3) The token has been modified or tampered with, (4) For RSA/ECDSA,
              you need the public key (not the private key) to verify, (5) The token format is invalid.
              Double-check your secret key, ensure you&apos;ve selected the correct algorithm from the token&apos;s
              header, and verify the token hasn&apos;t been modified.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What&apos;s the difference between symmetric and asymmetric JWT algorithms?
            </h3>
            <p className="text-muted-foreground">
              Symmetric algorithms (HMAC: HS256, HS384, HS512) use the same secret key for both signing and
              verifying tokens. This is simpler but requires sharing the secret key between all parties.
              Asymmetric algorithms (RSA: RS256/384/512, ECDSA: ES256/384/512) use a private key to sign
              tokens and a public key to verify them. This is more secure for distributed systems where
              multiple services need to verify tokens but shouldn&apos;t be able to create them.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Should I store sensitive data in JWT payloads?
            </h3>
            <p className="text-muted-foreground">
              No. JWTs are signed (to prevent tampering) but not encrypted. Anyone who receives the JWT can
              decode and read the payload using a tool like this. Only store non-sensitive information in
              JWTs, such as user IDs, roles, and public metadata. Never store passwords, credit card numbers,
              social security numbers, or other sensitive data in JWT payloads. If you need to transmit
              sensitive data, use JWE (JSON Web Encryption) instead.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              How do I set an expiration time for my JWT?
            </h3>
            <p className="text-muted-foreground">
              Add an &quot;exp&quot; (expiration) claim to your JWT payload with a Unix timestamp value. For example,
              to create a token that expires in 1 hour, calculate the current time plus 3600 seconds:
              Math.floor(Date.now() / 1000) + 3600. Our generator allows you to add custom claims — just add
              a claim with key &quot;exp&quot; and the timestamp value. Always include expiration claims in production
              JWTs to limit the damage if a token is compromised.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">JWT Best Practices</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Always set expiration:</strong> Use the &quot;exp&quot; claim
                to limit token lifetime. Short-lived tokens (15-60 minutes) are more secure.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use strong secrets:</strong> For HMAC algorithms, use
                cryptographically random secrets of at least 256 bits (32 bytes).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Validate on every request:</strong> Always verify JWT
                signatures and check expiration claims on the server side before trusting token data.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Use HTTPS only:</strong> JWTs should only be transmitted
                over HTTPS to prevent man-in-the-middle attacks.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Implement token refresh:</strong> Use short-lived access
                tokens with refresh tokens to balance security and user experience.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Store securely:</strong> In browsers, use httpOnly cookies
                for JWTs when possible. Avoid localStorage for sensitive tokens.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
