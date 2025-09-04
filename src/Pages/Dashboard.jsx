import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import debounce from "lodash.debounce";
import DashboardNavbar from "../components/DashboardNavbar";

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
  Home,
  Grid3X3,
  MessageSquare,
  Users,
  Menu,
  Calendar,
  Target,
  Clock,
  MessageCircle,
} from "lucide-react";

const iconMap = {
  Award: Award,
  Zap: Zap,
  Star: Star,
  ShieldCheck: ShieldCheck,
};

// Enhanced Modal Component
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// Enhanced Stat Card
const StatCard = ({ stat }) => {
  const Icon = iconMap[stat.icon] || Star; // fallback if unknown

  return (
    <motion.div
      className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-black/5 
                 text-center shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col 
                 justify-center hover:scale-105 group"
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="w-16 h-16 mb-4 mx-auto rounded-2xl flex items-center justify-center 
                   bg-[#7E69AB]/15 text-[#3B1E54] dark:text-purple-300 group-hover:scale-110 transition-transform"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="text-purple-600 dark:text-purple-300" size={24} />
      </motion.div>
      <p className="text-3xl font-bold text-[#1f2040] dark:text-white mb-2">
        {stat.value}
      </p>
      <p className="text-sm text-[#4b546e] dark:text-gray-300 font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
};

// Enhanced Skill Management Card
const SkillManagementCard = ({ title, skills, onAdd, onRemove }) => (
  <motion.div
    className="bg-white/70 dark:bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-black/5 
               shadow-sm h-full flex flex-col hover:shadow-lg transition-all duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
        <Target className="text-purple-600 dark:text-purple-400" size={20} />
      </div>
      <h3 className="text-xl font-bold text-[#1f2040] dark:text-white">
        {title}
      </h3>
    </div>

    <div className="flex-grow overflow-y-auto pr-2 -mr-2 mb-4">
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
              className="flex justify-between items-center bg-purple-50 dark:bg-purple-900/50 p-3 rounded-lg
                         hover:shadow-md transition-all"
            >
              <span className="text-base text-[#3B1E54] dark:text-purple-200 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                {skill}
              </span>
              <motion.button
                onClick={() => onRemove(skill)}
                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 
                           hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-400 dark:text-gray-500 py-8">
          <div className="text-4xl mb-2">📚</div>
          <p>No skills added yet.</p>
        </div>
      )}
    </div>

    <motion.button
      onClick={onAdd}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 
                 bg-purple-100 dark:bg-purple-800/60 text-[#3B1E54] dark:text-purple-100 
                 font-semibold rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 
                 transition-colors duration-300"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <PlusCircle size={20} />
      Add New Skill
    </motion.button>
  </motion.div>
);

// Enhanced Upcoming Session Card
const UpcomingSessionCard = ({ session }) => (
  <motion.div
    className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-xl shadow-md border border-black/5 
               flex items-center gap-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    whileHover={{ x: 5 }}
  >
    <motion.div
      className={`w-12 h-12 rounded-lg text-white flex items-center justify-center font-bold shadow-lg ${
        session.type === "learn" ? "bg-indigo-500" : "bg-green-500"
      }`}
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      <User size={24} />
    </motion.div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Clock size={14} className="text-gray-500" />
        <p className="font-bold text-gray-500 dark:text-gray-400 text-sm">
          {session.date}
        </p>
      </div>
      <h4 className="font-bold text-[#1f2040] dark:text-white">
        {session.skill}
      </h4>
      <p className="text-sm text-[#4b546e] dark:text-gray-300">
        {session.type === "learn"
          ? `with ${session.with}`
          : `teaching ${session.with}`}
      </p>
    </div>
  </motion.div>
);

// Utility to sanitize Firestore data (remove undefined / invalid values)
const sanitize = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && typeof v !== "symbol"
    )
  );

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- Default state for new users
  const defaultUserData = {
    name: user?.displayName || user?.email?.split("@")[0] || "User",
    bio: "React developer passionate about sharing knowledge and learning new design skills.",
    profilePicture:
      user?.photoURL || "https://placehold.co/128x128/7E69AB/FFFFFF?text=U",
    socials: {
      github: "your-github",
      linkedin: "your-linkedin",
      twitter: "your-twitter",
      email: user?.email || "user@example.com",
    },
    interests: ["Photography", "Hiking", "Sci-Fi Movies", "Cooking"],
    skillsToTeach: ["React", "JavaScript", "Tailwind CSS"],
    skillsToLearn: ["UI/UX Design", "Figma", "Python"],
    stats: [
      { value: "240", label: "SkillCoins", icon: "Award" },
      { value: "28", label: "Sessions Done", icon: "Zap" },
      { value: "4.9", label: "Rating", icon: "Star" },
    ],

    upcomingSessions: [
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
    ],
    achievements: [
      { icon: "ShieldCheck", label: "Verified Teacher" },
      { icon: "Star", label: "Top Learner" },
      { icon: "Zap", label: "10+ Sessions" },
    ],
  };

  // --- Firestore-backed state
  const [currentUser, setCurrentUser] = useState(defaultUserData);
  const [skillsToTeach, setSkillsToTeach] = useState(
    defaultUserData.skillsToTeach
  );
  const [skillsToLearn, setSkillsToLearn] = useState(
    defaultUserData.skillsToLearn
  );
  const [userStats, setUserStats] = useState(defaultUserData.stats);
  const [upcomingSessions, setUpcomingSessions] = useState(
    defaultUserData.upcomingSessions
  );
  const [achievements, setAchievements] = useState(
    defaultUserData.achievements
  );

  // --- Profile edit modal states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState("");
  const [profileForm, setProfileForm] = useState(currentUser);
  const [saving, setSaving] = useState(false);

  // --- Fetch user data from Firestore on load
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentUser(data);
        setProfileForm(data);
        setSkillsToTeach(data.skillsToTeach || []);
        setSkillsToLearn(data.skillsToLearn || []);
        setUserStats(data.stats || []);
        setUpcomingSessions(data.upcomingSessions || []);
        setAchievements(data.achievements || []);
      } else {
        // If no doc, create default one
        setDoc(userRef, defaultUserData);
      }
      (error) => {
        console.error("Realtime listener error:", error);
      };
    });

    return () => unsub();
  }, [user]);

  // --- Manual save button
  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const userRef = doc(db, "users", user.uid);

    try {
      await setDoc(
        userRef,
        sanitize({
          ...profileForm,
          skillsToTeach,
          skillsToLearn,
          stats: userStats,
          upcomingSessions,
          achievements,
        }),
        { merge: true }
      );

      console.log("Profile manually saved ✅");
      setIsEditingProfile(false);
    } catch (err) {
      console.error("Manual save error:", err);
    } finally {
      setSaving(false);
    }
  };

  // --- Debounced auto-save updater
  const debouncedUpdate = useRef(
    debounce(async (userRef, data) => {
      try {
        await setDoc(userRef, sanitize(data), { merge: true });
      } catch (err) {
        console.error("Firestore update error:", err);
      }
    }, 500)
  ).current;

  // --- Handle form input changes
  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;

    // Update local state
    setProfileForm((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: { ...prev[parent], [child]: value },
        };
      } else {
        return { ...prev, [name]: value };
      }
    });

    // Auto-sync to Firestore
    if (user) {
      const userRef = doc(db, "users", user.uid);
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        debouncedUpdate(userRef, { [`${parent}.${child}`]: value });
      } else {
        debouncedUpdate(userRef, { [name]: value });
      }
    }
  };

  // --- Profile picture preview
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

  // --- Add new skill
  const handleAddSkill = async () => {
    if (!newSkill.trim() || !user) return;
    const userRef = doc(db, "users", user.uid);

    if (isAddingSkill === "teach") {
      const updated = [...skillsToTeach, newSkill];
      setSkillsToTeach(updated);
      await setDoc(userRef, { skillsToTeach: updated }, { merge: true });
    } else if (isAddingSkill === "learn") {
      const updated = [...skillsToLearn, newSkill];
      setSkillsToLearn(updated);
      await updateDoc(userRef, { skillsToLearn: updated }, { merge: true });
    }

    setNewSkill("");
    setIsAddingSkill(null);
  };

  // --- Remove skill
  const handleRemoveSkill = async (skillToRemove, type) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    if (type === "teach") {
      const updated = skillsToTeach.filter((s) => s !== skillToRemove);
      setSkillsToTeach(updated);
      await setDoc(userRef, { skillsToTeach: updated }, { merge: true });
    } else {
      const updated = skillsToLearn.filter((s) => s !== skillToRemove);
      setSkillsToLearn(updated);
      await updateDoc(userRef, { skillsToLearn: updated }, { merge: true });
    }
  };

  return (
    <div
      className="min-h-screen pt-12 w-full bg-gradient-to-br from-purple-50 via-white to-indigo-50 
                    dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 text-[#2d2d44] dark:text-gray-200 font-sans"
    >
      <DashboardNavbar />

      <main className="pt-20 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-6 bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-3xl shadow-md border border-black/5 
                       flex flex-col md:flex-row items-center gap-6"
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

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Left Column - Sessions & Achievements */}
            <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
              {/* Upcoming Sessions */}
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

              {/* Achievements */}
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
                    {achievements.map((ach) => {
                      const Icon = iconMap[ach.icon] || ShieldCheck; // fallback to Star
                      return (
                        <div
                          key={ach.label}
                          className="flex flex-col items-center text-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/50 rounded-lg flex-1"
                        >
                          <div className="text-purple-600 dark:text-purple-300">
                            <Icon size={20} />
                          </div>
                          <p className="text-xs font-semibold text-purple-800 dark:text-purple-200">
                            {ach.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Center Column - CTA & Skills */}
            <div className="lg:col-span-2 xl:col-span-2 flex flex-col gap-6">
              {/* Call to Action Card */}
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
                  onClick={() => navigate("/skills")}
                  className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full flex items-center gap-2 shadow-xl"
                >
                  <Search size={20} /> Find a Match
                </motion.button>
              </motion.div>

              {/* Skills Management */}
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

            {/* Right Column - Stats */}
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

        {/* Modals */}
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
