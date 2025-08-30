import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Zap, Award, PlusCircle, X } from 'lucide-react';

// --- Dummy Data (replace with your actual props/state) ---
const currentUser = {
  name: 'Aarav',
  bio: 'React developer passionate about sharing knowledge and learning new design skills.',
};

const userStats = [
  { value: '120', label: 'SkillCoins Earned', icon: <Award size={24} /> },
  { value: '15', label: 'Sessions Completed', icon: <Zap size={24} /> },
  { value: '3', label: 'Active Skills', icon: <BookOpen size={24} /> },
];

const skillsToTeach = ['React', 'JavaScript', 'Tailwind CSS'];
const skillsToLearn = ['UI/UX Design', 'Figma', 'Python'];

const availableSkills = [
  { id: 1, name: 'Advanced Python', teacher: 'Priya Verma', avatar: 'PV' },
  { id: 2, name: 'Graphic Design Basics', teacher: 'Rohit Khanna', avatar: 'RK' },
  { id: 3, name: 'Public Speaking', teacher: 'Mike Johnson', avatar: 'MJ' },
];


// --- Reusable Sub-Components for the Dashboard ---

const StatCard = ({ stat }) => (
  <div className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-black/5 text-center shadow-sm flex flex-col items-center justify-center">
    <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-[#7E69AB]/15 text-[#3B1E54]">
      {stat.icon}
    </div>
    <p className="text-3xl font-bold text-[#1f2040]">{stat.value}</p>
    <p className="text-sm text-[#4b546e] mt-1">{stat.label}</p>
  </div>
);

const SkillManagementCard = ({ title, skills, onAdd, onRemove }) => (
  <div className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm h-full">
    <h3 className="text-xl font-bold text-[#1f2040] mb-4">{title}</h3>
    <ul className="space-y-3 mb-4">
      {skills.map((skill, index) => (
        <li key={index} className="flex justify-between items-center bg-purple-50 p-3 rounded-lg">
          <span className="text-base text-[#3B1E54] font-medium">{skill}</span>
          <button onClick={() => onRemove(skill)} className="text-gray-400 hover:text-red-500">
            <X size={18} />
          </button>
        </li>
      ))}
    </ul>
    <button
      onClick={onAdd}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-purple-100 text-[#3B1E54] font-semibold rounded-lg hover:bg-purple-200 transition-colors duration-300"
    >
      <PlusCircle size={20} />
      Add New Skill
    </button>
  </div>
);

const AvailableSkillCard = ({ skill, onSendRequest }) => (
  <div className="bg-white/85 p-5 rounded-xl shadow-md border border-black/5 flex items-center justify-between">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold">
        {skill.avatar}
      </div>
      <div>
        <h4 className="font-bold text-[#1f2040]">{skill.name}</h4>
        <p className="text-sm text-[#4b546e]">Taught by {skill.teacher}</p>
      </div>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSendRequest(skill.id)}
      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-semibold tracking-wide shadow-lg"
    >
      Request
    </motion.button>
  </div>
);


// --- Main Dashboard Component ---

const Dashboard = () => {

  const handleSendRequest = (skillId) => {
    const skill = availableSkills.find(s => s.id === skillId);
    alert(`Request sent to ${skill.teacher} for ${skill.name}!`);
    // Add logic to handle the request state
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_800px_at_100%_20%,#dbe7ff_0%,transparent_60%),radial-gradient(900px_620px_at_0%_90%,#f3e8ff_0%,transparent_55%),linear-gradient(180deg,#ffffff_0%,#f0f4ff_40%,#f5ecff_100%)] text-[#2d2d44] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#1f2040]">
            Welcome back, <span className="text-purple-600">{currentUser.name}</span>!
          </h1>
          <p className="mt-2 text-lg text-gray-600">{currentUser.bio}</p>
        </motion.div>
        
        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
          {/* --- Stats Section (Gamification) --- */}
          {userStats.map((stat, index) => (
             <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
             >
                <StatCard stat={stat} />
            </motion.div>
          ))}

          {/* --- Skills Management Section (2 Columns) --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <SkillManagementCard 
              title="Skills You Can Teach" 
              skills={skillsToTeach}
              onAdd={() => alert('Open modal to add a teaching skill!')}
              onRemove={(skill) => alert(`Remove ${skill}?`)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
             className="lg:col-span-1"
          >
             <SkillManagementCard 
              title="Skills You Want to Learn" 
              skills={skillsToLearn}
              onAdd={() => alert('Open modal to add a learning skill!')}
              onRemove={(skill) => alert(`Remove ${skill}?`)}
            />
          </motion.div>
          
          {/* --- Available Skills Section --- */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.5 }}
             className="lg:col-span-3 bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-[#1f2040] mb-4">Discover New Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableSkills.map(skill => (
                <AvailableSkillCard key={skill.id} skill={skill} onSendRequest={handleSendRequest} />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;