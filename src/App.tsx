import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu,
  X,
  ChevronUp,
  ChevronRight,
  Shield,
  Cpu,
  Zap,
  Sun,
  Factory,
  Cpu as Chip,
  Layers,
  Code,
  Settings,
  Users,
  Target,
  Award,
  Clock,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Youtube,
  ArrowRight,
  CircleDot,
  Battery,
  CircuitBoard,
  Lightbulb,
  Rocket,
  Globe,
  Send,
  FileText,
  ExternalLink,
  Upload,
  User,
  FileUp,
  Wrench,
} from 'lucide-react';
import logo from './assets/INPET Logo- 2.png';

// Hero slideshow slides data
const heroSlides = [
  {
    image: '/src/assets/image01.jpg',
    title: 'Defense Electronics',
    subtitle: 'Mission-critical power systems and ruggedized embedded solutions for defense applications',
  },
  {
    image: '/src/assets/image02.jpg',
    title: 'Custom Power Supplies',
    subtitle: 'Precision-engineered power solutions for demanding industrial and military applications',
  },
  {
    image: '/src/assets/image03.jpg',
    title: 'Embedded Systems',
    subtitle: 'Advanced embedded hardware and software solutions powering next-generation technology',
  },
  {
    image: '/src/assets/image04.jpg',
    title: 'Solar & Industrial Energy Solutions',
    subtitle: 'Efficient power conversion and energy management systems for a sustainable future',
  },
];



