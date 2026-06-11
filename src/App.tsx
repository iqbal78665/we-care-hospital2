/// <reference types="vite/client" />
import { useState, useEffect, FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase Connection Configuration
const getSupabaseConfig = () => {
  // Clean surrounding quotes if any
  const cleanStr = (s: any): string => {
    if (typeof s !== "string") return "";
    let res = s.trim();
    if ((res.startsWith('"') && res.endsWith('"')) || (res.startsWith("'") && res.endsWith("'"))) {
      res = res.slice(1, -1).trim();
    }
    return res;
  };

  const url = cleanStr((import.meta as any).env?.VITE_SUPABASE_URL);
  const key = cleanStr((import.meta as any).env?.VITE_SUPABASE_ANON_KEY);

  const isValidHttpUrl = (str: string): boolean => {
    try {
      const u = new URL(str);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Gracefully handle undefined, empty, or placeholder strings
  const cleanUrl = (url && isValidHttpUrl(url)) 
    ? url 
    : "https://fkarucjcyyasazaqukqr.supabase.co";
    
  const cleanKey = (key && key !== "undefined" && key !== "") 
    ? key 
    : "sb_publishable_7JA2228PP2gU18GW-P0lUg_n-kosTNT";

  return { url: cleanUrl, key: cleanKey };
};

const supabaseConfig = getSupabaseConfig();
const supabase = createClient(supabaseConfig.url, supabaseConfig.key);

import {
  Heart,
  Activity,
  Check,
  Calendar,
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  ChevronUp,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Award,
  Stethoscope,
  Sparkles
} from "lucide-react";

// Types
interface Department {
  id: number;
  icon: string;
  name: string;
  doctors: number;
  desc: string;
  hours?: string;
  head?: string;
  image?: string;
}

interface Doctor {
  id: number;
  name: string;
  initials: string;
  specialty: string;
  exp: number;
  rating: string;
  available: boolean;
  image?: string;
}

interface Service {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

interface Testimonial {
  id: number;
  stars: number;
  quote: string;
  name: string;
  dept: string;
  initials: string;
}

interface BlogPost {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
}

// 1. Static Data Arrays
const departments: Department[] = [
  { id: 1, icon: "🫀", name: "Cardiology", doctors: 6, desc: "Heart care and cardiovascular treatment", hours: "9:00 AM - 5:00 PM", head: "Dr. Ananya Sharma", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 2, icon: "🧠", name: "Neurology", doctors: 5, desc: "Brain and nervous system disorders", hours: "10:00 AM - 4:00 PM", head: "Dr. Rajiv Menon", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 3, icon: "🦴", name: "Orthopedics", doctors: 7, desc: "Bone, joint, and muscle care", hours: "9:00 AM - 6:00 PM", head: "Dr. Suresh Patel", image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 4, icon: "👶", name: "Pediatrics", doctors: 8, desc: "Healthcare for infants and children", hours: "8:00 AM - 8:00 PM", head: "Dr. Meera Krishnan", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 5, icon: "🤰", name: "Gynecology & Obstetrics", doctors: 6, desc: "Women's health and maternity care", hours: "9:00 AM - 4:00 PM", head: "Dr. Priya Nair", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 6, icon: "👁️", name: "Ophthalmology", doctors: 4, desc: "Eye care and vision treatment", hours: "10:00 AM - 5:00 PM", head: "Dr. Kavitha Iyer", image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 7, icon: "🦷", name: "Dental Care", doctors: 5, desc: "Oral health and dental surgery", hours: "9:00 AM - 7:00 PM", head: "Dr. Sanjay Gupta", image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 8, icon: "🩻", name: "Radiology", doctors: 4, desc: "Medical imaging and diagnostics", hours: "24/7", head: "Dr. Neha Kapoor", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 9, icon: "🧪", name: "Oncology", doctors: 5, desc: "Cancer diagnosis and treatment", hours: "9:00 AM - 5:00 PM", head: "Dr. Arun Verma", image: "https://images.unsplash.com/photo-1512486130939-2c4f799d5a42?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 10, icon: "🫁", name: "Pulmonology", doctors: 4, desc: "Lung and respiratory care", hours: "10:00 AM - 6:00 PM", head: "Dr. Vikram Sen", image: "https://images.unsplash.com/photo-1584515982849-0cf068ec10d8?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 11, icon: "🩺", name: "General Medicine", doctors: 10, desc: "Primary care and internal medicine", hours: "8:00 AM - 8:00 PM", head: "Dr. Deepak Rao", image: "https://images.unsplash.com/photo-1504813184591-0155b13621c5?auto=format&fit=crop&q=80&w=600&h=400" },
  { id: 12, icon: "🧬", name: "Endocrinology", doctors: 3, desc: "Hormonal and metabolic disorders", hours: "11:00 AM - 4:00 PM", head: "Dr. Aditi Joshi", image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600&h=400" }
];

const doctorsData: Doctor[] = [
  { id: 1, name: "Dr. Ananya Sharma", initials: "AS", specialty: "Cardiology", exp: 15, rating: "4.9", available: true, image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 2, name: "Dr. Rajiv Menon", initials: "RM", specialty: "Neurology", exp: 12, rating: "4.8", available: false, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 3, name: "Dr. Priya Nair", initials: "PN", specialty: "Gynecology & Obstetrics", exp: 10, rating: "4.9", available: true, image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 4, name: "Dr. Suresh Patel", initials: "SP", specialty: "Orthopedics", exp: 18, rating: "4.7", available: true, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 5, name: "Dr. Meera Krishnan", initials: "MK", specialty: "Pediatrics", exp: 9, rating: "4.9", available: false, image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 6, name: "Dr. Arun Verma", initials: "AV", specialty: "Oncology", exp: 14, rating: "4.8", available: true, image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 7, name: "Dr. Kavitha Iyer", initials: "KI", specialty: "Ophthalmology", exp: 11, rating: "4.8", available: true, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 8, name: "Dr. Deepak Rao", initials: "DR", specialty: "General Medicine", exp: 16, rating: "4.7", available: false, image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 9, name: "Dr. Sanjay Gupta", initials: "SG", specialty: "Dental Care", exp: 14, rating: "4.8", available: true, image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 10, name: "Dr. Neha Kapoor", initials: "NK", specialty: "Radiology", exp: 8, rating: "4.9", available: true, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 11, name: "Dr. Vikram Sen", initials: "VS", specialty: "Pulmonology", exp: 16, rating: "4.7", available: false, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 12, name: "Dr. Aditi Joshi", initials: "AJ", specialty: "Endocrinology", exp: 10, rating: "4.8", available: true, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300" }
];

const services: Service[] = [
  { id: 1, icon: "🚑", title: "24/7 Emergency Care", desc: "Round-the-clock emergency response with rapid triage teams and life-support facilities always on standby." },
  { id: 2, icon: "🔬", title: "Advanced Diagnostics", desc: "Full-spectrum lab testing and imaging — MRI, CT scan, X-ray, ultrasound — with same-day results." },
  { id: 3, icon: "🏥", title: "Inpatient & ICU Care", desc: "Comfortable inpatient wards and a state-of-the-art ICU monitored by specialists 24 hours a day." },
  { id: 4, icon: "💊", title: "Pharmacy Services", desc: "In-house pharmacy with prescription management, medication counseling, and home delivery options." },
  { id: 5, icon: "🧘", title: "Rehabilitation", desc: "Physiotherapy, occupational therapy, and structured post-operative recovery programs for faster healing." },
  { id: 6, icon: "🩺", title: "Preventive Health Checkups", desc: "Comprehensive health packages for individuals, seniors, and corporate groups with detailed health reports." }
];

const testimonials: Testimonial[] = [
  { id: 1, stars: 5, quote: "The cardiology team gave me a new lease on life. Dr. Sharma's expertise was exceptional, and the staff's warmth made a stressful time feel manageable.", name: "Ramesh K.", dept: "Cardiology Patient", initials: "RK" },
  { id: 2, stars: 5, quote: "I delivered my baby here and the maternity ward was outstanding. Dr. Priya Nair and her entire team were supportive throughout every step.", name: "Shalini M.", dept: "Obstetrics Patient", initials: "SM" },
  { id: 3, stars: 5, quote: "After my knee replacement, the rehab team helped me walk again ahead of schedule. The facilities are world-class and the doctors genuinely care.", name: "Arvind T.", dept: "Orthopedics Patient", initials: "AT" }
];

const blogPosts: BlogPost[] = [
  { id: 1, category: "Heart Health", title: "5 Early Warning Signs of Heart Disease You Should Never Ignore", excerpt: "Chest discomfort and shortness of breath are obvious, but subtle symptoms like jaw pain and unexplained fatigue can be equally serious. Early detection saves lives.", date: "May 2025" },
  { id: 2, category: "Maternity & Child Care", title: "Nutrition Guide for New Mothers: What to Eat After Delivery", excerpt: "Postpartum nutrition directly impacts recovery speed and milk quality. Iron-rich foods, healthy fats, and adequate hydration are non-negotiable in the first 12 weeks.", date: "April 2025" },
  { id: 3, category: "General Health", title: "Managing Diabetes Naturally: Lifestyle Changes That Make a Real Difference", excerpt: "Consistent sleep schedules, low-glycemic diets, and even short 20-minute walks after meals can significantly stabilize blood sugar over time.", date: "March 2025" }
];

export default function App() {
  // Navigation & Scroll states
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Doctors View All toggle
  const [showAllDoctors, setShowAllDoctors] = useState(false);

  // Modal State for department details
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  // Hero Quick Form state
  const [quickForm, setQuickForm] = useState({ name: "", department: "", date: "" });
  const [quickErrors, setQuickErrors] = useState<Record<string, string>>({});
  const [quickSuccess, setQuickSuccess] = useState(false);

  // Main Booking Form state
  const [mainForm, setMainForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    department: "",
    doctor: "",
    apptDate: "",
    apptTime: "",
    insurance: "",
    consultationType: "🏥 In-Person",
    symptoms: ""
  });
  const [mainErrors, setMainErrors] = useState<Record<string, string>>({});
  const [mainSuccess, setMainSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Contact Form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSuccess, setContactSuccess] = useState(false);

  // Admin Portal State Variables
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<string | null>(null);
  const [adminAction, setAdminAction] = useState<"login" | "signup">("signup");
  const [adminForm, setAdminForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [adminChecked, setAdminChecked] = useState(false);
  const [hasExistingAdmin, setHasExistingAdmin] = useState(false);
  const [adminBookings, setAdminBookings] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccessMsg, setAdminSuccessMsg] = useState<string | null>(null);
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<any | null>(null);

  // Search & Filter state for bookings
  const [adminSearchTerm, setAdminSearchTerm] = useState("");
  const [adminDeptFilter, setAdminDeptFilter] = useState("All");

  // Helper function to hash passwords in SHA-256 for secure DB storage
  const hashAdminPassword = async (pwd: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(pwd);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (err) {
      console.error("SubtleCrypto failed, fallback to basic hex representation", err);
      // Failover hash alternative (not for prod, but guarantees no plain text and no crash if subtle crypto is blocked)
      let hash = 0;
      for (let i = 0; i < pwd.length; i++) {
        const char = pwd.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return "fallback_" + Math.abs(hash).toString(16);
    }
  };

  // Inspect if an admin already exists in the 'admins' table
  const checkAdminRegisteredStatus = async () => {
    try {
      const { data, error } = await supabase.from("admins").select("id").limit(1);
      if (error) {
        console.warn("Table 'admins' might not exist or setup is incomplete:", error.message);
        setHasExistingAdmin(false);
        setAdminAction("signup"); // default to signup if table missing/unpopulated
      } else {
        if (data && data.length > 0) {
          setHasExistingAdmin(true);
          setAdminAction("login"); // if admin exists, only allow Login
        } else {
          setHasExistingAdmin(false);
          setAdminAction("signup"); // if slot is free, allow Sign Up
        }
      }
      setAdminChecked(true);
    } catch (err) {
      console.error("Error inspecting admins status:", err);
      setHasExistingAdmin(false);
      setAdminAction("signup");
      setAdminChecked(true);
    }
  };

  // Fetch all bookmarked reservation files
  const fetchAllAppointments = async () => {
    setAdminLoading(true);
    setAdminError(null);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdminBookings(data || []);
    } catch (err: any) {
      console.error("Supabase SQL fetchAppointments error:", err);
      setAdminError(err.message || "Failed to load database reservation listings. Check schema setup.");
    } finally {
      setAdminLoading(false);
    }
  };

  // Delete/Cancel reservation in database
  const deleteAppointment = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete/cancel this patient's registered appointment permanently in the database?")) {
      return;
    }
    const previousBookings = [...adminBookings];
    
    // Optimistic UI state update
    setAdminBookings((prev) => prev.filter((item) => item.id !== id));
    
    try {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
      setAdminSuccessMsg("Patient appointment successfully removed.");
      setTimeout(() => setAdminSuccessMsg(null), 3000);
    } catch (err: any) {
      console.error("Failed to delete booking record from database:", err);
      setAdminError(err.message || "Unable to remove booking record from the live database.");
      setAdminBookings(previousBookings); // rollback
    }
  };

  // Initial trigger
  useEffect(() => {
    checkAdminRegisteredStatus();
  }, []);

  // Trigger whenever admin opens modal
  useEffect(() => {
    if (showAdminModal) {
      checkAdminRegisteredStatus();
      if (isAdminLoggedIn) {
        fetchAllAppointments();
      }
    }
  }, [showAdminModal, isAdminLoggedIn]);


  // Scroll and Active Section highlights
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section highlight and fade-ins
  useEffect(() => {
    const sections = ["home", "about", "departments", "doctors", "services", "appointments", "why-choose-us", "testimonials", "blog", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-80px 0px -20% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    const fadeElements = document.querySelectorAll(".fade-in-section");
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeElements.forEach((el) => fadeObserver.observe(el));

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
      fadeElements.forEach((el) => fadeObserver.unobserve(el));
    };
  }, []);

  // Smooth scroll handler
  const scrollIntoId = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Pre-fill Appointment booking from doctor card
  const handleBookDoctor = (doc: Doctor) => {
    setMainForm((prev) => ({
      ...prev,
      doctor: doc.name,
      department: doc.specialty
    }));
    scrollIntoId("appointments");
  };

  // Pre-fill Appointment booking from department details modal
  const handleBookDept = (dept: Department) => {
    setSelectedDept(null);
    setMainForm((prev) => ({
      ...prev,
      department: dept.name,
      doctor: doctorsData.find((d) => d.specialty === dept.name)?.name || ""
    }));
    scrollIntoId("appointments");
  };

  // Quick form submit handler
  const handleQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!quickForm.name.trim()) errors.name = "Name is required";
    if (!quickForm.department) errors.department = "Department choice is required";
    if (!quickForm.date) errors.date = "Date is required";

    if (Object.keys(errors).length > 0) {
      setQuickErrors(errors);
      setQuickSuccess(false);
      return;
    }

    setQuickErrors({});
    // Populate main booking form with quick action values
    setMainForm((prev) => ({
      ...prev,
      fullName: quickForm.name,
      department: quickForm.department,
      apptDate: quickForm.date,
      doctor: doctorsData.find((d) => d.specialty === quickForm.department)?.name || ""
    }));

    setQuickSuccess(true);
    setTimeout(() => {
      setQuickSuccess(false);
      setQuickForm({ name: "", department: "", date: "" });
      scrollIntoId("appointments");
    }, 1500);
  };

  // Main Booking submit handler
  const handleMainSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!mainForm.fullName.trim()) errors.fullName = "Full name is required";
    if (!mainForm.phone.trim()) errors.phone = "Phone number is required";
    if (!mainForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(mainForm.email)) {
      errors.email = "Invalid email format";
    }
    if (!mainForm.dob) errors.dob = "Date of Birth is required";
    if (!mainForm.gender) errors.gender = "Gender is required";
    if (!mainForm.department) errors.department = "Department selection is required";
    if (!mainForm.doctor) errors.doctor = "Doctor selection is required";
    if (!mainForm.apptDate) errors.apptDate = "Appointment date is required";
    if (!mainForm.apptTime) errors.apptTime = "Preferred slot is required";
    if (!mainForm.symptoms.trim()) errors.symptoms = "Brief key symptoms are required";

    if (Object.keys(errors).length > 0) {
      setMainErrors(errors);
      setMainSuccess(false);
      return;
    }

    setMainErrors({});
    setIsSubmitting(true);
    setDbError(null);

    try {
      const { error } = await supabase.from("appointments").insert([
        {
          full_name: mainForm.fullName,
          phone: mainForm.phone,
          email: mainForm.email,
          dob: mainForm.dob,
          gender: mainForm.gender,
          department: mainForm.department,
          doctor: mainForm.doctor,
          appt_date: mainForm.apptDate,
          appt_time: mainForm.apptTime,
          insurance: mainForm.insurance || null,
          consultation_type: mainForm.consultationType,
          symptoms: mainForm.symptoms
        }
      ]);

      if (error) {
        throw error;
      }

      setMainSuccess(true);
      setMainForm({
        fullName: "",
        phone: "",
        email: "",
        dob: "",
        gender: "",
        department: "",
        doctor: "",
        apptDate: "",
        apptTime: "",
        insurance: "",
        consultationType: "🏥 In-Person",
        symptoms: ""
      });
    } catch (err: any) {
      console.error("Supabase Database Insertion Error:", err);
      setDbError(err.message || "Failed to finalize reservation inside the database. Please check connectivity or schema.");
      setMainSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Secure Admin Authentication (Claim first Slot / Login afterwards)
  const handleAdminSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setAdminSuccessMsg(null);

    const username = adminForm.username.trim();
    const password = adminForm.password;

    if (!username || !password) {
      setAdminError("Please fill in both a username and security password.");
      return;
    }

    if (adminAction === "signup") {
      // Protect single slot restriction
      if (hasExistingAdmin) {
        setAdminError("Admin account formation slot has already been claimed! Only one account may gain administrative authorization.");
        return;
      }

      if (password !== adminForm.confirmPassword) {
        setAdminError("Passwords do not match. Review confirm pattern.");
        return;
      }

      if (password.length < 6) {
        setAdminError("Password must be at least 6 characters for adequate protection.");
        return;
      }

      setAdminLoading(true);
      try {
        const passwordHash = await hashAdminPassword(password);
        
        // Attempt insert to claim the singular admin user profile
        const { error } = await supabase.from("admins").insert([
          {
            username,
            password_hash: passwordHash
          }
        ]);

        if (error) {
          throw error;
        }

        setAdminSuccessMsg("Admin account successfully established! You have claimed the sole registration slot.");
        setAdminUser(username);
        setIsAdminLoggedIn(true);
        setHasExistingAdmin(true);
        setAdminForm({ username: "", password: "", confirmPassword: "" });
        
        // Load live booking records
        fetchAllAppointments();
      } catch (err: any) {
        console.error("Admin signup slot claim error:", err);
        setAdminError(`Database write failure: ${err.message}. Ensure the 'admins' table schema SQL is run in your Dashboard.`);
      } finally {
        setAdminLoading(false);
      }
    } else {
      // Login flow
      setAdminLoading(true);
      try {
        const passwordHash = await hashAdminPassword(password);
        
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("username", username)
          .eq("password_hash", passwordHash);

        if (error) throw error;

        if (data && data.length > 0) {
          setAdminSuccessMsg("Access verified! Welcome back.");
          setAdminUser(username);
          setIsAdminLoggedIn(true);
          setAdminForm({ username: "", password: "", confirmPassword: "" });
          fetchAllAppointments();
        } else {
          setAdminError("Invalid administrator username or password combination.");
        }
      } catch (err: any) {
        console.error("Admin credentials lookup error:", err);
        setAdminError(`Database lookups failed: ${err.message}. Confirm database setup and table schemas.`);
      } finally {
        setAdminLoading(false);
      }
    }
  };

  // Contact form submit handler
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!contactForm.name.trim()) errors.name = "Name is required";
    if (!contactForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = "Invalid email format";
    }
    if (!contactForm.subject) errors.subject = "Subject selection is required";
    if (!contactForm.message.trim()) {
      errors.message = "Message content is required";
    } else if (contactForm.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      setContactSuccess(false);
      return;
    }

    setContactErrors({});
    setContactSuccess(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setContactSuccess(false);
    }, 5000);
  };

  // Common styles
  const textPrimarySelected = { color: "#1A6DB5" };
  const borderPrimarySelected = { borderColor: "#1A6DB5" };

  return (
    <div id="top" style={{ position: "relative" }}>
      {/* 2. Global Styles Block */}
      <style>{`
        :root {
          --primary-blue: #1A6DB5;
          --dark-blue: #0D3B6E;
          --light-blue: #4A9FD4;
          --sky-blue: #EAF4FB;
          --light-gray: #F5F8FC;
          --white: #FFFFFF;
          --text-dark: #1A2B3C;
          --text-medium: #4A5568;
          --border: #D6E4F0;
        }

        body {
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: var(--text-dark);
          background-color: var(--white);
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }

        * {
          box-sizing: border-box;
          outline-color: var(--primary-blue);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
        }

        /* Section layout fade-in */
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hover scale adjustments for multiple components */
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(13, 59, 110, 0.12) !important;
        }

        /* Resizing tables and grids dynamically */
        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          .grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .grid-4 {
            grid-template-columns: 1fr;
          }
          .grid-3 {
            grid-template-columns: 1fr;
          }
          .grid-2 {
            grid-template-columns: 1fr;
          }
          .responsive-hero-split {
            flex-direction: column !important;
          }
          .responsive-hero-left {
            width: 100% !important;
            text-align: center;
            margin-bottom: 40px;
          }
          .responsive-hero-right {
            width: 100% !important;
          }
          .responsive-row-about {
            flex-direction: column !important;
          }
          .responsive-about-left {
            width: 100% !important;
            height: 360px !important;
            margin-bottom: 24px;
          }
          .responsive-about-right {
            width: 100% !important;
            padding-left: 0 !important;
          }
          .responsive-form-grid {
            grid-template-columns: 12px 1fr 12px !important;
          }
          .responsive-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .responsive-contact-split {
            flex-direction: column !important;
          }
          .responsive-contact-left, .responsive-contact-right {
            width: 100% !important;
          }
          .responsive-footer-cols {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        /* Professional Polish Theme Custom Classes */
        .pill {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 99px;
          padding: 4px 12px;
          font-size: 0.75rem;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          display: inline-block;
        }

        .card {
          background: white;
          border-radius: 12px;
          border: 1px solid #D6E4F0;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .stat-number {
          color: #1A6DB5;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-label {
          color: #0D3B6E;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1A6DB5, #4A9FD4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .dept-icon {
          font-size: 1.5rem;
          background: #EAF4FB;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary {
          background: #1A6DB5;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          border: none;
        }
        .btn-primary:hover {
          background: #0D3B6E;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #D6E4F0;
          border-radius: 8px;
          font-size: 0.9rem;
          margin-top: 4px;
          background-color: #FFFFFF;
          color: #1A2B3C;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: #1A6DB5;
          outline: none;
          box-shadow: 0 0 0 3px rgba(26, 109, 181, 0.15);
        }

        @keyframes fadeInBg {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUpIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-overlay {
          animation: fadeInBg 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-container {
          animation: scaleUpIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 480px) {
          .responsive-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .responsive-footer-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* SECTION 1 — STICKY NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #D6E4F0",
          boxShadow: scrolled ? "0 4px 20px rgba(13, 59, 110, 0.08)" : "none",
          transition: "box-shadow 0.3s ease, padding 0.3s ease",
          padding: scrolled ? "12px 0" : "18px 0"
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <div
            onClick={() => scrollIntoId("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#1A6DB5",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem"
              }}
            >
              ✚
            </div>
            <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0D3B6E" }}>We Care Hospital</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {[
              { label: "Home", id: "home" },
              { label: "About", id: "about" },
              { label: "Departments", id: "departments" },
              { label: "Doctors", id: "doctors" },
              { label: "Services", id: "services" },
              { label: "Appointments", id: "appointments" },
              { label: "Contact", id: "contact" }
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <span
                  key={link.id}
                  onClick={() => scrollIntoId(link.id)}
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    color: isActive ? "#1A6DB5" : "#4A5568",
                    position: "relative",
                    paddingBottom: "4px",
                    transition: "color 0.2s"
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "2px",
                        backgroundColor: "#1A6DB5",
                        borderRadius: "2px"
                      }}
                    />
                  )}
                </span>
              );
            })}

            {/* Sticky Book CTA button */}
            <button
              onClick={() => scrollIntoId("appointments")}
              style={{
                backgroundColor: "#1A6DB5",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s, transform 0.1s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#12518a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A6DB5")}
            >
              Book Appointment
            </button>
          </nav>

          {/* Mobile Hamburger Toggle icon */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#0D3B6E",
              padding: "8px"
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu Panel */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderBottom: "2px solid #D6E4F0",
              boxShadow: "0 10px 20px rgba(13, 59, 110, 0.08)",
              display: "flex",
              flexDirection: "column",
              padding: "16px 24px",
              gap: "16px",
              zIndex: 99
            }}
          >
            {[
              { label: "Home", id: "home" },
              { label: "About", id: "about" },
              { label: "Departments", id: "departments" },
              { label: "Doctors", id: "doctors" },
              { label: "Services", id: "services" },
              { label: "Appointments", id: "appointments" },
              { label: "Contact", id: "contact" }
            ].map((link) => (
              <span
                key={link.id}
                onClick={() => scrollIntoId(link.id)}
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: activeSection === link.id ? "#1A6DB5" : "#4A5568",
                  padding: "8px 0",
                  borderBottom: "1px solid #F5F8FC"
                }}
              >
                {link.label}
              </span>
            ))}
            <button
              onClick={() => scrollIntoId("appointments")}
              style={{
                backgroundColor: "#1A6DB5",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "8px"
              }}
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* SECTION 2 — HERO */}
      <section
        id="home"
        style={{
          background: "linear-gradient(135deg, #0D3B6E 0%, #1A6DB5 60%, #4A9FD4 100%)",
          padding: "80px 0 60px 0",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          className="container responsive-hero-split"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px"
          }}
        >
          {/* Left Column Text details */}
          <div
            className="responsive-hero-left"
            style={{
              width: "55%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <div
              className="pill"
              style={{
                marginBottom: "20px"
              }}
            >
              Trusted Healthcare Since 2005
            </div>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: "1.15",
                margin: "0 0 20px 0"
              }}
            >
              Your Health Is <br />
              <span style={{ color: "#EAF4FB" }}>Our Priority</span>
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#EAF4FB",
                margin: "0 0 35px 0",
                maxWidth: "520px"
              }}
            >
              Experience world-class, caring medical staff and sophisticated healthcare. We Care Hospital combines advanced healthcare solutions with a friendly heart to serve your journey.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                rowGap: "12px",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "inherit"
              }}
            >
              <button
                onClick={() => scrollIntoId("appointments")}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0D3B6E",
                  border: "none",
                  borderRadius: "8px",
                  padding: "14px 28px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Book an Appointment
              </button>
              <button
                onClick={() => scrollIntoId("departments")}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid #FFFFFF",
                  borderRadius: "8px",
                  padding: "12px 26px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Explore Departments
              </button>
            </div>
          </div>

          {/* Right Column Live Triage Status & Helpline Info */}
          <div className="responsive-hero-right" style={{ width: "45%", maxWidth: "480px" }}>
            <div
              style={{
                backgroundColor: "rgba(13, 59, 110, 0.45)",
                backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
                color: "#FFFFFF"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#10B981",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px #10B981"
                  }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.08em", color: "#EAF4FB", textTransform: "uppercase" }}>
                    LIVE TRIAGE STATUS
                  </span>
                </div>
                <span style={{
                  fontSize: "0.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  color: "#EAF4FB",
                  fontWeight: 500
                }}>
                  24/7 Helpline
                </span>
              </div>

              {/* Status List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                {/* Row 1 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    padding: "16px 20px"
                  }}
                >
                  <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#EAF4FB" }}>
                    Emergency Response Duty
                  </span>
                  <span style={{
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: "50px",
                    letterSpacing: "0.02em"
                  }}>
                    Active
                  </span>
                </div>

                {/* Row 2 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    padding: "16px 20px"
                  }}
                >
                  <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#EAF4FB" }}>
                    ICU Bed Occupancy
                  </span>
                  <span style={{
                    backgroundColor: "rgba(26, 109, 181, 0.65)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#D1FAE5",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: "50px",
                    letterSpacing: "0.02em"
                  }}>
                    Managed
                  </span>
                </div>

                {/* Row 3 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    padding: "16px 20px"
                  }}
                >
                  <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#EAF4FB" }}>
                    Cardiac Bay Availability
                  </span>
                  <span style={{
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: "50px",
                    letterSpacing: "0.02em"
                  }}>
                    Ready
                  </span>
                </div>
              </div>

              {/* Footer Section */}
              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: "20px", textAlign: "center" }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "0.8rem", color: "#93C5FD", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                  Indore Helpline Number
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <Phone size={20} style={{ color: "#60A5FA" }} />
                  <span style={{ fontSize: "1.45rem", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.05em" }}>
                    +91-731-000-0000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0 8px 30px rgba(13, 59, 110, 0.08)",
            padding: "24px 0",
            position: "relative",
            bottom: "-60px",
            zIndex: 10,
            maxWidth: "1150px",
            width: "calc(100% - 48px)",
            margin: "0 auto",
            borderRadius: "16px",
            border: "1px solid #D6E4F0"
          }}
        >
          <div
            className="responsive-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              textAlign: "center"
            }}
          >
            {[
              { number: "15+", label: "Specialty Units" },
              { number: "80+", label: "Board Doctors" },
              { number: "50,000+", label: "Happy Patients" },
              { number: "20 Years", label: "Care Experience" }
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  borderRight: i < 3 ? "1px solid #D6E4F0" : "none",
                  padding: "8px 16px"
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#1A6DB5", marginBottom: "4px" }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#0D3B6E", fontWeight: 600, textTransform: "uppercase" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer to absorb the offset stats bar height */}
      <div style={{ height: "60px", backgroundColor: "#F5F8FC" }}></div>

      {/* SECTION 3 — ABOUT */}
      <section id="about" style={{ padding: "100px 0 80px 0", backgroundColor: "#F5F8FC" }}>
        <div className="container fade-in-section">
          <div
            className="responsive-row-about"
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "space-between",
              gap: "48px"
            }}
          >
            {/* Left Column: Overlapping target mission and vision cards */}
            <div
              className="responsive-about-left"
              style={{
                width: "48%",
                position: "relative",
                minHeight: "440px"
              }}
            >
              <div className="about-cards-wrapper" style={{ height: "100%", width: "100%" }}>
                <div
                  className="hover-lift about-card-1 card"
                  style={{
                    padding: "32px",
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    width: "82%",
                    zIndex: 2
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                    <div
                      className="dept-icon"
                      style={{
                        padding: "10px",
                        lineHeight: 1
                      }}
                    >
                      🎯
                    </div>
                    <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0D3B6E", fontWeight: 700 }}>Our Mission</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "#4A5568", lineHeight: "1.7" }}>
                    To provide healthcare with compassionate attention. We aim to prioritize safety, quality, and community access above everything else.
                  </p>
                </div>

                <div
                  className="hover-lift about-card-2 card"
                  style={{
                    padding: "32px",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "82%",
                    zIndex: 1,
                    marginTop: "60px" // mandated vertical offset
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                    <div
                      className="dept-icon"
                      style={{
                        padding: "10px",
                        lineHeight: 1
                      }}
                    >
                      🌟
                    </div>
                    <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#0D3B6E", fontWeight: 700 }}>Our Vision</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "#4A5568", lineHeight: "1.7" }}>
                    To become the regional benchmark of excellence, leading in technology, accessibility, and high medical success milestones.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Realistic narrative and checklist info */}
            <div
              className="responsive-about-right"
              style={{
                width: "48%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "12px"
              }}
            >
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#1A6DB5",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  display: "block"
                }}
              >
                About We Care Hospital
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 16px 0", color: "#0D3B6E" }}>
                Healing with Compassion, Excellence, and Innovation
              </h2>
              <p style={{ margin: "0 0 16px 0", color: "#4A5568" }}>
                Since our opening in 2005, We Care Hospital has been at the forefront of medical advancement inside a caring environment. We serve thousands of global families with state-of-the-art procedures and compassionate patient focus.
              </p>
              <p style={{ margin: "0 0 24px 0", color: "#4A5568" }}>
                Our team represents leaders in major specialities, working in coordination to support your recovery. Guided by professional ethics, We Care offers seamless therapeutic pathways so that your family is fully looked after.
              </p>

              {/* USP Checklist rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "NABH Accredited Facility",
                  "24/7 Emergency Services",
                  "State-of-the-art Diagnostics",
                  "Multilingual Staff Support"
                ].map((usp, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "20%",
                        backgroundColor: "#EAF4FB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Check size={15} style={{ color: "#1A6DB5", strokeWidth: 3 }} />
                    </div>
                    <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1A2B3C" }}>{usp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — DEPARTMENTS */}
      <section id="departments" style={{ padding: "100px 0 80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container fade-in-section">
          {/* Centered Department Header */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0D3B6E", marginBottom: "12px" }}>Our Departments</h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#1A6DB5", margin: "0 auto 16px auto", borderRadius: "2px" }}></div>
            <p style={{ color: "#4A5568", margin: 0 }}>
              Discover our extensive range of clinical excellence. Our specialist departments are built to treat conditions from primary checkups to complex surgeries.
            </p>
          </div>

          {/* 12-Card Grid */}
          <div className="grid-4">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="hover-lift card"
                style={{
                  padding: "30px 20px",
                  textAlign: "center"
                }}
              >
                {/* Visual Icon */}
                <div
                  className="dept-icon"
                  style={{
                    width: "56px",
                    height: "56px",
                    margin: "0 auto 20px auto",
                    fontSize: "1.8rem",
                    lineHeight: 1
                  }}
                >
                  {dept.icon}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0D3B6E", margin: "0 0 8px 0" }}>
                  {dept.name}
                </h3>

                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#EAF4FB",
                    color: "#1A6DB5",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "12px",
                    marginBottom: "14px"
                  }}
                >
                  {dept.doctors} Specialists
                </div>

                <p style={{ fontSize: "0.85rem", color: "#4A5568", margin: "0 0 20px 0", minHeight: "34px", overflow: "hidden" }}>
                  {dept.desc}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1A6DB5",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    margin: "0 auto",
                    padding: "4px 0",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#0D3B6E";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#1A6DB5";
                  }}
                >
                  <span>View Details</span> <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENT MODAL (Interactive) */}
      {selectedDept && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(13, 59, 110, 0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <div
            className="modal-container"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              maxWidth: "540px",
              width: "100%",
              padding: "36px",
              boxShadow: "0 15px 45px rgba(0,0,0,0.2)",
              position: "relative"
            }}
          >
            <button
              onClick={() => setSelectedDept(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#4A5568"
              }}
            >
              <X size={24} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ fontSize: "2.5rem" }}>{selectedDept.icon}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.5rem", color: "#0D3B6E", fontWeight: 700 }}>{selectedDept.name}</h3>
                <span style={{ fontSize: "0.85rem", color: "#1A6DB5", fontWeight: 600 }}>Clinical Excellence Center</span>
              </div>
            </div>

            {selectedDept.image && (
              <div style={{ width: "100%", height: "180px", borderRadius: "10px", overflow: "hidden", marginBottom: "20px", boxShadow: "0 2px 8px rgba(13, 59, 110, 0.08)" }}>
                <img
                  src={selectedDept.image}
                  alt={selectedDept.name}
                  referrerPolicy="no-referrer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            )}

            <hr style={{ border: "0", borderTop: "1px solid #D6E4F0", marginBottom: "20px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
              <div>
                <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#1A6DB5", marginBottom: "4px" }}>
                  DEPARTMENT OVERVIEW
                </span>
                <p style={{ margin: 0, fontSize: "0.95rem", color: "#4A5568", lineHeight: "1.6" }}>
                  {selectedDept.desc}. Equipped with cutting edge diagnostics and guided by board-certified specialists. We offer fully safe outpatient therapies and emergency medical configurations.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "8px" }}>
                <div>
                  <span style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#0D3B6E" }}>Operating Hours</span>
                  <span style={{ fontSize: "0.9rem", color: "#4A5568" }}>{selectedDept.hours}</span>
                </div>
                <div>
                  <span style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#0D3B6E" }}>Total Specialists</span>
                  <span style={{ fontSize: "0.9rem", color: "#4A5568" }}>{selectedDept.doctors} Board-Certified</span>
                </div>
              </div>

              {/* Department Head Profile Section with Image */}
              {(() => {
                const headDoc = doctorsData.find(d => d.name === selectedDept.head);
                if (!headDoc) return null;
                return (
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed #D6E4F0" }}>
                    <span style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#1A6DB5", marginBottom: "8px" }}>
                      DEPARTMENT HEAD & MEDICAL LEAD
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", backgroundColor: "#F5F8FC", padding: "12px 16px", borderRadius: "12px", border: "1px solid #EAF4FB" }}>
                      <div style={{
                        position: "relative",
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "2px solid #FFFFFF",
                        backgroundColor: "#1A6DB5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 2px 6px rgba(13, 59, 110, 0.1)"
                      }}>
                        {headDoc.image ? (
                          <img src={headDoc.image} alt={headDoc.name} referrerPolicy="no-referrer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span style={{ color: "#FFFFFF", fontWeight: "700", fontSize: "1.1rem" }}>{headDoc.initials}</span>
                        )}
                      </div>
                      <div>
                        <h4 style={{ margin: "0 0 2px 0", fontSize: "0.95rem", fontWeight: 700, color: "#0D3B6E" }}>{headDoc.name}</h4>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.75rem", color: "#4A5568" }}>
                          <span style={{ fontWeight: 500, color: "#1A6DB5" }}>{headDoc.specialty}</span>
                          <span>•</span>
                          <span>{headDoc.exp} Yrs Exp</span>
                          <span>•</span>
                          <span style={{ color: "#D97706", fontWeight: 600 }}>★ {headDoc.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => handleBookDept(selectedDept)}
                style={{
                  flex: 1,
                  backgroundColor: "#1A6DB5",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 18px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Book Appointment
              </button>
              <button
                onClick={() => setSelectedDept(null)}
                style={{
                  backgroundColor: "#F5F8FC",
                  color: "#4A5568",
                  border: "1px solid #D6E4F0",
                  borderRadius: "8px",
                  padding: "12px 18px",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECURE ADMIN PORTAL MODAL */}
      {showAdminModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(13, 59, 110, 0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
          }}
        >
          <div
            className="modal-container"
            style={{
              backgroundColor: "#F8FAFC",
              borderRadius: "20px",
              maxWidth: isAdminLoggedIn ? "1100px" : "480px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.8)",
              transition: "all 0.3s ease"
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAdminModal(false);
                setSelectedBookingDetail(null);
              }}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(13, 59, 110, 0.05)",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#0D3B6E",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(13, 59, 110, 0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(13, 59, 110, 0.05)")}
            >
              <X size={20} />
            </button>

            {/* NOT LOGGED IN VIEW: AUTHENTICATION (LOGIN / SIGNUP) */}
            {!isAdminLoggedIn ? (
              <div style={{ padding: "12px 10px" }}>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#1A6DB5",
                      color: "#FFFFFF",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.8rem",
                      fontWeight: "bold",
                      margin: "0 auto 16px auto",
                      boxShadow: "0 8px 16px rgba(26,109,181,0.25)"
                    }}
                  >
                    🔒
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0D3B6E", margin: "0 0 6px 0" }}>
                    Hospital Admin Portal
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748B", margin: 0 }}>
                    Please authenticate to view user information and clinical files.
                  </p>
                </div>

                {/* Authorization Status message inside slot check */}
                <div
                  style={{
                    backgroundColor: "#EFF6FF",
                    border: "1px solid #BFDBFE",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    fontSize: "0.85rem",
                    color: "#1E40AF",
                    marginBottom: "24px",
                    lineHeight: "1.4"
                  }}
                >
                  {hasExistingAdmin ? (
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span>🛡️</span>
                      <span>
                        <strong>Security Configured:</strong> Single admin slot has already been claimed. New admin registrations are strictly disabled.
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span>✨</span>
                      <span>
                        <strong>Unclaimed Admin Slot:</strong> No administrators have registered yet. Register below to claim the sole available slot!
                      </span>
                    </div>
                  )}
                </div>

                {/* TAB SWITCHERS */}
                {!hasExistingAdmin && (
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#E2E8F0",
                      borderRadius: "8px",
                      padding: "4px",
                      marginBottom: "20px"
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setAdminAction("signup")}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "none",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        backgroundColor: adminAction === "signup" ? "#FFFFFF" : "transparent",
                        color: adminAction === "signup" ? "#0D3B6E" : "#64748B",
                        boxShadow: adminAction === "signup" ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Sign Up (Claim Slot)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdminAction("login")}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "none",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        backgroundColor: adminAction === "login" ? "#FFFFFF" : "transparent",
                        color: adminAction === "login" ? "#0D3B6E" : "#64748B",
                        boxShadow: adminAction === "login" ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      Log In
                    </button>
                  </div>
                )}

                {/* Feedback banners */}
                {adminError && (
                  <div
                    style={{
                      backgroundColor: "#FEE2E2",
                      border: "1px solid #FCA5A5",
                      color: "#991B1B",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      marginBottom: "18px"
                    }}
                  >
                    ⚠️ {adminError}
                  </div>
                )}

                {adminSuccessMsg && (
                  <div
                    style={{
                      backgroundColor: "#D1FAE5",
                      border: "1px solid #6EE7B7",
                      color: "#065F46",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      marginBottom: "18px"
                    }}
                  >
                    ✅ {adminSuccessMsg}
                  </div>
                )}

                {/* Form body */}
                <form onSubmit={handleAdminSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Admin Username *
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. administrator"
                      value={adminForm.username}
                      onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                      style={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                      Security Password *
                    </label>
                    <input
                      type="password"
                      className="form-input"
                      required
                      placeholder="••••••••"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                      style={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1" }}
                    />
                  </div>

                  {adminAction === "signup" && !hasExistingAdmin && (
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                        Confirm Security Password *
                      </label>
                      <input
                        type="password"
                        className="form-input"
                        required
                        placeholder="••••••••"
                        value={adminForm.confirmPassword}
                        onChange={(e) => setAdminForm({ ...adminForm, confirmPassword: e.target.value })}
                        style={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1" }}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={adminLoading}
                    style={{
                      backgroundColor: "#1A6DB5",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 18px",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: adminLoading ? "not-allowed" : "pointer",
                      marginTop: "8px",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => { if (!adminLoading) e.currentTarget.style.backgroundColor = "#12518a"; }}
                    onMouseLeave={(e) => { if (!adminLoading) e.currentTarget.style.backgroundColor = "#1A6DB5"; }}
                  >
                    {adminLoading ? "Verifying with Database..." : adminAction === "signup" ? "Claim Slot & Register →" : "Sign In →"}
                  </button>
                </form>

                {/* HELP BLOCK FOR FIRST TIME SETUP */}
                <div style={{ marginTop: "32px", borderTop: "1px solid #E2E8F0", paddingTop: "20px" }}>
                  <p style={{ margin: "0 0 10px 0", fontSize: "0.8rem", color: "#64748B", fontWeight: 600, textTransform: "uppercase" }}>
                    🛠️ Manual Database Setup
                  </p>
                  <p style={{ margin: "0 0 12px 0", fontSize: "0.78rem", color: "#64748B", lineHeight: "1.4" }}>
                    If you haven't configured your Supabase tables yet, select below for the necessary code to copy and paste directly into your Supabase SQL Editor.
                  </p>
                  <details style={{ fontSize: "0.8rem", color: "#1D4ED8", cursor: "pointer", fontWeight: 500 }}>
                    <summary>View SQL Schemas for Supabase Editor</summary>
                    <div style={{ padding: "10px", backgroundColor: "#1E293B", color: "#F8FAFC", borderRadius: "8px", marginTop: "10px", overflowX: "auto", cursor: "default" }}>
                      <pre style={{ margin: 0, fontSize: "0.72rem", fontFamily: "monospace", textAlign: "left", whiteSpace: "pre-wrap" }}>{`\
-- 1. Create Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  dob DATE NOT NULL,
  gender TEXT NOT NULL,
  department TEXT NOT NULL,
  doctor TEXT NOT NULL,
  appt_date DATE NOT NULL,
  appt_time TEXT NOT NULL,
  insurance TEXT,
  consultation_type TEXT NOT NULL,
  symptoms TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Admin Slot Table
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and insert permissions for everyone
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select" ON appointments FOR SELECT USING (true);
CREATE POLICY "Public delete" ON appointments FOR DELETE USING (true);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin public select" ON admins FOR SELECT USING (true);
CREATE POLICY "Admin public insert" ON admins FOR INSERT WITH CHECK (true);`}</pre>
                    </div>
                  </details>
                </div>
              </div>
            ) : (
              /* LOGGED IN VIEW: LIVE BOOKINGS DASHBOARD VIEW */
              <div style={{ padding: "20px 10px" }}>
                {/* Dashboard Header */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "20px", marginBottom: "24px", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "1.5rem" }}>📋</span>
                      <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0D3B6E", margin: 0 }}>
                        Live Booking Dashboard
                      </h3>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#64748B", margin: "6px 0 0 0" }}>
                      Logged in as <strong>{adminUser}</strong> • Connected to Live Supabase Table
                    </p>
                  </div>
                  
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={fetchAllAppointments}
                      style={{
                        backgroundColor: "#EFF6FF",
                        color: "#1A6DB5",
                        border: "1px solid #BFDBFE",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      🔄 Refresh Live
                    </button>
                    <button
                      onClick={() => {
                        setIsAdminLoggedIn(false);
                        setAdminUser(null);
                        setAdminForm({ username: "", password: "", confirmPassword: "" });
                      }}
                      style={{
                        backgroundColor: "#EF4444",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 16px",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      🚪 Log Out
                    </button>
                  </div>
                </div>

                {/* Stats row cards */}
                <div
                  className="grid-4 responsive-footer-cols"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                    marginBottom: "24px"
                  }}
                >
                  <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600, color: "#64748B", display: "block", marginBottom: "4px" }}>
                      Total Bookings
                    </span>
                    <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0D3B6E" }}>
                      {adminBookings.length}
                    </span>
                  </div>

                  <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600, color: "#64748B", display: "block", marginBottom: "4px" }}>
                      In-Person (🏥)
                    </span>
                    <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10B981" }}>
                      {adminBookings.filter((b) => b.consultation_type?.includes("In-Person") || b.consultation_type?.includes("Hospital")).length}
                    </span>
                  </div>

                  <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600, color: "#64748B", display: "block", marginBottom: "4px" }}>
                      Virtual (💻)
                    </span>
                    <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1A6DB5" }}>
                      {adminBookings.filter((b) => b.consultation_type?.includes("Virtual") || b.consultation_type?.includes("Video")).length}
                    </span>
                  </div>

                  <div style={{ backgroundColor: "#FFFFFF", borderRadius: "12px", padding: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "1px solid #E2E8F0" }}>
                    <span style={{ fontSize: "0.78rem", textTransform: "uppercase", fontWeight: 600, color: "#64748B", display: "block", marginBottom: "4px" }}>
                      Insured Patients
                    </span>
                    <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#9333EA" }}>
                      {adminBookings.filter((b) => b.insurance && b.insurance.trim() !== "" && b.insurance !== "None").length}
                    </span>
                  </div>
                </div>

                {/* SEARCH AND FILTER BOX */}
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "16px",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    marginBottom: "20px"
                  }}
                >
                  <div style={{ display: "flex", flex: 1, minWidth: "260px", gap: "10px" }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="🔍 Search patients by Name or Email..."
                      value={adminSearchTerm}
                      onChange={(e) => setAdminSearchTerm(e.target.value)}
                      style={{ fontSize: "0.85rem", padding: "10px 14px", backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", flex: 1, margin: 0 }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#64748B" }}>
                      Department Filter:
                    </span>
                    <select
                      value={adminDeptFilter}
                      onChange={(e) => setAdminDeptFilter(e.target.value)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #CBD5E1",
                        fontSize: "0.85rem",
                        backgroundColor: "#FFFFFF",
                        color: "#334155"
                      }}
                    >
                      <option value="All">All Specialities</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notifications in Admin area */}
                {adminError && (
                  <div style={{ backgroundColor: "#FEE2E2", border: "1px solid #FCA5A5", color: "#991B1B", padding: "12px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "16px" }}>
                    {adminError}
                  </div>
                )}
                
                {adminSuccessMsg && (
                  <div style={{ backgroundColor: "#D1FAE5", border: "1px solid #6EE7B7", color: "#065F46", padding: "12px", borderRadius: "8px", fontSize: "0.85rem", marginBottom: "16px" }}>
                    {adminSuccessMsg}
                  </div>
                )}

                {/* DATA TABLE CONTAINER */}
                {adminLoading ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <span style={{ fontSize: "2rem", display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
                    <p style={{ fontSize: "0.9rem", color: "#64748B", marginTop: "12px" }}>Querying cloud database records...</p>
                  </div>
                ) : (() => {
                  // Apply active filters
                  const filtered = adminBookings.filter((b) => {
                    const matchesSearch = 
                      (b.full_name?.toLowerCase() || "").includes(adminSearchTerm.toLowerCase()) || 
                      (b.email?.toLowerCase() || "").includes(adminSearchTerm.toLowerCase());
                    
                    const matchesDept = 
                      adminDeptFilter === "All" || b.department === adminDeptFilter;

                    return matchesSearch && matchesDept;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "60px 20px", textAlign: "center" }}>
                        <span style={{ fontSize: "2.4rem" }}>📄</span>
                        <h4 style={{ fontSize: "1.1rem", color: "#0D3B6E", fontWeight: 700, margin: "14px 0 6px 0" }}>No Registrations Found</h4>
                        <p style={{ fontSize: "0.85rem", color: "#64748B", margin: 0 }}>
                          Either there are no records matching your query, or no bookings have been completed yet.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div style={{ overflowX: "auto", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                        <thead>
                          <tr style={{ backgroundColor: "#F1F5F9", borderBottom: "1px solid #E2E8F0" }}>
                            <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Patient Name</th>
                            <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Clinical Area</th>
                            <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Date & Slot</th>
                            <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Type</th>
                            <th style={{ padding: "14px 16px", color: "#475569", fontWeight: 600 }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filtered.map((b) => (
                            <tr key={b.id} style={{ borderBottom: "1px solid #F1F5F9", hover: { backgroundColor: "#F8FAFC" } }}>
                              <td style={{ padding: "14px 16px", fontWeight: "600", color: "#1E293B" }}>
                                <div>{b.full_name}</div>
                                <div style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 400 }}>{b.email} • {b.phone}</div>
                              </td>
                              <td style={{ padding: "14px 16px", color: "#334155" }}>
                                <div style={{ fontWeight: 500 }}>{b.department}</div>
                                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Approved Doctor: {b.doctor}</div>
                              </td>
                              <td style={{ padding: "14px 16px", color: "#334155" }}>
                                <div style={{ fontWeight: 500 }}>📅 {b.appt_date}</div>
                                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>🕒 {b.appt_time}</div>
                              </td>
                              <td style={{ padding: "14px 16px" }}>
                                <span style={{
                                  backgroundColor: b.consultation_type?.includes("In-Person") ? "#D1FAE5" : "#EFF6FF",
                                  color: b.consultation_type?.includes("In-Person") ? "#065F46" : "#1E40AF",
                                  padding: "4px 8px",
                                  borderRadius: "6px",
                                  fontSize: "0.72rem",
                                  fontWeight: 600
                                }}>
                                  {b.consultation_type}
                                </span>
                              </td>
                              <td style={{ padding: "14px 16px" }}>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <button
                                    onClick={() => setSelectedBookingDetail(b)}
                                    style={{
                                      backgroundColor: "#FAFAFA",
                                      color: "#334155",
                                      border: "1px solid #E2E8F0",
                                      padding: "6px 10px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      fontWeight: 500,
                                      fontSize: "0.78rem"
                                    }}
                                  >
                                    🔍 Details
                                  </button>
                                  <button
                                    onClick={() => deleteAppointment(b.id)}
                                    style={{
                                      backgroundColor: "#FEE2E2",
                                      color: "#991B1B",
                                      border: "1px solid #FCA5A5",
                                      padding: "6px 10px",
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                      fontWeight: 500,
                                      fontSize: "0.78rem"
                                    }}
                                  >
                                    🗑️ Cancel
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}

                {/* NESTED DETAILS MODAL FOR SPECIFIC APPOINTMENT */}
                {selectedBookingDetail && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(13, 59, 110, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1100,
                      padding: "20px"
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "16px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        width: "100%",
                        maxWidth: "500px",
                        padding: "24px",
                        border: "1px solid #E2E8F0"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F5F9", paddingBottom: "14px", marginBottom: "18px" }}>
                        <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#0D3B6E" }}>
                          Clinical Reservation File
                        </h4>
                        <button
                          onClick={() => setSelectedBookingDetail(null)}
                          style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#94A3B8" }}
                        >
                          ✕
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "#334155" }}>
                        <div>
                          <strong>Patient Full Name:</strong> <span style={{ color: "#0F172A" }}>{selectedBookingDetail.full_name}</span>
                        </div>
                        <div>
                          <strong>Date of Birth (DOB):</strong> {selectedBookingDetail.dob}
                        </div>
                        <div>
                          <strong>Gender:</strong> {selectedBookingDetail.gender}
                        </div>
                        <div>
                          <strong>Email:</strong> {selectedBookingDetail.email}
                        </div>
                        <div>
                          <strong>Phone:</strong> {selectedBookingDetail.phone}
                        </div>
                        <div>
                          <strong>Department Specialty:</strong> {selectedBookingDetail.department}
                        </div>
                        <div>
                          <strong>Nominated Doctor:</strong> {selectedBookingDetail.doctor}
                        </div>
                        <div>
                          <strong>Preferred Time-Slot:</strong> <span style={{ fontWeight: 600, color: "#1A6DB5" }}>{selectedBookingDetail.appt_date} • {selectedBookingDetail.appt_time}</span>
                        </div>
                        <div>
                          <strong>Consultation Modality:</strong> {selectedBookingDetail.consultation_type}
                        </div>
                        <div>
                          <strong>Health Insurance:</strong> {selectedBookingDetail.insurance || "Not provided / Self paying"}
                        </div>
                        <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "10px", marginTop: "4px" }}>
                          <strong>Patient's Key Symptoms:</strong>
                          <p style={{ margin: "6px 0 0 0", padding: "10px", backgroundColor: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0", fontStyle: "italic", lineHeight: "1.4", color: "#556275" }}>
                            "{selectedBookingDetail.symptoms || "None declared."}"
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedBookingDetail(null)}
                        style={{
                          width: "100%",
                          backgroundColor: "#F1F5F9",
                          color: "#475569",
                          border: "1px solid #CBD5E1",
                          borderRadius: "8px",
                          padding: "10px",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          marginTop: "20px"
                        }}
                      >
                        Close View File
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <section id="doctors" style={{ padding: "100px 0 80px 0", backgroundColor: "#EAF4FB" }}>
        <div className="container fade-in-section">
          {/* Centered Doctor Header */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0D3B6E", marginBottom: "12px" }}>Meet Our Expert Doctors</h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#1A6DB5", margin: "0 auto 16px auto", borderRadius: "2px" }}></div>
            <p style={{ color: "#4A5568", margin: 0 }}>
              Connect with leading healthcare practitioners in our network. Experienced specialists certified in state-of-the-art diagnostics and procedures.
            </p>
          </div>

          {/* Doctors Grid with standard subset or all */}
          <div className="grid-4">
            {doctorsData.slice(0, showAllDoctors ? 12 : 8).map((doc) => (
              <div
                key={doc.id}
                className="hover-lift card"
                style={{
                  padding: "28px 20px",
                  textAlign: "center"
                }}
              >
                {/* 72px Circular Avatar representing Indian doctors */}
                <div
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    margin: "0 auto 16px auto",
                    boxShadow: "0 4px 10px rgba(26, 109, 181, 0.15)",
                    overflow: "hidden",
                    border: "3px solid #FFFFFF",
                    backgroundColor: "#1A6DB5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <span style={{ color: "#FFFFFF", fontWeight: "700", fontSize: "1.45rem" }}>
                      {doc.initials}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0D3B6E", margin: "0 0 4px 0" }}>
                  {doc.name}
                </h3>

                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1A6DB5", margin: "0 0 8px 0" }}>
                  {doc.specialty}
                </p>

                {/* Experience Pill */}
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#EAF4FB",
                    color: "#0D3B6E",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "4px 12px",
                    borderRadius: "12px",
                    marginBottom: "12px"
                  }}
                >
                  {doc.exp} Years Exp.
                </div>

                {/* Rating stars */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px", color: "#F59E0B", marginBottom: "14px" }}>
                  <Star size={14} fill="#F59E0B" />
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4A5568", marginLeft: "2px" }}>
                    {doc.rating}
                  </span>
                </div>

                {/* Availability text and dot indicators */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    fontSize: "0.8rem",
                    color: "#4A5568",
                    marginBottom: "20px"
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: doc.available ? "#10B981" : "#F59E0B"
                    }}
                  />
                  <span>{doc.available ? "Available Today" : "Next: Tomorrow"}</span>
                </div>

                <button
                  onClick={() => handleBookDoctor(doc)}
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    color: "#1A6DB5",
                    border: "1px solid #1A6DB5",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1A6DB5";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#1A6DB5";
                  }}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>

          {/* Toggle Button */}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              onClick={() => setShowAllDoctors(!showAllDoctors)}
              style={{
                backgroundColor: "transparent",
                color: "#1A6DB5",
                border: "2px solid #1A6DB5",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1A6DB5";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#1A6DB5";
              }}
            >
              {showAllDoctors ? "Show Less Doctors" : "View All Doctors →"}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6 — SERVICES */}
      <section id="services" style={{ padding: "100px 0 80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container fade-in-section">
          {/* Centered Services Header */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0D3B6E", marginBottom: "12px" }}>Our Medical Services</h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#1A6DB5", margin: "0 auto 16px auto", borderRadius: "2px" }}></div>
            <p style={{ color: "#4A5568", margin: 0 }}>
              Providing highly specialized nursing plans, advanced technology diagnostics, and full clinical care solutions designed to aid patient healing.
            </p>
          </div>

          {/* Services Grid (6 cards with gradient backgrounds) */}
          <div className="grid-3">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="hover-lift"
                style={{
                  background: "linear-gradient(135deg, #1A6DB5, #4A9FD4)",
                  borderRadius: "16px",
                  padding: "32px",
                  color: "#FFFFFF",
                  boxShadow: "0 8px 30px rgba(26, 109, 181, 0.15)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  {/* Icon */}
                  <div
                    style={{
                      fontSize: "2rem",
                      marginBottom: "16px",
                      lineHeight: 1
                    }}
                  >
                    {srv.icon}
                  </div>

                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 12px 0" }}>
                    {srv.title}
                  </h3>

                  <p style={{ fontSize: "0.9rem", color: "#EAF4FB", lineHeight: "1.7", margin: 0 }}>
                    {srv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — APPOINTMENT BOOKING */}
      <section
        id="appointments"
        style={{
          background: "linear-gradient(135deg, #0D3B6E, #1A6DB5)",
          padding: "100px 0",
          color: "#FFFFFF"
        }}
      >
        <div className="container fade-in-section">
          {/* Section Header */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "12px" }}>Book Your Appointment</h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#4A9FD4", margin: "0 auto 16px auto", borderRadius: "2px" }}></div>
            <p style={{ color: "#EAF4FB", margin: 0 }}>
              Schedule your clinic visit or video consultation securely. Fill out the application form below and we will send a confirmation in minutes.
            </p>
          </div>

          {/* Main Booking Form Card Panel */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "40px",
              boxShadow: "0 15px 45px rgba(13, 59, 110, 0.3)",
              maxWidth: "860px",
              margin: "0 auto",
              color: "#1A2B3C"
            }}
          >
            {mainSuccess ? (
              <div
                style={{
                  backgroundColor: "#D1FAE5",
                  border: "1px solid #10B981",
                  borderRadius: "12px",
                  padding: "32px 16px",
                  color: "#065F46",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.4rem",
                    margin: "0 auto 16px auto"
                  }}
                >
                  ✓
                </div>
                <h3 style={{ margin: "0 0 10px 0", color: "#065F46", fontSize: "1.35rem", fontWeight: 700 }}>
                  Appointment Registered!
                </h3>
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: "1.6" }}>
                  ✅ Your appointment has been successfully booked! We will confirm your visit details via SMS text and registered email within 2 hours.
                </p>
                <button
                  onClick={() => setMainSuccess(false)}
                  style={{
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: "24px"
                  }}
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleMainSubmit}>
                {/* 2 Column CSS Grids responsive for forms */}
                <div
                  className="grid-2 form-grid-2"
                  style={{
                    gridGap: "20px",
                    marginBottom: "20px"
                  }}
                >
                  {/* Full Name */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Samuel Jackson"
                      value={mainForm.fullName}
                      onChange={(e) => setMainForm({ ...mainForm, fullName: e.target.value })}
                      style={{ border: mainErrors.fullName ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    />
                    {mainErrors.fullName && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.fullName}</span>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="e.g. +91 9876543210"
                      value={mainForm.phone}
                      onChange={(e) => setMainForm({ ...mainForm, phone: e.target.value })}
                      style={{ border: mainErrors.phone ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    />
                    {mainErrors.phone && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="e.g. sam@company.com"
                      value={mainForm.email}
                      onChange={(e) => setMainForm({ ...mainForm, email: e.target.value })}
                      style={{ border: mainErrors.email ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    />
                    {mainErrors.email && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.email}</span>}
                  </div>

                  {/* DOB */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      max={new Date().toISOString().split("T")[0]}
                      value={mainForm.dob}
                      onChange={(e) => setMainForm({ ...mainForm, dob: e.target.value })}
                      style={{ border: mainErrors.dob ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    />
                    {mainErrors.dob && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.dob}</span>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Gender Identity *
                    </label>
                    <select
                      className="form-input"
                      value={mainForm.gender}
                      onChange={(e) => setMainForm({ ...mainForm, gender: e.target.value })}
                      style={{ border: mainErrors.gender ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    >
                      <option value="">-- Choose Option --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    {mainErrors.gender && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.gender}</span>}
                  </div>

                  {/* Department select */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Department Speciality *
                    </label>
                    <select
                      className="form-input"
                      value={mainForm.department}
                      onChange={(e) => {
                        const deptVal = e.target.value;
                        // auto-select doctor when department changes, if available
                        const matchingDoc = doctorsData.find((d) => d.specialty === deptVal);
                        setMainForm({
                          ...mainForm,
                          department: deptVal,
                          doctor: matchingDoc ? matchingDoc.name : ""
                        });
                      }}
                      style={{ border: mainErrors.department ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    {mainErrors.department && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.department}</span>}
                  </div>

                  {/* Preferred Doctor select */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Preferred Practitioner *
                    </label>
                    <select
                      className="form-input"
                      value={mainForm.doctor}
                      onChange={(e) => setMainForm({ ...mainForm, doctor: e.target.value })}
                      style={{ border: mainErrors.doctor ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    >
                      <option value="">-- Select Specialist --</option>
                      {doctorsData
                        .filter((d) => !mainForm.department || d.specialty === mainForm.department)
                        .map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {doc.name} ({doc.specialty})
                          </option>
                        ))}
                    </select>
                    {mainErrors.doctor && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.doctor}</span>}
                  </div>

                  {/* Appointment Date */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      min={new Date().toISOString().split("T")[0]}
                      value={mainForm.apptDate}
                      onChange={(e) => setMainForm({ ...mainForm, apptDate: e.target.value })}
                      style={{ border: mainErrors.apptDate ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    />
                    {mainErrors.apptDate && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.apptDate}</span>}
                  </div>

                  {/* Preferred Slot */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Preferred Time Slot *
                    </label>
                    <select
                      className="form-input"
                      value={mainForm.apptTime}
                      onChange={(e) => setMainForm({ ...mainForm, apptTime: e.target.value })}
                      style={{ border: mainErrors.apptTime ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                    >
                      <option value="">-- Choose Time Window --</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                    {mainErrors.apptTime && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.apptTime}</span>}
                  </div>

                  {/* Insurance Provider */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                      Insurance Provider <span style={{ color: "#4A5568", fontWeight: "normal" }}>(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. United Healthcare"
                      value={mainForm.insurance}
                      onChange={(e) => setMainForm({ ...mainForm, insurance: e.target.value })}
                    />
                  </div>
                </div>

                {/* Symptoms Textarea */}
                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                    Reason for Visit / Symptoms *
                  </label>
                  <textarea
                    rows={4}
                    className="form-input"
                    placeholder="Briefly clarify primary symptoms or care reasons..."
                    value={mainForm.symptoms}
                    onChange={(e) => setMainForm({ ...mainForm, symptoms: e.target.value })}
                    style={{ border: mainErrors.symptoms ? "1px solid #EF4444" : "1px solid #D6E4F0", resize: "vertical" }}
                  />
                  {mainErrors.symptoms && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{mainErrors.symptoms}</span>}
                </div>

                {dbError && (
                  <div style={{
                    backgroundColor: "#FEE2E2",
                    border: "1px solid #EF4444",
                    borderRadius: "8px",
                    padding: "14px 16px",
                    color: "#991B1B",
                    fontSize: "0.88rem",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 500
                  }}>
                    <span>⚠️</span>
                    <span>{dbError}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    backgroundColor: isSubmitting ? "#7DA9D2" : "#1A6DB5",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "16px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = "#12518a";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) e.currentTarget.style.backgroundColor = "#1A6DB5";
                  }}
                >
                  {isSubmitting ? "Transmitting booking to database..." : "Confirm Appointment →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8 — WHY CHOOSE US */}
      <section id="why-choose-us" style={{ padding: "100px 0 80px 0", backgroundColor: "#F5F8FC" }}>
        <div className="container fade-in-section">
          {/* Section Header */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0D3B6E", marginBottom: "12px" }}>
              Why Patients Trust We Care Hospital
            </h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#1A6DB5", margin: "0 auto 16px auto", borderRadius: "2px" }}></div>
            <p style={{ color: "#4A5568", margin: 0 }}>
              Connecting advanced health technology parameters and clinical skill to support the safety of our local community.
            </p>
          </div>

          <div className="grid-2">
            {[
              {
                icon: "🏆",
                title: "Expert Medical Team",
                desc: "Over 80 board-certified specialists across all major disciplines with decades of combined clinical experience."
              },
              {
                icon: "🔬",
                title: "Modern Technology",
                desc: "Equipped with the latest diagnostic imaging, robotic surgery systems, and real-time patient monitoring."
              },
              {
                icon: "❤️",
                title: "Patient-Centered Care",
                desc: "Every treatment plan is individually tailored. We treat the whole person, not just the condition."
              },
              {
                icon: "📞",
                title: "24/7 Support",
                desc: "Our care coordination team is always available — call, chat, or visit the emergency wing any time."
              }
            ].map((feat, index) => (
              <div
                key={index}
                className="hover-lift"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D6E4F0",
                  borderRadius: "16px",
                  padding: "40px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "24px"
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    backgroundColor: "#EAF4FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    lineHeight: 1,
                    flexShrink: 0
                  }}
                >
                  {feat.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.25rem", color: "#0D3B6E", fontWeight: 700, margin: "0 0 10px 0" }}>
                    {feat.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "#4A5568", lineHeight: "1.6" }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "100px 0 80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container fade-in-section">
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0D3B6E", marginBottom: "12px" }}>What Our Patients Say</h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#1A6DB5", margin: "0 auto 16px auto", borderRadius: "2px" }}></div>
            <p style={{ color: "#4A5568", margin: 0 }}>
              Hear the primary stories of patients who restored their vitality and received outstanding clinical support at our hospitals.
            </p>
          </div>

          <div className="grid-3">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="hover-lift"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D6E4F0",
                  borderRadius: "16px",
                  padding: "36px",
                  boxShadow: "0 6px 20px rgba(13, 59, 110, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  {/* Stars Rating */}
                  <div style={{ color: "#1A6DB5", fontSize: "1.25rem", marginBottom: "14px" }}>
                    {"★".repeat(test.stars)}
                  </div>
                  {/* Quote text spacing */}
                  <p style={{ fontStyle: "italic", color: "#4A5568", fontSize: "0.95rem", lineHeight: "1.7", margin: "0 0 24px 0" }}>
                    "{test.quote}"
                  </p>
                </div>

                {/* Patient Profile */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1A6DB5, #4A9FD4)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.95rem",
                      fontWeight: "bold"
                    }}
                  >
                    {test.initials}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#0D3B6E", fontWeight: 700 }}>
                      {test.name}
                    </h4>
                    <span style={{ fontSize: "0.8rem", color: "#1A6DB5", fontWeight: 600 }}>
                      {test.dept}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — HEALTH BLOG */}
      <section id="blog" style={{ padding: "100px 0 80px 0", backgroundColor: "#EAF4FB" }}>
        <div className="container fade-in-section">
          {/* Header */}
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 48px auto" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0D3B6E", marginBottom: "12px" }}>Health Tips & News</h2>
            <div style={{ width: "60px", height: "4px", backgroundColor: "#1A6DB5", margin: "0 auto 16px auto", borderRadius: "2px" }}></div>
            <p style={{ color: "#4A5568", margin: 0 }}>
              Stay updated with professional medical analysis, nutrition ideas, and proactive recommendations from our certified care staff.
            </p>
          </div>

          <div className="grid-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="hover-lift"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D6E4F0",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(13, 59, 110, 0.04)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* Styled Div image substitute containing graphics icon placeholder */}
                <div
                  style={{
                    height: "180px",
                    background: "linear-gradient(135deg, #1A6DB5, #4A9FD4)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      fontSize: "2rem"
                    }}
                  >
                    🩺
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
                  <div>
                    {/* Category */}
                    <span
                      style={{
                        backgroundColor: "#EAF4FB",
                        color: "#1A6DB5",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "12px",
                        display: "inline-block",
                        marginBottom: "12px"
                      }}
                    >
                      {post.category}
                    </span>

                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0D3B6E", margin: "0 0 10px 0", lineHeight: "1.4" }}>
                      {post.title}
                    </h3>

                    <p style={{ fontSize: "0.85rem", color: "#4A5568", lineHeight: "1.6", margin: "0 0 20px 0" }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1px solid #F5F8FC",
                      paddingTop: "14px"
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", color: "#4A5568", fontWeight: 500 }}>{post.date}</span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#1A6DB5",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 — CONTACT */}
      <section id="contact" style={{ padding: "100px 0 80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="container fade-in-section">
          <div
            className="responsive-contact-split"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              gap: "48px"
            }}
          >
            {/* Left Column Info Details */}
            <div className="responsive-contact-left" style={{ width: "45%" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0D3B6E", margin: "0 0 12px 0" }}>Get in Touch</h2>
              <div style={{ width: "60px", height: "4px", backgroundColor: "#1A6DB5", margin: "0 0 24px 0", borderRadius: "2px" }}></div>
              <p style={{ color: "#4A5568", margin: "0 0 32px 0" }}>
                Our medical coordination team is ready to answer diagnostic questions, clarify clinical departments, or handle queries. Do not hesitate to check with us directly.
              </p>

              {/* Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { icon: "📍", label: "Address", value: "42, Healthcare Avenue, Sector 12, New Delhi – 110001" },
                  { icon: "📞", label: "Phone", value: "+91 98765 43210 (General) | +91 98765 43211 (Emergency)" },
                  { icon: "📧", label: "Email", value: "info@wecarehospital.in | appointments@wecarehospital.in" },
                  { icon: "🕐", label: "Hours", value: "Mon–Sat 8:00 AM – 8:00 PM | Emergency & ICU: 24/7" }
                ].map((row, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#1A6DB5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontSize: "1.2rem",
                        flexShrink: 0
                      }}
                    >
                      {row.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 2px 0", fontSize: "0.85rem", fontWeight: 600, color: "#1A6DB5", textTransform: "uppercase" }}>
                        {row.label}
                      </h4>
                      <p style={{ margin: 0, fontSize: "0.95rem", color: "#1A2B3C", fontWeight: 500 }}>
                        {row.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social icons row */}
              <div style={{ display: "flex", gap: "12px", marginTop: "36px" }}>
                {[
                  { label: "f", url: "#", name: "Facebook" },
                  { label: "✕", url: "#", name: "Twitter" },
                  { label: "◎", url: "#", name: "Instagram" },
                  { label: "in", url: "#", name: "LinkedIn" }
                ].map((social, index) => (
                  <a
                    href={social.url}
                    key={index}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#1A6DB5",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "0.95rem"
                    }}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column Form */}
            <div className="responsive-contact-right" style={{ width: "50%" }}>
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D6E4F0",
                  borderRadius: "16px",
                  padding: "40px",
                  boxShadow: "0 6px 25px rgba(13, 59, 110, 0.04)"
                }}
              >
                <h3 style={{ textTransform: "none", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 24px 0", color: "#0D3B6E" }}>
                  Send a Direct Message
                </h3>

                {contactSuccess ? (
                  <div
                    style={{
                      backgroundColor: "#D1FAE5",
                      border: "1px solid #10B981",
                      borderRadius: "8px",
                      padding: "20px 16px",
                      color: "#065F46",
                      textAlign: "center"
                    }}
                  >
                    <CheckCircle size={32} style={{ margin: "0 auto 8px auto", color: "#10B981" }} />
                    ✅ Message sent! Our team will respond within 24 hours.
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Johnathan Davis"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        style={{ border: contactErrors.name ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                      />
                      {contactErrors.name && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{contactErrors.name}</span>}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="john@glen.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        style={{ border: contactErrors.email ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                      />
                      {contactErrors.email && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{contactErrors.email}</span>}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                        Subject Query *
                      </label>
                      <select
                        className="form-input"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        style={{ border: contactErrors.subject ? "1px solid #EF4444" : "1px solid #D6E4F0" }}
                      >
                        <option value="">-- Select Subject Type --</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Appointment Query">Appointment Query</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Other">Other</option>
                      </select>
                      {contactErrors.subject && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{contactErrors.subject}</span>}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#0D3B6E", marginBottom: "6px" }}>
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        className="form-input"
                        placeholder="Please elaborate on your medical queries..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        style={{ border: contactErrors.message ? "1px solid #EF4444" : "1px solid #D6E4F0", resize: "vertical" }}
                      />
                      {contactErrors.message && <span style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "4px", display: "block" }}>{contactErrors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#1A6DB5",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "14px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#12518a")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A6DB5")}
                    >
                      Send Message →
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Interactive map placeholder */}
          <div
            style={{
              marginTop: "48px",
              padding: "36px",
              backgroundColor: "#EAF4FB",
              border: "2px dashed #D6E4F0",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "8px",
              minHeight: "180px"
            }}
          >
            <MapPin size={32} style={{ color: "#1A6DB5", marginBottom: "4px" }} />
            <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0D3B6E" }}>
              📍 We Care Hospital Clinic Space
            </span>
            <span style={{ fontSize: "0.9rem", color: "#4A5568", maxWidth: "480px" }}>
              42, Healthcare Avenue, Sector 12, New Delhi | Interactive map rendering setup initialized.
            </span>
            <span style={{ fontSize: "0.85rem", color: "#1A6DB5", fontStyle: "italic", fontWeight: 500, marginTop: "4px" }}>
              "Interactive map coming soon"
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 12 — FOOTER */}
      <footer style={{ backgroundColor: "#0D3B6E", color: "#FFFFFF", padding: "64px 0 32px 0" }}>
        <div className="container">
          <div
            className="grid-4 responsive-footer-cols"
            style={{
              marginBottom: "40px",
              rowGap: "32px"
            }}
          >
            {/* Col 1 Tagline */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>✚</span>
                <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>We Care Hospital</span>
              </div>
              <p style={{ color: "#4A9FD4", fontSize: "0.9rem", margin: "0 0 24px 0", lineHeight: "1.6" }}>
                Compassionate Care. <br />
                Advanced Medicine.
              </p>

              {/* small icons */}
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { label: "f", url: "#" },
                  { label: "✕", url: "#" },
                  { label: "◎", url: "#" },
                  { label: "in", url: "#" }
                ].map((sc, i) => (
                  <a
                    href={sc.url}
                    key={i}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1A6DB5")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
                  >
                    {sc.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 Quick Links */}
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 20px 0" }}>
                Quick Links
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Home", id: "home" },
                  { label: "About Us", id: "about" },
                  { label: "Departments", id: "departments" },
                  { label: "Doctors", id: "doctors" },
                  { label: "Services", id: "services" },
                  { label: "Health Blog", id: "blog" },
                  { label: "Careers", id: "contact" }
                ].map((lnk, i) => (
                  <li key={i}>
                    <span
                      onClick={() => scrollIntoId(lnk.id)}
                      style={{
                        color: "#EAF4FB",
                        opacity: 0.8,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        transition: "opacity 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
                    >
                      {lnk.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 Departments */}
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 20px 0" }}>
                Our Departments
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Cardiology",
                  "Neurology",
                  "Orthopedics",
                  "Pediatrics",
                  "Oncology",
                  "General Medicine"
                ].map((dept, i) => (
                  <li key={i}>
                    <span
                      onClick={() => {
                        const idObj = departments.find((d) => d.name === dept);
                        if (idObj) setSelectedDept(idObj);
                        scrollIntoId("departments");
                      }}
                      style={{
                        color: "#EAF4FB",
                        opacity: 0.8,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        transition: "opacity 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
                    >
                      {dept}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 Contact Details */}
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", margin: "0 0 20px 0" }}>
                Contact
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.875rem", color: "#EAF4FB", opacity: 0.85 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span>📍</span>
                  <span>42, Healthcare Avenue, Sector 12, New Delhi</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span>📞</span>
                  <span>+91 98765 43210</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span>📧</span>
                  <span>info@wecarehospital.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar separator line style */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.15)",
              paddingTop: "24px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              fontSize: "0.85rem"
            }}
          >
            <span style={{ color: "#EAF4FB", opacity: 0.8 }}>
              © 2025 We Care Hospital. All Rights Reserved.
            </span>
            <div style={{ display: "flex", gap: "14px", color: "#4A9FD4", alignItems: "center" }}>
              <span>Privacy Policy</span>
              <span>|</span>
              <span>Terms of Service</span>
              <span>|</span>
              <span>Sitemap</span>
              <span>|</span>
              <button
                onClick={() => setShowAdminModal(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#93C5FD",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "color 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#93C5FD")}
              >
                🔒 Admin Portal
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOAT SCROLL-TO-TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#1A6DB5",
            color: "#FFFFFF",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(13, 59, 110, 0.3)",
            zIndex: 999,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0D3B6E";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1A6DB5";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
}
