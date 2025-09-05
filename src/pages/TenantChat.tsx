import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  Smile, 
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Building2,
  Calendar,
  ArrowLeft,
  MoreVertical,
  Star,
  Archive,
  Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatSession {
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  propertyName: string;
  unitNumber: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const TenantChat = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
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
      // Create default chat session with property owner
      const defaultSession: ChatSession = {
        ownerId: 'owner-001',
        ownerName: 'Sarah Johnson',
        ownerEmail: 'sarah.johnson@downtownresidences.com',
        propertyName: 'Downtown Residences',
        unitNumber: '5B',
        lastMessage: 'Welcome! I\'m here to help with any questions about your lease or property.',
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        unreadCount: 0,
        messages: [
          {
            id: 'msg-001',
            senderId: 'owner',
            senderName: 'Sarah Johnson',
            content: 'Welcome to Downtown Residences! I\'m Sarah, your property manager. Feel free to reach out if you have any questions about your lease, property, or need assistance with anything.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            isRead: true
          },
          {
            id: 'msg-002',
            senderId: 'owner',
            senderName: 'Sarah Johnson',
            content: 'Your lease agreement and move-in checklist are available in your tenant portal. Please review them and let me know if you have any questions.',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            isRead: true
          }
        ]
      };

      // Check if there are existing chat sessions in localStorage
      const existingChats = localStorage.getItem('pms-tenant-chats');
      if (existingChats) {
        const savedSessions = JSON.parse(existingChats);
        // Convert string dates back to Date objects
        const convertedSessions = savedSessions.map((session: any) => ({
          ...session,
          lastMessageTime: new Date(session.lastMessageTime),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatSessions(convertedSessions);
      } else {
        setChatSessions([defaultSession]);
        // Save to localStorage
        localStorage.setItem('pms-tenant-chats', JSON.stringify([defaultSession]));
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      // Fallback to default session
      const defaultSession: ChatSession = {
        ownerId: 'owner-001',
        ownerName: 'Sarah Johnson',
        ownerEmail: 'sarah.johnson@downtownresidences.com',
        propertyName: 'Downtown Residences',
        unitNumber: '5B',
        lastMessage: 'Welcome! I\'m here to help with any questions about your lease or property.',
        lastMessageTime: new Date(),
        unreadCount: 0,
        messages: []
      };
      setChatSessions([defaultSession]);
    }
  };

  const getCurrentChatSession = () => {
    return chatSessions.find(session => session.ownerId === selectedOwner);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedOwner) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'tenant',
      senderName: profile?.name || user?.email || 'You',
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false
    };

    // Update chat sessions with new message
    setChatSessions(prev => prev.map(session => {
      if (session.ownerId === selectedOwner) {
        const updatedSession = {
          ...session,
          lastMessage: newMessage.trim(),
          lastMessageTime: new Date(),
          messages: [...session.messages, message]
        };
        
        // Save to localStorage
        const updatedSessions = prev.map(s => s.ownerId === selectedOwner ? updatedSession : s);
        localStorage.setItem('pms-tenant-chats', JSON.stringify(updatedSessions));
        
        return updatedSession;
      }
      return session;
    }));

    setNewMessage('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the property owner.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredSessions = chatSessions.filter(session =>
    session.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    // Ensure we have a valid Date object
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      return 'Unknown';
    }
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - validDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return validDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-extralight text-black tracking-tight font-google-sans">
                Messages
              </h1>
              <p className="text-gray-500 font-light mt-1">
                Communicate with your property owner
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <Card className="lg:col-span-1 border-0 shadow-sm rounded-3xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-light">
                <MessageSquare className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredSessions.map((session) => (
                  <div
                    key={session.ownerId}
                    onClick={() => setSelectedOwner(session.ownerId)}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                      selectedOwner === session.ownerId ? 'bg-gray-50 border-r-2 border-black' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gray-100 text-gray-600 font-light">
                          {session.ownerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-light text-black truncate">
                            {session.ownerName}
                          </h3>
                          <span className="text-xs text-gray-500 font-light">
                            {formatTime(session.lastMessageTime)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 font-light truncate mb-1">
                          {session.propertyName} - Unit {session.unitNumber}
                        </p>
                        <p className="text-sm text-gray-500 font-light truncate">
                          {session.lastMessage}
                        </p>
                        {session.unreadCount > 0 && (
                          <Badge className="mt-2 bg-black text-white text-xs">
                            {session.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 border-0 shadow-sm rounded-3xl">
            {selectedOwner ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gray-100 text-gray-600 font-light">
                          {getCurrentChatSession()?.ownerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-light text-black">
                          {getCurrentChatSession()?.ownerName}
                        </h3>
                        <p className="text-sm text-gray-500 font-light">
                          Property Owner • {getCurrentChatSession()?.propertyName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                        <p className="text-sm">Start the conversation with your property owner</p>
                      </div>
                    ) : (
                      getCurrentChatSession()?.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === 'tenant' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.senderId === 'tenant'
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-black'
                            }`}
                          >
                            <p className="text-sm font-light">{message.content}</p>
                            <p className={`text-xs mt-1 font-light ${
                              message.senderId === 'tenant' ? 'text-gray-300' : 'text-gray-500'
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
                  <h3 className="text-xl font-light text-gray-600 mb-2">Select a conversation to start chatting</h3>
                  <p className="text-sm">Choose a property owner from the list to begin your conversation</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TenantChat;
