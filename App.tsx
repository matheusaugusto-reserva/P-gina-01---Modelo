
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  CheckCircle2, 
  Star, 
  Award, 
  User, 
  MessageCircle, 
  DollarSign, 
  Target, 
  Zap, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpRight,
  XCircle,
  TrendingDown,
  TrendingUp,
  Clock,
  Briefcase,
  Sparkles
} from 'lucide-react';

// Componente para detecção de visibilidade no scroll
const ScrollReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Componentes Reutilizáveis do Template
const Section: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <section className={`py-8 md:py-16 px-4 md:px-8 max-w-7xl mx-auto w-full overflow-hidden ${className}`}>
    {children}
  </section>
);

const Counter = ({ target, label, prefix = "+", suffix = "" }: { target: number, label: string, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-2xl md:text-4xl font-extrabold text-white mb-0.5 md:mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="text-gray-400 font-medium uppercase tracking-wider text-[9px] md:text-xs">{label}</div>
    </div>
  );
};

const Accordion: React.FC<{ title: string, children?: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 md:py-5 text-left hover:text-purple-400 transition-colors"
      >
        <span className="text-base md:text-xl font-semibold pr-4">{title}</span>
        <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <div className="text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const testimonials = [
    {
      name: "Nome do Aluno 1",
      avatar: "https://luisfelipedesigner.com/wp-content/uploads/Ray.webp",
      headline: "Alcancei meu [OBJETIVO] em 30 dias!",
      content: "Eu não acreditava que seria possível, mas seguindo o passo a passo do método, consegui resultados que nunca tive antes. O suporte é incrível!"
    },
    {
      name: "Nome do Aluno 2",
      avatar: "https://luisfelipedesigner.com/wp-content/uploads/Sem-Titulo-3.webp",
      headline: "Melhor investimento do ano!",
      content: "O conteúdo é direto ao ponto e sem enrolação. Valeu cada centavo investido. Minha vida profissional mudou completamente após o curso."
    },
    {
      name: "Nome do Aluno 3",
      avatar: "https://luisfelipedesigner.com/wp-content/uploads/Kaiky-Design.webp",
      headline: "Finalmente entendi como fazer!",
      content: "Já tinha tentado de tudo antes, mas só aqui encontrei a clareza necessária para executar as tarefas com confiança e gerar lucro real."
    }
  ];

  return (
    <div className="bg-black text-white selection:bg-purple-500/30 min-h-screen w-full overflow-x-hidden">
      
      {/* SEÇÃO HERO */}
      <div className="relative overflow-hidden min-h-[85vh] flex flex-col md:block bg-[#050505]">
        <div className="relative h-[45vh] md:absolute md:inset-0 md:h-full z-0 overflow-hidden">
           <img 
            src="https://i.imgur.com/PJ03zm8.jpeg" 
            className="w-full h-full object-cover object-top opacity-100 md:opacity-80" 
            alt="Background Decorativo" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black md:bg-gradient-to-r md:from-black md:via-black/40 md:to-transparent" />
        </div>

        <Section className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center !py-10 md:!py-20">
          <div className="space-y-6 md:space-y-10 text-center md:text-left">
            <div className="w-40 md:w-64 mx-auto md:mx-0 bg-white/10 px-4 py-2 rounded text-center text-xs uppercase tracking-widest font-bold border border-white/5 backdrop-blur-sm">
               [ SUA LOGO AQUI ]
            </div>
            
            <h1 className="text-2xl md:text-5xl font-black leading-[1.2] tracking-tight w-full drop-shadow-2xl">
              Transforme a sua [DOR PRINCIPAL] em um <span className="bg-purple-600 px-3 py-1 rounded-md text-white whitespace-nowrap inline md:inline-block relative top-[-2px] md:top-0">[RESULTADO]</span> de alto impacto
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 max-w-xl mx-auto md:mx-0 leading-relaxed font-light drop-shadow-lg">
              Descubra o método passo a passo para dominar o [ASSUNTO DO CURSO] e conquiste os resultados que você sempre buscou de forma acelerada.
            </p>
            
            <a 
              href="#oferta" 
              className="inline-block w-full md:w-auto px-12 py-5 md:py-6 btn-purple text-xl font-black rounded-full text-center uppercase tracking-wide shadow-[0_0_50px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)]"
            >
              Quero Garantir Minha Vaga!
            </a>
          </div>
          
          <div className="hidden md:block" />
        </Section>
      </div>

      {/* SEÇÃO DE NÚMEROS */}
      <div className="bg-[#0a0a0a] border-y border-white/5 py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-2 md:gap-8">
          <Counter target={1500} label="Alunos Satisfeitos" />
          <Counter target={120} label="Aulas Práticas" prefix="" />
          <Counter target={12} label="Meses de Suporte" prefix="" />
        </div>
      </div>

      {/* SEÇÃO DEPOIMENTOS */}
      <div className="bg-[#050505] pt-24 md:pt-40 pb-20">
        <Section className="!py-0 max-w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 md:mb-24 px-4">Histórias de Transformação</h2>
          
          <div className="relative overflow-hidden py-10">
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <div className="flex w-fit animate-scroll-testimonials hover:pause-animation">
              {[...testimonials, ...testimonials, ...testimonials].map((testi, idx) => (
                <div key={idx} className="w-[300px] md:w-[450px] flex-shrink-0 px-4">
                  <div className="bg-glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-col h-full hover:border-purple-500/30 transition-colors duration-500 group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-purple-500 overflow-hidden group-hover:scale-110 transition-transform">
                        <img src={testi.avatar} className="w-full h-full object-cover" alt={testi.name} />
                      </div>
                      <div>
                        <h4 className="font-bold text-base md:text-lg">{testi.name}</h4>
                        <div className="flex gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                      </div>
                    </div>
                    <h5 className="text-purple-400 font-bold mb-4 italic text-sm md:text-base">"{testi.headline}"</h5>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 flex-grow">{testi.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* SEÇÃO COMPARATIVA */}
      <Section className="bg-black pt-16 md:pt-24 pb-12">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Veja a diferença na prática</h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">Compare como é a sua vida hoje e como ela se transformará após dominar a nossa metodologia.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative">
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black border border-white/10 rounded-full items-center justify-center font-black text-gray-500 z-10 shadow-2xl">VS</div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px]" />
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-400 flex items-center gap-3"><TrendingDown className="w-8 h-8 text-red-500/50" /> Sem o Método</h3>
            <ul className="space-y-6">
              {[
                { text: "Prospecção aleatória e sem critérios.", icon: <XCircle className="w-5 h-5 text-red-500/40" /> },
                { text: "Dependência total de indicações de terceiros.", icon: <XCircle className="w-5 h-5 text-red-500/40" /> },
                { text: "Insegurança constante na hora de cobrar o preço justo.", icon: <XCircle className="w-5 h-5 text-red-500/40" /> },
                { text: "Ganhos instáveis e falta de previsibilidade financeira.", icon: <XCircle className="w-5 h-5 text-red-500/40" /> },
                { text: "Processos manuais que consomem todo o seu tempo livre.", icon: <XCircle className="w-5 h-5 text-red-500/40" /> },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-gray-500 text-sm md:text-base leading-relaxed group-hover:text-gray-400 transition-colors"><span className="mt-1">{item.icon}</span>{item.text}</li>
              ))}
            </ul>
          </div>

          <div className="bg-glass border-2 border-purple-500/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group shadow-[0_20px_50px_rgba(124,58,237,0.1)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[80px]" />
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center gap-3"><TrendingUp className="w-8 h-8 text-purple-500" /> Com o Método</h3>
            <ul className="space-y-6">
              {[
                { text: "Atração de clientes qualificados todos os dias.", icon: <CheckCircle2 className="w-5 h-5 text-purple-500" /> },
                { text: "Scripts de prospecção e vendas validados e prontos.", icon: <CheckCircle2 className="w-5 h-5 text-purple-500" /> },
                { text: "Posicionamento de autoridade que justifica preços altos.", icon: <CheckCircle2 className="w-5 h-5 text-purple-500" /> },
                { text: "Previsibilidade de caixa e faturamento em crescimento.", icon: <CheckCircle2 className="w-5 h-5 text-purple-500" /> },
                { text: "Fluxo de trabalho otimizado e focado no que importa.", icon: <CheckCircle2 className="w-5 h-5 text-purple-500" /> },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-gray-200 text-sm md:text-base font-medium leading-relaxed group-hover:text-white transition-colors"><span className="mt-1">{item.icon}</span>{item.text}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <a href="#oferta" className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-purple-600 hover:bg-white hover:text-black text-white font-black rounded-full transition-all duration-500 group w-full md:w-fit shadow-[0_0_40px_rgba(124,58,237,0.4)]">
            ACESSAR O MÉTODO AGORA
            <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-black/10 transition-colors"><ArrowUpRight className="w-5 h-5" /></div>
          </a>
        </div>
      </Section>

      {/* SEÇÃO BENEFÍCIOS COM EFEITO DE SCROLL REVEAL */}
      <Section className="bg-black">
        <div className="text-center mb-10 md:mb-16 space-y-3">
          <h2 className="text-3xl md:text-6xl font-black">O [NOME DO PRODUTO] é pra você que</h2>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto">Identifique-se com os pontos abaixo e descubra se este é o seu próximo passo.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {[
            { icon: <Target className="w-10 h-10 text-purple-500" />, title: "Foco Total em Resultados", desc: "Ideal para quem busca alcançar o [OBJETIVO] sem perder tempo com teorias desnecessárias ou enrolação acadêmica." },
            { icon: <Zap className="w-10 h-10 text-purple-500" />, title: "Implementação Acelerada", desc: "Aprenda a metodologia exclusiva que permite que você saia da teoria para a prática lucrativa em tempo recorde." },
            { icon: <ShieldCheck className="w-10 h-10 text-purple-500" />, title: "Segurança e Suporte", desc: "Suporte especializado diretamente com quem faz, garantindo que você nunca se sinta perdido na sua jornada." },
            { icon: <Award className="w-10 h-10 text-purple-500" />, title: "Autoridade e Reconhecimento", desc: "Ao dominar o nosso método, você se destaca da massa e passa a ser visto como um expert de alto valor." },
          ].map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[2.5rem] hover:bg-white/5 hover:border-purple-500/30 transition-all duration-500 group h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[80px] -mr-10 -mt-10" />
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-black mb-4 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed group-hover:text-gray-200 transition-colors">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="text-center">
          <ScrollReveal delay={300}>
            <a href="#oferta" className="inline-block w-full md:w-auto px-12 py-5 btn-purple text-xl font-black rounded-full text-center uppercase tracking-wide shadow-[0_0_40px_rgba(124,58,237,0.3)]">
              QUERO GARANTIR MINHA VAGA AGORA!
            </a>
          </ScrollReveal>
        </div>
      </Section>

      {/* SEÇÃO O MÉTODO */}
      <div className="bg-black pb-24 md:pb-32 pt-24 md:pt-40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.15)_0%,_transparent_60%)]" />
        </div>
        <Section className="relative z-10 !py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <div className="flex flex-col justify-center space-y-8 md:space-y-10 text-center lg:text-left sticky top-12 md:top-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs md:text-sm text-purple-400 w-fit mx-auto lg:mx-0 font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.1)]"><Sparkles className="w-4 h-4" /> Metodologia Validada</div>
              <h2 className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tight">Nosso <span className="text-purple-500">Processo</span> <br className="hidden md:block" /> Estratégico</h2>
              <p className="text-gray-300 text-lg md:text-2xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">Esqueça o amadorismo. Cada passo do nosso método foi desenhado para gerar <span className="text-white font-bold italic">escala e previsibilidade</span> no seu negócio.</p>
            </div>
            <div className="relative pl-16 lg:pl-0">
              <div className="absolute left-[-32px] lg:left-[-35px] top-8 bottom-8 w-[3px] bg-gradient-to-b from-purple-600 via-purple-400 to-purple-900 rounded-full opacity-30" />
              <div className="space-y-12 md:space-y-16">
                {[
                  { step: "01", title: "Mapeamento Genético", desc: "Analisamos cada detalhe do seu cenário atual para injetar inteligência onde a concorrência falha.", highlight: "Visão 360°" },
                  { step: "02", title: "Engenharia de Oferta", desc: "Construímos uma proposta impossível de ser ignorada, baseada no valor real que você entrega.", highlight: "Irresistibilidade" },
                  { step: "03", title: "Tração de Escala", desc: "Ativamos os canais de aquisição com foco total em ROI, trazendo os melhores clientes para sua mesa.", highlight: "Lucro Real" },
                  { step: "04", title: "Domínio de Mercado", desc: "Consolidação da autoridade para que você pare de brigar por preço e comece a ditar as regras.", highlight: "Autoridade Máxima" }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[56px] lg:left-[-64px] top-0 z-20">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-[0_0_30px_rgba(124,58,237,0.6)] group-hover:scale-110 group-hover:bg-white group-hover:text-purple-600 transition-all duration-500">{item.step}</div>
                    </div>
                    <div className="bg-[#0d0d0d] border border-white/10 p-8 md:p-10 rounded-[2rem] w-full group-hover:border-purple-500/50 group-hover:bg-[#121212] transition-all duration-500 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/10 transition-colors" />
                      <div className="flex items-center gap-3 mb-4"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 bg-purple-500/10 px-3 py-1 rounded-md">{item.highlight}</span></div>
                      <h3 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-base md:text-lg leading-relaxed group-hover:text-gray-200 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* CONTEÚDO PROGRAMÁTICO */}
      <Section className="bg-black !pt-0 relative">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-8 md:mb-12">O que você vai dominar:</h2>
        <div className="relative group/carousel">
          <button onClick={() => scroll('left')} className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-glass border border-purple-500/30 text-white transition-all hover:bg-purple-500/20 md:-left-6 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ChevronLeft className="w-6 h-6" /></button>
          <button onClick={() => scroll('right')} className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-glass border border-purple-500/30 text-white transition-all hover:bg-purple-500/20 md:-right-6 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ChevronRight className="w-6 h-6" /></button>
          <div ref={scrollRef} onScroll={handleScroll} className="flex overflow-x-auto gap-4 md:gap-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth">
            {[
              { title: "Módulo 01 - Introdução", img: "https://i.imgur.com/Y8c4DID.jpeg" },
              { title: "Módulo 02 - Estratégia", img: "https://i.imgur.com/Y8c4DID.jpeg" },
              { title: "Módulo 03 - Execução", img: "https://i.imgur.com/Y8c4DID.jpeg" },
              { title: "Módulo 04 - Escala", img: "https://i.imgur.com/Y8c4DID.jpeg" },
              { title: "Bônus - Mentoria", img: "https://i.imgur.com/Y8c4DID.jpeg" },
              { title: "Módulo 05 - Ferramentas", img: "https://i.imgur.com/Y8c4DID.jpeg" }
            ].map((mod, idx) => (
              <div key={idx} className="min-w-[240px] md:min-w-[320px] snap-center rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform group relative">
                <img src={mod.img} className="w-full aspect-[3/4] object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={mod.title} />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                   <p className="text-xs font-bold text-purple-400 mb-1 uppercase tracking-widest">Aprenda agora</p>
                   <h4 className="text-lg md:text-xl font-black">{mod.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SEÇÃO MENTOR */}
      <div className="bg-black py-10 md:py-16 border-t border-white/5">
        <Section className="!py-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold">Quem sou eu</h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-lg">Com mais de [X] anos de experiência no mercado de [NICHO], já ajudei mais de [X] pessoas a alcançarem sua independência e dominarem as ferramentas de [ASSUNTO].<br/><br/>Hoje sou referência em <b>[SUA ESPECIALIDADE]</b> e desenvolvedor do método <b>[NOME DO MÉTODO]</b>, focado em resultados reais e duradoreros.</p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative max-w-xs md:max-w-sm mx-auto">
              <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full" />
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" className="relative w-full rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/10" alt="Foto do Mentor" />
            </div>
          </div>
        </Section>
      </div>

      {/* OFERTA */}
      <div id="oferta" className="bg-[#050505] py-10 md:py-16">
        <Section className="!py-0 text-center">
          <div className="max-w-2xl mx-auto bg-glass p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 border-purple-500/40 space-y-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
             <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest"><Zap className="w-4 h-4 fill-current" /> Vagas Limitadas - Oferta de Lançamento</div>
             <h2 className="text-lg md:text-xl font-bold text-gray-400 uppercase tracking-widest">Invista no seu futuro hoje</h2>
             <div className="relative inline-block"><span className="text-xl md:text-2xl text-red-500 font-bold opacity-50 relative">De R$ [VALOR ORIGINAL]<span className="absolute left-0 top-1/2 w-full h-0.5 bg-red-600 -rotate-12" /></span></div>
             <div className="space-y-1">
               <p className="text-sm md:text-lg font-medium text-gray-400">POR APENAS</p>
               <div className="flex items-center justify-center gap-1"><span className="text-4xl md:text-7xl font-black purple-gradient-text">12x de [VALOR]</span></div>
               <p className="text-lg md:text-xl font-bold uppercase">Ou R$ [VALOR À VISTA] à vista</p>
             </div>
             <a href="#" className="block w-full py-5 btn-purple rounded-2xl text-lg md:text-xl font-black uppercase tracking-wide">Sim! Quero Começar Agora</a>
             <div className="flex flex-wrap justify-center gap-4 pt-2 opacity-50">
               <div className="flex items-center gap-2 text-[10px] md:text-xs"><ShieldCheck className="w-4 h-4" /> Compra 100% Segura</div>
               <div className="flex items-center gap-2 text-[10px] md:text-xs"><CheckCircle2 className="w-4 h-4" /> Acesso em até 5 min</div>
             </div>
          </div>
        </Section>
      </div>

      {/* GARANTIA */}
      <Section className="text-center !pt-4">
        <div className="relative inline-block mb-6 md:mb-8">
           <div className="w-40 h-40 md:w-64 md:h-64 border-8 border-purple-500/30 rounded-full flex items-center justify-center animate-spin-slow"><div className="w-full h-full rounded-full border-4 border-dashed border-purple-500/50" /></div>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl md:text-7xl font-black">7</span>
              <span className="text-sm md:text-xl font-bold uppercase tracking-widest">Dias</span>
              <span className="text-[10px] md:text-xs font-medium text-gray-400">Risco Zero</span>
           </div>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Garantia Incondicional de Satisfação</h2>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">Eu retiro todo o risco das suas costas. Experimente todo o conteúdo por 7 dias. Se por QUALQUER motivo você achar que o treinamento não é para você, basta devolveremos 100% do seu dinheiro.</p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-[#050505]">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">Tire suas dúvidas</h2>
        <div className="max-w-3xl mx-auto space-y-1">
          {[
            { q: "Como vou receber meu acesso?", a: "Imediatamente após a aprovação do pagamento, você receberá um e-mail automático com seu login e senha exclusivos." },
            { q: "Por quanto tempo o curso será meu?", a: "O seu acesso é [VITALÍCIO/ANUAL]. Você pode assistir às aulas quantas vezes quiser e no seu próprio ritmo." },
            { q: "O curso tem certificado?", a: "Sim! Ao completar 100% das aulas, você poderá emitir seu certificado de conclusão dentro da plataforma." },
            { q: "Preciso de conhecimento prévio?", a: "Não. O curso foi estruturado para levar você do absoluto zero até o nível avançado." }
          ].map((item, idx) => (
            <Accordion key={idx} title={item.q}>{item.a}</Accordion>
          ))}
        </div>
      </Section>

      <footer className="bg-black py-8 md:py-12 border-t border-white/5">
        <Section className="!py-0 text-center space-y-6">
          <div className="text-lg md:text-xl font-black opacity-30 uppercase tracking-widest">[ NOME DA SUA MARCA ]</div>
          <div className="space-y-1 text-gray-500 text-[10px] md:text-sm">
            <p>© 2024 Todos os direitos reservados.</p>
            <p>CNPJ: 00.000.000/0001-00 | [NOME DA EMPRESA]</p>
          </div>
        </Section>
      </footer>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scroll-testimonials { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-scroll-testimonials { animation: scroll-testimonials 40s linear infinite; }
        .hover\\:pause-animation:hover { animation-play-state: paused; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
