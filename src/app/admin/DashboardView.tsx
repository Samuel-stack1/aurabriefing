'use client';

import { motion } from 'framer-motion';
import { LogOut, Globe, Mail, MessageCircle, Palette, Link as LinkIcon, Download, Target, Users, Award, Info, LayoutTemplate } from 'lucide-react';
import { logout } from '@/actions/adminAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DashboardView({ intakes }: { intakes: any[] }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zinc-900/30 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight">Painel de Respostas</h1>
            <p className="text-zinc-400 mt-2">Total de {intakes.length} formulários recebidos.</p>
          </div>
          
          <button 
            onClick={() => logout()}
            className="flex items-center space-x-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>

        {intakes.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/20 rounded-2xl border border-zinc-800/50">
            <p className="text-zinc-500 text-lg">Nenhum formulário recebido ainda.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {intakes.map((intake) => (
              <motion.div 
                key={intake.id} 
                variants={itemVariants}
                className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 p-6 rounded-2xl flex flex-col space-y-6 hover:bg-zinc-900/60 transition-colors"
              >
                {/* Header */}
                <div className="border-b border-zinc-800 pb-4">
                  <h3 className="font-display text-2xl font-bold truncate" title={intake.company_name}>
                    {intake.company_name}
                  </h3>
                  <p className="text-zinc-400 font-medium mt-1">Contato: {intake.contact_name}</p>
                  <p className="text-zinc-500 text-xs mt-2">
                    {new Date(intake.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>

                {/* Info List */}
                <div className="space-y-3 text-sm flex-1">
                  <div className="flex items-center space-x-3 text-zinc-300">
                    <MessageCircle className="w-4 h-4 text-zinc-500" />
                    <span className="truncate">{intake.whatsapp}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-zinc-300">
                    <Mail className="w-4 h-4 text-zinc-500" />
                    <span className="truncate">{intake.email}</span>
                  </div>
                  {intake.instagram_link && (
                    <div className="flex items-center space-x-3 text-zinc-300">
                      <Globe className="w-4 h-4 text-zinc-500" />
                      <a href={intake.instagram_link} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline truncate">
                        Instagram
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 text-zinc-300">
                    <Globe className="w-4 h-4 text-zinc-500" />
                    <span>
                      {intake.has_domain 
                        ? `Domínio Próprio (${intake.current_domain})` 
                        : `Precisa de Domínio (${intake.desired_domain})`}
                    </span>
                  </div>
                  {intake.brand_colors && (
                    <div className="flex items-center space-x-3 text-zinc-300">
                      <Palette className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                      <span className="truncate">{intake.brand_colors}</span>
                    </div>
                  )}
                  {intake.reference_links && (
                    <div className="flex items-start space-x-3 text-zinc-300 mt-2">
                      <LinkIcon className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs break-words line-clamp-3">
                        {intake.reference_links}
                      </div>
                    </div>
                  )}
                  
                  {/* Novos Campos de Estratégia */}
                  {intake.target_audience && (
                    <div className="flex items-start space-x-3 text-zinc-300 mt-2 border-t border-zinc-800/50 pt-2">
                      <Users className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs break-words">
                        <span className="font-semibold text-zinc-400 block mb-0.5">Público-Alvo:</span>
                        {intake.target_audience}
                      </div>
                    </div>
                  )}
                  {intake.competitive_advantage && (
                    <div className="flex items-start space-x-3 text-zinc-300 mt-2">
                      <Award className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs break-words">
                        <span className="font-semibold text-zinc-400 block mb-0.5">Diferencial:</span>
                        {intake.competitive_advantage}
                      </div>
                    </div>
                  )}
                  {intake.competitors && (
                    <div className="flex items-start space-x-3 text-zinc-300 mt-2">
                      <Target className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs break-words">
                        <span className="font-semibold text-zinc-400 block mb-0.5">Concorrentes:</span>
                        {intake.competitors}
                      </div>
                    </div>
                  )}
                  {intake.desired_structure && (
                    <div className="flex items-start space-x-3 text-zinc-300 mt-2">
                      <LayoutTemplate className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs break-words">
                        <span className="font-semibold text-zinc-400 block mb-0.5">Estrutura Desejada:</span>
                        {intake.desired_structure}
                      </div>
                    </div>
                  )}
                  {intake.about_company && (
                    <div className="flex items-start space-x-3 text-zinc-300 mt-2">
                      <Info className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs break-words">
                        <span className="font-semibold text-zinc-400 block mb-0.5">Sobre a Empresa:</span>
                        <div className="line-clamp-4 hover:line-clamp-none transition-all">{intake.about_company}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-zinc-800">
                  <a 
                    href={intake.materials_link.split('\n')[0]} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 w-full bg-zinc-800/50 hover:bg-zinc-700/50 py-3 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Ver Materiais</span>
                  </a>
                  {intake.materials_link.split('\n').length > 1 && (
                    <p className="text-xs text-zinc-500 text-center mt-2">
                      (+ {intake.materials_link.split('\n').length - 1} links)
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
