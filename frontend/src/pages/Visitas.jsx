import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Download,
  ExternalLink,
  Camera,
  Eye,
  FileText
} from 'lucide-react';
import VistoriaInteligente from '../components/VistoriaInteligente';
import ChecklistVistoria from '../components/ChecklistVistoria';
import mockData from '../data/mockData';

const Visitas = () => {
  const [visitas, setVisitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVisita, setEditingVisita] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [vistoriaAberta, setVistoriaAberta] = useState(null);
  const [checklistAberto, setChecklistAberto] = useState(null);

  useEffect(() => {
    // Dados mockados de visitas
    const visitasMock = [
      {
        id: 1,
        cliente: 'Maria Silva',
        telefone: '(11) 99999-1234',
        email: 'maria@email.com',
        endereco: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
        data: '2024-06-25',
        hora: '14:00',
        responsavel: 'Kenneth',
        status: 'agendada',
        observacoes: 'Cliente prefere horário da tarde. Apartamento no 5º andar.',
        tipoMudanca: 'Residencial',
        googleEventId: 'event_123',
        vistoriaRealizada: false
      },
      {
        id: 2,
        cliente: 'João Santos',
        telefone: '(11) 88888-5678',
        email: 'joao@empresa.com',
        endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
        data: '2024-06-24',
        hora: '10:00',
        responsavel: 'Kenneth',
        status: 'realizada',
        observacoes: 'Mudança comercial. Muitos equipamentos eletrônicos.',
        tipoMudanca: 'Comercial',
        googleEventId: 'event_124',
        vistoriaRealizada: true
      },
      {
        id: 3,
        cliente: 'Ana Costa',
        telefone: '(11) 77777-9012',
        email: 'ana@email.com',
        endereco: 'Rua Augusta, 500 - Consolação, São Paulo',
        data: '2024-06-23',
        hora: '16:00',
        responsavel: 'Douglas',
        status: 'cancelada',
        observacoes: 'Cliente cancelou por motivos pessoais.',
        tipoMudanca: 'Residencial',
        googleEventId: 'event_125',
        vistoriaRealizada: false
      },
      {
        id: 4,
        cliente: 'Carlos Lima',
        telefone: '(11) 66666-3456',
        email: 'carlos@email.com',
        endereco: 'Rua Oscar Freire, 200 - Jardins, São Paulo',
        data: '2024-06-26',
        hora: '09:00',
        responsavel: 'Kenneth',
        status: 'agendada',
        observacoes: 'Casa grande, mudança completa.',
        tipoMudanca: 'Residencial',
        googleEventId: 'event_126',
        vistoriaRealizada: false
      }
    ];
    setVisitas(visitasMock);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'realizada': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'agendada': return <Clock className="h-4 w-4" />;
      case 'realizada': return <CheckCircle className="h-4 w-4" />;
      case 'cancelada': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredVisitas = visitas.filter(visita => {
    const matchesStatus = filtroStatus === 'todas' || visita.status === filtroStatus;
    const matchesSearch = visita.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visita.endereco.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const iniciarVistoria = (visitaId) => {
    setVistoriaAberta(visitaId);
  };

  const finalizarVistoria = (dadosVistoria) => {
    // Atualizar a visita com os dados da vistoria
    setVisitas(prev => prev.map(visita => 
      visita.id === vistoriaAberta 
        ? { ...visita, vistoriaRealizada: true, dadosVistoria }
        : visita
    ));
    setVistoriaAberta(null);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-vip-gradient text-white px-6 py-4 shadow-vip">
        <h1 className="text-2xl font-bold flex items-center">
          <Calendar className="mr-3" />
          Visitas e Vistoria Inteligente
        </h1>
        <p className="text-blue-100 mt-1">
          Gerencie visitas e realize vistorias com IA Vision
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por cliente ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todas">Todas as visitas</option>
              <option value="agendada">Agendadas</option>
              <option value="realizada">Realizadas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Visita
          </button>
        </div>
      </div>

      {/* Lista de Visitas */}
      <div className="p-6">
        <div className="grid gap-4">
          {filteredVisitas.map((visita) => (
            <div key={visita.id} className="bg-white rounded-xl shadow-vip border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{visita.cliente}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(visita.status)}`}>
                      {getStatusIcon(visita.status)}
                      {visita.status.charAt(0).toUpperCase() + visita.status.slice(1)}
                    </span>
                    {visita.vistoriaRealizada && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        Vistoria IA
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                      {new Date(visita.data).toLocaleDateString('pt-BR')} às {visita.hora}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-green-500" />
                      {visita.endereco}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-purple-500" />
                      Responsável: {visita.responsavel}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-orange-500" />
                      {visita.telefone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-red-500" />
                      {visita.email}
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                      {visita.tipoMudanca}
                    </div>
                  </div>
                  
                  {visita.observacoes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{visita.observacoes}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  {visita.status === 'agendada' && !visita.vistoriaRealizada && (
                    <>
                      <button
                        onClick={() => iniciarVistoria(visita.id)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center text-sm"
                        title="Iniciar Vistoria Inteligente"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Vistoria IA
                      </button>
                      
                      <button
                        onClick={() => setChecklistAberto(visita.id)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center text-sm"
                        title="Checklist Inteligente"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Checklist
                      </button>
                    </>
                  )}
                  
                  {visita.vistoriaRealizada && (
                    <button
                      onClick={() => {/* Visualizar vistoria */}}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center text-sm"
                      title="Visualizar Vistoria"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Vistoria
                    </button>
                  )}
                  
                  <button
                    onClick={() => setEditingVisita(visita)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </button>
                  
                  <button
                    onClick={() => {/* Deletar visita */}}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVisitas.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma visita encontrada</h3>
            <p className="text-gray-500">
              {searchTerm || filtroStatus !== 'todas' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece agendando uma nova visita.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Vistoria Inteligente */}
      {vistoriaAberta && (
        <VistoriaInteligente
          visitaId={vistoriaAberta}
          onClose={() => setVistoriaAberta(null)}
          onSave={finalizarVistoria}
        />
      )}

      {/* Modal de Checklist Inteligente */}
      {checklistAberto && (
        <ChecklistVistoria
          clienteId={checklistAberto}
          onClose={() => setChecklistAberto(null)}
        />
      )}
    </div>
  );
};

export default Visitas;
