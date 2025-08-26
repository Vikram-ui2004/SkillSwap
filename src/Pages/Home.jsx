import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Video, Shield, Star, ChevronRight, Menu, X, User, MessageCircle, Calendar, CheckCircle, Clock, UserPlus } from 'lucide-react';

const SkillExchangeApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [skillRequests, setSkillRequests] = useState([]);
  const [userSkills, setUserSkills] = useState([]);

  // Sample data for demonstration
  const [availableSkills] = useState([
    { id: 1, name: 'JavaScript Programming', teacher: 'Alex Chen', rating: 4.9, students: 150, image: '👨‍💻' },
    { id: 2, name: 'Digital Art & Design', teacher: 'Sarah Kim', rating: 4.8, students: 89, image: '🎨' },
    { id: 3, name: 'Spanish Language', teacher: 'Maria Rodriguez', rating: 4.7, students: 200, image: '🌎' },
    { id: 4, name: 'Guitar Playing', teacher: 'John Smith', rating: 4.9, students: 75, image: '🎸' },
    { id: 5, name: 'Data Science', teacher: 'David Park', rating: 4.8, students: 120, image: '📊' },
    { id: 6, name: 'Photography', teacher: 'Emma Wilson', rating: 4.6, students: 95, image: '📸' }
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, skill: 'React Development', requester: 'Mike Johnson', status: 'pending', timestamp: '2 hours ago' },
    { id: 2, skill: 'Graphic Design', requester: 'Lisa Wang', status: 'pending', timestamp: '1 day ago' }
  ]);

  const handleAuth = (formData) => {
    const userData = {
      name: formData.name || 'John Doe',
      email: formData.email,
      skills: ['React Development', 'UI/UX Design']
    };
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  const sendSkillRequest = (skillId) => {
    const skill = availableSkills.find(s => s.id === skillId);
    const newRequest = {
      id: Date.now(),
      skill: skill.name,
      teacher: skill.teacher,
      status: 'pending',
      timestamp: 'Just now'
    };
    setSkillRequests([...skillRequests, newRequest]);
    alert(`Request sent to ${skill.teacher} for ${skill.name}!`);
  };

  const handleRequest = (requestId, action) => {
    if (action === 'accept') {
      const meetLink = `https://meet.google.com/abc-def-${Math.random().toString(36).substr(2, 3)}`;
      alert(`Request accepted! Google Meet link created: ${meetLink}`);
    } else {
      alert('Request declined.');
    }
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
  };

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {authMode === 'login' ? 'Welcome Back' : 'Join SkillSwap'}
          </h2>
          <button
            onClick={() => setShowAuth(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            onClick={() => {
              const nameInput = document.querySelector('input[name="name"]');
              const emailInput = document.querySelector('input[name="email"]');
              const passwordInput = document.querySelector('input[name="password"]');
              
              const userData = {
                name: nameInput ? nameInput.value : 'John Doe',
                email: emailInput.value,
                password: passwordInput.value
              };
              
              if (emailInput.value && passwordInput.value) {
                handleAuth(userData);
              } else {
                alert('Please fill in all required fields.');
              }
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const SkillCard = ({ skill }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <div className="p-6">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {skill.image}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{skill.name}</h3>
        <p className="text-gray-600 mb-3">by {skill.teacher}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{skill.rating}</span>
          </div>
          <span className="text-sm text-gray-500">{skill.students} students</span>
        </div>
        <button
          onClick={() => isLoggedIn ? sendSkillRequest(skill.id) : setShowAuth(true)}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
        >
          Request to Learn
        </button>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
          <p className="text-gray-600 mt-2">Manage your learning journey and teaching opportunities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="mr-3 text-blue-600" />
                My Skill Requests
              </h2>
              {skillRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No requests sent yet. Browse skills below to get started!</p>
              ) : (
                <div className="space-y-4">
                  {skillRequests.map(request => (
                    <div key={request.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{request.skill}</h3>
                        <p className="text-sm text-gray-600">Teacher: {request.teacher}</p>
                        <p className="text-xs text-gray-500">{request.timestamp}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                        <span className="text-sm text-yellow-600 font-medium">Pending</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {availableSkills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Requests to Me */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="mr-3 text-purple-600" />
                Requests to You
              </h2>
              {pendingRequests.length === 0 ? (
                <p className="text-gray-500 text-sm">No pending requests</p>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map(request => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <h3 className="font-medium text-gray-800">{request.skill}</h3>
                      <p className="text-sm text-gray-600">From: {request.requester}</p>
                      <p className="text-xs text-gray-500 mb-3">{request.timestamp}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRequest(request.id, 'accept')}
                          className="flex-1 bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequest(request.id, 'decline')}
                          className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Skills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Skills</h2>
              <div className="space-y-2">
                {currentUser?.skills.map((skill, index) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                    {skill}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                Add New Skill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">How it Works</a>
              <a href="#security" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Security</a>
              <button
                onClick={() => setShowAuth(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600">Features</a>
              <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-blue-600">How it Works</a>
              <a href="#security" className="block py-2 text-gray-700 hover:text-blue-600">Security</a>
              <button
                onClick={() => setShowAuth(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full font-medium mt-4"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Exchange Skills,
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Expand Minds</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with learners and teachers worldwide. Share your expertise, learn new skills, and grow together in our secure, trusted community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowAuth(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Learning Today
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-200">
              Become a Teacher
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SkillSwap?</h2>
            <p className="text-xl text-gray-600">Discover the features that make learning and teaching effortless</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Matching</h3>
              <p className="text-gray-600">Our intelligent system connects you with the perfect learning partners based on skills, availability, and compatibility.</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl hover:bg-green-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Instant Video Learning</h3>
              <p className="text-gray-600">Seamless Google Meet integration for immediate face-to-face learning sessions with just one click.</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl hover:bg-purple-50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">100% Secure & Trusted</h3>
              <p className="text-gray-600">Advanced security measures, verified users, and encrypted communications ensure your safety and privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How SkillSwap Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your learning journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: UserPlus, title: 'Create Account', desc: 'Sign up and add your skills and interests' },
              { icon: Users, title: 'Find Matches', desc: 'Browse skills or get matched with compatible learners' },
              { icon: MessageCircle, title: 'Send Request', desc: 'Request to learn from someone or accept teaching requests' },
              { icon: Video, title: 'Start Learning', desc: 'Connect via Google Meet and begin your session' }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
                {index < 3 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-4 text-blue-400 w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Security is Our Priority</h2>
            <p className="text-xl text-gray-600">Trust and safety features that protect every interaction</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Verified Users', desc: 'All users undergo verification for authenticity' },
              { icon: CheckCircle, title: 'Rating System', desc: 'Community-driven ratings and reviews' },
              { icon: Users, title: 'Moderated Platform', desc: '24/7 monitoring and support team' },
              { icon: BookOpen, title: 'Safe Learning', desc: 'Secure video calls and encrypted data' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 border rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of learners and teachers already growing together</p>
          <button
            onClick={() => setShowAuth(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Join SkillSwap Now - It's Free!
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      {showAuth && <AuthModal />}
    </div>
  );
};

export default SkillExchangeApp;