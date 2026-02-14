"use client";

import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { JWTDecoderInfoSections } from "../components/formatter/JWTDecoderInfoSections";
import { useJWTDecoder, type Algorithm, type SecurityWarning } from "../hooks/useJWTDecoder";
import {
  KeyRound,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Trash2,
  AlertTriangle,
  Shield,
  Info,
  Plus,
  X,
} from "lucide-react";

type TabType = "decode" | "verify" | "generate";

const JWTDecoderComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("decode");
  const [customClaims, setCustomClaims] = useState<Array<{ key: string; value: string }>>([]);

  const {
    token,
    setToken,
    secret,
    setSecret,
    algorithm,
    setAlgorithm,
    decoded,
    verified,
    generate,
    generatedToken,
    clear,
    STANDARD_CLAIMS,
  } = useJWTDecoder();

  const handleCopy = useCallback((value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleGenerate = useCallback(() => {
    try {
      const header = { alg: algorithm, typ: "JWT" };
      const payload: Record<string, unknown> = {};

      // Add custom claims
      customClaims.forEach(({ key, value }) => {
        if (key.trim()) {
          try {
            // Try to parse as JSON, otherwise use as string
            payload[key] = JSON.parse(value);
          } catch {
            payload[key] = value;
          }
        }
      });

      generate(header, payload);
      setActiveTab("decode");
      setToken(generatedToken);
    } catch (error) {
      console.error("Generate error:", error);
    }
  }, [algorithm, customClaims, generate, generatedToken, setToken]);

  const addCustomClaim = () => {
    setCustomClaims([...customClaims, { key: "", value: "" }]);
  };

  const removeCustomClaim = (index: number) => {
    setCustomClaims(customClaims.filter((_, i) => i !== index));
  };

  const updateCustomClaim = (index: number, field: "key" | "value", value: string) => {
    const updated = [...customClaims];
    updated[index][field] = value;
    setCustomClaims(updated);
  };

  return (
    <div
      className={`${isFullscreen ? "h-screen overflow-hidden" : "min-h-screen"} bg-background text-foreground flex flex-col`}
    >
      <Header
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
        title="JWT Decoder & Validator"
        description="Decode, verify, and generate JSON Web Tokens"
        icon={<KeyRound className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-4 w-full max-w-7xl mx-auto`}>
        {/* Tab Switcher */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1">
            {(["decode", "verify", "generate"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "decode" && "Decode"}
                {tab === "verify" && "Verify"}
                {tab === "generate" && "Generate"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clear} className="gap-1.5">
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Decode Tab */}
        {activeTab === "decode" && (
          <div className="flex-1 flex flex-col gap-4">
            {/* Token Input */}
            <div className="bg-card border border-border rounded-lg flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <span className="text-sm font-semibold text-muted-foreground">JWT Token</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleCopy(token, "token")}
                  disabled={!token}
                >
                  {copiedField === "token" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
              <textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
                className="flex-1 w-full bg-background p-3 font-mono text-sm focus:outline-none resize-none min-h-[120px]"
                spellCheck={false}
              />
            </div>

            {/* Security Warnings */}
            {decoded && decoded.warnings.length > 0 && (
              <div className="space-y-2">
                {decoded.warnings.map((warning, i) => (
                  <SecurityWarningDisplay key={i} warning={warning} />
                ))}
              </div>
            )}

            {/* Decoded Output */}
            {decoded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Header */}
                <div className="bg-card border border-border rounded-lg flex flex-col">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <span className="text-sm font-semibold text-blue-500">Header</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2), "header")}
                    >
                      {copiedField === "header" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                  <pre className="flex-1 overflow-auto p-3 font-mono text-xs bg-background">
                    {JSON.stringify(decoded.header, null, 2)}
                  </pre>
                </div>

                {/* Payload */}
                <div className="bg-card border border-border rounded-lg flex flex-col">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <span className="text-sm font-semibold text-purple-500">Payload</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2), "payload")}
                    >
                      {copiedField === "payload" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                  <div className="flex-1 overflow-auto p-3 space-y-2">
                    {Object.entries(decoded.payload).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-foreground">{key}</span>
                          {STANDARD_CLAIMS[key] && (
                            <span className="text-xs text-muted-foreground" title={STANDARD_CLAIMS[key]}>
                              ({STANDARD_CLAIMS[key].split(" - ")[0]})
                            </span>
                          )}
                        </div>
                        <pre className="font-mono text-xs text-muted-foreground bg-background p-2 rounded">
                          {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Signature */}
                <div className="bg-card border border-border rounded-lg flex flex-col md:col-span-2">
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <span className="text-sm font-semibold text-orange-500">Signature</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCopy(decoded.signature, "signature")}
                    >
                      {copiedField === "signature" ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                  <pre className="overflow-auto p-3 font-mono text-xs bg-background break-all">
                    {decoded.signature}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Verify Tab */}
        {activeTab === "verify" && (
          <div className="flex-1 flex flex-col gap-4">
            {/* Token Input */}
            <div className="bg-card border border-border rounded-lg flex flex-col">
              <div className="p-3 border-b border-border">
                <span className="text-sm font-semibold text-muted-foreground">JWT Token</span>
              </div>
              <textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste JWT token to verify..."
                className="w-full bg-background p-3 font-mono text-sm focus:outline-none resize-none min-h-[100px]"
                spellCheck={false}
              />
            </div>

            {/* Verification Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">Secret Key</label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter secret key..."
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">Algorithm</label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="HS256">HS256 (HMAC SHA-256)</option>
                  <option value="HS384">HS384 (HMAC SHA-384)</option>
                  <option value="HS512">HS512 (HMAC SHA-512)</option>
                  <option value="RS256">RS256 (RSA SHA-256)</option>
                  <option value="RS384">RS384 (RSA SHA-384)</option>
                  <option value="RS512">RS512 (RSA SHA-512)</option>
                  <option value="ES256">ES256 (ECDSA SHA-256)</option>
                  <option value="ES384">ES384 (ECDSA SHA-384)</option>
                  <option value="ES512">ES512 (ECDSA SHA-512)</option>
                </select>
              </div>
            </div>

            {/* Verification Result */}
            {verified && (
              <div
                className={`bg-card border rounded-lg p-4 ${
                  verified.valid ? "border-emerald-500" : "border-red-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  {verified.valid ? (
                    <>
                      <Shield className="w-6 h-6 text-emerald-500" />
                      <div>
                        <p className="font-semibold text-emerald-500">Signature Verified</p>
                        <p className="text-sm text-muted-foreground">
                          The JWT signature is valid and has not been tampered with.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="font-semibold text-red-500">Signature Invalid</p>
                        <p className="text-sm text-muted-foreground">{verified.error}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="flex-1 flex flex-col gap-4">
            {/* Algorithm & Secret */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">Algorithm</label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="HS256">HS256 (HMAC SHA-256)</option>
                  <option value="HS384">HS384 (HMAC SHA-384)</option>
                  <option value="HS512">HS512 (HMAC SHA-512)</option>
                  <option value="RS256">RS256 (RSA SHA-256)</option>
                  <option value="RS384">RS384 (RSA SHA-384)</option>
                  <option value="RS512">RS512 (RSA SHA-512)</option>
                  <option value="ES256">ES256 (ECDSA SHA-256)</option>
                  <option value="ES384">ES384 (ECDSA SHA-384)</option>
                  <option value="ES512">ES512 (ECDSA SHA-512)</option>
                </select>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">Secret Key</label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter secret key..."
                  className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Custom Claims */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-muted-foreground">Payload Claims</label>
                <Button variant="ghost" size="sm" onClick={addCustomClaim} className="gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  Add Claim
                </Button>
              </div>

              <div className="space-y-2">
                {customClaims.map((claim, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={claim.key}
                      onChange={(e) => updateCustomClaim(index, "key", e.target.value)}
                      placeholder="Claim name (e.g., sub, iss, exp)"
                      className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="text"
                      value={claim.value}
                      onChange={(e) => updateCustomClaim(index, "value", e.target.value)}
                      placeholder="Claim value"
                      className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCustomClaim(index)}
                      className="h-9 w-9"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {customClaims.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No claims added. Click &quot;Add Claim&quot; to start building your JWT payload.
                  </p>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerate} disabled={!secret} className="w-full">
              Generate JWT Token
            </Button>

            {/* Generated Token */}
            {generatedToken && (
              <div className="bg-card border border-border rounded-lg flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <span className="text-sm font-semibold text-emerald-500">Generated Token</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleCopy(generatedToken, "generated")}
                  >
                    {copiedField === "generated" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
                <pre className="overflow-auto p-3 font-mono text-xs bg-background break-all">
                  {generatedToken}
                </pre>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <JWTDecoderInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

function SecurityWarningDisplay({ warning }: { warning: SecurityWarning }) {
  const icon =
    warning.type === "critical" ? (
      <AlertTriangle className="w-4 h-4" />
    ) : warning.type === "warning" ? (
      <AlertTriangle className="w-4 h-4" />
    ) : (
      <Info className="w-4 h-4" />
    );

  const colorClass =
    warning.type === "critical"
      ? "bg-red-500/10 border-red-500 text-red-500"
      : warning.type === "warning"
      ? "bg-yellow-500/10 border-yellow-500 text-yellow-500"
      : "bg-blue-500/10 border-blue-500 text-blue-500";

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${colorClass}`}>
      {icon}
      <div className="flex-1">
        <p className="text-sm font-medium">{warning.message}</p>
        {warning.field && <p className="text-xs mt-1 opacity-80">Field: {warning.field}</p>}
      </div>
    </div>
  );
}

export default JWTDecoderComponent;
