/**
 * Error filtering utility for suppressing benign third-party iframe errors.
 *
 * WHY THIS EXISTS:
 * The Contact page embeds a Cal.com scheduling widget via iframe. This embed
 * generates noisy cross-origin script errors in the browser console that are
 * harmless and expected behavior for cross-origin iframes. These errors do not
 * affect the functionality of the embed or the application.
 *
 * Without this filtering, these benign errors would:
 * - Pollute the browser console
 * - Trigger the ErrorBoundary fallback UI unnecessarily
 * - Appear in error monitoring/reporting tools
 *
 * WHAT WE FILTER:
 * 1. Errors originating from known Cal.com domains (cal.com, app.cal.com)
 * 2. Generic browser "Script error." messages (expected for any cross-origin script)
 * 3. Specific iframe-related error messages that are known to be harmless
 *
 * WHAT WE DON'T FILTER:
 * - Real application errors from our own code
 * - Errors from other third-party domains (unless they match the above patterns)
 * - Errors that happen to contain "cross-origin" or "cal.com" in the message but
 *   originate from different sources
 *
 * The filtering is intentionally strict: we check the error source/filename first
 * (when available) before falling back to message text matching, to avoid
 * accidentally suppressing real application errors that happen to contain similar
 * words in their error messages.
 */

/**
 * Known Cal.com domains that generate benign cross-origin errors.
 */
const CAL_COM_DOMAINS = ['cal.com', 'app.cal.com'];

/**
 * Generic browser error message for cross-origin scripts.
 * This is the exact message browsers use when they can't provide details due to CORS.
 */
const SCRIPT_ERROR_MESSAGE = 'script error';

/**
 * Specific iframe-related error messages that are known to be harmless.
 */
const IFRAME_ERROR_PATTERNS = [
  'blocked a frame with origin',
];

/**
 * Determines if an error should be suppressed based on its source and message.
 *
 * @param message - The error message (string or Error object)
 * @param source - The source URL/filename where the error originated (optional)
 * @returns true if the error should be suppressed, false otherwise
 */
export function shouldSuppressError(message: unknown, source?: string): boolean {
  // message is unknown; String() safely stringifies it but triggers a false-positive lint warning
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const msg = String(message || '').toLowerCase();
  const src = String(source || '').toLowerCase();

  // Check if error originates from known Cal.com domains
  // This is the most reliable check when source is available
  if (src && CAL_COM_DOMAINS.some(domain => src.includes(domain))) {
    return true;
  }

  // Check for generic "Script error." message
  // This is the exact browser message for cross-origin script errors
  // We only match this exact pattern to avoid suppressing other errors
  if (msg === SCRIPT_ERROR_MESSAGE) {
    return true;
  }

  // Check for specific iframe-related error patterns
  // These are known to be harmless when they appear in the context of iframes
  if (IFRAME_ERROR_PATTERNS.some(pattern => msg.includes(pattern))) {
    return true;
  }

  // Do not suppress - let the error propagate normally
  return false;
}
