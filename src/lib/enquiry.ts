import { siteConfig } from "@/lib/siteConfig";

export const createWhatsAppUrl = (message: string) =>
  `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const createEnquiryEmailUrl = (subject: string, message: string) =>
  `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
