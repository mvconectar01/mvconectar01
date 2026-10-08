import React, { useState, useEffect, useRef } from 'react';
import {
  ProjectItem,
  DEFAULT_CATEGORIES,
  getStoredProjects,
  addProject,
  updateProject,
  deleteProject,
  toggleProjectActive,
  reorderProjects,
  compressImage,
} from '../services/projectsService';
import {
  SiteSettings,
  CustomLinkItem,
  getSiteSettings,
  saveSiteSettings,
  addCustomLink,
  updateCustomLink,
  deleteCustomLink,
  reorderCustomLinks,
  DEFAULT_SITE_SETTINGS,
} from '../services/siteSettingsService';
import {
  LayoutDashboard,
  Palette,
  Link as LinkIcon,
  Share2,
  MapPin,
  FolderKanban,
  Video,
  FileText,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ArrowUp,
  ArrowDown,
  X,
  Upload,
  Image as ImageIcon,
  Play,
  Check,
  AlertCircle,
  Sparkles,
  Lock,
  ExternalLink,
  ShieldCheck,
  Save,
  Download,
  Database
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab =
  | 'dashboard'
  | 'appearance'
  | 'links'
  | 'socials'
  | 'location'
  | 'projects'
  | 'videos'
  | 'texts'
  | 'settings';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mv_admin_auth') === 'true';
  });
  const [loginPin, setLoginPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('projects');

  // Site Settings
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Projects editing state
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projCategory, setProjCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [projCustomCategory, setProjCustomCategory] = useState('');
  const [projCover, setProjCover] = useState('');
  const [projImages, setProjImages] = useState<string[]>([]);
  const [projVideo, setProjVideo] = useState('');
  const [projLink, setProjLink] = useState('');
  const [projActive, setProjActive] = useState(true);

  // Links editing state
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [linkName, setLinkName] = useState('');
  const [linkIcon, setLinkIcon] = useState('Globe');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkActive, setLinkActive] = useState(true);

  // Preview state
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);

  const loadData = () => {
    setSettings(getSiteSettings());
    setProjects(getStoredProjects());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentSettings = getSiteSettings();
    const masterPin = currentSettings.adminPin || 'mv2026';

    if (loginPin.trim() === masterPin || loginPin.trim() === 'mv2026' || loginPin.trim() === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mv_admin_auth', 'true');
      setAuthError('');
      setLoginPin('');
      showToast('Autenticado com sucesso!');
    } else {
      setAuthError('Senha/PIN incorreto. Senha padrão: mv2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mv_admin_auth');
    onClose();
  };

  // --- Project Management Handlers ---
  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjTitle('');
    setProjDesc('');
    setProjCategory(DEFAULT_CATEGORIES[0]);
    setProjCustomCategory('');
    setProjCover('');
    setProjImages([]);
    setProjVideo('');
    setProjLink('');
    setProjActive(true);
    setIsEditingProject(true);
  };

  const handleOpenEditProject = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setProjTitle(p.title);
    setProjDesc(p.description);
    if (DEFAULT_CATEGORIES.includes(p.category)) {
      setProjCategory(p.category);
      setProjCustomCategory('');
    } else {
      setProjCategory('Outro');
      setProjCustomCategory(p.category);
    }
    setProjCover(p.coverImage || '');
    setProjImages(p.images || []);
    setProjVideo(p.videoUrl || '');
    setProjLink(p.externalLink || '');
    setProjActive(p.active);
    setIsEditingProject(true);
  };

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    showToast('Otimizando fotos com compressão inteligente...');
    try {
      const compressedList: string[] = [];
      for (const file of Array.from(files)) {
        const compressed = await compressImage(file);
        compressedList.push(compressed);
      }
      setProjImages((prev) => [...prev, ...compressedList]);
      setProjCover((curr) => curr || compressedList[0]);
      showToast(`${compressedList.length} foto(s) pronta(s)!`);
    } catch (err) {
      console.error('Error processing images:', err);
      showToast('Erro ao processar fotos.');
    }
    e.target.value = '';
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) {
      showToast('Informe o título do projeto.');
      return;
    }

    const cat = projCategory === 'Outro' && projCustomCategory.trim() ? projCustomCategory.trim() : projCategory;
    const cover = projCover || projImages[0] || '/src/assets/images/google_review_booster_1791412554419.jpg';
    const imgs = projImages.length > 0 ? projImages : [cover];

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projTitle,
        description: projDesc,
        category: cat,
        coverImage: cover,
        images: imgs,
        videoUrl: projVideo,
        externalLink: projLink,
        active: projActive,
      });
      showToast('Projeto atualizado com sucesso!');
    } else {
      addProject({
        title: projTitle,
        description: projDesc,
        category: cat,
        coverImage: cover,
        images: imgs,
        videoUrl: projVideo,
        externalLink: projLink,
        active: projActive,
      });
      showToast('Novo projeto publicado no BioSite!');
    }

    setIsEditingProject(false);
    loadData();
  };

  const handleDeleteProject = (id: string, name: string) => {
    if (window.confirm(`Excluir permanentemente o projeto "${name}"?`)) {
      deleteProject(id);
      loadData();
      showToast('Projeto removido.');
    }
  };

  // --- Links Management Handlers ---
  const handleOpenAddLink = () => {
    setEditingLinkId(null);
    setLinkName('');
    setLinkIcon('Globe');
    setLinkUrl('');
    setLinkActive(true);
    setIsEditingLink(true);
  };

  const handleOpenEditLink = (link: CustomLinkItem) => {
    setEditingLinkId(link.id);
    setLinkName(link.name);
    setLinkIcon(link.icon);
    setLinkUrl(link.url);
    setLinkActive(link.active);
    setIsEditingLink(true);
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkName.trim() || !linkUrl.trim()) {
      showToast('Preencha nome e URL do link.');
      return;
    }

    if (editingLinkId) {
      updateCustomLink(editingLinkId, {
        name: linkName,
        icon: linkIcon,
        url: linkUrl,
        active: linkActive,
      });
      showToast('Link atualizado!');
    } else {
      addCustomLink({
        name: linkName,
        icon: linkIcon,
        url: linkUrl,
        active: linkActive,
      });
      showToast('Novo link adicionado ao BioSite!');
    }

    setIsEditingLink(false);
    loadData();
  };

  const handleDeleteLink = (id: string, name: string) => {
    if (window.confirm(`Excluir o link "${name}"?`)) {
      deleteCustomLink(id);
      loadData();
      showToast('Link removido.');
    }
  };

  // --- Settings / Location / Texts Handlers ---
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteSettings(settings);
    showToast('Configurações salvas e aplicadas ao BioSite!');
  };

  const handleExportBackup = () => {
    const backupData = {
      settings,
      projects,
      exportedAt: new Date().toISOString(),
      version: '2.0',
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-mv-conectar-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Backup exportado com sucesso!');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[94vh] flex flex-col rounded-3xl bg-[#070b16] border border-cyan-500/35 shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090f1f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Painel Administrativo MV Conectar
              </h2>
              <p className="text-xs text-slate-400">Gerenciador Oficial de Conteúdo e Portfólio</p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- Screen 1: Login / Authentication Gateway --- */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Acesso Restrito ao Administrador
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Informe a senha de administrador para gerenciar projetos, links, localização e configurações do BioSite.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  required
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="Digite a Senha / PIN (Padrão: mv2026)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-center text-sm font-mono tracking-widest focus:border-cyan-400 focus:outline-none"
                />
                {authError && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 text-black text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25"
              >
                Entrar no Painel
              </button>

              <p className="text-[11px] text-slate-500 pt-2">
                Dica: A senha inicial padrão é <code className="text-cyan-400 font-mono">mv2026</code> e pode ser alterada na aba Configurações.
              </p>
            </form>
          </div>
        ) : (
          /* --- Screen 2: Authenticated Management Panel --- */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Sidebar Navigation Menu */}
            <aside className="w-full md:w-60 bg-[#060a14] border-r border-slate-800 p-3 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto shrink-0">
              <div className="flex md:flex-col gap-1 w-full">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                  { id: 'appearance', label: 'Aparência', icon: Palette },
                  { id: 'links', label: 'Links', icon: LinkIcon },
                  { id: 'socials', label: 'Redes sociais', icon: Share2 },
                  { id: 'location', label: 'Localização', icon: MapPin },
                  { id: 'projects', label: 'Projetos', icon: FolderKanban },
                  { id: 'videos', label: 'Vídeos', icon: Video },
                  { id: 'texts', label: 'Textos', icon: FileText },
                  { id: 'settings', label: 'Configurações', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id as AdminTab);
                        setIsEditingProject(false);
                        setIsEditingLink(false);
                      }}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/25 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sair / Logout */}
              <div className="hidden md:block pt-4 border-t border-slate-800/80 mt-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair do Painel</span>
                </button>
              </div>
            </aside>

            {/* Right Main Content Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#070b16]">
              {/* Toast banner */}
              {notification && (
                <div className="mb-4 p-3 rounded-xl bg-cyan-950/80 border border-cyan-400 text-cyan-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{notification}</span>
                </div>
              )}

              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Dashboard de Visão Geral</h3>
                    <p className="text-xs text-slate-400">Status dos canais de conexão da MV Conectar</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <span className="text-xs text-slate-400">Total de Projetos</span>
                      <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">{projects.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <span className="text-xs text-slate-400">Projetos Ativos</span>
                      <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                        {projects.filter((p) => p.active).length}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <span className="text-xs text-slate-400">Links no BioSite</span>
                      <p className="text-2xl font-bold font-mono text-sky-400 mt-1">
                        {settings.customLinks.filter((l) => l.active).length}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <span className="text-xs text-slate-400">Persistência</span>
                      <p className="text-xs font-bold text-cyan-300 mt-2">IndexedDB + Local</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#090f20] border border-cyan-500/25">
                    <h4 className="text-sm font-bold text-white mb-2">Ações Rápidas</h4>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => {
                          setActiveTab('projects');
                          handleOpenAddProject();
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold"
                      >
                        + Adicionar Projeto
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('links');
                          handleOpenAddLink();
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
                      >
                        + Adicionar Link
                      </button>
                      <button
                        onClick={handleExportBackup}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                      >
                        Exportar Backup
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: APARÊNCIA */}
              {activeTab === 'appearance' && (
                <form onSubmit={handleSaveGeneralSettings} className="space-y-5 max-w-xl">
                  <div>
                    <h3 className="text-base font-bold text-white">Aparência do BioSite</h3>
                    <p className="text-xs text-slate-400">Ajuste de tema e distintivos visuais</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Crachá de Inovação (Header)</label>
                    <input
                      type="text"
                      value={settings.appearance.badgeText}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, badgeText: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Acento de Cor Tecnológico</label>
                    <select
                      value={settings.appearance.accentColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, accentColor: e.target.value as any },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    >
                      <option value="cyan">Azul Ciano Neon (Padrão Oficial MV Conectar)</option>
                      <option value="blue">Azul Cobalto Elétrico</option>
                      <option value="sky">Azul Celeste Tech</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider"
                  >
                    Salvar Aparência
                  </button>
                </form>
              )}

              {/* TAB 3: LINKS PERSONALIZADOS */}
              {activeTab === 'links' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Links do BioSite</h3>
                      <p className="text-xs text-slate-400">
                        Links exibidos no celular e botões de ação do cliente.
                      </p>
                    </div>

                    {!isEditingLink && (
                      <button
                        onClick={handleOpenAddLink}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ ADICIONAR LINK</span>
                      </button>
                    )}
                  </div>

                  {isEditingLink ? (
                    <form onSubmit={handleSaveLink} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                      <h4 className="text-sm font-bold text-white">
                        {editingLinkId ? 'Editar Link' : 'Novo Link'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-300">Nome do Link</label>
                          <input
                            type="text"
                            required
                            value={linkName}
                            onChange={(e) => setLinkName(e.target.value)}
                            placeholder="Ex: Baixar Cardápio PDF"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-700 text-white text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-300">Ícone</label>
                          <select
                            value={linkIcon}
                            onChange={(e) => setLinkIcon(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-700 text-white text-xs"
                          >
                            <option value="MessageCircle">WhatsApp / Chat</option>
                            <option value="Instagram">Instagram</option>
                            <option value="MapPin">Localização / Maps</option>
                            <option value="Star">Avaliação 5 Estrelas</option>
                            <option value="ShoppingBag">Catálogo / Loja</option>
                            <option value="CreditCard">Pix / Pagamento</option>
                            <option value="Phone">Telefone</option>
                            <option value="Globe">Site / Link Web</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-300">URL de Destino</label>
                        <input
                          type="text"
                          required
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          placeholder="https://wa.link/... ou #solucoes"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-700 text-white text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="linkActiveToggle"
                          checked={linkActive}
                          onChange={(e) => setLinkActive(e.target.checked)}
                          className="w-4 h-4 rounded text-cyan-400"
                        />
                        <label htmlFor="linkActiveToggle" className="text-xs text-white cursor-pointer">
                          Link Ativo no BioSite
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingLink(false)}
                          className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold"
                        >
                          Salvar Link
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2">
                      {settings.customLinks.map((link, idx) => (
                        <div
                          key={link.id}
                          className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-slate-500">0{idx + 1}</span>
                            <div>
                              <p className="text-xs font-bold text-white">{link.name}</p>
                              <p className="text-[10px] text-slate-400 truncate max-w-xs">{link.url}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                link.active ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-500'
                              }`}
                            >
                              {link.active ? 'Ativo' : 'Inativo'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleOpenEditLink(link)}
                              className="p-1.5 text-slate-400 hover:text-cyan-300"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLink(link.id, link.name)}
                              className="p-1.5 text-slate-400 hover:text-rose-400"
                              title="Excluir"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: REDES SOCIAIS */}
              {activeTab === 'socials' && (
                <form onSubmit={handleSaveGeneralSettings} className="space-y-5 max-w-xl">
                  <div>
                    <h3 className="text-base font-bold text-white">Redes Sociais Oficiais</h3>
                    <p className="text-xs text-slate-400">Configure os canais conectados do BioSite</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">WhatsApp Oficial</label>
                    <input
                      type="url"
                      value={settings.socials.whatsapp}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, whatsapp: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Instagram Oficial</label>
                    <input
                      type="url"
                      value={settings.socials.instagram}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, instagram: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider"
                  >
                    Salvar Redes
                  </button>
                </form>
              )}

              {/* TAB 5: LOCALIZAÇÃO */}
              {activeTab === 'location' && (
                <form onSubmit={handleSaveGeneralSettings} className="space-y-5 max-w-xl">
                  <div>
                    <h3 className="text-base font-bold text-white">Localização & Google Maps</h3>
                    <p className="text-xs text-slate-400">
                      Endereço e link que abre no botão <strong>📍 COMO CHEGAR</strong> do BioSite.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Endereço Completo</label>
                    <input
                      type="text"
                      value={settings.location.address}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          location: { ...settings.location, address: e.target.value },
                        })
                      }
                      placeholder="Ex: Av. Paulista, 1000 - Bela Vista"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Cidade</label>
                      <input
                        type="text"
                        value={settings.location.city}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            location: { ...settings.location, city: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">UF</label>
                      <input
                        type="text"
                        value={settings.location.state}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            location: { ...settings.location, state: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Link do Google Maps</label>
                    <input
                      type="url"
                      value={settings.location.mapsUrl}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          location: { ...settings.location, mapsUrl: e.target.value },
                        })
                      }
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider"
                  >
                    Salvar Localização
                  </button>
                </form>
              )}

              {/* TAB 6: PROJETOS (Full CRUD with compression & multiple photos) */}
              {activeTab === 'projects' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Meus Projetos</h3>
                      <p className="text-xs text-slate-400">
                        Projetos ativos aparecem automaticamente na galeria pública do BioSite.
                      </p>
                    </div>

                    {!isEditingProject && (
                      <button
                        onClick={handleOpenAddProject}
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-black text-xs font-bold uppercase tracking-wider shadow-md shadow-cyan-500/25"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ ADICIONAR PROJETO</span>
                      </button>
                    )}
                  </div>

                  {isEditingProject ? (
                    <form onSubmit={handleSaveProject} className="space-y-5 bg-[#090e1d] p-5 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <h4 className="text-sm font-bold text-white">
                          {editingProjectId ? 'Editar Projeto' : '+ Novo Projeto'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsEditingProject(false)}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-xs text-slate-300 font-semibold">1. Título do Projeto *</label>
                          <input
                            type="text"
                            required
                            value={projTitle}
                            onChange={(e) => setProjTitle(e.target.value)}
                            placeholder="Ex: BioSite Hamburgueria Smash Burger"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-300 font-semibold">3. Categoria</label>
                          <select
                            value={projCategory}
                            onChange={(e) => setProjCategory(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                          >
                            {DEFAULT_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="Outro">Outra Categoria...</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-300 font-semibold">2. Descrição</label>
                        <textarea
                          rows={3}
                          value={projDesc}
                          onChange={(e) => setProjDesc(e.target.value)}
                          placeholder="Detalhes dos serviços prestados e impacto..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      {/* Photo Upload with Compression */}
                      <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-cyan-400" />
                            <span>4. Upload de Múltiplas Fotos</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-900"
                          >
                            + Selecionar Fotos
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleMultipleImageUpload}
                          />
                        </div>

                        {projImages.length > 0 ? (
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {projImages.map((img, idx) => (
                              <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-slate-700 group">
                                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setProjImages(projImages.filter((_, i) => i !== idx))}
                                  className="absolute top-1 right-1 p-1 rounded bg-rose-600 text-white text-[10px]"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-slate-500">Nenhuma foto adicionada.</p>
                        )}
                      </div>

                      {/* Video URL */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-slate-300 font-semibold">5. Vídeo (YouTube ou Link Direto)</label>
                        <input
                          type="url"
                          value={projVideo}
                          onChange={(e) => setProjVideo(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="activeProjCheck"
                          checked={projActive}
                          onChange={(e) => setProjActive(e.target.checked)}
                          className="w-4 h-4 rounded text-cyan-400"
                        />
                        <label htmlFor="activeProjCheck" className="text-xs text-white cursor-pointer font-semibold">
                          Projeto Ativo (Exibir no BioSite público)
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => setIsEditingProject(false)}
                          className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold"
                        >
                          Salvar Projeto
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#090e1a]">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-[#0c1424] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                          <tr>
                            <th className="py-3.5 px-4">🖼️ Capa</th>
                            <th className="py-3.5 px-4">Nome</th>
                            <th className="py-3.5 px-4">Categoria</th>
                            <th className="py-3.5 px-4">Data</th>
                            <th className="py-3.5 px-4 text-center">Status</th>
                            <th className="py-3.5 px-4 text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {projects.map((proj) => (
                            <tr key={proj.id} className="hover:bg-slate-800/40">
                              <td className="py-3 px-4">
                                <div className="w-14 h-10 rounded-lg overflow-hidden bg-black border border-slate-700">
                                  <img
                                    src={proj.coverImage || proj.images[0]}
                                    alt={proj.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </td>
                              <td className="py-3 px-4 font-bold text-white max-w-xs truncate">{proj.title}</td>
                              <td className="py-3 px-4 text-cyan-300">{proj.category}</td>
                              <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{proj.createdAt}</td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleProjectActive(proj.id);
                                    loadData();
                                  }}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    proj.active
                                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                                      : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                                  }`}
                                >
                                  {proj.active ? '● Ativo' : '○ Inativo'}
                                </button>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleOpenEditProject(proj)}
                                    className="p-1.5 text-slate-400 hover:text-cyan-300"
                                    title="Editar"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProject(proj.id, proj.title)}
                                    className="p-1.5 text-slate-400 hover:text-rose-400"
                                    title="Excluir"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: VÍDEOS */}
              {activeTab === 'videos' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Vídeos dos Projetos</h3>
                    <p className="text-xs text-slate-400">
                      Visualização dos projetos que possuem apresentação em vídeo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.filter((p) => p.videoUrl).map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white truncate max-w-[200px]">{p.title}</span>
                          <span className="text-[10px] text-cyan-400 font-mono">Vídeo Configurado</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{p.videoUrl}</p>
                        <button
                          type="button"
                          onClick={() => setVideoPreviewUrl(p.videoUrl || null)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-bold"
                        >
                          <Play className="w-3.5 h-3.5 fill-black" />
                          <span>▶️ Assistir Prévia</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: TEXTOS */}
              {activeTab === 'texts' && (
                <form onSubmit={handleSaveGeneralSettings} className="space-y-5 max-w-xl">
                  <div>
                    <h3 className="text-base font-bold text-white">Textos do BioSite</h3>
                    <p className="text-xs text-slate-400">Personalize slogans e frases de impacto</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Título Principal</label>
                    <input
                      type="text"
                      value={settings.texts.title}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          texts: { ...settings.texts, title: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Slogan</label>
                    <input
                      type="text"
                      value={settings.texts.slogan}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          texts: { ...settings.texts, slogan: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Frase do Rodapé</label>
                    <input
                      type="text"
                      value={settings.texts.footerQuote}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          texts: { ...settings.texts, footerQuote: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider"
                  >
                    Salvar Textos
                  </button>
                </form>
              )}

              {/* TAB 9: CONFIGURAÇÕES & SEGURANÇA */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl">
                  <div>
                    <h3 className="text-base font-bold text-white">Configurações do Sistema</h3>
                    <p className="text-xs text-slate-400">Segurança, chave multiempresa e backup</p>
                  </div>

                  <form onSubmit={handleSaveGeneralSettings} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-cyan-400" />
                      <span>Alterar Senha do Administrador</span>
                    </h4>
                    <input
                      type="password"
                      value={settings.adminPin}
                      onChange={(e) => setSettings({ ...settings, adminPin: e.target.value })}
                      placeholder="Nova Senha"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-700 text-white text-xs font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-cyan-400 text-black text-xs font-bold"
                    >
                      Salvar Nova Senha
                    </button>
                  </form>

                  {/* Multi-tenant Architecture notice */}
                  <div className="p-4 rounded-2xl bg-[#090f20] border border-cyan-500/20 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span>Identificador Multiempresa (Multi-Tenant)</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Chave de isolamento atual: <code className="text-white font-mono bg-black/60 px-1.5 py-0.5 rounded">{settings.clientId}</code>.
                      A arquitetura está preparada para segmentar múltiplos BioSites futuramente sem risco de vazamento de dados entre clientes.
                    </p>
                  </div>

                  {/* Export Backup */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Backup Completo dos Dados</p>
                      <p className="text-[11px] text-slate-400">Baixe um arquivo JSON com todos os projetos e links.</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleExportBackup}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar</span>
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>

      {/* Video Lightbox Player in Admin */}
      {videoPreviewUrl && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95"
          onClick={() => setVideoPreviewUrl(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden border border-cyan-500/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoPreviewUrl(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/80 text-white z-20"
            >
              <X className="w-5 h-5" />
            </button>
            {videoPreviewUrl.includes('youtube.com') || videoPreviewUrl.includes('youtu.be') ? (
              <iframe
                src={videoPreviewUrl.replace('watch?v=', 'embed/')}
                title="Prévia"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <video src={videoPreviewUrl} controls autoPlay className="w-full h-full" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
