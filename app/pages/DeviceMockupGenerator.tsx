"use client";

import { useState, useRef } from "react";
import { Header } from "../components/formatter/Header";
import { Footer } from "../components/formatter/Footer";
import { Button } from "../components/ui/button";
import { useDeviceMockup, DeviceType, DeviceColor } from "../hooks/useDeviceMockup";
import { Smartphone, Upload, Download, RotateCcw, X } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import html2canvas from "html2canvas";
import { DeviceMockupInfoSections } from "../components/formatter/DeviceMockupInfoSections";

const devices = [
  { id: "iphone-15-pro", name: "iPhone 15 Pro", width: 393, height: 852 },
  { id: "iphone-14", name: "iPhone 14", width: 390, height: 844 },
  { id: "macbook-pro", name: "MacBook Pro", width: 1600, height: 1000 },
  { id: "ipad-pro", name: "iPad Pro", width: 1024, height: 1366 },
  { id: "android", name: "Android", width: 412, height: 915 },
];

const deviceColors = [
  { id: "black", name: "Space Black", color: "#1a1a1a" },
  { id: "white", name: "White", color: "#f5f5f7" },
  { id: "silver", name: "Silver", color: "#e3e4e6" },
  { id: "gold", name: "Gold", color: "#fad7bd" },
];

