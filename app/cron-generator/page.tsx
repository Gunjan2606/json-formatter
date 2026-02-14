import { Metadata } from "next";
import CronGenerator from "../pages/CronGenerator";

export const metadata: Metadata = {
  title: "Cron Expression Generator - Free Crontab Scheduler | Online Cron Builder",
  description:
    "Free cron expression generator with visual builder, human-readable explanations, and next run preview. Create crontab schedules with 13 presets. Perfect for Linux, Unix, DevOps, and task scheduling.",
  keywords: [
    "cron generator",
    "cron expression",
    "crontab generator",
    "cron builder",
    "cron schedule",
    "cron syntax",
    "crontab online",
    "cron job generator",
    "schedule generator",
    "linux cron",
    "unix cron",
    "crontab guru",
    "cron maker",
  ],
  openGraph: {
    title: "Cron Expression Generator | Free Online Crontab Builder",
    description:
      "Build cron expressions visually with human-readable explanations. Preview next 5 runs. 13 common presets. Free online cron generator for developers.",
    url: "https://jsonformatter.gg/cron-generator",
    siteName: "jsonformatter.gg",
    type: "website",
    images: [
      {
        url: "/og-image/default.png",
        width: 1200,
        height: 630,
        alt: "Cron Expression Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cron Expression Generator | jsonformatter.gg",
    description:
      "Generate cron expressions with visual builder. Human-readable explanations, next run preview, 13 presets. Free online tool.",
    images: ["/og-image/default.png"],
  },
  alternates: {
    canonical: "https://jsonformatter.gg/cron-generator",
  },
};

export default function CronGeneratorPage() {
  return <CronGenerator />;
}
