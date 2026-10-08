export interface CustomLinkItem {
  id: string;
  name: string;
  icon: string;
  url: string;
  order: number;
  active: boolean;
}

export interface LocationSettings {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  mapsUrl: string;
}

export interface SiteTextSettings {
  title: string;
  slogan: string;
  subSlogan: string;
  footerQuote: string;
}

export interface SiteAppearanceSettings {
  accentColor: 'cyan' | 'blue' | 'sky';
  badgeText: string;
}

export interface SiteSettings {
  clientId: string; // Multi-client tenant id
  adminPin: string; // Master PIN for admin access
  appearance: SiteAppearanceSettings;
  texts: SiteTextSettings;
  location: LocationSettings;
  customLinks: CustomLinkItem[];
  socials: {
    whatsapp: string;
    instagram: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
  };
}

const SETTINGS_STORAGE_KEY = 'mv_conectar_settings_v1';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  clientId: 'mv-conectar',
  adminPin: 'mv2026',
  appearance: {
    accentColor: 'cyan',
    badgeText: 'Presença Digital · Tecnologia & Inovação',
  },
  texts: {
    title: 'MV CONECTAR',
    slogan: 'Conecte sua empresa ao digital.',
    subSlogan: 'Centralize sua presença online, transforme clientes presenciais em seguidores fiéis e acelere suas vendas com BioSite profissional, NFC por aproximação e QR Code inteligente.',
    footerQuote: 'Conectando empresas, pessoas e oportunidades.',
  },
  location: {
    address: 'Atendimento Digital em Todo o Brasil',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01000-000',
    mapsUrl: 'https://maps.google.com/?q=MV+Conectar',
  },
  socials: {
    whatsapp: 'https://wa.link/nvmp81',
    instagram: 'https://www.instagram.com/mvconectar?stkn=MTc4bXVpbzBjeTFoYg%3D%3D&utm_source=qr',
  },
  customLinks: [
    {
      id: 'link-1',
      name: 'Fale Conosco no WhatsApp',
      icon: 'MessageCircle',
      url: 'https://wa.link/nvmp81',
      order: 1,
      active: true,
    },
    {
      id: 'link-2',
      name: 'Avalie nossa empresa no Google',
      icon: 'Star',
      url: 'https://wa.link/nvmp81',
      order: 2,
      active: true,
    },
    {
      id: 'link-3',
      name: 'Acompanhe nosso Instagram Oficial',
      icon: 'Instagram',
      url: 'https://www.instagram.com/mvconectar?stkn=MTc4bXVpbzBjeTFoYg%3D%3D&utm_source=qr',
      order: 3,
      active: true,
    },
    {
      id: 'link-4',
      name: 'Como Chegar (Google Maps)',
      icon: 'MapPin',
      url: 'https://maps.google.com/?q=MV+Conectar',
      order: 4,
      active: true,
    },
    {
      id: 'link-5',
      name: 'Catálogo de Produtos & Soluções',
      icon: 'ShoppingBag',
      url: '#solucoes',
      order: 5,
      active: true,
    },
  ],
};

export const getSiteSettings = (): SiteSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
      return DEFAULT_SITE_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SITE_SETTINGS,
      ...parsed,
      location: { ...DEFAULT_SITE_SETTINGS.location, ...(parsed.location || {}) },
      texts: { ...DEFAULT_SITE_SETTINGS.texts, ...(parsed.texts || {}) },
      socials: { ...DEFAULT_SITE_SETTINGS.socials, ...(parsed.socials || {}) },
      appearance: { ...DEFAULT_SITE_SETTINGS.appearance, ...(parsed.appearance || {}) },
      customLinks: Array.isArray(parsed.customLinks) ? parsed.customLinks : DEFAULT_SITE_SETTINGS.customLinks,
    };
  } catch (err) {
    console.error('Error reading site settings:', err);
    return DEFAULT_SITE_SETTINGS;
  }
};

export const saveSiteSettings = (settings: SiteSettings): void => {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('mv_settings_updated', { detail: settings }));
  } catch (err) {
    console.error('Error saving site settings:', err);
  }
};

export const addCustomLink = (linkData: Omit<CustomLinkItem, 'id' | 'order'>): CustomLinkItem => {
  const current = getSiteSettings();
  const nextOrder = current.customLinks.length > 0 ? Math.max(...current.customLinks.map((l) => l.order)) + 1 : 1;
  const newLink: CustomLinkItem = {
    ...linkData,
    id: 'link-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    order: nextOrder,
  };

  const updatedLinks = [...current.customLinks, newLink];
  saveSiteSettings({ ...current, customLinks: updatedLinks });
  return newLink;
};

export const updateCustomLink = (id: string, updates: Partial<CustomLinkItem>): CustomLinkItem | null => {
  const current = getSiteSettings();
  const index = current.customLinks.findIndex((l) => l.id === id);
  if (index === -1) return null;

  current.customLinks[index] = { ...current.customLinks[index], ...updates };
  saveSiteSettings(current);
  return current.customLinks[index];
};

export const deleteCustomLink = (id: string): boolean => {
  const current = getSiteSettings();
  const filtered = current.customLinks.filter((l) => l.id !== id);
  if (filtered.length === current.customLinks.length) return false;

  saveSiteSettings({ ...current, customLinks: filtered });
  return true;
};

export const reorderCustomLinks = (linkId: string, direction: 'up' | 'down'): CustomLinkItem[] => {
  const current = getSiteSettings();
  const index = current.customLinks.findIndex((l) => l.id === linkId);
  if (index === -1) return current.customLinks;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= current.customLinks.length) return current.customLinks;

  const tempOrder = current.customLinks[index].order;
  current.customLinks[index].order = current.customLinks[targetIndex].order;
  current.customLinks[targetIndex].order = tempOrder;

  current.customLinks.sort((a, b) => a.order - b.order);
  saveSiteSettings(current);
  return current.customLinks;
};