export default function DeviceMockupGenerator() {
  const {
    settings,
    uploadedImage,
    updateSettings,
    handleImageUpload,
    reset,
    clearImage,
  } = useDeviceMockup();

  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!mockupRef.current || !uploadedImage) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(mockupRef.current, {
        backgroundColor: settings.backgroundType === "transparent" ? null : undefined,
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `mockup-${settings.device}.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast({
            title: "Downloaded!",
            description: "Device mockup saved as PNG",
          });
        }
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate mockup",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getDeviceFrame = () => {
    const device = devices.find((d) => d.id === settings.device);
    const isPhone = settings.device.includes("iphone") || settings.device === "android";
    const isMacBook = settings.device === "macbook-pro";
    const isIPad = settings.device === "ipad-pro";

    const frameColor = deviceColors.find((c) => c.id === settings.deviceColor)?.color || "#1a1a1a";

    if (isPhone) {
      return (
        <div
          className="relative"
          style={{
            width: device!.width / 2,
            height: device!.height / 2,
            backgroundColor: frameColor,
            borderRadius: "48px",
            padding: "12px",
            boxShadow: settings.shadow
              ? "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)"
              : "none",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black"
            style={{
              width: "120px",
              height: "30px",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          />

          {/* Screen */}
          <div
            className="relative w-full h-full bg-black rounded-[36px] overflow-hidden"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Screenshot"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      );
    }

    if (isMacBook) {
      return (
        <div className="flex flex-col items-center">
          {/* Screen */}
          <div
            style={{
              width: device!.width / 2.5,
              height: device!.height / 2.5,
              backgroundColor: frameColor,
              borderRadius: "12px",
              padding: "16px",
              boxShadow: settings.shadow
                ? "0 20px 60px rgba(0, 0, 0, 0.3)"
                : "none",
            }}
          >
            <div
              className="w-full h-full bg-black rounded-lg overflow-hidden"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Screenshot"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Base */}
          <div
            style={{
              width: device!.width / 2.5 + 40,
              height: "8px",
              backgroundColor: frameColor,
              borderRadius: "0 0 8px 8px",
              marginTop: "-2px",
            }}
          />
        </div>
      );
    }

    if (isIPad) {
      return (
        <div
          style={{
            width: device!.width / 2.5,
            height: device!.height / 2.5,
            backgroundColor: frameColor,
            borderRadius: "32px",
            padding: "20px",
            boxShadow: settings.shadow
              ? "0 20px 60px rgba(0, 0, 0, 0.3)"
              : "none",
          }}
        >
          <div
            className="w-full h-full bg-black rounded-[24px] overflow-hidden"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Screenshot"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  const getBackgroundStyle = () => {
    if (settings.backgroundType === "transparent") {
      return {
        background: "transparent",
        backgroundImage:
          "linear-gradient(45deg, #f3f4f6 25%, transparent 25%), linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f4f6 75%), linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      };
    }

    if (settings.backgroundType === "gradient") {
      return {
        background: `linear-gradient(135deg, ${settings.gradientStart}, ${settings.gradientEnd})`,
      };
    }

    return {
      backgroundColor: settings.backgroundColor,
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header
        title="Device Mockup Generator"
        icon={<Smartphone className="w-6 h-6" />}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSearch={() => {}}
        onToggleSidebar={() => {}}
        savedOutputsCount={0}
      />

      <main className={`flex-1 w-full ${isFullscreen ? "" : "max-w-7xl mx-auto px-4 py-8"}`}>
        <div className="space-y-6">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />

          {uploadedImage && (
            <>
              {/* Preview */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Preview</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                    <Button onClick={handleDownload} size="sm" disabled={isGenerating}>
                      <Download className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "Download"}
                    </Button>
                  </div>
                </div>

                <div
                  ref={mockupRef}
                  className="flex items-center justify-center p-12 rounded-lg"
                  style={getBackgroundStyle()}
                >
                  {getDeviceFrame()}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Selection */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold">Device</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {devices.map((device) => (
                      <Button
                        key={device.id}
                        onClick={() => updateSettings({ device: device.id as DeviceType })}
                        variant={settings.device === device.id ? "default" : "outline"}
                        className="h-auto py-3"
                      >
                        {device.name}
                      </Button>
                    ))}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Frame Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {deviceColors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => updateSettings({ deviceColor: color.id as DeviceColor })}
                          className={`h-12 rounded-lg border-2 transition-all ${
                            settings.deviceColor === color.id
                              ? "border-primary scale-105"
                              : "border-border hover:border-primary/50"
                          }`}
                          style={{ backgroundColor: color.color }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background Settings */}
                <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold">Background</h3>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => updateSettings({ backgroundType: "transparent" })}
                      variant={settings.backgroundType === "transparent" ? "default" : "outline"}
                      size="sm"
                    >
                      Transparent
                    </Button>
                    <Button
                      onClick={() => updateSettings({ backgroundType: "solid" })}
                      variant={settings.backgroundType === "solid" ? "default" : "outline"}
                      size="sm"
                    >
                      Solid
                    </Button>
                    <Button
                      onClick={() => updateSettings({ backgroundType: "gradient" })}
                      variant={settings.backgroundType === "gradient" ? "default" : "outline"}
                      size="sm"
                    >
                      Gradient
                    </Button>
                  </div>

                  {settings.backgroundType === "solid" && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                          className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                        />
                        <input
                          type="text"
                          value={settings.backgroundColor}
                          onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                          className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {settings.backgroundType === "gradient" && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Gradient Start</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={settings.gradientStart}
                            onChange={(e) => updateSettings({ gradientStart: e.target.value })}
                            className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                          />
                          <input
                            type="text"
                            value={settings.gradientStart}
                            onChange={(e) => updateSettings({ gradientStart: e.target.value })}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Gradient End</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={settings.gradientEnd}
                            onChange={(e) => updateSettings({ gradientEnd: e.target.value })}
                            className="w-12 h-10 rounded cursor-pointer bg-muted border-2 border-border"
                          />
                          <input
                            type="text"
                            value={settings.gradientEnd}
                            onChange={(e) => updateSettings({ gradientEnd: e.target.value })}
                            className="flex-1 px-3 py-2 bg-background border border-border rounded font-mono text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="shadow"
                      checked={settings.shadow}
                      onChange={(e) => updateSettings({ shadow: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <label htmlFor="shadow" className="text-sm font-medium">
                      Add Shadow
                    </label>
                  </div>

                  <Button onClick={reset} variant="outline" className="w-full">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {!isFullscreen && (
        <>
          <DeviceMockupInfoSections />
          <Footer isFullscreen={isFullscreen} />
        </>
      )}
    </div>
  );
}
