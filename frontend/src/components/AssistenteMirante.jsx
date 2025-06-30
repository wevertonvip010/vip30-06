import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, TrendingUp, Target, Heart, Lightbulb } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AssistenteMirante = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [sugestoes, setSugestoes] = useState([]);
  const [mensagemMotivacional, setMensagemMotivacional] = useState('');
  
  const { user, token } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Carregar dados iniciais quando abrir
  useEffect(() => {
    if (isOpen && user) {
      carregarDadosIniciais();
    }
  }, [isOpen, user]);

  const carregarDadosIniciais = async () => {
    try {
      // Carregar feedback de desempenho
      await carregarFeedbackDesempenho();
      
      // Carregar sugestões por setor
      await carregarSugestoes();
      
      // Carregar mensagem motivacional
      await carregarMensagemMotivacional();
    } catch (error) {
      console.error('Erro ao carregar dados da IA:', error);
    }
  };

  const carregarFeedbackDesempenho = async () => {
    try {
      const response = await fetch('/api/ia/feedback-desempenho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orcamentos_mes: 8,
          vendas_mes: 6,
          meta_mensal: 10,
          leads_convertidos: 12
        })
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback(data);
      }
    } catch (error) {
      console.error('Erro ao carregar feedback:', error);
    }
  };

  const carregarSugestoes = async () => {
    try {
      const response = await fetch('/api/ia/sugestao-setor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          setor: 'comercial',
          contexto: 'Foco em aumentar conversão de leads'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSugestoes(data.sugestoes || []);
      }
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
    }
  };

  const carregarMensagemMotivacional = async () => {
    try {
      const response = await fetch('/api/ia/mensagem-motivacional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          meta_pessoal: 'carro novo',
          vendas_restantes: 4,
          contexto_atual: 'Boa performance este mês'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMensagemMotivacional(data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao carregar mensagem motivacional:', error);
    }
  };

  const enviarMensagem = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage('');
    setLoading(true);

    // Adicionar mensagem do usuário ao histórico
    setChatHistory(prev => [...prev, {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    try {
      const response = await fetch('/api/ia/assistente-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          pergunta: userMessage,
          contexto: 'geral'
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Adicionar resposta da IA ao histórico
        setChatHistory(prev => [...prev, {
          type: 'assistant',
          content: data.resposta,
          timestamp: new Date()
        }]);
      } else {
        throw new Error('Erro na resposta da API');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setChatHistory(prev => [...prev, {
        type: 'assistant',
        content: 'Desculpe, estou com dificuldades técnicas no momento. Tente novamente em alguns instantes.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Botão flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title="Assistente IA Mirante"
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </button>
      </div>

      {/* Painel do assistente */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">IA Mirante</h3>
                <p className="text-sm opacity-90">Sua assistente pessoal</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === 'chat'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageCircle size={16} className="inline mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === 'insights'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp size={16} className="inline mr-2" />
              Insights
            </button>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col">
                {/* Mensagens */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <Bot size={48} className="mx-auto mb-4 text-purple-400" />
                      <p className="text-sm">
                        Olá {user.name}! 👋<br />
                        Sou a IA Mirante, sua assistente pessoal.<br />
                        Como posso ajudar você hoje?
                      </p>
                    </div>
                  )}
                  
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua pergunta..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      disabled={loading}
                    />
                    <button
                      onClick={enviarMensagem}
                      disabled={loading || !message.trim()}
                      className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="h-full overflow-y-auto p-4 space-y-4">
                {/* Feedback de Desempenho */}
                {feedback && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="text-green-600" size={20} />
                      <h4 className="font-semibold text-green-800">Desempenho</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{feedback.feedback}</p>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Meta: {feedback.percentual_meta?.toFixed(1)}%</span>
                      <span>{feedback.status_meta}</span>
                    </div>
                  </div>
                )}

                {/* Mensagem Motivacional */}
                {mensagemMotivacional && (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="text-pink-600" size={20} />
                      <h4 className="font-semibold text-pink-800">Motivação</h4>
                    </div>
                    <p className="text-sm text-gray-700">{mensagemMotivacional}</p>
                  </div>
                )}

                {/* Sugestões */}
                {sugestoes.length > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lightbulb className="text-yellow-600" size={20} />
                      <h4 className="font-semibold text-yellow-800">Sugestões</h4>
                    </div>
                    <ul className="space-y-2">
                      {sugestoes.map((sugestao, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                          <span className="text-yellow-600 font-bold">•</span>
                          <span>{sugestao}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botão para atualizar insights */}
                <button
                  onClick={carregarDadosIniciais}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Atualizar Insights
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AssistenteMirante;

