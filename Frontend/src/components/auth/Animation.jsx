import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

function Animation() {
  // 1. ตั้งค่า Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. สร้างค่า Spring เพื่อให้การเคลื่อนไหวนุ่มนวล (ไม่กระตุก)
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  // ฟังก์ชันคำนวณตำแหน่งเมาส์
  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;

    mouseX.set(mouseXPos / width - 0.5);
    mouseY.set(mouseYPos / height - 0.5);
  }

  // ฟังก์ชันรีเซ็ตตำแหน่งเมื่อเมาส์ออก
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-[#050505] flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }} // เพิ่มมิติความลึกให้การหมุน 3D
    >
      {/* Background Animated Elements (เหมือนเดิม) */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 1.1, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl px-4"
      >
        {/* Container รูปภาพที่ขยับตามเมาส์ */}
        <motion.div
          style={{ rotateX, rotateY }} // ใส่ค่าการหมุนที่คำนวณได้
          className="relative group"
        >
          {/* แสง Aura ที่จะสว่างขึ้นเมื่อ Hover */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-xl blur-2xl opacity-10 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>

          <img
            src="https://asia-th.onepiece-cardgame.com/renewal/images/top/mv/op13/mv.webp"
            className="relative rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] w-full object-contain border border-white/10"
            alt="One Piece Card Game"
          />

          {/* แสงเงาสะท้อนบนผิวหน้าการ์ด (Glare Effect) */}
          <motion.div
            style={{
              backgroundImage: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 80%)',
              translateX: useTransform(mouseX, [-0.5, 0.5], [-100, 100]),
              opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.5])
            }}
            className="absolute inset-0 rounded-lg pointer-events-none"
          />
        </motion.div>

        {/* Text Section (เหมือนเดิม) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 text-center"
        >
          <h1 className="text-white text-2xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
          </h1>
          <p className="text-blue-400/60 mt-4 tracking-[0.4em] uppercase text-xs font-bold px-4 py-1 border-x border-blue-400/30 inline-block">
            One Piece Card Game
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}


export default Animation