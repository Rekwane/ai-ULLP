import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Volume2, Settings, Globe, BookOpen, MessageCircle, Users, Zap, Brain } from 'lucide-react';

const LanguageLearningApp = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('Spanish');
  const [nativeLanguage, setNativeLanguage] = useState('English');
  const [conversationMode, setConversationMode] = useState('beginner');
  const [selectedTopic, setSelectedTopic] = useState('daily_conversation');
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [realTimeTranslation, setRealTimeTranslation] = useState(true);
  const [voiceSelection, setVoiceSelection] = useState('native_female_1');
  const [activeFeature, setActiveFeature] = useState('conversation');

  // Simulated extensive language database
  const languageCategories = {
    modern: ['Spanish', 'French', 'German', 'Japanese', 'Mandarin', 'Arabic', 'Russian', 'Portuguese', 'Italian', 'Korean', 'Hindi', 'Dutch', 'Swedish', 'Norwegian'],
    ancient: ['Latin', 'Ancient Greek', 'Sanskrit', 'Old Norse', 'Ancient Egyptian', 'Sumerian', 'Akkadian', 'Classical Chinese'],
    indigenous: ['Navajo', 'Cherokee', 'Quechua', 'Guarani', 'Maori', 'Hawaiian', 'Inuktitut', 'Ojibwe'],
    regional: ['Cantonese', 'Sicilian', 'Bavarian', 'Scots Gaelic', 'Catalan', 'Basque', 'Welsh', 'Irish'],
    constructed: ['Esperanto', 'Klingon', 'Elvish', 'Dothraki']
  };

  const conversationTopics = [
    'daily_conversation', 'business', 'travel', 'culture', 'food', 'technology', 
    'literature', 'history', 'science', 'art', 'sports', 'family', 'education'
  ];

  const voiceOptions = [
    'native_female_1', 'native_female_2', 'native_male_1', 'native_male_2', 
    'elder_storyteller', 'young_native', 'academic_professor', 'street_casual'
  ];

  const cognitiveFeatures = [
    'Spaced Repetition Algorithm',
    'Contextual Memory Enhancement',
    'Phonetic Pattern Recognition',
    'Cultural Context Integration',
    'Emotional Memory Anchoring',
    'Immersive Scenario Building'
  ];

  // Simulated AI responses based on learning science
  const generateAIResponse = (topic, level) => {
    const responses = {
      beginner: {
        daily_conversation: "¡Hola! Me llamo Sofia. ¿Cómo te llamas? (Hello! My name is Sofia. What's your name?) [I'm using simple present tense and cognates to help you recognize patterns]",
        travel: "¿Dónde está el hotel? (Where is the hotel?) [Notice 'dónde' sounds like 'donde' - use sound associations to remember]"
      },
      intermediate: {
        daily_conversation: "¿Qué planes tienes para el fin de semana? Me encantaría conocer tus aficiones. (What plans do you have for the weekend? I'd love to know your hobbies.) [I'm introducing subjunctive mood gradually]",
        business: "En mi opinión, deberíamos considerar las implicaciones culturales de esta propuesta. (In my opinion, we should consider the cultural implications of this proposal.)"
      }
    };
    return responses[level]?.[topic] || "Let's practice! Tell me about your day in " + currentLanguage;
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const newMessage = {
          type: 'user',
          text: userInput || 'Hola, ¿cómo estás?',
          translation: realTimeTranslation ? 'Hello, how are you?' : null,
          corrections: ['Pronunciation: "estás" - emphasis on second syllable', 'Grammar: Perfect! You used formal "usted" form correctly']
        };
        setMessages(prev => [...prev, newMessage]);
        
        // AI Response
        setTimeout(() => {
          const aiResponse = {
            type: 'ai',
            text: generateAIResponse(selectedTopic, conversationMode),
            analysis: 'Your pronunciation improved 15% since yesterday. Try focusing on rolling your Rs more. Cultural note: In this context, a native speaker might add "¿y tú?" to continue the conversation flow.'
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 1000);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Universal Language Master
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <select 
              value={nativeLanguage} 
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="bg-white/10 rounded-lg px-3 py-2 border border-white/20"
            >
              <option value="English">Native: English</option>
              <option value="Spanish">Native: Spanish</option>
              <option value="French">Native: French</option>
            </select>
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="bg-white/10 rounded-lg px-3 py-2 border border-white/20"
            >
              {Object.entries(languageCategories).map(([category, languages]) => (
                <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white/5 border-r border-white/20 p-6">
          <div className="space-y-6">
            {/* Feature Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Learning Mode</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'conversation', icon: MessageCircle, label: 'Conversation' },
                  { id: 'grammar', icon: BookOpen, label: 'Grammar' },
                  { id: 'pronunciation', icon: Mic, label: 'Pronunciation' },
                  { id: 'cultural', icon: Users, label: 'Cultural' }
                ].map(feature => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
                      activeFeature === feature.id 
                        ? 'bg-blue-500/30 border-blue-400' 
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <feature.icon className="w-5 h-5" />
                    <span className="text-sm">{feature.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Proficiency Level */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Proficiency Level</h3>
              <select 
                value={conversationMode} 
                onChange={(e) => setConversationMode(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-3 py-2 border border-white/20"
              >
                <option value="absolute_beginner">Absolute Beginner</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="native_simulation">Native Simulation</option>
              </select>
            </div>

            {/* Topic Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Conversation Topic</h3>
              <select 
                value={selectedTopic} 
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-3 py-2 border border-white/20"
              >
                {conversationTopics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">AI Voice</h3>
              <select 
                value={voiceSelection} 
                onChange={(e) => setVoiceSelection(e.target.value)}
                className="w-full bg-white/10 rounded-lg px-3 py-2 border border-white/20"
              >
                {voiceOptions.map(voice => (
                  <option key={voice} value={voice}>
                    {voice.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Cognitive Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Active Learning Science
              </h3>
              <div className="space-y-2">
                {cognitiveFeatures.slice(0, 3).map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-green-400">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <h2 className="text-2xl font-bold mb-2">Ready to Master {currentLanguage}?</h2>
                  <p className="text-white/70 mb-6">
                    Start speaking and I'll provide real-time feedback, corrections, and cultural insights.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                      <MessageCircle className="w-8 h-8 text-blue-400 mb-2" />
                      <h3 className="font-semibold">AI Conversation</h3>
                      <p className="text-sm text-white/70">Natural dialogue with intelligent feedback</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                      <Mic className="w-8 h-8 text-green-400 mb-2" />
                      <h3 className="font-semibold">Speech Analysis</h3>
                      <p className="text-sm text-white/70">Real-time pronunciation correction</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                      <Brain className="w-8 h-8 text-purple-400 mb-2" />
                      <h3 className="font-semibold">Cognitive Science</h3>
                      <p className="text-sm text-white/70">Memory-optimized learning patterns</p>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-2xl rounded-lg p-4 ${
                    message.type === 'user' 
                      ? 'bg-blue-500/20 border border-blue-400/30' 
                      : 'bg-white/5 border border-white/20'
                  }`}>
                    <div className="flex items-start gap-3">
                      {message.type === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                          <span className="text-sm font-bold">AI</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="mb-2">{message.text}</p>
                        
                        {message.translation && (
                          <div className="bg-black/20 rounded p-2 mb-2">
                            <p className="text-sm text-blue-300">Translation: {message.translation}</p>
                          </div>
                        )}
                        
                        {message.corrections && (
                          <div className="space-y-1">
                            {message.corrections.map((correction, i) => (
                              <div key={i} className="bg-yellow-500/10 border border-yellow-400/30 rounded p-2">
                                <p className="text-sm text-yellow-300">{correction}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {message.analysis && (
                          <div className="bg-green-500/10 border border-green-400/30 rounded p-2 mt-2">
                            <p className="text-sm text-green-300">{message.analysis}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-full transition-all ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Type or speak in ${currentLanguage}...`}
                  className="flex-1 bg-white/10 rounded-lg px-4 py-3 border border-white/20 focus:border-blue-400 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleVoiceInput()}
                />
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRealTimeTranslation(!realTimeTranslation)}
                    className={`p-2 rounded-lg transition-all ${
                      realTimeTranslation 
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30' 
                        : 'bg-white/5 text-white/50 border border-white/20'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition-all">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition-all">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 text-sm text-white/70">
                <span>Learning: {currentLanguage} | Mode: {conversationMode} | Topic: {selectedTopic.replace('_', ' ')}</span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  AI Teacher Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageLearningApp;