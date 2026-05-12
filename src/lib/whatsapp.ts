/**
 * WhatsApp Utility for Dark Easterner Collections.
 * Generates dynamic pre-filled inquiry links with a luxury concierge tone.
 * Focuses on human-centric language and emotional continuity.
 */

const NUMBERS = {
  PRIMARY_CONCIERGE: '2347083794965', // Cynthia's direct concierge line
  HAIR_SPECIALIST: '2349151024440',
};

export type InquiryType = 'collection' | 'styling' | 'wigs' | 'general';

export interface InquiryOptions {
  type?: InquiryType;
  productName?: string;
  category?: string;
  customMessage?: string;
}

/**
 * Generates a WhatsApp URL with an elegant, concierge-ready message.
 * Optimized for mobile display and human connection.
 */
export const createWhatsAppInquiry = ({
  type = 'general',
  productName,
  category,
  customMessage,
}: InquiryOptions = {}): string => {
  // Route to specific specialist if hair-related
  const number = category === 'wigs' || type === 'wigs' 
    ? NUMBERS.HAIR_SPECIALIST 
    : NUMBERS.PRIMARY_CONCIERGE;
  
  // Base Greeting: Personal and Composed
  let message = 'Hello Cynthia, ';

  if (customMessage) {
    message += customMessage;
  } else {
    switch (type) {
      case 'styling':
        message += 'I would like to book a private styling consultation with Dark Easterner Collections. I am looking to elevate my presence for an upcoming occasion.';
        break;
      
      case 'wigs':
        message += 'I am interested in your luxury hair collection and would love more information on your current curated selections.';
        break;

      case 'collection':
        if (productName) {
          message += `I’m interested in the "${productName}" from your latest collection. I would love to discuss the details and availability with you.`;
        } else {
          message += 'I have been exploring your digital showroom and would love to learn more about your current couture pieces.';
        }
        break;

      default:
        message += 'I have been following Dark Easterner Collections and would love to start a conversation about your signature pieces.';
        break;
    }
  }

  // Ensure clean URL encoding for mobile reliability
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

/**
 * High-level helper for getting a direct link.
 */
export const getWhatsAppLink = (options: InquiryOptions) => createWhatsAppInquiry(options);
