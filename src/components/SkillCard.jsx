import React from "react";
import { Star } from "lucide-react";

const SkillCard = ({ skill, onSendRequest }) => (
  <div className=" rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-black/10 bg-[radial-gradient(800px_520px_at_100%_10%,#b8a4d7_12%,transparent_55%),radial-gradient(700px_480px_at_0%_100%,#d9c4ee_10%,transparent_50%),linear-gradient(180deg,#efe6f8_0%,#e9f0ff_45%,#efe4f8_100%)] bg-white/70 backdrop-blur-sm ">
    {" "}
    <div className="p-6">
      {" "}
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {" "}
        {skill.image}{" "}
      </div>{" "}
      <h3 className="text-xl font-bold text-[#1f2040] mb-2">{skill.name}</h3>{" "}
      <p className="text-[#4b546e] mb-3">by {skill.teacher}</p>{" "}
      <div className="flex items-center justify-between mb-4">
        {" "}
        <div className="flex items-center">
          {" "}
          <Star className="w-4 h-4 text-yellow-400 fill-current" />{" "}
          <span className="ml-1 text-sm text-[#4b546e]">{skill.rating}</span>{" "}
        </div>{" "}
        <span className="text-sm text-[#657089]">
          {skill.students} students
        </span>{" "}
      </div>{" "}
      <button
        onClick={onSendRequest}
        className=" w-full text-white py-2 rounded-lg font-medium shadow-sm bg-[#7E69AB] hover:bg-[#5f4a96] transition-colors "
      >
        {" "}
        Request to Learn{" "}
      </button>{" "}
    </div>{" "}
  </div>
);
export default SkillCard;
