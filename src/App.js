import React, { useState, useRef } from "react";

// â”€â”€â”€ Sample Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const INITIAL_STUDENTS = [
  { id: 1, name: "Kamran Mehmood", nameUrdu: "Ú©Ø§Ù…Ø±Ø§Ù† Ù…Ø­Ù…ÙˆØ¯", fatherName: "Syed Mehmood", phone: "03011000007", class: "Class 1-A", admNo: "UAS-0002", gender: "Male", photo: null, fee: "paid" },
  { id: 2, name: "Kamran Sheikh", nameUrdu: "Ú©Ø§Ù…Ø±Ø§Ù† Ø´ÛŒØ®", fatherName: "Hafiz Sheikh", phone: "03061000112", class: "Class 1-A", admNo: "UAS-0017", gender: "Male", photo: null, fee: "pending" },
  { id: 3, name: "Maryam Anwar", nameUrdu: "Ù…Ø±ÛŒÙ… Ø§Ù†ÙˆØ±", fatherName: "Ch. Anwar", phone: "03051000105", class: "Class 1-A", admNo: "UAS-0016", gender: "Female", photo: null, fee: "partial" },
  { id: 4, name: "Maryam Butt", nameUrdu: "Ù…Ø±ÛŒÙ… Ø¨Ù¹", fatherName: "Abdul Butt", phone: "03010000000", class: "Class 1-A", admNo: "UAS-0001", gender: "Female", photo: null, fee: "paid" },
  { id: 5, name: "Mehwish Chaudhry", nameUrdu: "Ù…ÛÙˆØ´ Ú†ÙˆÛØ¯Ø±ÛŒ", fatherName: "Hafiz Chaudhry", phone: "03061000042", class: "Class 1-A", admNo: "UAS-0007", gender: "Female", photo: null, fee: "pending" },
  { id: 6, name: "Mohsin Abbasi", nameUrdu: "Ù…Ø­Ø³Ù† Ø¹Ø¨Ø§Ø³ÛŒ", fatherName: "Haji Abbasi", phone: "03041000028", class: "Class 2-A", admNo: "UAS-0005", gender: "Male", photo: null, fee: "paid" },
  { id: 7, name: "Noman Ansari", nameUrdu: "Ù†Ø¹Ù…Ø§Ù† Ø§Ù†ØµØ§Ø±ÛŒ", fatherName: "Muhammad Ansari", phone: "03031000091", class: "Class 2-A", admNo: "UAS-0014", gender: "Male", photo: null, fee: "pending" },
  { id: 8, name: "Saba Malik", nameUrdu: "ØµØ¨Ø§ Ù…Ù„Ú©", fatherName: "Mian Malik", phone: "03091000063", class: "Class 3-A", admNo: "UAS-0010", gender: "Female", photo: null, fee: "paid" },
  { id: 9, name: "Waqar Ali", nameUrdu: "ÙˆÙ‚Ø§Ø± Ø¹Ù„ÛŒ", fatherName: "Sardar Ali", phone: "03021000014", class: "Class 1-A", admNo: "UAS-0003", gender: "Male", photo: null, fee: "partial" },
  { id: 10, name: "Samreen Hussain", nameUrdu: "Ø³Ù…Ø±ÛŒÙ† Ø­Ø³ÛŒÙ†", fatherName: "Rana Hussain", phone: "03081000126", class: "Class 4-A", admNo: "UAS-0019", gender: "Female", photo: null, fee: "paid" },
];

const INITIAL_TEACHERS = [
  { id: 1, name: "Amina Bibi", nameUrdu: "Ø¢Ù…Ù†Û Ø¨ÛŒ Ø¨ÛŒ", email: "amina.bibi@school.edu.pk", cnic: "35201-1234567-1", role: "Teacher", joined: "4/1/2025", basic: 35000, allowances: 5250, deductions: 700, status: "active" },
  { id: 2, name: "Asma Tariq", nameUrdu: "Ø§Ø³Ù…Ø§Ø¡ Ø·Ø§Ø±Ù‚", email: "asma.tariq@school.edu.pk", cnic: "35201-3456789-1", role: "Teacher", joined: "6/25/2025", basic: 25000, allowances: 3750, deductions: 500, status: "active" },
  { id: 3, name: "Farzana Jabeen", nameUrdu: "ÙØ±Ø²Ø§Ù†Û Ø¬Ø¨ÛŒÚº", email: "farzana.jabeen@school.edu.pk", cnic: "35201-3456789-2", role: "Teacher", joined: "7/28/2025", basic: 29000, allowances: 4350, deductions: 580, status: "active" },
  { id: 4, name: "Khalid Mehmood", nameUrdu: "Ø®Ø§Ù„Ø¯ Ù…Ø­Ù…ÙˆØ¯", email: "khalid.mehmood@school.edu.pk", cnic: "35201-2345678-1", role: "Teacher", joined: "4/19/2025", basic: 36000, allowances: 5400, deductions: 720, status: "active" },
  { id: 5, name: "Nazia Parveen", nameUrdu: "Ù†Ø§Ø²ÛŒÛ Ù¾Ø±ÙˆÛŒÙ†", email: "nazia.parveen@school.edu.pk", cnic: "35201-1234567-2", role: "Teacher", joined: "5/4/2025", basic: 32000, allowances: 4800, deductions: 640, status: "active" },
  { id: 6, name: "Sadia Kanwal", nameUrdu: "Ø³Ø¹Ø¯ÛŒÛ Ú©Ù†ÙˆÙ„", email: "sadia.kanwal@school.edu.pk", cnic: "35201-1234567-3", role: "Teacher", joined: "6/7/2025", basic: 30000, allowances: 4500, deductions: 600, status: "active" },
  { id: 7, name: "Abdul Rasheed", nameUrdu: "Ø¹Ø¨Ø¯Ø§Ù„Ø±Ø´ÛŒØ¯", email: "urdual@wang.org.pk", cnic: "-", role: "Head Teacher", joined: "-", basic: 45000, allowances: 6750, deductions: 900, status: "active" },
];

