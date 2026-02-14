"use client";

import { useState, useCallback, useMemo } from "react";

export type QRType = "url" | "text" | "email" | "phone" | "sms" | "wifi" | "vcard";
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export interface QROptions {
  type: QRType;
  data: string;
  size: number;
  errorCorrection: ErrorCorrectionLevel;
  foregroundColor: string;
  backgroundColor: string;
  logo: string | null;
  logoSize: number;
}

export interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export interface VCardConfig {
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
  email: string;
  url: string;
  address: string;
}

const DEFAULT_OPTIONS: QROptions = {
  type: "url",
  data: "https://jsonformatter.gg",
  size: 300,
  errorCorrection: "M",
  foregroundColor: "#000000",
  backgroundColor: "#ffffff",
  logo: null,
  logoSize: 20,
};

function generateWiFiString(config: WiFiConfig): string {
  const { ssid, password, encryption, hidden } = config;
  return `WIFI:T:${encryption};S:${ssid};P:${password};H:${hidden ? "true" : "false"};;`;
}

function generateVCardString(config: VCardConfig): string {
  const { firstName, lastName, organization, phone, email, url, address } = config;
  return `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
ORG:${organization}
TEL:${phone}
EMAIL:${email}
URL:${url}
ADR:;;${address};;;;
END:VCARD`;
}

function formatDataForType(type: QRType, data: string, wifiConfig?: WiFiConfig, vcardConfig?: VCardConfig): string {
  switch (type) {
    case "url":
      return data.startsWith("http") ? data : `https://${data}`;
    case "email":
      return `mailto:${data}`;
    case "phone":
      return `tel:${data}`;
    case "sms":
      return `sms:${data}`;
    case "wifi":
      return wifiConfig ? generateWiFiString(wifiConfig) : "";
    case "vcard":
      return vcardConfig ? generateVCardString(vcardConfig) : "";
    default:
      return data;
  }
}

export function useQRGenerator() {
  const [options, setOptions] = useState<QROptions>(DEFAULT_OPTIONS);
  const [wifiConfig, setWiFiConfig] = useState<WiFiConfig>({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });
  const [vcardConfig, setVCardConfig] = useState<VCardConfig>({
    firstName: "",
    lastName: "",
    organization: "",
    phone: "",
    email: "",
    url: "",
    address: "",
  });

  const updateOption = useCallback(<K extends keyof QROptions>(key: K, value: QROptions[K]) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateWiFiConfig = useCallback(<K extends keyof WiFiConfig>(key: K, value: WiFiConfig[K]) => {
    setWiFiConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateVCardConfig = useCallback(<K extends keyof VCardConfig>(key: K, value: VCardConfig[K]) => {
    setVCardConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const qrData = useMemo(() => {
    return formatDataForType(options.type, options.data, wifiConfig, vcardConfig);
  }, [options.type, options.data, wifiConfig, vcardConfig]);

  const reset = useCallback(() => {
    setOptions(DEFAULT_OPTIONS);
    setWiFiConfig({
      ssid: "",
      password: "",
      encryption: "WPA",
      hidden: false,
    });
    setVCardConfig({
      firstName: "",
      lastName: "",
      organization: "",
      phone: "",
      email: "",
      url: "",
      address: "",
    });
  }, []);

  return {
    options,
    updateOption,
    wifiConfig,
    updateWiFiConfig,
    vcardConfig,
    updateVCardConfig,
    qrData,
    reset,
  };
}
