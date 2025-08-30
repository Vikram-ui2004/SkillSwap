import { useState } from "react";

const UploadTestimonial = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newTestimonial = await res.json();
        setMsg("✅ Testimonial submitted!");
        setFormData({ name: "", role: "", text: "" });

        if (onSuccess) onSuccess(newTestimonial); // callback to refresh list
      } else {
        const error = await res.json();
        setMsg("❌ Error: " + error.message);
      }
    } catch (err) {
      setMsg("❌ Server error, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-lg mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#1f2040] mb-6 text-center">
          Share Your Experience
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-[#f9f6ff] p-6 rounded-xl shadow-md border border-black/5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-[#7E69AB]"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Your Role (e.g. Student, Developer)"
            value={formData.role}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-[#7E69AB]"
            required
          />
          <textarea
            name="text"
            placeholder="Write your testimonial..."
            value={formData.text}
            onChange={handleChange}
            rows="4"
            className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-[#7E69AB]"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7E69AB] text-white py-3 rounded-lg hover:bg-[#64509d] transition"
          >
            {loading ? "Submitting..." : "Submit Testimonial"}
          </button>
          {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
        </form>
      </div>
    </section>
  );
};

export default UploadTestimonial;