const CLASSES = ["Class 1-A", "Class 1-B", "Class 2-A", "Class 3-A", "Class 4-A", "Class 5-A"];

const EXPENSES_DATA = [
  { id: 1, date: "2026-03-22", category: "Maintenance", description: "Furniture and building repair", amount: 6509, payment: "Cash", receipt: "-" },
  { id: 2, date: "2026-03-20", category: "Food", description: "Staff tea and snacks", amount: 4856, payment: "Cash", receipt: "-" },
  { id: 3, date: "2026-03-15", category: "Supplies", description: "Stationery and chalk", amount: 4907, payment: "Cash", receipt: "SUP-2026-03" },
  { id: 4, date: "2026-03-12", category: "Utilities", description: "Water bill", amount: 2500, payment: "Cash", receipt: "WTR-2026-03" },
  { id: 5, date: "2026-03-10", category: "Utilities", description: "Electricity bill", amount: 11773, payment: "Bank", receipt: "ELEC-2026-03" },
  { id: 6, date: "2026-03-05", category: "Rent", description: "Monthly building rent", amount: 45000, payment: "Bank", receipt: "RNT-2026-03" },
];

// â”€â”€â”€ Icons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    dashboard: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    students: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    teachers: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    classes: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    attendance: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>,
    results: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    fees: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    payroll: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    expenses: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    schedule: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    leave: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    notifications: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    social: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    ai: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    settings: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
    plus: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    download: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    search: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    menu: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    x: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
    trend: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    users: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  };
  return icons[name] || null;
};

// â”€â”€â”€ Badge Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Badge = ({ status }) => {
  const styles = {
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    partial: "bg-blue-100 text-blue-700",
    active: "bg-emerald-100 text-emerald-700",
    Teacher: "bg-violet-100 text-violet-700",
    "Head Teacher": "bg-orange-100 text-orange-700",
    Owner: "bg-blue-100 text-blue-700",
    Male: "bg-blue-100 text-blue-700",
    Female: "bg-pink-100 text-pink-700",
    present: "bg-emerald-100 text-emerald-700",
    absent: "bg-red-100 text-red-700",
    late: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

// â”€â”€â”€ Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-5 border-b">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <Icon name="x" size={18} />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  </div>
);

// â”€â”€â”€ Stat Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const StatCard = ({ label, value, sub, color, icon }) => (
  <div className={`rounded-2xl p-5 ${color} text-white shadow-lg`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium opacity-80">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {sub && <p className="text-xs opacity-70 mt-1">{sub}</p>}
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  </div>
);

