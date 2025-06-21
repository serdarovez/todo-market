import DOMPurify from 'isomorphic-dompurify';

export function sanitize(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'ul', 'li', 'br'], ALLOWED_ATTR: ['href'] });
}
