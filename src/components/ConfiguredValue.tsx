import type { ReactNode } from 'react';
import { isConfigured } from '../lib/format';

type ConfiguredValueProps = {
  value?: string | null;
  fallback?: ReactNode;
};

export function ConfiguredValue({ value, fallback = 'Not configured yet' }: ConfiguredValueProps) {
  return <>{isConfigured(value) ? value : <span className="muted">{fallback}</span>}</>;
}
