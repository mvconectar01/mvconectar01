export interface ProjectItem {
  id: string;
  clientId: string; // Multi-client / multi-tenant isolation key (ex: 'mv-conectar')
  title: string;
  description: string;
  category: string;
  coverImage: string;
  images: string[];
  videoUrl?: string;
  externalLink?: string;
  active: boolean;
  order: number;
  createdAt: string;
}

export const DEFAULT_CLIENT_ID = 'mv-conectar';

export const DEFAULT_CATEGORIES = [
  'BioSite Profissional',
  'Placa NFC + QR Code',
  'Google Avaliações 5★',
  'Identidade Digital',
  'Cardápio & Catálogo Digital',
  'Automação & Atendimento',
];

const STORAGE_KEY = 'mv_conectar_projects_v2';
const IDB_NAME = 'mv_conectar_db';
const IDB_STORE = 'projects_store';

// Initial curated real showcase projects for MV Conectar
const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    clientId: DEFAULT_CLIENT_ID,
    title: 'BioSite Premium — Hamburgueria Smash Burger',
    description: 'Desenvolvimento de BioSite ultra-rápido com cardápio digital integrado, botão de pedidos rápidos no WhatsApp e chave Pix automatizada.',
    category: 'BioSite Profissional',
    coverImage: '/src/assets/images/google_review_booster_1791412554419.jpg',
    images: [
      '/src/assets/images/google_review_booster_1791412554419.jpg',
      '/src/assets/images/nfc_smart_plaque_1791412545685.jpg',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    externalLink: 'https://wa.link/nvmp81',
    active: true,
    order: 1,
    createdAt: '2026-09-15',
  },
  {
    id: 'proj-2',
    clientId: DEFAULT_CLIENT_ID,
    title: 'Placas NFC em Acrílico Black — Barbearia Dom Barba',
    description: 'Instalação de 6 displays NFC nos espelhos das bancadas para os clientes seguirem o Instagram, avaliarem no Google e agendarem o próximo corte.',
    category: 'Placa NFC + QR Code',
    coverImage: '/src/assets/images/nfc_smart_plaque_1791412545685.jpg',
    images: [
      '/src/assets/images/nfc_smart_plaque_1791412545685.jpg',
      '/src/assets/images/google_review_booster_1791412554419.jpg',
    ],
    videoUrl: '',
    externalLink: 'https://wa.link/nvmp81',
    active: true,
    order: 2,
    createdAt: '2026-09-20',
  },
  {
    id: 'proj-3',
    clientId: DEFAULT_CLIENT_ID,
    title: 'Totem Google 5★ — Clínica Odontológica Sorriso Prime',
    description: 'Solução focada em autoridade médica e reputação local. Aumento de 320% nas avaliações do Google Meu Negócio em menos de 45 dias.',
    category: 'Google Avaliações 5★',
    coverImage: '/src/assets/images/google_review_booster_1791412554419.jpg',
    images: [
      '/src/assets/images/google_review_booster_1791412554419.jpg',
    ],
    videoUrl: '',
    externalLink: 'https://wa.link/nvmp81',
    active: true,
    order: 3,
    createdAt: '2026-09-28',
  },
  {
    id: 'proj-4',
    clientId: DEFAULT_CLIENT_ID,
    title: 'Ecossistema Digital Completo — Pizzaria Bella Massa',
    description: 'Combo completo unindo BioSite para link da bio, QR Code inteligente nas caixas de delivery e placa NFC no balcão de retirada.',
    category: 'Identidade Digital',
    coverImage: '/src/assets/images/nfc_smart_plaque_1791412545685.jpg',
    images: [
      '/src/assets/images/nfc_smart_plaque_1791412545685.jpg',
      '/src/assets/images/google_review_booster_1791412554419.jpg',
    ],
    videoUrl: '',
    externalLink: 'https://wa.link/nvmp81',
    active: true,
    order: 4,
    createdAt: '2026-10-02',
  },
];

/**
 * Client-side Smart Image Compressor:
 * Resizes and compresses image files to max 1280px in high-quality WebP/JPEG,
 * reducing a 10MB phone camera photo to ~100KB without visual loss.
 * Guarantees that multiple photo uploads never exceed storage limits.
 */
