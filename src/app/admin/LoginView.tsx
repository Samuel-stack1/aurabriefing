'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { login } from '@/actions/adminAuth';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

const MinimalInput = ({ label, id, type = 'text', ...props }: any) => (
  <div className="relative group pt-6">
    <input
      id={id}
      name={id}
      type={type}
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

export default function LoginView() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result.success) {
      // Refresh to let the server component re-read the cookie
      window.location.reload();
    } else {
      setError(result.error || 'Erro ao logar');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100 items-center justify-center p-6">
      <div className="absolute inset-0 bg-zinc-950 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/40 rounded-full blur-[100px]"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 p-8 rounded-2xl shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50">
            <Lock className="w-8 h-8 text-zinc-400" />
          </div>
        </div>
        
        <h2 className="text-center font-display text-3xl font-bold mb-8 tracking-tight">Acesso Restrito</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <MinimalInput label="Usuário" id="username" required />
          <MinimalInput label="Senha" id="password" type="password" required />
          
          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={cn(
              "w-full flex items-center justify-center px-6 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ease-out mt-8",
              isLoading 
                ? "bg-zinc-900 text-zinc-600 cursor-not-allowed" 
                : "bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
            )}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Entrar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
