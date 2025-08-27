import React, { useState } from 'react';
import { MessageCircle, Clock, User, UserPlus } from 'lucide-react';
import SkillCard from '../components/SkillCard';

const Dashboard = ({ currentUser, availableSkills }) => {
  // State specific to the dashboard can live here
  const [skillRequests, setSkillRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, skill: 'React Development', requester: 'Mike Johnson', timestamp: '2 hours ago' },
  ]);

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

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
        {/* All the dashboard JSX from the original file goes here */}
        {/* ... My Requests, Pending Requests to me, etc. ... */}
        
        <h2 className="text-2xl font-bold text-gray-800 my-6">Available Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableSkills.map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              onSendRequest={() => sendSkillRequest(skill.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;