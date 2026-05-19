export const WHATSAPP_CONTACTS = {
  fashion: "2347083794965",
  hair: "2349151024440",
} as const;

export type ContactCategory = keyof typeof WHATSAPP_CONTACTS;

export function getWhatsAppLink(productTitle: string, category: string) {
  const contactKey = category === 'hair' ? 'hair' : 'fashion';
  const phoneNumber = WHATSAPP_CONTACTS[contactKey];
  const message = `Hello Dark Easterner Collections, I am interested in the product: ${productTitle}`;
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