// Categories data with 5 products each
const categoriesData = [
  {
    category: 'Defense',
    products: [
      { id: 1, image: '/src/assets/about01.jpg', title: 'Military Power Supply', datasheetUrl: '/datasheets/mil-psu.pdf', hasDatasheet: true },
      { id: 2, image: '/src/assets/about02.jpg', title: 'Radar Power Module', datasheetUrl: '/datasheets/radar.pdf', hasDatasheet: true },
      { id: 3, image: '/src/assets/about03.jpg', title: 'Tactical Comm Unit', datasheetUrl: '/datasheets/comm.pdf', hasDatasheet: false },
      { id: 4, image: '/src/assets/about04.jpg', title: 'Ruggedized Controller', datasheetUrl: '/datasheets/ruggedized.pdf', hasDatasheet: true },
      { id: 5, image: '/src/assets/about01.jpg', title: 'Armored Vehicle ECU', datasheetUrl: '/datasheets/ecu.pdf', hasDatasheet: true },
    ],
  },
  {
    category: 'Automotive',
    products: [
      { id: 1, image: '/src/assets/about02.jpg', title: 'EV Battery Management', datasheetUrl: '/datasheets/bms.pdf', hasDatasheet: true },
      { id: 2, image: '/src/assets/about03.jpg', title: 'OBC Charger Module', datasheetUrl: '/datasheets/obc.pdf', hasDatasheet: true },
      { id: 3, image: '/src/assets/about04.jpg', title: 'ADAS Controller', datasheetUrl: '/datasheets/adas.pdf', hasDatasheet: false },
      { id: 4, image: '/src/assets/about01.jpg', title: 'DC-DC Converter', datasheetUrl: '/datasheets/dcdc.pdf', hasDatasheet: true },
      { id: 5, image: '/src/assets/about02.jpg', title: 'Motor Drive Unit', datasheetUrl: '/datasheets/mdu.pdf', hasDatasheet: true },
    ],
  },
  {
    category: 'Industrial',
    products: [
      { id: 1, image: '/src/assets/about02.jpg', title: 'Industrial Motor Controller', datasheetUrl: '/datasheets/motor.pdf', hasDatasheet: true },
      { id: 2, image: '/src/assets/about03.jpg', title: 'PLC Module', datasheetUrl: '/datasheets/plc.pdf', hasDatasheet: true },
      { id: 3, image: '/src/assets/about04.jpg', title: 'SCADA Interface Unit', datasheetUrl: '/datasheets/scada.pdf', hasDatasheet: false },
      { id: 4, image: '/src/assets/about01.jpg', title: 'HMI Panel Controller', datasheetUrl: '/datasheets/hmi.pdf', hasDatasheet: true },
      { id: 5, image: '/src/assets/about02.jpg', title: 'Industrial IoT Gateway', datasheetUrl: '/datasheets/iot-ind.pdf', hasDatasheet: true },
    ],
  },
  {
    category: 'Solar Energy',
    products: [
      { id: 1, image: '/src/assets/about03.jpg', title: 'Solar Inverter 10kW', datasheetUrl: '/datasheets/inverter.pdf', hasDatasheet: true },
      { id: 2, image: '/src/assets/about04.jpg', title: 'MPPT Charge Controller', datasheetUrl: '/datasheets/mppt.pdf', hasDatasheet: true },
      { id: 3, image: '/src/assets/about01.jpg', title: 'String Combiner Box', datasheetUrl: '/datasheets/combiner.pdf', hasDatasheet: true },
      { id: 4, image: '/src/assets/about02.jpg', title: 'Energy Storage BMS', datasheetUrl: '/datasheets/storage.pdf', hasDatasheet: false },
      { id: 5, image: '/src/assets/about03.jpg', title: 'Grid Tie Interface', datasheetUrl: '/datasheets/grid.pdf', hasDatasheet: true },
    ],
  },
  {
    category: 'Embedded',
    products: [
      { id: 1, image: '/src/assets/about04.jpg', title: 'IoT Gateway Module', datasheetUrl: '/datasheets/iot-gw.pdf', hasDatasheet: true },
      { id: 2, image: '/src/assets/about01.jpg', title: 'STM32 Dev Board', datasheetUrl: '/datasheets/stm32.pdf', hasDatasheet: true },
      { id: 3, image: '/src/assets/about02.jpg', title: 'ARM Cortex Controller', datasheetUrl: '/datasheets/arm.pdf', hasDatasheet: true },
      { id: 4, image: '/src/assets/about03.jpg', title: 'Embedded Linux SOM', datasheetUrl: '/datasheets/linux.pdf', hasDatasheet: false },
      { id: 5, image: '/src/assets/about04.jpg', title: 'RTOS Control Board', datasheetUrl: '/datasheets/rtos.pdf', hasDatasheet: true },
    ],
  },
  {
    category: 'Healthcare',
    products: [
      { id: 1, image: '/src/assets/about01.jpg', title: 'Medical Device Controller', datasheetUrl: '/datasheets/med-ctrl.pdf', hasDatasheet: false },
      { id: 2, image: '/src/assets/about02.jpg', title: 'Patient Monitor PSU', datasheetUrl: '/datasheets/pmon.pdf', hasDatasheet: true },
      { id: 3, image: '/src/assets/about03.jpg', title: 'Diagnostic Equipment Board', datasheetUrl: '/datasheets/diag.pdf', hasDatasheet: true },
      { id: 4, image: '/src/assets/about04.jpg', title: 'Infusion Pump Controller', datasheetUrl: '/datasheets/infusion.pdf', hasDatasheet: false },
      { id: 5, image: '/src/assets/about01.jpg', title: 'Portable ECG Module', datasheetUrl: '/datasheets/ecg.pdf', hasDatasheet: true },
    ],
  },
];

// Hero Slideshow Component
function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="absolute inset-0">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="animate-fade-in">
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/20 text-white rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm">
              <CircleDot className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              {heroSlides[currentSlide].title}
            </span>
          </div>
          <h1 className="animate-fade-in text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-tight mb-4 sm:mb-6">
            Engineering the Future of{' '}
            <span className="text-primary">Power & Embedded Technology</span>
          </h1>
          <p className="animate-fade-in text-base sm:text-lg md:text-xl text-neutral-300 mb-6 sm:mb-8 max-w-2xl transition-all duration-500">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="animate-fade-in flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#services" className="btn-primary group">
              Explore Our Services
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="btn-white">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>



      {/* Slide Indicators */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-6 sm:w-8 h-2 bg-primary rounded-full'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
}

// Global singleton ticker - ONE interval, all cards sync to it
let globalTick = 0;
const globalListeners = new Set<() => void>();
setInterval(() => {
  globalTick += 1;
  globalListeners.forEach((fn) => fn());
}, 5000);

function useGlobalTick() {
  const [tick, setTick] = useState(globalTick);
  useEffect(() => {
    const update = () => setTick((t) => t + 1);
    globalListeners.add(update);
    return () => { globalListeners.delete(update); };
  }, []);
  return tick;
}

