# VIP Mudanças - Sistema Interno v3.0 FINAL

## 🎯 Visão Geral
Sistema completo de gerenciamento para empresa de mudanças com integração de IA, automações e painéis inteligentes.

## ✅ Funcionalidades Implementadas

### 🔐 1. Sistema de Login por CPF
- Login com CPF (máscara automática)
- Senha numérica (mínimo 4 dígitos)
- Autenticação JWT segura
- Interface limpa sem exemplos visíveis

### 🤖 2. IA Mirante (GPT-4o)
- Assistente interno personalizado por usuário
- Feedbacks automáticos sobre desempenho
- Sugestões inteligentes por setor
- Mensagens motivacionais contextualizadas
- Gatilhos automáticos para eventos

### 📸 3. Vistoria Inteligente com IA Vision
- Upload de fotos por cômodo
- Análise automática com OpenAI Vision
- Estimativa de volume em m³
- Observações sobre cuidados especiais
- Integração com OS

### 📋 4. Checklist Inteligente de Vistoria
- Adição manual de itens por ambiente
- Upload opcional de fotos
- Assinatura digital do cliente
- Geração automática de PDF
- Interface intuitiva e responsiva

### 📱 5. Painel de Leads ManyChat
- Webhook para recebimento automático
- Gestão completa de leads
- Estatísticas em tempo real
- Filtros por status e canal
- Conversão em clientes

### 🎛️ 6. Dashboard Personalizável
- Blocos arrastáveis (React Grid Layout)
- Salvamento automático do layout
- Modo de edição visual
- Totalmente responsivo

### 🔗 7. Integrações
- **Google Agenda**: OAuth para compromissos
- **Google Sheets**: Upload e leitura de planilhas
- **LinkedIn B2B**: Busca de empresas
- **ManyChat**: Webhook para leads
- **OpenAI**: GPT-4o e Vision API

## 🚀 Como Executar

### Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python src/main.py
```

### Frontend (React + Vite)
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## 📱 Compatibilidade
- ✅ iOS (iPhone/iPad) - Safari
- ✅ Android (Samsung/outros) - Chrome
- ✅ Desktop - Todos os navegadores modernos
- ✅ Tablets - Interface otimizada

## 🔧 Configurações

### Variáveis de Ambiente (Backend)
```
OPENAI_API_KEY=sua_chave_openai
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
MANYCHAT_WEBHOOK_SECRET=seu_webhook_secret
```

### Limites de Consumo
- OpenAI API: Máximo R$ 100/mês
- Otimização automática de tokens
- Modo simulação quando sem chave

## 📊 Estrutura do Projeto

```
vip-mudancas/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.py          # Autenticação por CPF
│   │   │   ├── ia.py            # IA Mirante
│   │   │   ├── ia_vision.py     # IA Vision para vistoria
│   │   │   ├── b2b.py           # LinkedIn B2B
│   │   │   ├── manychat.py      # Integração ManyChat
│   │   │   └── integracoes.py   # Google APIs
│   │   ├── models/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AssistenteMirante.jsx
│   │   │   ├── VistoriaInteligente.jsx
│   │   │   ├── ChecklistVistoria.jsx
│   │   │   ├── PainelLeads.jsx
│   │   │   └── DashboardPersonalizavel.jsx
│   │   ├── pages/
│   │   └── hooks/
│   └── package.json
└── README.md
```

## 🎯 Próximos Passos
1. Configurar chaves de API em produção
2. Testar em dispositivos reais
3. Validar com usuários finais
4. Considerar desenvolvimento de PWA/App nativo

## 📞 Suporte
Sistema desenvolvido para validação em navegador antes do desenvolvimento do aplicativo móvel.

---
**VIP Mudanças - Sistema v3.0 FINAL**  
*Pronto para uso em campo com todas as funcionalidades ativas*

