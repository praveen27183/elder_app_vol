import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  HelpCircle,
  CreditCard,
  Clock,
  ShieldCheck,
  Gift,
  Star,
  Ticket,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  PhoneCall,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();

  // MENU
  const menuItems = [
    { icon: <User className="w-6 h-6" />, label: "Family Support", to: "/elder/family-support" },
    { icon: <HelpCircle className="w-6 h-6" />, label: "Help Center", to: "/elder/help" },
    { icon: <CreditCard className="w-6 h-6" />, label: "Payments", to: "/elder/payment" },
    { icon: <Clock className="w-6 h-6" />, label: "My Bookings", to: "/elder/bookings" },
    { icon: <ShieldCheck className="w-6 h-6" />, label: "Safety Toolkit", to: "/elder/safety" },
    { icon: <Gift className="w-6 h-6" />, label: "Refer & Earn", to: "/elder/refer" },
    { icon: <Star className="w-6 h-6" />, label: "My Rewards", to: "/elder/rewards" },
    { icon: <Ticket className="w-6 h-6" />, label: "Membership", to: "/elder/membership" },
  ];

  // USER STATE
  const [user, setUser] = useState({
    name: "Prakash Raj",
    phone: "7904259488",
    bloodGroup: "O+",
    familyContact: "9876543210",
  });

  // EDIT STATES
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);
  const [savedMsg, setSavedMsg] = useState(false);

  const onMenuClick = (path: string) => navigate(path);

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* PREMIUM HEADER GRADIENT */}
      <div className="h-48 bg-gradient-to-br from-primary-600 to-blue-700 rounded-b-[3rem] shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 pt-8 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="p-3 rounded-2xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all active:scale-95 shadow-soft"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-white tracking-tight">Your Profile</h1>
          </div>
          
          <button
            onClick={() => {
              setTempUser(user);
              setIsEditing(true);
            }}
            className="bg-white/90 backdrop-blur-md text-primary-700 px-5 py-2.5 rounded-2xl font-bold hover:bg-white transition-all shadow-xl active:scale-95 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Edit Info
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-16 relative z-20">
        {/* SUCCESS MESSAGE */}
        {savedMsg && (
          <div className="mb-4 text-center bg-emerald-50 text-emerald-700 py-3 rounded-2xl border border-emerald-100 font-bold animate-bounce-slow shadow-sm">
            ✨ Profile synchronized successfully!
          </div>
        )}

        {/* PROFILE CARD - GLASSMORPHISM STYLE */}
        <div className="bg-white rounded-[2.5rem] p-8 mb-8 shadow-card border border-slate-100 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-primary-100 to-blue-50 flex items-center justify-center">
              <User className="w-16 h-16 text-primary-600" />
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full"></div>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">{user.name}</h2>
          <p className="text-slate-500 font-medium mb-8">Registered Elder • {user.phone}</p>

          {/* MEDICAL INFO GRID */}
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="bg-rose-50/50 rounded-3xl p-5 border border-rose-100 flex flex-col items-center gap-2 group hover:bg-rose-50 transition-colors cursor-default">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-rose-500 group-hover:scale-110 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Type</p>
                <p className="text-2xl font-black text-rose-700">{user.bloodGroup}</p>
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-3xl p-5 border border-blue-100 flex flex-col items-center gap-2 group hover:bg-blue-50 transition-colors cursor-default">
              <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Emergency</p>
                <p className="text-xl font-black text-blue-700">{user.familyContact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MENU LIST */}
        <div className="bg-white rounded-[2.5rem] shadow-card border border-slate-100 overflow-hidden mb-8">
          <div className="p-8 pb-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Service Management</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onMenuClick(item.to)}
                className="w-full flex items-center justify-between px-8 py-6 hover:bg-slate-50 transition-all active:bg-slate-100 group"
                type="button"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all shadow-inner">
                    {item.icon}
                  </div>
                  <span className="text-xl font-bold text-slate-700 group-hover:text-primary-700 transition-colors">{item.label}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary-100 group-hover:text-primary-600 transition-all">
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EDIT MODAL - PREMIUM FULL SCREEN OR CENTERED */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-6 animate-fade-in">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-scale-up border border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary-100 rounded-2xl text-primary-600">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-slate-800">Edit Profile</h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-4">
                <div className="group">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2 mb-2 block">Full Name</label>
                  <input
                    className="w-full p-5 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-primary-500 outline-none transition-all text-lg font-bold text-slate-700"
                    placeholder="E.g. John Doe"
                    value={tempUser.name}
                    onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                  />
                </div>

                <div className="group">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-2 mb-2 block">Phone Number</label>
                  <input
                    className="w-full p-5 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-primary-500 outline-none transition-all text-lg font-bold text-slate-700"
                    placeholder="+91 00000 00000"
                    value={tempUser.phone}
                    onChange={(e) => setTempUser({ ...tempUser, phone: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                   <div className="w-1/3 group">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-2 mb-2 block tracking-tighter">Blood Group</label>
                    <input
                      className="w-full p-5 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-primary-500 outline-none transition-all text-lg font-bold text-slate-700 text-center"
                      placeholder="O+"
                      value={tempUser.bloodGroup}
                      onChange={(e) => setTempUser({ ...tempUser, bloodGroup: e.target.value })}
                    />
                  </div>
                  <div className="flex-1 group">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-2 mb-2 block">Family Contact</label>
                    <input
                      className="w-full p-5 rounded-[1.5rem] border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-primary-500 outline-none transition-all text-lg font-bold text-slate-700"
                      placeholder="+91 00000 00000"
                      value={tempUser.familyContact}
                      onChange={(e) => setTempUser({ ...tempUser, familyContact: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-[1.75rem] font-bold text-xl hover:bg-slate-200 transition-colors"
                >
                  Discard
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-br from-primary-500 to-blue-600 text-white py-5 rounded-[1.75rem] font-bold text-xl shadow-lg shadow-primary-200 hover:shadow-primary-300 hover:scale-[1.02] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}