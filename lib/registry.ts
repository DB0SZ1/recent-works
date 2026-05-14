import DitheringLanding from '@/components/landings/dithering-landing';
import CryptoLanding from '@/components/landings/crypto-landing';
import AIPipelineLanding from '@/components/landings/ai-pipeline-landing';
import AppLanding from '@/components/landings/app-landing';
import EcommerceLanding from '@/components/landings/ecommerce-landing';
import GeometricLanding from '@/components/landings/geometric-landing';
import type { PageEntry } from '@/components/portfolio-tabs';

export const pages: (PageEntry & { component: React.ComponentType })[] = [
  {
    key: 'studio',
    label: 'Design Studio',
    accent: '#EC4E02',
    dark: false,
    component: DitheringLanding,
  },
  {
    key: 'crypto',
    label: 'Lunexa Crypto',
    accent: '#9b87f5',
    dark: true,
    component: CryptoLanding,
  },
  {
    key: 'ai-pipeline',
    label: 'AI Pipeline',
    accent: '#ffffff',
    dark: true,
    component: AIPipelineLanding,
  },
  {
    key: 'nexus',
    label: 'Nexus App',
    accent: '#a78bfa',
    dark: true,
    component: AppLanding,
  },
  {
    key: 'ecommerce',
    label: 'Luxury Commerce',
    accent: '#c9a96e',
    dark: false,
    component: EcommerceLanding,
  },
  {
    key: 'geometric',
    label: 'SaaS CRM',
    accent: '#6366f1',
    dark: false,
    component: GeometricLanding,
  },
];