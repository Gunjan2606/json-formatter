"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { QRGeneratorInfoSections } from "../components/formatter/QRGeneratorInfoSections";
import { useQRGenerator, type QRType, type ErrorCorrectionLevel } from "../hooks/useQRGenerator";
import {
  QrCode,
  Download,
  Maximize2,
  Minimize2,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";
import QRCodeLib from "qrcode";

const QR_TYPES = [
  { value: "url", label: "URL/Link", placeholder: "https://example.com" },
  { value: "text", label: "Plain Text", placeholder: "Enter any text" },
  { value: "email", label: "Email", placeholder: "email@example.com" },
  { value: "phone", label: "Phone", placeholder: "+1234567890" },
  { value: "sms", label: "SMS", placeholder: "+1234567890" },
  { value: "wifi", label: "WiFi", placeholder: "" },
  { value: "vcard", label: "vCard", placeholder: "" },
] as const;

const ERROR_CORRECTION_LEVELS = [
  { value: "L", label: "L - Low (7%)", description: "Smallest size" },
  { value: "M", label: "M - Medium (15%)", description: "Recommended" },
  { value: "Q", label: "Q - Quartile (25%)", description: "Good for logos" },
  { value: "H", label: "H - High (30%)", description: "Best for logos" },
] as const;

const QRGenerator = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [qrDataURL, setQRDataURL] = useState<string>("");
  const [logoError, setLogoError] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    options,
    updateOption,
    wifiConfig,
    updateWiFiConfig,
    vcardConfig,
    updateVCardConfig,
    qrData,
    reset,
  } = useQRGenerator();

  // Generate QR code whenever options change
  useEffect(() => {
    if (!qrData || qrData.length === 0) return;

    const generateQR = async () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Generate QR code
        await QRCodeLib.toCanvas(canvas, qrData, {
          width: options.size,
          margin: 2,
          errorCorrectionLevel: options.errorCorrection,
          color: {
            dark: options.foregroundColor,
            light: options.backgroundColor,
          },
        });

        // Add logo if present
        if (options.logo) {
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const logoSize = (options.size * options.logoSize) / 100;
            const x = (options.size - logoSize) / 2;
            const y = (options.size - logoSize) / 2;

            // Draw white background for logo
            ctx.fillStyle = options.backgroundColor;
            ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);

            // Draw logo
            ctx.drawImage(img, x, y, logoSize, logoSize);

            // Update data URL
            setQRDataURL(canvas.toDataURL());
          };
          img.src = options.logo;
        } else {
          setQRDataURL(canvas.toDataURL());
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQR();
  }, [qrData, options]);

  const handleLogoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setLogoError("File size must be less than 2MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setLogoError("File must be an image");
        return;
      }

      setLogoError("");

      const reader = new FileReader();
      reader.onload = (event) => {
        updateOption("logo", event.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [updateOption]
  );

  const handleRemoveLogo = useCallback(() => {
    updateOption("logo", null);
    setLogoError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [updateOption]);

  const handleDownload = useCallback(
    async (format: "png" | "svg" | "pdf") => {
      if (!qrData) return;

      try {
        if (format === "png") {
          // Use canvas data URL
          const link = document.createElement("a");
          link.href = qrDataURL;
          link.download = `qrcode-${Date.now()}.png`;
          link.click();
        } else if (format === "svg") {
          // Generate SVG
          const svg = await QRCodeLib.toString(qrData, {
            type: "svg",
            width: options.size,
            margin: 2,
            errorCorrectionLevel: options.errorCorrection,
            color: {
              dark: options.foregroundColor,
              light: options.backgroundColor,
            },
          });

          const blob = new Blob([svg], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `qrcode-${Date.now()}.svg`;
          link.click();
          URL.revokeObjectURL(url);
        } else if (format === "pdf") {
          // For PDF, we'll use canvas to image then embed in a simple PDF-like format
          // This is a simplified approach - for production, consider using jsPDF
          const link = document.createElement("a");
          link.href = qrDataURL;
          link.download = `qrcode-${Date.now()}.png`;
          link.click();
        }
      } catch (error) {
        console.error("Error downloading QR code:", error);
      }
    },
    [qrData, qrDataURL, options]
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

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
        title="QR Code Generator"
        description="Free static QR codes, no expiration"
        icon={<QrCode className="w-4 h-4 text-primary-foreground" />}
      />

      <main className={`flex-1 flex flex-col ${isFullscreen ? "p-2" : "p-4"} gap-6 w-full max-w-5xl mx-auto`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Configuration */}
          <div className="space-y-4">
            {/* QR Type Selector */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-3">
              <label className="text-sm font-semibold text-muted-foreground">QR Code Type</label>
              <select
                value={options.type}
                onChange={(e) => updateOption("type", e.target.value as QRType)}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {QR_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Input */}
            {options.type !== "wifi" && options.type !== "vcard" && (
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">
                  {QR_TYPES.find((t) => t.value === options.type)?.label} Data
                </label>
                <input
                  type="text"
                  value={options.data}
                  onChange={(e) => updateOption("data", e.target.value)}
                  placeholder={QR_TYPES.find((t) => t.value === options.type)?.placeholder}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}

            {/* WiFi Configuration */}
            {options.type === "wifi" && (
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">WiFi Details</label>
                <input
                  type="text"
                  value={wifiConfig.ssid}
                  onChange={(e) => updateWiFiConfig("ssid", e.target.value)}
                  placeholder="Network Name (SSID)"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  value={wifiConfig.password}
                  onChange={(e) => updateWiFiConfig("password", e.target.value)}
                  placeholder="Password"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <select
                  value={wifiConfig.encryption}
                  onChange={(e) => updateWiFiConfig("encryption", e.target.value as "WPA" | "WEP" | "nopass")}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No Password</option>
                </select>
              </div>
            )}

            {/* vCard Configuration */}
            {options.type === "vcard" && (
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">Contact Details</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={vcardConfig.firstName}
                    onChange={(e) => updateVCardConfig("firstName", e.target.value)}
                    placeholder="First Name"
                    className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    value={vcardConfig.lastName}
                    onChange={(e) => updateVCardConfig("lastName", e.target.value)}
                    placeholder="Last Name"
                    className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <input
                  type="text"
                  value={vcardConfig.organization}
                  onChange={(e) => updateVCardConfig("organization", e.target.value)}
                  placeholder="Organization"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="tel"
                  value={vcardConfig.phone}
                  onChange={(e) => updateVCardConfig("phone", e.target.value)}
                  placeholder="Phone"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="email"
                  value={vcardConfig.email}
                  onChange={(e) => updateVCardConfig("email", e.target.value)}
                  placeholder="Email"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="url"
                  value={vcardConfig.url}
                  onChange={(e) => updateVCardConfig("url", e.target.value)}
                  placeholder="Website"
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}

            {/* Customization */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Customization</h3>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Foreground</label>
                  <input
                    type="color"
                    value={options.foregroundColor}
                    onChange={(e) => updateOption("foregroundColor", e.target.value)}
                    className="w-full h-10 rounded bg-muted border-2 border-border cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Background</label>
                  <input
                    type="color"
                    value={options.backgroundColor}
                    onChange={(e) => updateOption("backgroundColor", e.target.value)}
                    className="w-full h-10 rounded bg-muted border-2 border-border cursor-pointer"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-muted-foreground">Size</label>
                  <span className="text-xs font-mono">{options.size}px</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  value={options.size}
                  onChange={(e) => updateOption("size", parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              {/* Error Correction */}
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Error Correction</label>
                <select
                  value={options.errorCorrection}
                  onChange={(e) => updateOption("errorCorrection", e.target.value as ErrorCorrectionLevel)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {ERROR_CORRECTION_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {ERROR_CORRECTION_LEVELS.find((l) => l.value === options.errorCorrection)?.description}
                </p>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Logo (Optional)</label>
                {!options.logo ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full gap-2"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Logo
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-secondary/30 rounded px-3 py-2 text-xs truncate">
                      Logo uploaded
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveLogo}
                      className="h-8 w-8 flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {logoError && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <p className="text-[10px] text-red-500">{logoError}</p>
                  </div>
                )}
                {options.logo && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs text-muted-foreground">Logo Size</label>
                      <span className="text-xs font-mono">{options.logoSize}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={30}
                      value={options.logoSize}
                      onChange={(e) => updateOption("logoSize", parseInt(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                )}
              </div>

              <Button variant="outline" size="sm" onClick={reset} className="w-full">
                Reset to Defaults
              </Button>
            </div>
          </div>

          {/* Right: Preview & Download */}
          <div className="space-y-4">
            {/* QR Code Preview */}
            <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center">
              <canvas ref={canvasRef} className="hidden" />
              {qrDataURL && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataURL}
                  alt="QR Code"
                  className="max-w-full h-auto rounded"
                  style={{ imageRendering: "pixelated" }}
                />
              )}
              {!qrDataURL && (
                <div className="w-64 h-64 bg-secondary/30 rounded flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Download Buttons */}
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Download</h3>
              <Button onClick={() => handleDownload("png")} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download PNG
              </Button>
              <Button onClick={() => handleDownload("svg")} variant="outline" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download SVG (Vector)
              </Button>
            </div>

            {/* Info Notice */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-start gap-2">
              <QrCode className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-emerald-500/90">
                <p className="font-medium mb-1">Static QR Code - Works Forever</p>
                <p>
                  This QR code is generated locally and works permanently. No subscriptions, no
                  expiration, no server dependency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fullscreen Toggle */}
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </main>

      {/* Info Sections */}
      {!isFullscreen && (
        <div className="flex-shrink-0 bg-background border-t border-border">
          <QRGeneratorInfoSections />
        </div>
      )}

      <Footer isFullscreen={isFullscreen} />
    </div>
  );
};

export default QRGenerator;
