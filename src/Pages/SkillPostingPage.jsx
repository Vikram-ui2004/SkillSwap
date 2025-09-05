import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const SkillPostingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    teacher: "",
    teacherName: "",
    rating: "",
    reviews: "",
    price: "",
    duration: "",
    level: "",
    description: "",
    avatar: "",
    tags: "",
    studentsCount: "",
    isOnline: true,
    nextAvailable: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newSkill = {
        ...formData,
        rating: parseFloat(formData.rating) || 0,
        reviews: parseInt(formData.reviews) || 0,
        studentsCount: parseInt(formData.studentsCount) || 0,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "skills"), newSkill);

      alert("✅ Skill posted successfully!");
      setFormData({
        name: "",
        category: "",
        teacher: "",
        teacherName: "",
        rating: "",
        reviews: "",
        price: "",
        duration: "",
        level: "",
        description: "",
        avatar: "",
        tags: "",
        studentsCount: "",
        isOnline: true,
        nextAvailable: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("❌ Failed to post skill. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
   <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
>
  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
    Post a New Skill
  </h2>

  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Name */}
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Skill Name"
      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500"
      required
    />

    {/* Category & Teacher Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category (e.g. Fitness, Programming)"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        required
      />
      <input
        type="text"
        name="teacher"
        value={formData.teacher}
        onChange={handleChange}
        placeholder="Teacher Username"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
    </div>

    <input
      type="text"
      name="teacherName"
      value={formData.teacherName}
      onChange={handleChange}
      placeholder="Teacher Full Name"
      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
    />

    {/* Rating, Reviews, Students */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="number"
        step="0.1"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating (e.g. 4.6)"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
      <input
        type="number"
        name="reviews"
        value={formData.reviews}
        onChange={handleChange}
        placeholder="Reviews"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
      <input
        type="number"
        name="studentsCount"
        value={formData.studentsCount}
        onChange={handleChange}
        placeholder="Students Count"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
    </div>

    {/* Price, Duration, Level */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (e.g. Free, 50 SkillCoins)"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
      <input
        type="text"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration (e.g. 60 min)"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
      <input
        type="text"
        name="level"
        value={formData.level}
        onChange={handleChange}
        placeholder="Level (e.g. Beginner, All Levels)"
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      />
    </div>

    {/* Description */}
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      placeholder="Description"
      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      rows="3"
    />

    {/* Avatar URL */}
    <input
      type="url"
      name="avatar"
      value={formData.avatar}
      onChange={handleChange}
      placeholder="Avatar Image URL"
      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
    />

    {/* Tags */}
    <input
      type="text"
      name="tags"
      value={formData.tags}
      onChange={handleChange}
      placeholder="Tags (comma separated)"
      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
    />

    {/* Online checkbox */}
    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
      <input
        type="checkbox"
        name="isOnline"
        checked={formData.isOnline}
        onChange={handleChange}
        className="w-4 h-4"
      />
      <span>Available Online</span>
    </label>

    {/* Next Available */}
    <input
      type="text"
      name="nextAvailable"
      value={formData.nextAvailable}
      onChange={handleChange}
      placeholder="Next Available (e.g. Today 6:00 AM)"
      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
    />

    {/* Submit */}
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors"
    >
      {loading ? "Posting..." : "Post Skill"}
    </button>
  </form>
</motion.div>

  );
};

export default SkillPostingPage;
