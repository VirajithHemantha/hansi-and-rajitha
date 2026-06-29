import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Volume2, VolumeX } from "lucide-react";


/**
 * Western Wedding Invitation Theme
 * Names: Hansi & Rajitha
 * Background: Pastel Pink
 * Accents: Purple & Gold
 */

const backgroundMusic = "/Christina_Perri_-_A_Thousand_years_instrumental_version_(mp3.pm).mp3";
const flowerImage = "/silver_orchid.png";
const flowerCornerImage = "/silver_orchid_corner.png";
const flowerArchImage = "/silver_orchid_arch.png";
const brideGroomImage = "/images/1.jpg";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="mandala-frame pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
      <div className="mandala-corner mandala-corner-tr">
        <InviteImage src={flowerImage} alt="" className="mandala-art" eager />
      </div>
      {!minimal && (
        <>
          <div className="mandala-corner mandala-corner-bl mandala-mobile-hidden">
            <InviteImage src={flowerImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-tl is-soft mandala-mobile-hidden">
            <InviteImage src={flowerImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-br is-soft mandala-mobile-hidden">
            <InviteImage src={flowerImage} alt="" className="mandala-art" />
          </div>
        </>
      )}
    </div>
  );
}

function FloatingPetals({ disabled = false, vibrant = false }: { disabled?: boolean; vibrant?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const silverColors = ["#E5E7EB", "#D1D5DB", "#C0C0C0", "#F9FAFB"];
    const vibrantColors = ["#FFD700", "#FFC0CB", "#B0E0E6", "#D8BFD8", "#F0E68C", "#E6E6FA"];
    const colors = vibrant ? vibrantColors : silverColors;

    const petalCount = isMobile ? (vibrant ? 15 : 10) : (vibrant ? 25 : 18);
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled, vibrant]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(192,192,192,0.5)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date("Aug 01, 2026 10:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-theme-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-2xl sm:text-3xl md:text-5xl font-playball text-theme-800 leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3uFf2wXI65wfOkpHBKNCN2nSI6pv8erQr725FTEQrkNu-3irKY5lwgCcd-qOGGDT7/exec";

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Form State
  const [rsvpData, setRsvpData] = useState({ name: "", guests: "1", dietary: "" });
  const [wishData, setWishData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "rsvp_success" | "wish_success" | "error">(null);

  const handleSubmit = async (formName: "rsvp" | "wish", data: any) => {
    if (!SCRIPT_URL) {
      alert("Please configure the SCRIPT_URL in App.tsx to enable form submissions.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const params = new URLSearchParams();
      params.append("formName", formName);

      // Explicit mapping of keys to Sheet Headers
      const fieldMapping: Record<string, string> = {
        name: "Name",
        guests: "Guests",
        dietary: "Dietary Notes",
        message: "Message"
      };

      Object.keys(data).forEach(key => {
        const headerName = fieldMapping[key] || key;
        params.append(headerName, data[key]);
      });

      // Using GET with no-cors is the most reliable way to trigger Google Apps Script
      // even if the browser blocks the JSON response due to CORS redirects.
      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      });

      // Since we use no-cors, we can't read the response, so we assume success if no exception
      setSubmitStatus(`${formName}_success` as any);

      // Reset forms
      if (formName === "rsvp") setRsvpData({ name: "", guests: "1", dietary: "" });
      else setWishData({ name: "", message: "" });

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  const openInvitation = () => {
    setIsOpened(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio playback failed, likely due to browser autoplay policy.", err);
      });
    }
  };

  const startIntro = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsVideoPlaying(true);
    } else {
      openInvitation();
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      className={`h-[100dvh] w-full transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
      style={{
        backgroundImage: 'url(/images/back.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top left',
        backgroundAttachment: 'fixed',
      }}
    >
      <audio ref={audioRef} src={backgroundMusic} loop />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 1, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
          >
            {/* Uploaded Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: 'url("/images/ChatGPT Image Jun 29, 2026, 04_41_26 PM.png")' }} 
            />
            
            {/* Colorful Animated Background Flares (slightly transparent to show image) */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white/40 to-sky-50/50" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
                x: [-20, 20, -20],
                y: [-20, 20, -20]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[60%] aspect-square bg-gradient-to-br from-pink-300/30 to-purple-300/30 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
                x: [20, -20, 20],
                y: [20, -20, 20]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[15%] -right-[15%] w-[70%] aspect-square bg-gradient-to-tl from-amber-200/40 to-rose-200/40 blur-[140px] rounded-full"
            />

            <FloatingPetals disabled={isLowPerformanceMode} vibrant={true} />

            <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />

            {/* Background Video Strip for Mobile / Full for Desktop */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-[35vh] md:h-full group">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  onEnded={openInvitation}
                  className="w-full h-full object-cover shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]"
                  src="/Use_the_uploaded_202604161807.mp4"
                />
                {/* Colorful Frame for the strip */}
                <div className="absolute inset-0 border-y-2 border-white/40 md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 md:hidden" />
              </div>
            </div>

            {/* Soft colorful overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b from-rose-50/10 via-transparent to-sky-50/20 transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />

            {/* Initial Black Screen with Centered Button */}
            <AnimatePresence>
              {!isVideoPlaying && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-[110] bg-cover bg-center flex flex-col items-center justify-center"
                  style={{ backgroundImage: 'url("/images/ChatGPT Image Jun 29, 2026, 04_41_26 PM.png")' }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="relative"
                  >
                    <div className="absolute -inset-6 bg-gradient-to-r from-theme-400 via-theme-600 to-theme-500 blur-2xl opacity-60 animate-pulse" />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startIntro}
                      className="group relative flex flex-col items-center gap-4 bg-gradient-to-br from-theme-50 via-white to-theme-100 backdrop-blur-md border-2 border-theme-300 px-16 py-8 rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] shadow-theme-400/40 transition-all duration-500 hover:shadow-theme-500/60"
                    >
                      <span className="font-cinzel text-lg md:text-xl tracking-[0.6em] uppercase font-bold bg-gradient-to-r from-theme-700 via-theme-500 to-theme-900 bg-clip-text text-transparent drop-shadow-sm">
                        View Invitation
                      </span>
                      <div className="w-16 h-[2px] bg-gradient-to-r from-theme-400 via-theme-600 to-theme-400 group-hover:w-32 transition-all duration-500" />
                      <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-theme-600 animate-pulse bg-theme-100 px-4 py-1.5 rounded-full border border-theme-200">
                        Tap to Reveal
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Monogram with color accent */}
            <div className={`absolute top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <p className="font-cinzel text-[11px] tracking-[0.8em] font-bold uppercase flex flex-col items-center gap-3">
                <span className="bg-gradient-to-r from-pink-400 via-amber-400 to-sky-400 bg-clip-text text-transparent opacity-80">H & R</span>
                <span className="h-px w-8 bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
              </p>
            </div>

            {/* More corner flowers but with color overlay since we only have silver images */}
            <div className={`absolute top-0 left-0 w-44 h-44 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-20'}`}>
              <img src={flowerCornerImage} className="w-full h-full object-contain -rotate-90 sepia-[.3] hue-rotate-[320deg] saturate-[2]" alt="" />
            </div>
            <div className={`absolute top-0 right-0 w-44 h-44 pointer-events-none overflow-hidden transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-0' : 'opacity-20'}`}>
              <img src={flowerCornerImage} className="w-full h-full object-contain sepia-[.3] hue-rotate-[200deg] saturate-[2]" alt="" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border-2 border-theme-400/40 text-theme-800 hover:bg-theme-50 transition-all hover:scale-110"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Sticky Music Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={toggleMusic}
              className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border-2 border-theme-400/40 text-theme-800 hover:bg-theme-50 transition-all hover:scale-110"
            >
              {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>

            {/* Hero Section */}
            <section className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-transparent">
              {/* Background texture removed */}

              {/* Large Watermark Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-[40vw] text-theme-900 pointer-events-none whitespace-nowrap leading-none select-none z-0"
              >
                H&R
              </motion.div>

              {/* Central Premium Arch Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 w-full max-w-[420px] min-h-[500px] h-[85vh] md:h-[80vh] bg-[#ffffff] rounded-t-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-theme-100 flex flex-col items-center overflow-hidden p-6 pt-12 md:p-10 md:pt-16"
              >
                {/* Arch outline decoration */}
                <div className="absolute inset-3 sm:inset-5 border-[2px] border-theme-400/50 rounded-t-full pointer-events-none" />
                <div className="absolute inset-4 sm:inset-6 border-[1px] border-theme-200/40 rounded-t-full pointer-events-none" />

                {/* Top Circle Arch Floral Arrangement */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-auto z-20 pointer-events-none -translate-y-12">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    src={flowerArchImage}
                    alt=""
                    className="w-full h-auto object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.15)]"
                  />
                </div>

                <div className="mb-10" />

                <div className="flex flex-col items-center text-center space-y-4 flex-1 w-full relative z-10">
                  <div className="mb-4" />

                  <div className="space-y-0 py-4 flex-1 flex flex-col justify-center">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5rem] text-stone-800 leading-[1.1] drop-shadow-sm"
                    >
                      Hansi
                    </motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="font-playball text-3xl md:text-5xl text-theme-500 italic font-light my-2 md:my-4 tracking-widest"
                    >
                      &
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="font-playball text-[3rem] sm:text-[3.5rem] md:text-[5rem] text-stone-800 leading-[1.1] drop-shadow-sm"
                    >
                      Rajitha
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 1 }}
                      className="mt-6 md:mt-10"
                    >
                      <span className="inline-block text-[10px] md:text-[13px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-zinc-800 font-bold px-5 py-2 rounded-full bg-theme-100/40 border border-theme-200/30">
                        Please join us
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-auto pb-4 w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-70 w-full px-8">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-theme-300 to-theme-400" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                      <div className="h-px w-full bg-gradient-to-l from-transparent via-theme-300 to-theme-400" />
                    </div>
                    <div className="font-cinzel space-y-1">
                      <p className="text-sm md:text-base text-stone-700 tracking-[0.2em] md:tracking-[0.3em] font-bold">2026.08.01</p>
                      <p className="text-[8px] md:text-[9px] text-theme-600 tracking-[0.2em] uppercase font-bold">Ramadia Grand Hotel</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
              >
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-400 font-bold group-hover:text-theme-600 transition-colors">Begin</span>
                <div className="w-px h-10 md:h-12 relative overflow-hidden bg-stone-200">
                  <motion.div
                    animate={{ y: [-40, 60] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-8 bg-theme-500"
                  />
                </div>
              </motion.div>

            </section>

            {/* Wedding Details Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative">
              {/* section-floral-overlay removed */}

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent via-theme-400 to-transparent mb-8 md:mb-12 shadow-[0_0_10px_rgba(192,192,192,0.3)]" />
                  <p className="text-zinc-800 text-[10px] md:text-[14px] tracking-[0.6em] md:tracking-[0.8em] uppercase font-bold text-center leading-relaxed max-w-2xl px-4">
                    <span className="text-theme-500 block text-[8px] md:text-[10px] mb-3 md:mb-4 tracking-[0.8em]">Wedding Celebration</span>
                    You are cordially invited to<br className="hidden md:block" />
                    <span className="text-theme-600">celebrate the union of</span>
                  </p>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-theme-400 to-transparent mt-8 md:mt-10 shadow-[0_0_10px_rgba(192,192,192,0.3)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative mb-10 md:mb-14"
                >
                  <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] bg-theme-200/35 blur-xl" />
                  <div className="relative bg-white/90 p-2.5 md:p-3 rounded-[2rem] border border-theme-200 shadow-[0_20px_50px_-20px_rgba(75,85,99,0.45)]">
                    <InviteImage
                      src={brideGroomImage}
                      alt="Bride and groom wedding illustration"
                      loading="eager"
                      className="w-[200px] h-[240px] md:w-[270px] md:h-[320px] object-cover rounded-[1.6rem] border border-theme-100"
                    />
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Vishan's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-theme-300/70 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(192,192,192,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Beloved daughter of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. Rohitha Nanayakkara Liyanage<br />& Ms. Rupika Amarasinghe</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Hansi</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-500 to-theme-700 rounded-full flex items-center justify-center shadow-xl shadow-theme-900/20 border-4 border-[#fdfaf5]"
                    >
                      <span className="text-3xl md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Nathasha's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-theme-300/70 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(192,192,192,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">Beloved son of</p>
                        <p className="text-xs md:text-sm font-cinzel text-stone-600 tracking-wide leading-relaxed">Mr. Ajith Senaka<br />& Ms. Thalagalaacharige Renuka</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-800 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Rajitha</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-10 mt-4 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 text-center w-full max-w-4xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Date</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">2026.08.01</p>
                      <p className="font-cinzel text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">SATURDAY</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-3">The Time</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">10.30 a.m.</p>
                      <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">To 04.00 p.m.</p>
                    </div>
                  </div>

                  {/* Poruwa Ceremony Highlight */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 md:mt-24 pt-12 border-t border-theme-100/60 w-full max-w-[320px] md:max-w-xl flex flex-col items-center relative"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF] px-6">
                      <Sparkles className="w-6 h-6 text-theme-400" />
                    </div>

                    <div className="space-y-6 flex flex-col items-center w-full mt-2">
                      <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-stone-400 font-bold">Auspicious Ceremonies</p>

                      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full justify-center">
                        {/* Poruwa */}
                        <div className="flex flex-col items-center">
                          <h4 className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-[0.2em] font-bold drop-shadow-sm px-4 text-center mb-4">PORU CEREMONY</h4>
                          <p className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-theme-600 mb-2 font-bold">AT ROOF TOP</p>
                          <div className="flex items-center gap-4">
                            <div className="w-8 md:w-12 h-[1.5px] bg-gradient-to-r from-transparent to-theme-300" />
                            <p className="font-cinzel text-lg md:text-2xl text-theme-700 font-bold tracking-[0.2em]">10.30 am</p>
                            <div className="w-8 md:w-12 h-[1.5px] bg-gradient-to-l from-transparent to-theme-300" />
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-16 bg-theme-200" />
                        <div className="md:hidden h-px w-16 bg-theme-200" />

                        {/* Registration */}
                        <div className="flex flex-col items-center">
                          <h4 className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-[0.2em] font-bold drop-shadow-sm px-4 text-center mb-4">REGISTRATION</h4>
                          <div className="flex items-center gap-4">
                            <div className="w-8 md:w-12 h-[1.5px] bg-gradient-to-r from-transparent to-theme-300" />
                            <p className="font-cinzel text-lg md:text-2xl text-theme-700 font-bold tracking-[0.2em]">10.40 am</p>
                            <div className="w-8 md:w-12 h-[1.5px] bg-gradient-to-l from-transparent to-theme-300" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative element below */}
                    <div className="mt-10 flex items-center gap-2 opacity-30">
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-300" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-300" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>



            {/* Countdown Section */}
            <section className="cv-auto py-24 md:py-36 bg-white/60 backdrop-blur-sm relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden">
              {/* Premium Background Elements removed */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text removed */}

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-[2px] w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-500 shadow-[0_0_8px_rgba(192,192,192,0.4)]" />
                    <div className="w-2 h-2 rotate-45 bg-theme-600 shrink-0" />
                    <div className="h-[2px] w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-500 shadow-[0_0_8px_rgba(192,192,192,0.4)]" />
                  </div>

                  <h2 className="font-cinzel text-3xl md:text-5xl text-theme-900 mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    Wait for the <span className="font-playball text-theme-700 italic lowercase tracking-normal text-4xl md:text-7xl ml-2">magic</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 bg-white/40 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative Background removed */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-[2px] bg-theme-500 shadow-[0_0_8px_rgba(192,192,192,0.4)]" />
                        <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Venue</span>
                      </div>
                      <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        Ramadia Grand Hotel
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                          346/3 Old Galle Rd, Moratuwa 10400<br />
                          <span className="text-sm md:text-base text-theme-600 mt-2 block font-sans">Hall: Banquet 3 (Poru Ceremony at Roof Top)</span>
                        </p>
                      </div>

                      <div className="pl-8 space-y-4 pt-4 text-stone-500 text-sm md:text-base tracking-wide font-light leading-relaxed">
                        We look forward to welcoming you to this beautiful sanctuary to celebrate our special day amidst nature's elegance.
                      </div>
                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/Lx3P2k5CSZwXQfL6A', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-theme-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Get Directions
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group"
                  >
                    <div className="absolute inset-0 border border-theme-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Ramadia%20Grand%20Hotel,%20Moratuwa&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                        View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* RSVP Section */}
            <section className="cv-auto py-24 md:py-36 bg-black/60 backdrop-blur-md text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background removed */}
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-800 blur-[150px] rounded-full opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-900 blur-[150px] rounded-full opacity-40 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-theme-300 font-bold mb-6">Will You Join Us?</p>
                  <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-white mb-6 drop-shadow-md">RSVP</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-white" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-300" />
                  </div>
                  <p className="text-stone-300 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-16 tracking-wide font-light">
                    We would be absolutely thrilled to celebrate with you. Kindly RSVP at least two weeks in advance if you are unable to attend.<br /><br />
                    Contact No : <span className="font-bold text-white">0768793074 / 0763131295</span>
                  </p>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <form className="space-y-8 text-left" onSubmit={(e) => { e.preventDefault(); handleSubmit("rsvp", rsvpData); }}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={rsvpData.name}
                          onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Guests</label>
                        <div className="relative">
                          <select
                            value={rsvpData.guests}
                            onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide appearance-none cursor-pointer"
                          >
                            <option value="1" className="bg-[#18181B] text-white">1 Guest (Just Me)</option>
                            <option value="2" className="bg-[#18181B] text-white">2 Guests</option>
                            <option value="3" className="bg-[#18181B] text-white">3 Guests</option>
                            <option value="4" className="bg-[#18181B] text-white">4 Guests</option>
                            <option value="0" className="bg-[#18181B] text-theme-300">Regretfully Decline</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r border-b border-theme-300 rotate-45 transform -translate-y-[25%]" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Dietary Notes</label>
                        <input
                          type="text"
                          value={rsvpData.dietary}
                          onChange={(e) => setRsvpData({ ...rsvpData, dietary: e.target.value })}
                          placeholder="Allergies, Vegan, etc."
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="pt-10">
                        <button
                          disabled={isSubmitting}
                          className="w-full bg-theme-200 text-stone-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group inline-flex justify-center items-center gap-4"
                        >
                          {isSubmitting ? "Sending..." : (submitStatus === "rsvp_success" ? "Thank You!" : "Send RSVP")}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-white/40 backdrop-blur-sm">

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-100/50 mb-8 mt-4 shadow-sm border border-theme-200/50">
                      <Sparkles className="w-8 h-8 text-theme-500" />
                    </div>

                    <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-800 mb-6 drop-shadow-sm leading-none">Best Wishes</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-theme-400 to-transparent mb-8" />

                    <p className="text-stone-500 text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-light tracking-wide px-4">
                      Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a message, we would be delighted to read it!
                    </p>

                    {/* Premium Wishing Form */}
                    <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-theme-100/50 rounded-tr-[4rem] rounded-bl-[4rem] relative group">
                      {/* Decorative internal lines */}
                      <div className="absolute inset-2 md:inset-4 border-[0.5px] border-theme-200/50 rounded-tr-[3.5rem] rounded-bl-[3.5rem] pointer-events-none transition-colors duration-700 group-hover:border-theme-300/80" />

                      <form className="space-y-8 text-left relative z-10" onSubmit={(e) => { e.preventDefault(); handleSubmit("wish", wishData); }}>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Name</label>
                          <input
                            type="text"
                            required
                            value={wishData.name}
                            onChange={(e) => setWishData({ ...wishData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide rounded-t-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-stone-400 ml-2">Your Message</label>
                          <textarea
                            rows={4}
                            required
                            value={wishData.message}
                            onChange={(e) => setWishData({ ...wishData, message: e.target.value })}
                            placeholder="Wishing you a lifetime of happiness..."
                            className="w-full bg-stone-50/50 border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide resize-none rounded-t-lg"
                          />
                        </div>
                        <div className="pt-6 flex justify-center">
                          <button
                            disabled={isSubmitting}
                            className="bg-theme-800 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group/btn inline-flex items-center gap-4"
                          >
                            {isSubmitting ? "Sending..." : (submitStatus === "wish_success" ? "Wishes Sent!" : "Send Wishes")}
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="mt-32 md:mt-48 space-y-6 flex flex-col items-center relative w-full">
                      {/* Thank You watermark removed */}

                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-theme-600 font-bold relative z-10 bg-[#FFFFFF] px-6 py-2 rounded-full border border-theme-100/50 shadow-sm">With Love</p>
                      <h3 className="font-playball text-[3.2rem] sm:text-6xl md:text-8xl text-theme-900 relative z-10 drop-shadow-sm px-4 pt-4 leading-none">Hansi & Rajitha</h3>

                      <motion.img
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        whileInView={{ opacity: 0.9, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        src={flowerImage}
                        alt=""
                        className="relative z-10 mt-8 w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-[0_12px_24px_rgba(75,85,99,0.2)]"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-20 border-t border-theme-200/30 text-center relative z-10 space-y-6">
                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-stone-500 font-bold">
                  © 2026 Hansi & Rajitha. All rights reserved.
                </p>

                <div className="flex flex-col items-center gap-2 pt-8">
                  <a
                    href="https://wa.me/94707819074"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center"
                  >
                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold group-hover:text-theme-600 transition-colors">
                      Design by
                    </span>
                    <span className="font-playball text-2xl md:text-3xl text-theme-800 group-hover:scale-110 transition-transform duration-500">
                      invitemint
                    </span>
                    <span className="text-[9px] md:text-[11px] tracking-[0.2em] text-stone-400 font-medium mt-1">
                      +94 70 781 9074
                    </span>
                    <div className="w-8 h-px bg-theme-300 group-hover:w-20 transition-all duration-500 mt-2" />
                  </a>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-very {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-spin-slow-very {
          animation: spin-slow-very linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FFFFFF;
        }
        ::-webkit-scrollbar-thumb {
          background: #C0C0C0;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}
