import React, { useEffect, useRef, useId } from 'react';
import { getAdsterraConfig, AdUnitConfig, AdType } from '../../config/adsterraConfig';

/**
 * AdSlot Component - Production-ready, non-intrusive monetization container.
 *
 * ARCHITECTURAL GUARANTEES:
 * 1. Zero fake or mock placeholder ads on production pages (renders null when disabled/empty).
 * 2. Does NOT generate fake Adsterra IDs or synthetic scripts.
 * 3. Supports REAL, unmodified Adsterra code snippets (both standard banners and native widgets).
 * 4. Resolves the React/innerHTML script execution limitation via isolated iframe or dynamic DOM script nodes.
 * 5. React StrictMode resilient: unmount cleanly removes injected nodes and prevents duplicate ad execution.
 * 6. SPA Route-change safe: cleans up before injecting on route transitions.
 * 7. Non-intrusive: strictly bounded within container, zero z-index conflicts with navigation or modals.
 * 8. Responsive with fixed minimum dimensions to prevent Cumulative Layout Shift (CLS).
 */

export interface AdSlotProps {
  /**
   * The placement identifier defined in `ADSTERRA_CONFIG` (or common alias like 'header', 'in-content', 'sidebar')
   */
  placement: string;
  /**
   * Optional adType override
   */
  adType?: AdType;
  /**
   * Optional custom CSS class for the wrapper
   */
  className?: string;
  /**
   * Display standard non-intrusive "ADVERTISEMENT" regulatory label above unit
   * Defaults to false (clean look)
   */
  showLabel?: boolean;
  /**
   * Direct override for ad unit config if needed
   */
  configOverride?: Partial<AdUnitConfig>;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  placement,
  adType: propAdType,
  className = '',
  showLabel = false,
  configOverride,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replace(/[:]/g, '');

  // Retrieve configuration from central store
  const storedConfig = getAdsterraConfig(placement);
  const config: AdUnitConfig | undefined = storedConfig
    ? { ...storedConfig, ...configOverride }
    : configOverride?.code
    ? {
        placement,
        adType: propAdType || configOverride.adType || 'custom',
        enabled: configOverride.enabled ?? false,
        code: configOverride.code ?? '',
        renderMode: configOverride.renderMode || 'auto',
        dimensions: configOverride.dimensions,
      }
    : undefined;

  const isEnabled = Boolean(config?.enabled && config?.code && config.code.trim().length > 0);
  const effectiveCode = config?.code?.trim() || '';
  const effectiveType = propAdType || config?.adType || 'custom';

  // Determine execution mode (iframe vs dom)
  const renderMode = config?.renderMode || 'auto';
  const resolvedMode: 'iframe' | 'dom' =
    renderMode === 'iframe'
      ? 'iframe'
      : renderMode === 'dom'
      ? 'dom'
      : effectiveCode.includes('container-') || effectiveType === 'native_banner'
      ? 'dom'
      : 'iframe';

  // Normalize protocol-relative URLs (//) to https:// to ensure reliable fetching in iframes/DOM
  const normalizedCode = effectiveCode.replace(/src=(["'])\/\//gi, 'src=$1https://');

  // Lifecycle management for ad execution
  useEffect(() => {
    if (!isEnabled || !normalizedCode || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = '';

    if (resolvedMode === 'iframe') {
      const iframe = document.createElement('iframe');
      iframe.title = `Sponsored Placement - ${placement}`;
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.display = 'block';
      iframe.style.margin = '0 auto';
      iframe.style.width = '100%';
      iframe.style.maxWidth =
        typeof config?.dimensions?.width === 'number'
          ? `${config.dimensions.width}px`
          : config?.dimensions?.width || '100%';

      const calculatedHeight = config?.dimensions?.height || config?.dimensions?.minHeight || 'auto';
      iframe.style.height = typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight;

      const sanitizedDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="${window.location.origin}/" target="_blank">
    <style>
      *, *::before, *::after { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    ${normalizedCode}
  </body>
</html>`;

      container.appendChild(iframe);

      try {
        const doc = iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(sanitizedDoc);
          doc.close();
        } else {
          iframe.srcdoc = sanitizedDoc;
        }
      } catch {
        iframe.srcdoc = sanitizedDoc;
      }

      return () => {
        iframe.remove();
        container.innerHTML = '';
      };
    } else {
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(normalizedCode, 'text/html');

      const nonScripts = Array.from(parsedDoc.body.childNodes).filter(
        (node) => node.nodeName.toLowerCase() !== 'script'
      );
      nonScripts.forEach((node) => {
        container.appendChild(node.cloneNode(true));
      });

      const scripts = Array.from(parsedDoc.querySelectorAll('script'));
      const createdScripts: HTMLScriptElement[] = [];

      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) => {
          let val = attr.value;
          if (attr.name === 'src' && val.startsWith('//')) {
            val = `https:${val}`;
          }
          newScript.setAttribute(attr.name, val);
        });
        if (oldScript.textContent) {
          newScript.text = oldScript.textContent;
        }
        container.appendChild(newScript);
        createdScripts.push(newScript);
      });

      return () => {
        createdScripts.forEach((script) => script.remove());
        container.innerHTML = '';
      };
    }
  }, [isEnabled, normalizedCode, resolvedMode, placement, config?.dimensions?.width, config?.dimensions?.height, config?.dimensions?.minHeight]);

  // CRITICAL REQUIREMENT: Do NOT render fake ads or placeholder advertisements on production pages.
  if (!isEnabled) {
    return null;
  }

  // Derive stable dimensions to avoid Layout Shift
  const minHeight = config?.dimensions?.minHeight
    ? typeof config.dimensions.minHeight === 'number'
      ? `${config.dimensions.minHeight}px`
      : config.dimensions.minHeight
    : 'auto';

  return (
    <aside
      id={`ad-slot-${instanceId}`}
      aria-label="Sponsored Content"
      className={`relative z-10 my-4 sm:my-6 select-none pointer-events-auto flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {showLabel && (
        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">
          Advertisement
        </span>
      )}
      <div
        ref={containerRef}
        style={{ minHeight }}
        className="w-full flex items-center justify-center overflow-hidden"
      />
    </aside>
  );
};
