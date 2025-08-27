import React from 'react';
import { Star } from 'lucide-react';

const SkillCard = ({ skill, onSendRequest }) => (
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
        onClick={onSendRequest}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-medium"
      >
        Request to Learn
      </button>
    </div>
  </div>
);

export default SkillCard;