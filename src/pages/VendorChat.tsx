import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Mail, 
  Building2, 
  Clock,
  Check,
  CheckCheck,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  sender: 'vendor' | 'owner';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface ChatSession {
  id: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  property: string;
  propertyAddress: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: ChatMessage[];
}

const VendorChat: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Load chat sessions from localStorage
  const loadChatSessions = () => {
    try {
      const savedChats = localStorage.getItem('pms-vendor-chats');
      if (savedChats) {
        const parsedChats = JSON.parse(savedChats);
        // Convert string dates back to Date objects
        const chatsWithDates = parsedChats.map((chat: any) => ({
          ...chat,
          lastMessageTime: new Date(chat.lastMessageTime),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatSessions(chatsWithDates);
      } else {
        // Create default chat sessions
        const defaultChats: ChatSession[] = [
          {
            id: '1',
            ownerName: 'Sarah Johnson',
            ownerEmail: 'sarah.johnson@example.com',
            ownerPhone: '+1 (555) 123-4567',
            property: 'Sunset Apartments',
            propertyAddress: '123 Main Street, Downtown',
            lastMessage: 'Thanks for the quick repair on the HVAC unit!',
            lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            unreadCount: 0,
            messages: [
              {
                id: '1',
                sender: 'owner',
                message: 'Hi! I need someone to look at the HVAC unit in Unit 3B. It\'s not cooling properly.',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '2',
                sender: 'vendor',
                message: 'I can come by this afternoon around 2 PM. Is that convenient?',
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '3',
                sender: 'owner',
                message: 'Perfect! I\'ll make sure the tenant is available.',
                timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '4',
                sender: 'vendor',
                message: 'Great! I\'ll bring my tools and check the unit thoroughly.',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '5',
                sender: 'owner',
                message: 'Thanks for the quick repair on the HVAC unit!',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: true
              }
            ]
          },
          {
            id: '2',
            ownerName: 'Michael Chen',
            ownerEmail: 'michael.chen@example.com',
            ownerPhone: '+1 (555) 987-6543',
            property: 'Riverside Plaza',
            propertyAddress: '456 River Road, Midtown',
            lastMessage: 'When can you start the plumbing work?',
            lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            unreadCount: 1,
            messages: [
              {
                id: '1',
                sender: 'owner',
                message: 'We have a plumbing issue in the basement. Water is leaking from the main pipe.',
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '2',
                sender: 'vendor',
                message: 'I can assess the situation tomorrow morning. How urgent is this?',
                timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '3',
                sender: 'owner',
                message: 'It\'s quite urgent. The water is affecting the electrical panel.',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '4',
                sender: 'owner',
                message: 'When can you start the plumbing work?',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                read: false
              }
            ]
          },
          {
            id: '3',
            ownerName: 'Emily Rodriguez',
            ownerEmail: 'emily.rodriguez@example.com',
            ownerPhone: '+1 (555) 456-7890',
            property: 'Garden View Complex',
            propertyAddress: '789 Garden Lane, Uptown',
            lastMessage: 'The maintenance schedule looks good.',
            lastMessageTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            unreadCount: 0,
            messages: [
              {
                id: '1',
                sender: 'owner',
                message: 'I\'d like to schedule regular maintenance for all units.',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '2',
                sender: 'vendor',
                message: 'I can provide monthly maintenance checks. What\'s your budget?',
                timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000),
                read: true
              },
              {
                id: '3',
                sender: 'owner',
                message: 'The maintenance schedule looks good.',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                read: true
              }
            ]
          }
        ];
        setChatSessions(defaultChats);
        localStorage.setItem('pms-vendor-chats', JSON.stringify(defaultChats));
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && profile) {
      loadChatSessions();
    }
  }, [user, profile]);

  const formatTime = (date: Date) => {
    if (isNaN(date.getTime())) {
      return 'Unknown';
    }
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'vendor',
      message: newMessage.trim(),
      timestamp: new Date(),
      read: false
    };

    const updatedChats = chatSessions.map(chat => {
      if (chat.id === selectedChat.id) {
        const updatedMessages = [...chat.messages, message];
        return {
          ...chat,
          messages: updatedMessages,
          lastMessage: message.message,
          lastMessageTime: message.timestamp,
          unreadCount: chat.id === selectedChat.id ? 0 : chat.unreadCount
        };
      }
      return chat;
    });

    setChatSessions(updatedChats);
    setSelectedChat(updatedChats.find(chat => chat.id === selectedChat.id) || null);
    setNewMessage('');
    
    // Save to localStorage
    localStorage.setItem('pms-vendor-chats', JSON.stringify(updatedChats));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Loading chat sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/vendor-dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-light text-black">Messages</h1>
                <p className="text-sm text-gray-600 font-light">Communicate with property owners</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-light">
                {chatSessions.length} conversations
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm rounded-3xl h-full">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {chatSessions.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedChat?.id === chat.id ? 'bg-gray-100 border border-gray-200' : ''
                      }`}
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-light text-black text-lg">{chat.ownerName}</h3>
                          <p className="text-sm text-gray-600 font-light">{chat.property}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {chat.unreadCount > 0 && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500 font-light">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 font-light line-clamp-2">
                        {chat.lastMessage}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedChat ? (
              <Card className="border-0 shadow-sm rounded-3xl h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  {/* Chat Header */}
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-light text-black">{selectedChat.ownerName}</h2>
                        <p className="text-sm text-gray-600 font-light">{selectedChat.property}</p>
                        <p className="text-xs text-gray-500 font-light">{selectedChat.propertyAddress}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'vendor'
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm font-light">{message.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.sender === 'vendor' && (
                              <div className="ml-2">
                                {message.read ? (
                                  <CheckCheck className="h-3 w-3 opacity-70" />
                                ) : (
                                  <Check className="h-3 w-3 opacity-70" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm rounded-3xl h-full">
                <CardContent className="p-12 text-center flex items-center justify-center">
                  <div>
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-light text-gray-600 mb-2">Select a conversation</h3>
                    <p className="text-gray-500 font-light">Choose a chat from the list to start messaging</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorChat;