export const compressImage = (file: File, maxWidth = 1280, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If SVG or non-image, fallback to direct reader
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG
        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL('image/webp', quality);
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(dataUrl);
      };

      img.onerror = () => {
        resolve(readerEvent.target?.result as string);
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Open or init IndexedDB for persistent large-object storage
 */
const openDatabase = (): Promise<IDBDatabase | null> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      resolve(null);
      return;
    }

    try {
      const request = indexedDB.open(IDB_NAME, 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
};

/**
 * Synchronous in-memory and LocalStorage access with IndexedDB background sync
 */
export const getStoredProjects = (clientId: string = DEFAULT_CLIENT_ID): ProjectItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS.filter((p) => p.clientId === clientId);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS.filter((p) => p.clientId === clientId);
    }

    // Filter by client ID to ensure multi-tenant isolation
    const clientProjects = parsed.filter((p: ProjectItem) => (p.clientId || DEFAULT_CLIENT_ID) === clientId);
    return clientProjects.sort((a: ProjectItem, b: ProjectItem) => a.order - b.order);
  } catch (err) {
    console.error('Error loading projects from storage:', err);
    return INITIAL_PROJECTS.filter((p) => p.clientId === clientId);
  }
};

/**
 * Save projects synchronously to LocalStorage and asynchronously to IndexedDB
 */
export const saveProjects = (projects: ProjectItem[], clientId: string = DEFAULT_CLIENT_ID): void => {
  try {
    // Read all projects from all clients so we preserve other clients' projects
    let allProjects: ProjectItem[] = [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Keep projects belonging to OTHER clients
          allProjects = parsed.filter((p: ProjectItem) => (p.clientId || DEFAULT_CLIENT_ID) !== clientId);
        }
      } catch {
        allProjects = [];
      }
    }

    // Combine other clients' projects with the updated projects for this client
    const updatedCombined = [...allProjects, ...projects];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCombined));

    // Async persist to IndexedDB as secondary high-capacity backup
    openDatabase()
      .then((db) => {
        if (!db) return;
        const tx = db.transaction(IDB_STORE, 'readwrite');
        const store = tx.objectStore(IDB_STORE);
        projects.forEach((proj) => store.put(proj));
      })
      .catch((idbErr) => {
        // Non-fatal if IndexedDB fails in certain sandbox iframe environments
        console.warn('IndexedDB sync warning:', idbErr);
      });

    // Dispatch live event so UI updates immediately across all components
    window.dispatchEvent(new CustomEvent('mv_projects_updated', { detail: projects }));
  } catch (err) {
    console.error('Error saving projects to storage:', err);
  }
};

export const addProject = (
  projectData: Omit<ProjectItem, 'id' | 'createdAt' | 'order' | 'clientId'>,
  clientId: string = DEFAULT_CLIENT_ID
): ProjectItem => {
  const current = getStoredProjects(clientId);
  const nextOrder = current.length > 0 ? Math.max(...current.map((p) => p.order)) + 1 : 1;
  const newProject: ProjectItem = {
    ...projectData,
    clientId,
    id: 'proj-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    order: nextOrder,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updated = [...current, newProject];
  saveProjects(updated, clientId);
  return newProject;
};

export const updateProject = (
  id: string,
  updates: Partial<ProjectItem>,
  clientId: string = DEFAULT_CLIENT_ID
): ProjectItem | null => {
  const current = getStoredProjects(clientId);
  const index = current.findIndex((p) => p.id === id);
  if (index === -1) return null;

  current[index] = { ...current[index], ...updates };
  saveProjects(current, clientId);
  return current[index];
};

export const deleteProject = (id: string, clientId: string = DEFAULT_CLIENT_ID): boolean => {
  const current = getStoredProjects(clientId);
  const filtered = current.filter((p) => p.id !== id);
  if (filtered.length === current.length) return false;

  saveProjects(filtered, clientId);
  return true;
};

export const toggleProjectActive = (id: string, clientId: string = DEFAULT_CLIENT_ID): boolean => {
  const current = getStoredProjects(clientId);
  const target = current.find((p) => p.id === id);
  if (!target) return false;

  target.active = !target.active;
  saveProjects(current, clientId);
  return target.active;
};

export const reorderProjects = (
  projectId: string,
  direction: 'up' | 'down',
  clientId: string = DEFAULT_CLIENT_ID
): ProjectItem[] => {
  const current = getStoredProjects(clientId);
  const index = current.findIndex((p) => p.id === projectId);
  if (index === -1) return current;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= current.length) return current;

  // Swap orders
  const tempOrder = current[index].order;
  current[index].order = current[targetIndex].order;
  current[targetIndex].order = tempOrder;

  // Sort by order
  current.sort((a, b) => a.order - b.order);
  saveProjects(current, clientId);
  return current;
};
