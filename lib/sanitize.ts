import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * Uses a JSDOM window for server-side sanitization.
 * 
 * @param html The dirty HTML string
 * @returns Clean, safe HTML string
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Create a window object for DOMPurify to use on the server
  const window = new JSDOM('').window;
  const purify = DOMPurify(window as any);
  
  return purify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

/**
 * Strips all HTML tags and returns plain text.
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  const window = new JSDOM('').window;
  const purify = DOMPurify(window as any);
  return purify.sanitize(html, { ALLOWED_TAGS: [] });
}
