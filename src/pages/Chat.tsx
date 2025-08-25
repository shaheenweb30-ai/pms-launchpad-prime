import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Search, 
  MoreVertical, 
  Paperclip,
  Smile
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatSession {
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
  propertyName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const Chat = () => {
  const { t } = useTranslation();
  const [selectedTenant, setSelectedTenant] = useState<string | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load chat sessions from localStorage on component mount
  useEffect(() => {
    loadChatSessions();
  }, []);

  const loadChatSessions = () => {
    try {
      const savedTenants = localStorage.getItem('pms-tenants');
      if (savedTenants) {
        const tenants = JSON.parse(savedTenants);
        const sessions: ChatSession[] = tenants.map((tenant: any) => ({
          tenantId: tenant.id,
          tenantName: tenant.name,
          tenantEmail: tenant.email,
          propertyName: tenant.property,
          lastMessage: 'No messages yet',
          lastMessageTime: new Date(),
          unreadCount: 0,
          messages: []
        }));
        setChatSessions(sessions);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  };

  const getCurrentChatSession = () => {
    return chatSessions.find(session => session.tenantId === selectedTenant);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTenant) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'owner',
      senderName: 'Property Owner',
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false
    };

    // Update chat sessions with new message
    setChatSessions(prev => prev.map(session => {
      if (session.tenantId === selectedTenant) {
        return {
          ...session,
          lastMessage: newMessage.trim(),
          lastMessageTime: new Date(),
          messages: [...session.messages, message]
        };
      }
      return session;
    }));

    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredSessions = chatSessions.filter(session =>
    session.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                Tenant Chat
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Communicate directly with your tenants through our integrated chat system
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">{chatSessions.length} tenants available</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MessageSquare className="h-4 w-4" />
                  <span>Real-time messaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tenant List Sidebar */}
        <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-light">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-black">Tenants</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
              />
            </div>

            {/* Tenant List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredSessions.map((session) => (
                <div
                  key={session.tenantId}
                  onClick={() => setSelectedTenant(session.tenantId)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
                    selectedTenant === session.tenantId ? 'bg-gray-100 border border-gray-200' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={session.tenantName} />
                      <AvatarFallback className="bg-gray-100 text-gray-600">
                        {getInitials(session.tenantName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-black truncate">{session.tenantName}</h4>
                        {session.unreadCount > 0 && (
                          <Badge className="bg-black text-white text-xs px-2 py-1 rounded-full">
                            {session.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{session.propertyName}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.lastMessage} • {formatTime(session.lastMessageTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-0 bg-gradient-to-br from-slate-50 via-white to-gray-50/30 shadow-lg rounded-3xl lg:col-span-2">
          {selectedTenant ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" alt={getCurrentChatSession()?.tenantName} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 text-lg">
                        {getCurrentChatSession() ? getInitials(getCurrentChatSession()!.tenantName) : ''}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium text-black">
                        {getCurrentChatSession()?.tenantName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getCurrentChatSession()?.propertyName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-4">
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {getCurrentChatSession()?.messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg font-light">No messages yet</p>
                      <p className="text-sm">Start the conversation with your tenant</p>
                    </div>
                  ) : (
                    getCurrentChatSession()?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'owner' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.senderId === 'owner'
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-black'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'owner' ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-black hover:bg-gray-800 text-white font-light px-6 py-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="p-8">
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-light text-gray-600 mb-2">Select a tenant to start chatting</h3>
                <p className="text-sm">Choose a tenant from the list to begin your conversation</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Chat;
