import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Zap,
  Award,
  PlusCircle,
  X,
  Save,
  Camera,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Settings,
  LogOut,
  Search,
  Bell,
  ShieldCheck,
  Star,
} from "lucide-react";

// --- Dashboard Components ---
const Modal = ({ children, onClose }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="bg-white/95 dark:bg-gray-800/95 rounded-2xl shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const StatCard = ({ stat }) => (
  <div className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-black/5 text-center shadow-sm flex flex-col items-center justify-center h-full">
    <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-[#7E69AB]/15 text-[#3B1E54] dark:text-purple-300">
      {stat.icon}
    </div>
    <p className="text-3xl font-bold text-[#1f2040] dark:text-white">
      {stat.value}
    </p>
    <p className="text-sm text-[#4b546e] dark:text-gray-300 mt-1">
      {stat.label}
    </p>
  </div>
);

const SkillManagementCard = ({ title, skills, onAdd, onRemove }) => (
  <div className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm h-full flex flex-col">
    <h3 className="text-xl font-bold text-[#1f2040] dark:text-white mb-4">
      {title}
    </h3>
    <div className="flex-grow overflow-y-auto pr-2 -mr-2">
      {skills.length > 0 ? (
        <ul className="space-y-3">
          {skills.map((skill, index) => (
            <motion.li
              key={index}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center bg-purple-50 dark:bg-purple-900/50 p-3 rounded-lg"
            >
              <span className="text-base text-[#3B1E54] dark:text-purple-200 font-medium">
                {skill}
              </span>
              <button
                onClick={() => onRemove(skill)}
                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-400 dark:text-gray-500 py-6">
          No skills added yet.
        </div>
      )}
    </div>
    <button
      onClick={onAdd}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-100 dark:bg-purple-800/60 text-[#3B1E54] dark:text-purple-100 font-semibold rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-300 mt-4"
    >
      <PlusCircle size={20} />
      Add New Skill
    </button>
  </div>
);

const UpcomingSessionCard = ({ session }) => (
  <div className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-xl shadow-md border border-black/5 flex items-center gap-4">
    <div
      className={`w-12 h-12 rounded-lg text-white flex items-center justify-center font-bold ${
        session.type === "learn" ? "bg-indigo-500" : "bg-green-500"
      }`}
    >
      <User size={24} />
    </div>
    <div>
      <p className="font-bold text-gray-500 dark:text-gray-400 text-sm">
        {session.date}
      </p>
      <h4 className="font-bold text-[#1f2040] dark:text-white">
        {session.skill}
      </h4>
      <p className="text-sm text-[#4b546e] dark:text-gray-300">
        {session.type === "learn"
          ? `with ${session.with}`
          : `teaching ${session.with}`}
      </p>
    </div>
  </div>
);

const Dashboard = ({ onLogout }) => {
  // --- State Management ---
  const [currentUser, setCurrentUser] = useState({
    name: "Aarav",
    bio: "React developer passionate about sharing knowledge and learning new design skills.",
    profilePicture: "https://placehold.co/128x128/7E69AB/FFFFFF?text=A",
    socials: {
      github: "aarav-dev",
      linkedin: "aarav-sharma",
      twitter: "aaravcodes",
      email: "aarav@example.com",
    },
    interests: ["Photography", "Hiking", "Sci-Fi Movies", "Cooking"],
  });

  const [userStats] = useState([
    { value: "120", label: "SkillCoins", icon: <Award size={24} /> },
    { value: "15", label: "Sessions Done", icon: <Zap size={24} /> },
    { value: "5", label: "Reviews", icon: <Star size={24} /> },
  ]);

  const [skillsToTeach, setSkillsToTeach] = useState([
    "React",
    "JavaScript",
    "Tailwind CSS",
  ]);
  const [skillsToLearn, setSkillsToLearn] = useState([
    "UI/UX Design",
    "Figma",
    "Python",
  ]);

  const [upcomingSessions] = useState([
    {
      skill: "UI/UX Design Basics",
      with: "Priya Verma",
      date: "Sept 5, 2:00 PM",
      type: "learn",
    },
    {
      skill: "Intro to React Hooks",
      with: "Rohan K.",
      date: "Sept 8, 11:00 AM",
      type: "teach",
    },
  ]);

  const achievements = [
    { icon: <ShieldCheck />, label: "Verified Teacher" },
    { icon: <Star />, label: "Top Learner" },
    { icon: <Zap />, label: "10+ Sessions" },
  ];

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [profileForm, setProfileForm] = useState(currentUser);
  const fileInputRef = useRef(null);

  // --- Event Handlers ---
  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfileForm((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setProfileForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setCurrentUser(profileForm);
    setIsEditingProfile(false);
  };

  const handleProfilePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) =>
        setProfileForm((prev) => ({
          ...prev,
          profilePicture: event.target.result,
        }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (isAddingSkill === "teach")
      setSkillsToTeach((prev) => [...prev, newSkill]);
    else if (isAddingSkill === "learn")
      setSkillsToLearn((prev) => [...prev, newSkill]);
    setNewSkill("");
    setIsAddingSkill(null);
  };

  const handleRemoveSkill = (skillToRemove, type) => {
    if (type === "teach")
      setSkillsToTeach((prev) => prev.filter((s) => s !== skillToRemove));
    else setSkillsToLearn((prev) => prev.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_800px_at_100%_20%,#dbe7ff_0%,transparent_60%),radial-gradient(900px_620px_at_0%_90%,#f3e8ff_0%,transparent_55%),linear-gradient(180deg,#ffffff_0%,#f0f4ff_40%,#f5ecff_100%)] dark:bg-gray-900 text-[#2d2d44] dark:text-gray-200 font-sans">
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="text-purple-600" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                SkillSwap
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600 dark:text-gray-300">
              <a href="#" className="hover:text-purple-600">
                Dashboard
              </a>
              <a href="#" className="hover:text-purple-600">
                Matchmaking
              </a>
              <a href="#" className="hover:text-purple-600">
                Messages
              </a>
              <a href="#" className="hover:text-purple-600">
                Community
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-purple-600">
                <Bell size={20} />
              </button>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-purple-600"
              >
                <LogOut size={20} />
              </button>
              <img
                src={currentUser.profilePicture}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-6 bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-3xl shadow-md border border-black/5 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="relative group">
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera size={32} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-4xl font-bold text-[#1f2040] dark:text-white">
                Welcome back,{" "}
                <span className="text-purple-600">{currentUser.name}</span>!
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                {currentUser.bio}
              </p>
              <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  <Github />
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  <Linkedin />
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  <Twitter />
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-600">
                  <Mail />
                </a>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setProfileForm(currentUser);
                setIsEditingProfile(true);
              }}
              className="bg-purple-100 dark:bg-purple-800/60 text-purple-700 dark:text-purple-100 px-4 py-2 rounded-full flex items-center gap-2 font-semibold"
            >
              <Settings size={18} /> Edit Profile
            </motion.button>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm">
                  <h3 className="text-xl font-bold text-[#1f2040] dark:text-white mb-4">
                    Upcoming Sessions
                  </h3>
                  <div className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <UpcomingSessionCard
                        key={session.skill}
                        session={session}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm">
                  <h3 className="text-xl font-bold text-[#1f2040] dark:text-white mb-4">
                    Achievements
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {achievements.map((ach) => (
                      <div
                        key={ach.label}
                        className="flex flex-col items-center text-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/50 rounded-lg flex-1"
                      >
                        <div className="text-purple-600 dark:text-purple-300">
                          {ach.icon}
                        </div>
                        <p className="text-xs font-semibold text-purple-800 dark:text-purple-200">
                          {ach.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-2 xl:col-span-2 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl text-white text-center flex flex-col items-center justify-center shadow-lg"
              >
                <h2 className="text-3xl font-bold">Ready for a new skill?</h2>
                <p className="mt-2 mb-6 max-w-md">
                  Find the perfect partner to learn from or teach to. Your next
                  learning adventure is just a click away.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full flex items-center gap-2 shadow-xl"
                >
                  <Search size={20} /> Find a Match
                </motion.button>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <SkillManagementCard
                    title="Skills You Teach"
                    skills={skillsToTeach}
                    onAdd={() => setIsAddingSkill("teach")}
                    onRemove={(skill) => handleRemoveSkill(skill, "teach")}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <SkillManagementCard
                    title="Skills You Learn"
                    skills={skillsToLearn}
                    onAdd={() => setIsAddingSkill("learn")}
                    onRemove={(skill) => handleRemoveSkill(skill, "learn")}
                  />
                </motion.div>
              </div>
            </div>
            <div className="lg:col-span-3 xl:col-span-1 flex flex-col gap-6">
              {userStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <StatCard stat={stat} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isEditingProfile && (
            <Modal onClose={() => setIsEditingProfile(false)}>
              <form onSubmit={handleProfileSave} className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Edit Profile
                </h2>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileFormChange}
                      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileFormChange}
                      rows="3"
                      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    ></textarea>
                  </div>
                  <h3 className="text-lg font-semibold pt-2">Social Links</h3>
                  <div>
                    <label className="text-sm font-medium">
                      GitHub Username
                    </label>
                    <input
                      type="text"
                      name="socials.github"
                      value={profileForm.socials.github}
                      onChange={handleProfileFormChange}
                      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      LinkedIn Profile
                    </label>
                    <input
                      type="text"
                      name="socials.linkedin"
                      value={profileForm.socials.linkedin}
                      onChange={handleProfileFormChange}
                      className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </Modal>
          )}
          {isAddingSkill && (
            <Modal onClose={() => setIsAddingSkill(null)}>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Add a Skill to {isAddingSkill === "teach" ? "Teach" : "Learn"}
                </h2>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. Advanced React"
                  className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setIsAddingSkill(null)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;