// Category Card Component with auto-slideshow
function CategoryCard({ category, products, index }: {
  category: string;
  products: typeof categoriesData[0]['products'];
  index: number;
}) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const tick = useGlobalTick();
  useEffect(() => {
    if (isHovered) return;
    setFading(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % products.length);
      setFading(false);
    }, 400);
  }, [tick]);

  const product = products[current];

  const handleViewDatasheet = () => {
    const p = products[current];
    if (p.hasDatasheet) {
      window.open(p.datasheetUrl, '_blank');
    }
  };

  return (
    <div className={`reveal stagger-${(index % 4) + 1} flex flex-col items-center`}>
      <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 w-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className="absolute top-3 right-3 z-10 flex gap-1">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFading(true);
                setTimeout(() => { setCurrent(i); setFading(false); }, 400);
              }}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-4 h-2 bg-primary' : 'w-2 h-2 bg-white/70'
              }`}
            />
          ))}
        </div>
        <div className="aspect-video overflow-hidden relative">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              fading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-neutral-900/80 flex flex-col justify-center items-center px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            <button
              onClick={handleViewDatasheet}
              disabled={!product.hasDatasheet}
              className={`text-xs sm:text-sm font-medium flex items-center px-4 py-2 rounded-lg ${
                product.hasDatasheet
                  ? 'text-white bg-primary hover:bg-red-700 transition-colors cursor-pointer'
                  : 'text-neutral-400 bg-neutral-700 cursor-not-allowed'
              }`}
            >
              <FileText className="w-3 h-3 mr-1.5" />
              {product.hasDatasheet ? 'View Datasheet' : 'No Datasheet'}
            </button>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <p
            className={`text-sm sm:text-base font-semibold text-neutral-900 text-center transition-all duration-400 ${
              fading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
            }`}
          >
            {product.title}
          </p>
        </div>
      </div>
      <div className="mt-3 text-center">
        <span className="text-sm sm:text-base font-bold text-primary uppercase tracking-wider">
          {category}
        </span>
      </div>
    </div>
  );
}

// Submit Resume Section Component
// Job listings data
const jobListings = [
  { id: 1, title: 'Senior Embedded Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Engineering' },
  { id: 2, title: 'Power Electronics Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Engineering' },
  { id: 3, title: 'PCB Design Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Hardware' },
  { id: 4, title: 'Firmware Developer', location: 'Bangalore, India', type: 'Full-time', tag: 'Software' },
  { id: 5, title: 'Test Engineer', location: 'Bangalore, India', type: 'Full-time', tag: 'Quality' },
  { id: 6, title: 'Technical Project Manager', location: 'Bangalore, India', type: 'Full-time', tag: 'Management' },
];

function SubmitResumeSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', job: '', resume: null as File | null });
  const [fileName, setFileName] = useState('');

  const openModal = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setFormData(prev => ({ ...prev, job: jobTitle }));
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob('');
    setFormData({ name: '', email: '', phone: '', job: '', resume: null });
    setFileName('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({ ...prev, resume: file }));
      setFileName(file.name);
    } else if (file) {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    alert('Thank you for applying! We will review your application and get back to you soon.');
    closeModal();
  };

  return (
    <>
      <section id="careers" className="py-10 sm:py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12">
            <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
              Careers
            </span>
            <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-3 sm:mb-4">
              Join Our Team
            </h2>
            <p className="reveal stagger-2 text-neutral-600 text-sm sm:text-base">
              We're always looking for talented engineers. Find your role below.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="reveal bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 hover:border-primary hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-900 mb-3">{job.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="flex items-center text-xs text-neutral-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.location}
                    </span>
                    <span className="text-xs text-neutral-500">{job.type}</span>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {job.tag}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openModal(job.title)}
                  className="mt-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group-hover:gap-3"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-200">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Apply for Position</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{selectedJob}</p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
              {/* Job dropdown */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5">
                  Position
                </label>
                <select
                  name="job"
                  value={formData.job}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                >
                  <option value="">Select a position</option>
                  {jobListings.map(j => (
                    <option key={j.id} value={j.title}>{j.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5">
                  <FileUp className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5" />
                  Resume (PDF)
                </label>
                <input type="file" accept=".pdf" onChange={handleFileChange} required className="hidden" id="modal-resume-upload" />
                <label
                  htmlFor="modal-resume-upload"
                  className="flex items-center justify-center w-full px-4 py-4 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-1" />
                    <p className="text-xs text-neutral-600">{fileName || 'Click to upload or drag and drop'}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">PDF only (max 5MB)</p>
                  </div>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  Submit Application <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 500);

      const sections = ['home', 'about', 'industries', 'services', 'technology', 'products', 'why-us', 'careers', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Industries', href: '#industries' },
    { name: 'Services', href: '#services' },
    { name: 'Technology', href: '#technology' },
    { name: 'Products', href: '#products' },
    { name: 'Careers', href: '#careers' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-3">
              <div
                className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isScrolled
                    ? 'bg-white'
                    : 'bg-white'
                }`}
              >
                <img src={logo} alt="INPET Logo" className="w-11 h-11 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary leading-tight" style={{fontFamily: 'Ethnocentric, sans-serif'}}>INPET</span>
                <span className={`text-xs font-semibold tracking-wide leading-tight ${isScrolled ? 'text-neutral-900' : 'text-white'}`} style={{fontFamily: 'Ethnocentric, sans-serif'}}>Innovative Power and<br/>Embedded Technology</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isScrolled ? 'text-neutral-700' : 'text-white/90'
                  } ${activeSection === link.href.slice(1) ? 'text-primary' : ''}`}
                >
                  {link.name}
                </a>
              ))}
              <a href="https://www.inpet.in/webmail" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-6 py-2.5 self-center">
                Sign In
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-neutral-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-neutral-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl animate-slide-down">
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://www.inpet.in/webmail"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 btn-primary text-center mt-4"
              >
                Sign In
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Slideshow */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <HeroSlideshow />
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
                About INPET
              </span>
              <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4 sm:mb-6">
                Pioneering Innovation in Power Electronics
              </h2>
              <p className="reveal stagger-2 text-neutral-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                INPET Pvt Ltd is a leading power and embedded technology company dedicated to pushing the boundaries of innovation. We specialize in R&D, design, and manufacturing of custom power supplies and embedded solutions that power critical applications across diverse industries.
              </p>
              <p className="reveal stagger-3 text-neutral-600 text-sm sm:text-base mb-6 sm:mb-8">
                Our team of expert engineers combines deep domain knowledge with cutting-edge technology to deliver solutions that meet the most demanding requirements. From defense systems to renewable energy, we engineer products that drive progress.
              </p>

              {/* Mission & Vision */}
              <div className="reveal stagger-4 grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 sm:p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-1.5 sm:mb-2">Our Mission</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm">
                    To deliver innovative, reliable, and efficient power and embedded solutions that exceed customer expectations.
                  </p>
                </div>
                <div className="p-4 sm:p-6 bg-neutral-50 rounded-xl border border-neutral-200">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-1.5 sm:mb-2">Our Vision</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm">
                    To be the global leader in power electronics and embedded technology innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="reveal stagger-2 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                  <img
                    src="/src/assets/about01.jpg"
                    alt="Circuit board design"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img
                    src="/src/assets/about02.jpg"
                    alt="Engineering workspace"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-8">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg aspect-square">
                  <img
                    src="/src/assets/about03.jpg"
                    alt="Power systems"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                  <img
                    src="/src/assets/about04.jpg"
                    alt="Technology lab"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
              Industries We Serve
            </span>
            <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4 sm:mb-6">
              Powering Critical Industries Worldwide
            </h2>
            <p className="reveal stagger-2 text-neutral-600 text-sm sm:text-base md:text-lg">
              Our solutions serve the most demanding sectors where reliability and performance are non-negotiable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Defense */}
            <div className="reveal stagger-1 group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-primary">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">Defense</h3>
              <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Mission-critical power systems and ruggedized embedded solutions for defense applications.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-500">
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Military-grade power supplies</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Tactical communication systems</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Radar power systems</li>
              </ul>
            </div>

            {/* Automotive */}
            <div className="reveal stagger-2 group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-primary">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">Automotive</h3>
              <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Advanced embedded systems for next-generation automotive applications.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-500">
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> EV charging systems</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Battery management systems</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> ADAS controllers</li>
              </ul>
            </div>

            {/* Industrial */}
            <div className="reveal stagger-3 group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-primary">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Factory className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">Industrial</h3>
              <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Robust automation solutions for industrial manufacturing and processing.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-500">
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> PLC systems</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Industrial IoT</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Motor control systems</li>
              </ul>
            </div>

            {/* Solar Energy */}
            <div className="reveal stagger-4 group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200 hover:border-primary">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">Solar Energy</h3>
              <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Efficient power conversion solutions for renewable energy systems.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-500">
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Solar inverters</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> MPPT controllers</li>
                <li className="flex items-center"><CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" /> Energy storage systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
              Our Services
            </span>
            <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4 sm:mb-6">
              Comprehensive Engineering Solutions
            </h2>
            <p className="reveal stagger-2 text-neutral-600 text-sm sm:text-base md:text-lg">
              From concept to production, we deliver end-to-end engineering services tailored to your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service Cards */}
            {[
              {
                icon: Battery,
                title: 'Custom Power Supplies',
                description: 'Design and manufacturing of bespoke power supply units for specialized applications.',
                features: ['SMPS Design', 'DC-DC Converters', 'AC-DC Power Units'],
              },
              {
                icon: Chip,
                title: 'Embedded Systems',
                description: 'Complete embedded hardware and software solutions for complex applications.',
                features: ['MCU-based Systems', 'SoC Integration', 'Custom Hardware'],
              },
              {
                icon: Layers,
                title: 'PCB Design',
                description: 'Multi-layer PCB design services with signal integrity and EMI/EMC compliance.',
                features: ['Multi-layer PCBs', 'High-Speed Design', 'Thermal Management'],
              },
              {
                icon: Code,
                title: 'Firmware Development',
                description: 'Expert firmware development for embedded systems across multiple platforms.',
                features: ['Bare-metal Programming', 'RTOS Integration', 'Driver Development'],
              },
              {
                icon: Settings,
                title: 'Industrial Automation',
                description: 'Turnkey industrial automation solutions for manufacturing excellence.',
                features: ['SCADA Systems', 'HMI Development', 'Process Control'],
              },
              {
                icon: Wrench,
                title: 'Technical Consulting',
                description: 'Expert consulting services for power electronics and embedded systems.',
                features: ['Technology Assessment', 'Design Review', 'Feasibility Studies'],
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className={`reveal stagger-${(index % 4) + 1} group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-neutral-200 hover:border-primary hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary transition-all">
                  <service.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-neutral-600 text-xs sm:text-sm mb-4 sm:mb-6">{service.description}</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-xs sm:text-sm text-neutral-500">
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-1.5 sm:mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="section-padding bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div>
              <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
                Technology Expertise
              </span>
              <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">
                Cutting-Edge Technology Stack
              </h2>
              <p className="reveal stagger-2 text-neutral-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                Our team brings deep expertise across the full spectrum of power electronics and embedded technologies.
              </p>

              <div className="reveal stagger-3 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: Chip, label: 'STM32' },
                  { icon: CircuitBoard, label: 'MSPM0' },
                  { icon: Cpu, label: 'ARM Cortex' },
                  { icon: Globe, label: 'CAN Bus' },
                  { icon: Settings, label: 'Modbus' },
                  { icon: Lightbulb, label: 'IoT' },
                  { icon: Zap, label: 'Power Electronics' },
                  { icon: Battery, label: 'BMS' },
                  { icon: Layers, label: 'Embedded Linux' },
                  { icon: Clock, label: 'RTOS' },
                ].map((tech) => (
                  <div
                    key={tech.label}
                    className="flex items-center space-x-2 sm:space-x-3 bg-white/5 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-primary/20 transition-colors"
                  >
                    <tech.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-xs sm:text-sm font-medium">{tech.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="reveal stagger-2 relative hidden lg:block">
              <div className="aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl"></div>
                <div className="absolute inset-8 bg-neutral-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/src/assets/tech01.jpg"
                    alt="Technology illustration"
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full animate-float"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section with Datasheets */}
      <section id="products" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
              Our Products
            </span>
            <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4 sm:mb-6">
              Engineering Excellence in Action
            </h2>
            <p className="reveal stagger-2 text-neutral-600 text-sm sm:text-base md:text-lg">
              A showcase of our innovative products across diverse industries and applications.
            </p>
          </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoriesData.map((cat, index) => (
              <CategoryCard
                key={cat.category}
                category={cat.category}
                products={cat.products}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal order-2 lg:order-1">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
                <img
                  src="https://images.pexels.com/photo-3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 text-white">
                    <div className="text-3xl sm:text-4xl font-heading font-bold">15+</div>
                    <div className="text-xs sm:text-sm">Years of Engineering Excellence</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
                Why Choose INPET
              </span>
              <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4 sm:mb-6">
                Your Trusted Engineering Partner
              </h2>
              <p className="reveal stagger-2 text-neutral-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                We combine technical expertise with customer focus to deliver solutions that drive your success.
              </p>

              <div className="reveal stagger-3 space-y-4 sm:space-y-6">
                {[
                  {
                    icon: Award,
                    title: 'Industry Expertise',
                    description: 'Deep domain knowledge across defense, automotive, industrial, and energy sectors.',
                  },
                  {
                    icon: Clock,
                    title: 'On-Time Delivery',
                    description: 'Proven track record of delivering products on schedule, regardless of complexity.',
                  },
                  {
                    icon: Users,
                    title: 'Expert Team',
                    description: 'Team of experienced engineers with extensive expertise in power and embedded systems.',
                  },
                  {
                    icon: Globe,
                    title: 'Global Standards',
                    description: 'Compliance with international standards including MIL-STD, ISO, and IEC.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-0.5 sm:mb-1 text-sm sm:text-base">{item.title}</h3>
                      <p className="text-neutral-600 text-xs sm:text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Resume Section (Replaces Careers) */}
      <SubmitResumeSection />

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <span className="reveal text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 block">
                Contact Us
              </span>
              <h2 className="reveal stagger-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-4 sm:mb-6">
                Let's Work Together
              </h2>
              <p className="reveal stagger-2 text-neutral-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
                Ready to discuss your product? Get in touch with our team to explore how we can help.
              </p>

              <div className="reveal stagger-3 space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Location</h3>
                    <p className="text-neutral-600 text-xs sm:text-sm">
                      INPET Pvt Ltd<br />
                      Technology Park, Electronic City<br />
                      Bangalore, Karnataka 560100, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Email</h3>
                    <p className="text-neutral-600 text-xs sm:text-sm">
                      info@inpet.com<br />
                      sales@inpet.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Phone</h3>
                    <p className="text-neutral-600 text-xs sm:text-sm">
                      +91 80 1234 5678<br />
                      +91 80 8765 4321
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="reveal stagger-4">
                <h3 className="font-semibold text-neutral-900 mb-3 sm:mb-4 text-sm sm:text-base">Follow Us</h3>
                <div className="flex space-x-3 sm:space-x-4">
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="reveal stagger-2">
              <div className="bg-neutral-50 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-neutral-200">
                <h3 className="text-xl sm:text-2xl font-heading font-semibold text-neutral-900 mb-4 sm:mb-6">
                  Send Us a Message
                </h3>
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">Company</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">Service Interest</label>
                    <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm">
                      <option value="">Select a service</option>
                      <option value="power-supplies">Custom Power Supplies</option>
                      <option value="embedded">Embedded Systems</option>
                      <option value="pcb">PCB Design</option>
                      <option value="firmware">Firmware Development</option>
                      <option value="automation">Industrial Automation</option>
                      <option value="consulting">Technical Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none text-sm"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full btn-primary group">
                    Send Message
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
            </form>
            </div>
          </div>

        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white pt-10 sm:pt-12 lg:pt-16 pb-6 sm:pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
            {/* Company Info */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                  <img src={logo} alt="INPET Logo" className="w-11 h-11 object-contain" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-primary" style={{fontFamily: 'Ethnocentric, sans-serif'}}>INPET</span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm mb-4 sm:mb-6">
                Innovative Power and Embedded Technology company delivering cutting-edge solutions for critical industries worldwide.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                {['Home', 'About', 'Services', 'Projects', 'Careers', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Services</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  'Custom Power Supplies',
                  'Embedded Systems',
                  'PCB Design',
                  'Firmware Development',
                  'Industrial Automation',
                  'Technical Consulting',
                ].map((service) => (
                  <li key={service}>
                    <a href="#services" className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Industries</h4>
              <ul className="space-y-2 sm:space-y-3">
                {['Defense', 'Automotive', 'Industrial', 'Solar Energy', 'Healthcare', 'Telecommunications'].map((industry) => (
                  <li key={industry}>
                    <a href="#industries" className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm">
                      {industry}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
              <p className="text-neutral-400 text-xs sm:text-sm text-center md:text-left">
                &copy; 2024 INPET Pvt Ltd. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-neutral-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary-600 transition-all z-50 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;
