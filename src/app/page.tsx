'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Globe, 
  Palette, 
  FolderKey, 
  CheckCircle2, 
  Loader2,
  AlertCircle,
  ArrowRight,
  Target
} from 'lucide-react';
import { submitClientIntake } from '@/actions/submitForm';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...classes: (string | undefined | null | false)[]) {
  return twMerge(clsx(classes));
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

// Reusable Minimal Input Component
const MinimalInput = ({ label, id, ...props }: any) => (
  <div className="relative group pt-6">
    <input
      id={id}
      name={id}
      className="peer w-full bg-transparent border-b border-zinc-800 text-zinc-100 py-2 focus:outline-none focus:border-zinc-300 transition-colors placeholder:text-transparent"
      placeholder={label}
      {...props}
    />
    <label 
      htmlFor={id} 
      className="absolute left-0 top-2 text-zinc-500 text-sm transition-all duration-300 peer-placeholder-shown:top-8 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-zinc-300 pointer-events-none font-medium"
    >
      {label}
    </label>
  </div>
);

export default function OnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasDomain, setHasDomain] = useState<boolean | null>(null);
  const [materialsLinksCount, setMaterialsLinksCount] = useState(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    const formData = new FormData(e.currentTarget);
    formData.set('hasDomain', hasDomain ? 'true' : 'false');

    const result = await submitClientIntake(formData);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setErrorMsg(result.error || 'Erro na conexão. Tente novamente mais tarde.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-800 selection:text-white">
      
      {/* LEFT SIDE: Immersive Visuals (Hidden on small mobile, visible on md+) */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col justify-start p-12 pt-24">
        <div className="absolute inset-0 bg-zinc-950">
          {/* Background image provided by the user */}
          <img 
            src="/imagem 2 background.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent from-60% via-zinc-950/80 via-90% to-zinc-950"></div>
        </div>
        
        <div className="relative z-10 space-y-6 mt-8 max-w-lg">

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-display text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]"
          >
            Tudo pronto para <br/>
            <span className="text-zinc-300">começarmos o seu projeto.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-zinc-200 max-w-sm text-lg font-medium drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)]"
          >
            Para que o resultado seja perfeito, precisamos conhecer um pouco mais sobre o seu negócio. Reserve alguns minutos para nos dar esses detalhes.
          </motion.p>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-7/12 overflow-y-auto overflow-x-hidden custom-scrollbar relative">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-zinc-900/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:px-12 md:py-20">
          
          {/* Mobile Header (Only visible on small screens) */}
          <div className="lg:hidden mb-12 space-y-4 mt-8">
            <div className="inline-block p-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl mb-2 backdrop-blur-md">
              <span className="text-xs font-bold tracking-widest uppercase text-zinc-400 px-2">Bem-vindo</span>
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight leading-tight">
              Tudo pronto para <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">começarmos o seu projeto.</span>
            </h1>
            <p className="text-zinc-400 text-base leading-relaxed">
              Para que o resultado seja perfeito, precisamos conhecer um pouco mais sobre o seu negócio. Reserve alguns minutos para nos dar esses detalhes.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full border border-zinc-800 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-zinc-300" />
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight">Briefing Recebido</h2>
                <p className="text-zinc-400 max-w-md">
                  Agradecemos a confiança. Nossa equipe de design e desenvolvimento está avaliando seus dados e entrará em contato em breve.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-3 border border-zinc-800 rounded-full text-sm font-medium hover:bg-zinc-900 transition-colors uppercase tracking-widest"
                >
                  Voltar
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit} 
                className="space-y-16"
              >
                {errorMsg && (
                  <motion.div variants={itemVariants} className="bg-red-950/30 border border-red-900/50 p-4 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 font-medium text-sm">{errorMsg}</p>
                  </motion.div>
                )}

                {/* SECTION 1 */}
                <motion.section variants={itemVariants} className="space-y-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 p-6 md:p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:border-zinc-700/50 hover:bg-zinc-900/60">
                  <div className="flex items-center space-x-3 text-zinc-100">
                    <Building2 className="w-5 h-5 text-zinc-500" />
                    <h3 className="font-display text-2xl font-semibold tracking-tight">A Empresa</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <MinimalInput label="Nome da Empresa" id="companyName" />
                    <MinimalInput label="Nome do Responsável" id="contactName" />
                    <MinimalInput label="WhatsApp" id="whatsapp" />
                    <MinimalInput label="Email Corporativo" id="email" type="email" />
                  </div>
                </motion.section>

                {/* SECTION 2 */}
                <motion.section variants={itemVariants} className="space-y-8">
                  <div className="flex items-center space-x-3 text-zinc-100">
                    <Globe className="w-5 h-5 text-zinc-500" />
                    <h3 className="font-display text-2xl font-semibold tracking-tight">Domínio</h3>
                  </div>
                  
                  <div className="space-y-8">
                    <MinimalInput label="Link do Instagram (Opcional)" id="instagramLink" type="url" />

                    <div className="space-y-4">
                      <p className="text-sm font-medium text-zinc-400">Você já possui um domínio registrado para o site?</p>
                      <div className="flex space-x-4">
                        <label className={cn(
                          "flex-1 cursor-pointer flex items-center justify-center p-4 rounded-xl border transition-all duration-300 ease-out",
                          hasDomain === true 
                            ? "border-zinc-300 bg-zinc-800/80 text-white shadow-[0_0_30px_rgba(255,255,255,0.08)] scale-[1.02]" 
                            : "border-zinc-800/50 bg-zinc-900/30 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-800/50 hover:text-zinc-300 hover:scale-[1.01]"
                        )}>
                          <input type="radio" name="domain_choice" value="yes" className="hidden" onChange={() => setHasDomain(true)} />
                          <span className="text-sm font-medium tracking-wide uppercase">Sim, possuo</span>
                        </label>
                        <label className={cn(
                          "flex-1 cursor-pointer flex items-center justify-center p-4 rounded-xl border transition-all duration-300 ease-out",
                          hasDomain === false 
                            ? "border-zinc-300 bg-zinc-800/80 text-white shadow-[0_0_30px_rgba(255,255,255,0.08)] scale-[1.02]" 
                            : "border-zinc-800/50 bg-zinc-900/30 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-800/50 hover:text-zinc-300 hover:scale-[1.01]"
                        )}>
                          <input type="radio" name="domain_choice" value="no" className="hidden" onChange={() => setHasDomain(false)} />
                          <span className="text-sm font-medium tracking-wide uppercase">Ainda não</span>
                        </label>
                      </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {hasDomain === true && (
                        <motion.div 
                          key="has-domain"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
                        >
                          <MinimalInput label="Qual é o domínio?" id="currentDomain" />
                          <MinimalInput label="Onde está registrado?" id="domainRegistrar" />
                        </motion.div>
                      )}

                      {hasDomain === false && (
                        <motion.div 
                          key="no-domain"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2"
                        >
                          <MinimalInput label="Qual domínio você gostaria de ter?" id="desiredDomain" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.section>

                {/* NEW SECTION: STRATEGY & BUSINESS */}
                <motion.section variants={itemVariants} className="space-y-8">
                  <div className="flex items-center space-x-3 text-zinc-100">
                    <Target className="w-5 h-5 text-zinc-500" />
                    <h3 className="font-display text-2xl font-semibold tracking-tight">Estratégia & Negócio</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <MinimalInput label="Público-Alvo (Quem é o seu cliente ideal?)" id="targetAudience" />
                    <MinimalInput label="Diferencial Competitivo (O que diferencia a sua empresa?)" id="competitiveAdvantage" />
                    <MinimalInput label="Concorrentes (Links de 1 a 3 concorrentes diretos)" id="competitors" />
                    <MinimalInput label="Seções / Estrutura Desejada (Sobre, Serviços, FAQ, etc)" id="desiredStructure" />
                    
                    <div className="relative group pt-8">
                      <textarea id="aboutCompany" name="aboutCompany" rows={4}
                        className="peer w-full bg-transparent border-b border-zinc-800 text-zinc-100 py-2 focus:outline-none focus:border-zinc-300 transition-colors placeholder:text-transparent resize-none" 
                        placeholder="Sobre a Empresa (História, valores, endereço, horário...)"
                      ></textarea>
                      <label htmlFor="aboutCompany" className="absolute left-0 top-4 text-zinc-500 text-sm transition-all duration-300 peer-placeholder-shown:top-10 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:text-sm peer-focus:text-zinc-300 pointer-events-none font-medium">
                        Sobre a Empresa (História, valores, endereço, horários...)
                      </label>
                    </div>
                  </div>
                </motion.section>

                {/* SECTION 3: IDENTITY */}
                <motion.section variants={itemVariants} className="space-y-8">
                  <div className="flex items-center space-x-3 text-zinc-100">
                    <Palette className="w-5 h-5 text-zinc-500" />
                    <h3 className="font-display text-2xl font-semibold tracking-tight">Identidade & Referências</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <MinimalInput label="Cores da Marca (Opcional - Códigos HEX ou Link)" id="brandColors" />
                    <div className="relative group pt-8">
                      <textarea id="referenceLinks" name="referenceLinks" rows={3}
                        className="peer w-full bg-transparent border-b border-zinc-800 text-zinc-100 py-2 focus:outline-none focus:border-zinc-300 transition-colors placeholder:text-transparent resize-none" 
                        placeholder="Links de referência"
                      ></textarea>
                      <label htmlFor="referenceLinks" className="absolute left-0 top-4 text-zinc-500 text-sm transition-all duration-300 peer-placeholder-shown:top-10 peer-placeholder-shown:text-base peer-focus:top-4 peer-focus:text-sm peer-focus:text-zinc-300 pointer-events-none font-medium">
                        Links de Referência (Sites que você admira)
                      </label>
                    </div>
                  </div>
                </motion.section>

                {/* SECTION 4 */}
                <motion.section variants={itemVariants} className="space-y-8">
                  <div className="flex items-center space-x-3 text-zinc-100">
                    <FolderKey className="w-5 h-5 text-zinc-500" />
                    <h3 className="font-display text-2xl font-semibold tracking-tight">Materiais</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-sm text-zinc-400 leading-relaxed border-l border-zinc-800 pl-4 py-1">
                      Faça o upload do seu <strong>Logotipo (Alta Qualidade)</strong>, fotos institucionais, <strong>Manual da Marca (Brandbook)</strong> e Fontes em uma pasta no Drive/Dropbox e cole o link público abaixo.
                    </p>
                    {Array.from({ length: materialsLinksCount }).map((_, index) => (
                      <div key={`material-link-${index}`} className="flex items-end space-x-3">
                        <div className="flex-1">
                          <MinimalInput 
                            label={`Link da Pasta de Materiais ${index > 0 ? index + 1 : ''}`} 
                            id={`materialsLink_${index}`} 
                            name="materialsLink" 
                            type="url" 
                          />
                        </div>
                        {index === materialsLinksCount - 1 && (
                          <button
                            type="button"
                            onClick={() => setMaterialsLinksCount(prev => prev + 1)}
                            className="p-2 mb-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 rounded-full transition-colors flex-shrink-0"
                            title="Adicionar outro link"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* SUBMIT BUTTON */}
                <motion.div variants={itemVariants} className="pt-8">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || hasDomain === null}
                    className={cn(
                      "w-full md:w-auto flex items-center justify-center px-12 py-5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 ease-out",
                      (isSubmitting || hasDomain === null) 
                        ? "bg-zinc-900 text-zinc-600 cursor-not-allowed" 
                        : "bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-105 hover:-translate-y-1 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] active:scale-95"
                    )}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Enviar Briefing
                        <ArrowRight className="w-4 h-4 ml-3" />
                      </>
                    )}
                  </button>
                  {hasDomain === null && (
                    <p className="text-sm font-medium text-zinc-600 mt-4">
                      Preencha os campos obrigatórios acima.
                    </p>
                  )}
                </motion.div>

              </motion.form>
            )}
          </AnimatePresence>
          
          <div className="mt-20 pt-8 border-t border-zinc-900 text-xs text-zinc-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>

        </div>
      </div>
    </div>
  );
}
