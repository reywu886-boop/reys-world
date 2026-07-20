/*
 * Editorial Modernism: Ask Rey AI Chat Section
 * - Real AI chat powered by Kimi (Moonshot AI) via /api/chat
 * - Streaming responses with typing animation
 * - Quick-start questions as conversation starters
 * - Multi-turn conversation support
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionReveal from '@/components/SectionReveal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = {
  en: [
    'What projects has Rey worked on?',
    'How does Rey use AI in filmmaking?',
    'What did he do at Tencent?',
    'Tell me about the AI Storyboard system.',
  ],
  cn: [
    'Rey 做过哪些项目？',
    'Rey 如何在电影制作中使用 AI？',
    '他在腾讯做了什么？',
    '介绍一下 AI 分镜生成系统。',
  ],
};

export default function AskReySection() {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messages.length === 0 && !streamingContent) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;

    setError(null);
    const userMsg: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsStreaming(true);
    setStreamingContent('');

    // Prepare abort controller
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.error ||
            (res.status === 429
              ? lang === 'cn'
                ? '请求太频繁，请稍后再试'
                : 'Too many requests. Please wait a moment.'
              : lang === 'cn'
                ? '服务暂时不可用，请稍后再试'
                : 'Service temporarily unavailable. Please try again.')
        );
      }

      // Read SSE stream
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let accumulated = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const data = trimmed.slice(6);
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulated += delta;
              setStreamingContent(accumulated);
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }

      // Finalize: move streaming content to messages
      if (accumulated) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: accumulated },
        ]);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(
        err.message ||
          (lang === 'cn' ? '发生错误，请重试' : 'An error occurred. Please try again.')
      );
    } finally {
      setIsStreaming(false);
      setStreamingContent('');
      abortRef.current = null;
    }
  }, [messages, isStreaming, lang]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isStreaming) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const questions = lang === 'en' ? quickQuestions.en : quickQuestions.cn;

  return (
    <section id="ask-rey" className="py-32 md:py-40 bg-[#FAFAFA]">
      <div className="container">
        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-number">06</span>
            <div className="editorial-line flex-1" />
            <h2 className="font-heading font-700 text-[#0A0A0A] text-3xl md:text-4xl tracking-tight">
              {t('Ask Rey', '问问 Rey')}
            </h2>
          </div>
        </SectionReveal>

        <div className="max-w-[720px]">
          <SectionReveal delay={100}>
            <p className="text-[#6B6B6B] text-base font-body leading-relaxed mb-8">
              {t(
                'Curious about Rey\'s work? Ask the AI assistant below. It is powered by a real language model and knows the work presented on this website.',
                '对 Rey 的工作有疑问？可以向下方的 AI 助手提问。它由真实的大语言模型驱动，并了解本网站呈现的作品信息。'
              )}
            </p>
          </SectionReveal>

          {/* Quick questions */}
          {messages.length === 0 && !isStreaming && (
            <SectionReveal delay={200}>
              <div className="flex flex-wrap gap-2 mb-8">
                {questions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-xs font-body text-[#6B6B6B] px-3 py-2 border border-[#E5E5E5] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </SectionReveal>
          )}

          {/* Chat messages */}
          <div className="min-h-[200px] max-h-[400px] overflow-y-auto mb-6 space-y-6 scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{
                  animation: 'fadeSlideUp 0.3s ease-out forwards',
                }}
              >
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <span className="section-number block mb-1.5">
                    {msg.role === 'user' ? t('You', '你') : 'Rey AI'}
                  </span>
                  <p className={`text-sm font-body leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'text-[#6B6B6B] bg-[#F5F5F5] px-4 py-3 inline-block'
                      : 'text-[#0A0A0A]'
                  }`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {isStreaming && streamingContent && (
              <div className="flex justify-start">
                <div>
                  <span className="section-number block mb-1.5">Rey AI</span>
                  <p className="text-sm font-body leading-relaxed text-[#0A0A0A] whitespace-pre-wrap">
                    {streamingContent}
                    <span className="inline-block w-[2px] h-[14px] bg-[#0A0A0A] ml-0.5 animate-pulse" />
                  </p>
                </div>
              </div>
            )}

            {/* Loading indicator (before first token arrives) */}
            {isStreaming && !streamingContent && (
              <div className="flex justify-start">
                <div>
                  <span className="section-number block mb-1.5">Rey AI</span>
                  <div className="flex gap-1.5 py-2">
                    <span className="w-1.5 h-1.5 bg-[#AAAAAA] rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }} />
                    <span className="w-1.5 h-1.5 bg-[#AAAAAA] rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }} />
                    <span className="w-1.5 h-1.5 bg-[#AAAAAA] rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex justify-start">
                <div>
                  <span className="section-number block mb-1.5 text-[#CC0000]">Error</span>
                  <p className="text-sm font-body leading-relaxed text-[#CC0000]">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('Ask a question...', '输入你的问题...')}
              disabled={isStreaming}
              className="flex-1 px-4 py-3 bg-white border border-[#E5E5E5] text-sm font-body text-[#0A0A0A] placeholder:text-[#CCCCCC] focus:outline-none focus:border-[#0A0A0A] transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isStreaming}
              className="px-6 py-3 bg-[#0A0A0A] text-[#FAFAFA] text-sm font-body font-500 hover:bg-[#2A2A2A] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
            >
              {isStreaming
                ? t('Thinking...', '思考中...')
                : t('Send', '发送')}
            </button>
          </div>

          <p className="text-[10px] font-mono-custom text-[#CCCCCC] mt-3">
            {t(
              'Powered by AI · Responses are based on Rey\'s portfolio information.',
              'AI 驱动 · 回答基于 Rey 的作品集信息。'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