// â”€â”€â”€ Main App â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function LMSPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [expenses, setExpenses] = useState(EXPENSES_DATA);
  const [showModal, setShowModal] = useState(null);
  const [searchStudent, setSearchStudent] = useState("");
  const [filterClass, setFilterClass] = useState("All Classes");
  const [attendanceDate, setAttendanceDate] = useState("2026-03-19");
  const [attendanceClass, setAttendanceClass] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [aiReport, setAiReport] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [reportLang, setReportLang] = useState("English");
  const [newStudent, setNewStudent] = useState({ name: "", fatherName: "", phone: "", class: "Class 1-A", gender: "Male" });
  const [newTeacher, setNewTeacher] = useState({ name: "", email: "", cnic: "", role: "Teacher", basic: "" });
  const [newExpense, setNewExpense] = useState({ category: "Rent", description: "", amount: "", payment: "Cash" });
  const [feeFilter, setFeeFilter] = useState("All Status");
  const [notification, setNotification] = useState(null);

  const schoolName = "Urdu AI School";

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", labelUrdu: "ÚˆÛŒØ´ Ø¨ÙˆØ±Úˆ", icon: "dashboard" },
    { id: "students", label: "Students", labelUrdu: "Ø·Ù„Ø¨Ø§Ø¡", icon: "students" },
    { id: "teachers", label: "Teachers", labelUrdu: "Ø§Ø³Ø§ØªØ°Û", icon: "teachers" },
    { id: "classes", label: "Classes", labelUrdu: "Ú©Ù„Ø§Ø³ÛŒÚº", icon: "classes" },
    { id: "attendance", label: "Attendance", labelUrdu: "Ø­Ø§Ø¶Ø±ÛŒ", icon: "attendance" },
    { id: "results", label: "Results", labelUrdu: "Ù†ØªØ§Ø¦Ø¬", icon: "results" },
    { id: "fees", label: "Fees", labelUrdu: "ÙÛŒØ³", icon: "fees" },
    { id: "payroll", label: "Payroll", labelUrdu: "ØªÙ†Ø®ÙˆØ§Û", icon: "payroll" },
    { id: "expenses", label: "Expenses", labelUrdu: "Ø§Ø®Ø±Ø§Ø¬Ø§Øª", icon: "expenses" },
    { id: "schedule", label: "Schedule", labelUrdu: "Ù†Ø¸Ø§Ù… Ø§Ù„Ø§ÙˆÙ‚Ø§Øª", icon: "schedule" },
    { id: "leave", label: "Leave", labelUrdu: "Ú†Ú¾Ù¹ÛŒ", icon: "leave" },
    { id: "notifications", label: "Notifications", labelUrdu: "Ø§Ø·Ù„Ø§Ø¹Ø§Øª", icon: "notifications" },
    { id: "social", label: "Social Posts", labelUrdu: "Ø³ÙˆØ´Ù„ Ù¾ÙˆØ³Ù¹Ø³", icon: "social" },
    { id: "aireports", label: "AI Reports", labelUrdu: "AI Ø±Ù¾ÙˆØ±Ù¹Ø³", icon: "ai" },
    { id: "settings", label: "Settings", labelUrdu: "ØªØ±ØªÛŒØ¨Ø§Øª", icon: "settings" },
  ];

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchStudent.toLowerCase()) || s.admNo.toLowerCase().includes(searchStudent.toLowerCase());
    const matchClass = filterClass === "All Classes" || s.class === filterClass;
    return matchSearch && matchClass;
  });

  const addStudent = () => {
    if (!newStudent.name) return;
    const id = students.length + 1;
    const admNo = `UAS-${String(id + 30).padStart(4, "0")}`;
    setStudents([...students, { ...newStudent, id, admNo, nameUrdu: newStudent.name, photo: null, fee: "pending" }]);
    setNewStudent({ name: "", fatherName: "", phone: "", class: "Class 1-A", gender: "Male" });
    setShowModal(null);
    notify("Student added successfully!");
  };

  const addTeacher = () => {
    if (!newTeacher.name) return;
    setTeachers([...teachers, { ...newTeacher, id: teachers.length + 1, nameUrdu: newTeacher.name, joined: new Date().toLocaleDateString(), allowances: Math.round(Number(newTeacher.basic) * 0.15), deductions: Math.round(Number(newTeacher.basic) * 0.02), status: "active" }]);
    setNewTeacher({ name: "", email: "", cnic: "", role: "Teacher", basic: "" });
    setShowModal(null);
    notify("Teacher added successfully!");
  };

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;
    setExpenses([{ ...newExpense, id: expenses.length + 1, date: new Date().toISOString().split("T")[0], receipt: "-", amount: Number(newExpense.amount) }, ...expenses]);
    setNewExpense({ category: "Rent", description: "", amount: "", payment: "Cash" });
    setShowModal(null);
    notify("Expense added!");
  };

  const toggleAttendance = (studentId, status) => {
    const key = `${attendanceDate}_${attendanceClass}`;
    setAttendanceRecords(prev => ({
      ...prev,
      [key]: { ...(prev[key] || {}), [studentId]: status }
    }));
  };

  const getAttendanceRecord = (studentId) => {
    const key = `${attendanceDate}_${attendanceClass}`;
    return attendanceRecords[key]?.[studentId] || "unmarked";
  };

  const generateAIReport = async () => {
    if (!selectedStudent) return;
    setAiLoading(true);
    setAiReport("");
    const student = students.find(s => String(s.id) === selectedStudent);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Generate a detailed student progress report for ${student?.name} (Admission: ${student?.admNo}, Class: ${student?.class}, Gender: ${student?.gender}) in ${reportLang}. Include sections for: Academic Performance, Attendance Overview, Behavioral Assessment, Areas of Improvement, and Teacher's Recommendation. Make it professional and suitable for a school report card. Keep it under 300 words.`
          }]
        })
      });
      const data = await res.json();
      setAiReport(data.content?.[0]?.text || "Report generated!");
    } catch {
      setAiReport("Error generating report. Please try again.");
    }
    setAiLoading(false);
  };

  const totalPayroll = teachers.reduce((sum, t) => sum + t.basic + t.allowances - t.deductions, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const paidFees = students.filter(s => s.fee === "paid").length;
  const pendingFees = students.filter(s => s.fee === "pending").length;

  // â”€â”€â”€ Sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const Sidebar = () => (
    <aside className={`${sidebarOpen ? "w-56" : "w-0 overflow-hidden"} transition-all duration-300 bg-slate-900 text-white flex flex-col h-screen sticky top-0 z-40 shrink-0`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-sm font-bold">P</div>
          <div>
            <div className="text-sm font-bold text-emerald-400">PakEducate</div>
            <div className="text-xs text-slate-400 truncate max-w-[130px]">{schoolName}</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${activeTab === item.id ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );

  // ─── Header ────────────────────────────────────────────────────────────────
  const Header = () => (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Icon name="menu" size={20} />
        </button>
        <span className="font-semibold text-gray-700">{schoolName}</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Icon name="notifications" size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">A</div>
      </div>
    </header>
  );

  // ─── Dashboard ─────────────────────────────────────────────────────────────
  const Dashboard = () => (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Total Students" value={students.length} sub="Enrolled" color="bg-gradient-to-br from-emerald-500 to-emerald-600" icon={<Icon name="students" size={28} color="white" />} />
        <StatCard label="Teachers" value={teachers.length} sub="Staff members" color="bg-gradient-to-br from-blue-500 to-blue-600" icon={<Icon name="teachers" size={28} color="white" />} />
        <StatCard label="Fees Collected" value="PKR 184,500" sub="This month" color="bg-gradient-to-br from-violet-500 to-violet-600" icon={<Icon name="fees" size={28} color="white" />} />
        <StatCard label="Expenses" value={`PKR ${totalExpenses.toLocaleString()}`} sub="March 2026" color="bg-gradient-to-br from-orange-500 to-orange-600" icon={<Icon name="expenses" size={28} color="white" />} />
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">Fee Status Overview</h2>
        <div className="space-y-3">
          {[{ label: "Paid", count: paidFees, color: "bg-emerald-500" }, { label: "Pending", count: pendingFees, color: "bg-amber-500" }, { label: "Partial", count: students.filter(s => s.fee === "partial").length, color: "bg-blue-500" }].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-16">{item.label}</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${(item.count / students.length) * 100}%` }} />
              </div>
              <span className="text-sm font-semibold text-gray-700 w-6">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
<div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[{ text: "Amina Bibi's salary marked paid", time: "2 hours ago", dot: "bg-emerald-500" }, { text: "5 new students enrolled", time: "Today", dot: "bg-blue-500" }, { text: "March expenses logged: PKR 75,550", time: "Yesterday", dot: "bg-orange-500" }, { text: "Attendance marked for Class 1-A", time: "Yesterday", dot: "bg-violet-500" }].map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${a.dot} shrink-0`} />
              <div className="flex-1">
                <p className="text-sm text-gray-700">{a.text}</p>
                <p className="text-xs text-gray-400">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Students ──────────────────────────────────────────────────────────────
  const Students = () => (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>
          <p className="text-gray-500 text-sm">{students.length} students enrolled</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Icon name="download" size={14} />Export
          </button>
          <button onClick={() => setShowModal("addStudent")} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <Icon name="plus" size={14} color="white" />Add Student
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon name="search" size={16} /></div>
          <input value={searchStudent} onChange={e => setSearchStudent(e.target.value)} placeholder="Search students..." className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" />
        </div>
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white">
          <option>All Classes</option>
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Student Name", "Father's Name", "Class", "Adm No.", "Gender", "Fee Status"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <tr key={s.id} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {s.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{s.name}</div>
                        <div className="text-xs text-gray-400">{s.nameUrdu}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div>{s.fatherName}</div>
                    <div className="text-xs text-gray-400">{s.phone}</div>
                  </td>
                  <td className="px-4 py-3"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{s.class}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600 font-mono">{s.admNo}</td>
                  <td className="px-4 py-3"><Badge status={s.gender} /></td>
                  <td className="px-4 py-3"><Badge status={s.fee} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Icon name="students" size={32} />
            <p className="mt-2 text-sm">No students found</p>
          </div>
        )}
      </div>
    </div>
  );


  // ─── Teachers ──────────────────────────────────────────────────────────────
  const Teachers = () => (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
          <p className="text-gray-500 text-sm">{teachers.length} staff members</p>
        </div>
        <button onClick={() => setShowModal("addTeacher")} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
          <Icon name="plus" size={14} color="white" />Add Teacher
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "CNIC", "Role", "Joined", "Status"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t.id} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.nameUrdu}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 font-mono text-xs">{t.cnic}</td>
                  <td className="px-4 py-3"><Badge status={t.role} /></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.joined}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ─── Classes ───────────────────────────────────────────────────────────────
  const Classes = () => {
    const classGroups = CLASSES.map(c => ({
      name: c,
      section: c.split("-")[1],
      count: students.filter(s => s.class === c).length,
      teachers: teachers.slice(0, 2).map(t => t.name),
    }));
    return (
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
            <p className="text-gray-500 text-sm">{CLASSES.length} classes</p>
          </div>
          <button onClick={() => notify("Feature coming soon!")} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors">
            <Icon name="plus" size={14} color="white" />Add Class
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {classGroups.map((cls, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Icon name="classes" size={18} color="#3b82f6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{cls.name.split("-")[0]}</h3>
                  <p className="text-xs text-gray-400">Section {cls.section}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">👥 {cls.count} students</p>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-2">Teachers</p>
                <div className="flex flex-wrap gap-1.5">
                  {cls.teachers.map((t, j) => (
                    <span key={j} className="px-2 py-0.5 text-xs bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">{t.split(" ")[0]} <span className="text-emerald-500 text-xs">Primary</span></span>
                  ))}
                  <button className="text-xs text-blue-500 hover:underline">+ Assign Teacher</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── Attendance ────────────────────────────────────────────────────────────
  const Attendance = () => {
    const classStudents = students.filter(s => s.class === attendanceClass);
    const markedCount = classStudents.filter(s => getAttendanceRecord(s.id) !== "unmarked").length;
    return (
      <div className="p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        <p className="text-gray-500 text-sm">Daily attendance management</p>
        <div className="flex gap-2 flex-wrap">
          <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-emerald-600">Mark Attendance</div>
          <div className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">Report</div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <select value={attendanceClass} onChange={e => setAttendanceClass(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white">
            <option value="">Select Class</option>
            {CLASSES.map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="date" value={attendanceDate} onChange={e => setAttendanceDate(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" />
        </div>
        {!attendanceClass ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <div className="text-gray-300 flex justify-center mb-2"><Icon name="attendance" size={40} /></div>
            <p className="text-gray-400 text-sm">Select a class to get started</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">{attendanceClass} — {attendanceDate}</p>
              <span className="text-sm text-gray-500">{markedCount}/{classStudents.length} marked</span>
            </div>
            <div className="divide-y divide-gray-50">
              {classStudents.map(s => {
                const rec = getAttendanceRecord(s.id);
                return (
                  <div key={s.id} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">{s.name[0]}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.admNo}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {["present", "absent", "late"].map(status => (
                        <button key={status} onClick={() => toggleAttendance(s.id, status)} className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all capitalize ${rec === status ? (status === "present" ? "bg-emerald-500 text-white" : status === "absent" ? "bg-red-500 text-white" : "bg-amber-500 text-white") : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── Results ───────────────────────────────────────────────────────────────
  const Results = () => {
    const [rClass, setRClass] = useState("");
    const [rTerm, setRTerm] = useState("");
    const [rSubject, setRSubject] = useState("");
    const [marks, setMarks] = useState({});
    const resultStudents = students.filter(s => s.class === rClass);
    const subjects = ["Urdu", "English", "Math", "Science", "Islamiyat"];
    const terms = ["First Term", "Second Term", "Final Term"];
    const saved = rClass && rTerm && rSubject;


    return (
      <div className="p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Results</h1>
        <p className="text-gray-500 text-sm">Enter marks and view result cards</p>
        <div className="flex gap-2">
          <div className="bg-white border-2 border-emerald-500 text-emerald-600 rounded-xl px-3 py-2 text-sm font-medium">Enter Results</div>
          <div className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">Result Card</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={rClass} onChange={e => setRClass(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white">
            <option value="">Select Class</option>
            {CLASSES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={rTerm} onChange={e => setRTerm(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white">
            <option value="">Select Term</option>
            {terms.map(t => <option key={t}>{t}</option>)}
          </select>
          <select value={rSubject} onChange={e => setRSubject(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white">
            <option value="">Select Subject</option>
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {!saved ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <div className="text-gray-300 flex justify-center mb-2"><Icon name="results" size={40} /></div>
            <p className="text-gray-400 text-sm">Select class, term, and subject to enter results</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-700">{rClass} — {rTerm} — {rSubject} (Total: 100)</p>
            </div>
            <div className="divide-y divide-gray-50">
              {resultStudents.map(s => (
                <div key={s.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">{s.name[0]}</div>
                    <p className="text-sm font-medium text-gray-800">{s.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" min="0" max="100" placeholder="Marks" value={marks[s.id] || ""} onChange={e => setMarks(prev => ({ ...prev, [s.id]: e.target.value }))}
                      className="w-20 px-2 py-1.5 text-sm border border-gray-200 rounded-lg text-center focus:outline-none focus:border-emerald-400" />
                    <span className="text-xs text-gray-400">/ 100</span>
                    {marks[s.id] && <span className={`text-xs font-bold ${marks[s.id] >= 80 ? "text-emerald-600" : marks[s.id] >= 50 ? "text-amber-600" : "text-red-600"}`}>{marks[s.id] >= 80 ? "A" : marks[s.id] >= 70 ? "B" : marks[s.id] >= 60 ? "C" : marks[s.id] >= 50 ? "D" : "F"}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button onClick={() => notify("Results saved successfully!")} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-xl hover:bg-emerald-700 transition-colors">
                Save Results
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── Fees ─────────────────────────────────────────────────────────────────
  const Fees = () => {
    const [tab, setFeeTab] = useState("payments");
    const filtered = feeFilter === "All Status" ? students : students.filter(s => s.fee === feeFilter.toLowerCase());
    const totalDue = students.length * 2500;
    const collected = students.filter(s => s.fee === "paid").length * 2500 + students.filter(s => s.fee === "partial").length * 1500;
    const feeTypes = [
      { name: "Admission Fee", nameUrdu: "داخلہ فیس", amount: 5000, frequency: "One-time", due: "10th", type: "Admission" },
      { name: "Monthly Tuition Fee", nameUrdu: "ماہانہ فیس", amount: 2500, frequency: "Monthly", due: "10th", type: "Tuition" },
      { name: "Exam Fee", nameUrdu: "امتحانی فیس", amount: 1000, frequency: "Quarterly", due: "5th", type: "Exam" },
    ];
    return (
      <div className="p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Fee Management</h1>
        <p className="text-gray-500 text-sm">Manage fee structures and collect payments</p>
        <div className="flex gap-2">
          {["payments", "fee-types"].map(t => (
            <button key={t} onClick={() => setFeeTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${tab === t ? "bg-white border-2 border-emerald-500 text-emerald-600" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
              {t === "payments" ? "Payments" : "Fee Types"}
            </button>
          ))}
        </div>
        {tab === "payments" ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold">Total Due</p>
                <p className="text-xl font-bold text-gray-800 mt-1">PKR {totalDue.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold">Collected</p>
                <p className="text-xl font-bold text-emerald-600 mt-1">PKR {collected.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold">Paid</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{paidFees} <span className="text-sm text-gray-400">/ {students.length}</span></p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-semibold">Pending</p>
                <p className="text-xl font-bold text-amber-600 mt-1">{pendingFees}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <select value={feeFilter} onChange={e => setFeeFilter(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none bg-white">
                {["All Status", "Paid", "Pending", "Partial"].map(s => <option key={s}>{s}</option>)}
              </select>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white text-sm rounded-xl"><Icon name="download" size={14} color="white" />Export Excel</button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>{["Student", "Fee", "Period", "Total Due", "Paid", "Status"].map(h => <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => (
                      <tr key={s.id} className={`border-t border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-800">{s.name}</p>
                          <p className="text-xs text-gray-400">{s.class}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">Monthly Tuition Fee</td>
                        <td className="px-4 py-3 text-sm text-gray-500">2026-03</td>
                        <td className="px-4 py-3 text-sm font-medium">PKR 2,500</td>
                        <td className="px-4 py-3 text-sm font-semibold text-emerald-600">{s.fee === "paid" ? "PKR 2,500" : s.fee === "partial" ? "PKR 1,500" : "PKR 0"}</td>
                        <td className="px-4 py-3"><Badge status={s.fee} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {feeTypes.map((ft, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800">{ft.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">{ft.type}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{ft.nameUrdu}</p>
                <p className="text-2xl font-bold text-gray-800">PKR {ft.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-2">{ft.frequency} · Due: {ft.due}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };



  // ─── Payroll ───────────────────────────────────────────────────────────────
  const Payroll = () => {
    const paid = teachers.find(t => t.name === "Amina Bibi");
    return (
      <div className="p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Payroll Management</h1>
        <p className="text-gray-500 text-sm">Manage teacher salaries and monthly payments</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-semibold">Total Payroll</p>
            <p className="text-xl font-bold text-gray-800 mt-1">PKR {totalPayroll.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-semibold">Paid</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">PKR {(paid.basic + paid.allowances - paid.deductions).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-semibold">Pending</p>
            <p className="text-xl font-bold text-amber-600 mt-1">PKR {(totalPayroll - (paid.basic + paid.allowances - paid.deductions)).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 uppercase font-semibold">Staff Paid</p>
            <p className="text-xl font-bold text-gray-800 mt-1">1 <span className="text-sm text-gray-400">/ {teachers.filter(t => t.role === "Teacher").length}</span></p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>{["Teacher", "Role", "Basic", "Allowances", "Deductions", "Net", "Status"].map(h => <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>)}</tr>
              </thead>
              <tbody>
                {teachers.filter(t => t.role === "Teacher").map((t, i) => (
                  <tr key={t.id} className={`border-t border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.nameUrdu}</p>
                    </td>
                    <td className="px-4 py-3"><Badge status={t.role} /></td>
                    <td className="px-4 py-3 text-sm text-gray-700">PKR {t.basic.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-emerald-600">+{t.allowances.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-red-500">-{t.deductions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">PKR {(t.basic + t.allowances - t.deductions).toLocaleString()}</td>
                    <td className="px-4 py-3"><Badge status={t.name === "Amina Bibi" ? "paid" : "pending"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ─── Expenses ──────────────────────────────────────────────────────────────
  const Expenses = () => {
    const catColors = { Rent: "text-emerald-600 bg-emerald-50", Utilities: "text-orange-600 bg-orange-50", Maintenance: "text-red-600 bg-red-50", Supplies: "text-violet-600 bg-violet-50", Food: "text-blue-600 bg-blue-50" };
    return (
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Expense Management</h1>
            <p className="text-gray-500 text-sm">Track and manage school expenses</p>
          </div>
          <button onClick={() => setShowModal("addExpense")} className="flex items-center gap-1.5 px-3 py-2 text-sm bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors">
            <Icon name="plus" size={14} color="white" />Add Expense
          </button>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex gap-6 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 uppercase font-semibold">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">PKR {totalExpenses.toLocaleString()}</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {Object.entries(expenses.reduce((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc; }, {})).map(([cat, amt]) => (
                <div key={cat} className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${catColors[cat] || "text-gray-600 bg-gray-100"}`}>{cat}</span>
                  <span className="text-gray-600">PKR {amt.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>{["Date", "Category", "Description", "Amount", "Payment", "Receipt"].map(h => <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>)}</tr>
              </thead>
              <tbody>
                {expenses.map((e, i) => (
                  <tr key={e.id} className={`border-t border-gray-50 hover:bg-gray-50 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="px-4 py-3 text-sm text-gray-500">{e.date}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${catColors[e.category] || "bg-gray-100 text-gray-600"}`}>{e.category}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-700">{e.description}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">PKR {e.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{e.payment}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono">{e.receipt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ─── Schedule ──────────────────────────────────────────────────────────────
  const Schedule = () => {
    const [schClass, setSchClass] = useState("");
    const periods = ["8:00-8:45", "8:45-9:30", "9:30-10:15", "10:15-11:00", "11:00-11:45", "11:45-12:30"];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const subjects = ["Urdu", "English", "Math", "Science", "Islamiyat", "Social Studies", "Art", "Break"];
    const colors = { Urdu: "bg-blue-100 text-blue-700", English: "bg-green-100 text-green-700", Math: "bg-violet-100 text-violet-700", Science: "bg-orange-100 text-orange-700", Islamiyat: "bg-teal-100 text-teal-700", "Social Studies": "bg-pink-100 text-pink-700", Art: "bg-yellow-100 text-yellow-700", Break: "bg-gray-100 text-gray-500" };
    const sched = { Monday: ["Urdu", "Math", "Break", "English", "Science", "Islamiyat"], Tuesday: ["English", "Urdu", "Break", "Math", "Art", "Science"], Wednesday: ["Math", "Science", "Break", "Urdu", "English", "Social Studies"], Thursday: ["Islamiyat", "English", "Break", "Urdu", "Math", "Science"], Friday: ["Science", "Math", "Break", "English", "Urdu", "Art"] };
    return (
      <div className="p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800">Schedule</h1>
        <p className="text-gray-500 text-sm">Manage class timetables and teacher schedules</p>
        <select value={schClass} onChange={e => setSchClass(e.target.value)} className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white">
          <option value="">Select Class</option>
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        {!schClass ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
            <div className="text-gray-300 flex justify-center mb-2"><Icon name="schedule" size={40} /></div>
            <p className="text-gray-400 text-sm">Select a class to view the timetable</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Period</th>
                  {days.map(d => <th key={d} className="text-center text-xs font-semibold text-gray-500 uppercase px-3 py-3">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {periods.map((p, pi) => (
                  <tr key={p} className="border-t border-gray-50">
                    <td className="px-4 py-3 text-xs text-gray-500 font-mono whitespace-nowrap">{p}</td>
                    {days.map(d => (
                      <td key={d} className="px-2 py-2 text-center">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${colors[sched[d][pi]] || "bg-gray-100 text-gray-500"}`}>{sched[d][pi]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };



  // ─── AI Reports ───────────────────────────────────────────────────────────
  const AIReports = () => (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-2">
        <Icon name="ai" size={22} color="#f59e0b" />
        <h1 className="text-2xl font-bold text-gray-800">AI Reports</h1>
      </div>
      <p className="text-gray-500 text-sm">Generate AI-powered student and school reports</p>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center"><Icon name="students" size={16} color="#3b82f6" /></div>
          <div>
            <h3 className="font-semibold text-gray-800">Student Progress Report</h3>
            <p className="text-xs text-gray-400">AI-generated analysis of individual student performance</p>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium mb-1 block">Student *</label>
          <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 bg-white">
            <option value="">Select a student ({students.length} available)</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name} — {s.class}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 font-medium mb-1 block">Report Language</label>
          <div className="flex gap-2">
            {["English", "Urdu"].map(lang => (
              <button key={lang} onClick={() => setReportLang(lang)} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${reportLang === lang ? "bg-slate-800 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {lang === "Urdu" ? "اردو" : lang}
              </button>
            ))}
          </div>
        </div>
        <button onClick={generateAIReport} disabled={!selectedStudent || aiLoading} className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${selectedStudent && !aiLoading ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
          <Icon name="ai" size={16} color={selectedStudent && !aiLoading ? "white" : "gray"} />
          {aiLoading ? "Generating Report..." : "Generate Report"}
        </button>
        {aiLoading && (
          <div className="flex items-center justify-center py-4 gap-2">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">AI is analyzing student data...</span>
          </div>
        )}
        {aiReport && !aiLoading && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-semibold text-amber-800 mb-2 text-sm">Generated Report</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{aiReport}</p>
          </div>
        )}
      </div>
    </div>
  );

  // ─── Simple Pages ─────────────────────────────────────────────────────────
  const SimplePage = ({ title, sub, icon, children }) => (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 text-sm">{sub}</p>
      </div>
      {children || (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
          <div className="text-gray-300 flex justify-center mb-2"><Icon name={icon} size={40} /></div>
          <p className="text-gray-400 text-sm">No data found</p>
        </div>
      )}
    </div>
  );

  const SocialPosts = () => {
    const [selected, setSelected] = useState(null);
    const templates = [
      { name: "Admissions Open", nameUrdu: "داخلے جاری ہیں", emoji: "📚", cat: "Academic", color: "bg-blue-50 border-blue-200" },
      { name: "Result Day", nameUrdu: "نتائج کا اعلان", emoji: "📚", cat: "Academic", color: "bg-green-50 border-green-200" },
      { name: "Eid Mubarak", nameUrdu: "عید مبارک", emoji: "🕌", cat: "Religious", color: "bg-orange-50 border-orange-200" },
    ];
    return (
      <SimplePage title="Social Media Posts" sub="Generate professional posts for your school">
        <div className="flex gap-2 flex-wrap">
          {["All", "Academic", "Religious", "National", "School Life"].map(cat => (
            <button key={cat} className="px-3 py-1.5 rounded-xl text-sm bg-gray-800 text-white">{cat === "All" ? "All" : cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {templates.map((t, i) => (
            <button key={i} onClick={() => setSelected(t)} className={`border-2 rounded-xl p-4 text-center transition-all hover:shadow-md ${selected?.name === t.name ? "border-emerald-500" : "border-gray-200"} ${t.color}`}>
              <div className="text-2xl mb-1">{t.emoji}</div>
              <p className="text-xs font-semibold text-gray-700">{t.name}</p>
              <p className="text-xs text-gray-400">{t.nameUrdu}</p>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-32 flex items-center justify-center">
          {selected ? (
            <div className="text-center">
              <div className="text-4xl mb-2">{selected.emoji}</div>
              <h3 className="font-bold text-gray-800">{selected.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{schoolName}</p>
              <p className="text-gray-400 text-xs mt-2">{selected.nameUrdu}</p>
              <button onClick={() => notify("Post copied to clipboard!")} className="mt-3 px-4 py-2 bg-emerald-600 text-white text-sm rounded-xl hover:bg-emerald-700">Share Post</button>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Select Template</p>
          )}
        </div>
      </SimplePage>
    );
  };

  const Settings = () => (
    <SimplePage title="Settings" sub="School profile and preferences">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"><Icon name="settings" size={14} /></div>
          <h3 className="font-semibold text-gray-800">School Profile</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-xs text-gray-500 font-medium">School Name (English)</label><input defaultValue={schoolName} className="mt-1 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" /></div>
          <div><label className="text-xs text-gray-500 font-medium">School Name (Urdu)</label><input defaultValue="اردو اے آئی اسکول" className="mt-1 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 text-right" /></div>
        </div>
        <div><label className="text-xs text-gray-500 font-medium">Address</label><input defaultValue="Wang Lab of Innovation (WALI)" className="mt-1 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" /></div>
        <div className="flex justify-center py-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">UA</div>
            <p className="font-semibold text-gray-800">{schoolName}</p>
            <p className="text-xs text-gray-400">#2206</p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Current Plan</p>
          <p className="font-semibold text-gray-800">Demo (Free)</p>
          <div className="mt-2 space-y-1.5">
            {[["Max Students", 20], ["Max Teachers", 1], ["Max Admins", 1]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>
            ))}
          </div>
        </div>
        <button onClick={() => notify("Settings saved!")} className="w-full py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors">Save Settings</button>
      </div>
    </SimplePage>
  );


  // ─── Page Router ───────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "students": return <Students />;
      case "teachers": return <Teachers />;
      case "classes": return <Classes />;
      case "attendance": return <Attendance />;
      case "results": return <Results />;
      case "fees": return <Fees />;
      case "payroll": return <Payroll />;
      case "expenses": return <Expenses />;
      case "schedule": return <Schedule />;
      case "aireports": return <AIReports />;
      case "social": return <SocialPosts />;
      case "settings": return <Settings />;
      case "leave": return <SimplePage title="Leave Management" sub="Manage leave policies and staff leave requests" icon="leave">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">⚠️ No academic year found. Please create an academic year in School Settings before managing leave policies.</div>
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"><div className="text-gray-300 flex justify-center mb-2"><Icon name="leave" size={36} /></div><p className="text-gray-400 text-sm">No leave requests found</p><button onClick={() => notify("New leave request form opened!")} className="mt-3 px-4 py-2 bg-slate-800 text-white text-sm rounded-xl">+ New Request</button></div>
      </SimplePage>;
      case "notifications": return <SimplePage title="Notifications" sub="All caught up" icon="notifications"><div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"><div className="text-4xl mb-2">🔔</div><p className="text-gray-400 text-sm">No notifications yet</p></div></SimplePage>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 transition-all ${notification.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`}>
          <Icon name="check" size={16} color="white" />
          {notification.msg}
        </div>
      )}

      {/* Modals */}
      {showModal === "addStudent" && (
        <Modal title="Add New Student" onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            {[["Student Name", "name", "text", "Full name"], ["Father's Name", "fatherName", "text", "Father's full name"], ["Phone Number", "phone", "tel", "03XXXXXXXXX"]].map(([label, key, type, ph]) => (
              <div key={key}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
                <input type={type} placeholder={ph} value={newStudent[key]} onChange={e => setNewStudent(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Class</label>
                <select value={newStudent.class} onChange={e => setNewStudent(p => ({ ...p, class: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none bg-white">{CLASSES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Gender</label>
                <select value={newStudent.gender} onChange={e => setNewStudent(p => ({ ...p, gender: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none bg-white"><option>Male</option><option>Female</option></select></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowModal(null)} className="flex-1 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={addStudent} className="flex-1 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700">Add Student</button>
            </div>
          </div>
        </Modal>
      )}

      {showModal === "addTeacher" && (
        <Modal title="Add New Teacher" onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            {[["Full Name", "name", "text"], ["Email", "email", "email"], ["CNIC", "cnic", "text"]].map(([label, key, type]) => (
              <div key={key}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
                <input type={type} value={newTeacher[key]} onChange={e => setNewTeacher(p => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Role</label>
                <select value={newTeacher.role} onChange={e => setNewTeacher(p => ({ ...p, role: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none bg-white"><option>Teacher</option><option>Head Teacher</option></select></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Basic Salary (PKR)</label>
                <input type="number" value={newTeacher.basic} onChange={e => setNewTeacher(p => ({ ...p, basic: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" /></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowModal(null)} className="flex-1 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={addTeacher} className="flex-1 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700">Add Teacher</button>
            </div>
          </div>
        </Modal>
      )}

      {showModal === "addExpense" && (
        <Modal title="Add Expense" onClose={() => setShowModal(null)}>
          <div className="space-y-4">
            <div><label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
              <select value={newExpense.category} onChange={e => setNewExpense(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none bg-white">
                {["Rent", "Utilities", "Maintenance", "Supplies", "Food", "Other"].map(c => <option key={c}>{c}</option>)}
              </select></div>
            <div><label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
              <input value={newExpense.description} onChange={e => setNewExpense(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Amount (PKR)</label>
                <input type="number" value={newExpense.amount} onChange={e => setNewExpense(p => ({ ...p, amount: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Payment Method</label>
                <select value={newExpense.payment} onChange={e => setNewExpense(p => ({ ...p, payment: e.target.value }))} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none bg-white"><option>Cash</option><option>Bank</option></select></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowModal(null)} className="flex-1 py-2.5 border border-gray-200 text-sm font-medium rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={addExpense} className="flex-1 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700">Add Expense</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default LMSPortal;
