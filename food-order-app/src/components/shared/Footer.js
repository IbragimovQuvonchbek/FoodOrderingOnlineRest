export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-display font-bold text-gold-500 mb-4">
              GOLDEN <span className="text-gold-300">BURGER</span>
            </h3>
            <p className="text-gold-300">
              Premium burgers with the golden touch
            </p>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold text-gold-400 mb-4">Contact Us</h4>
            <address className="text-gold-300 not-italic">
              <p>Uzbekistan, Tashkent, Sergili, 6a, 6</p>
              <p className="mt-1">quvonchbek.ibragimov@gmail.com</p>
              <p className="mt-1">+998914021601</p>
            </address>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold text-gold-400 mb-4">Opening Hours</h4>
            <div className="text-gold-300">
              <p>Monday - Friday: 10:00 - 22:00</p>
              <p className="mt-1">Saturday - Sunday: 11:00 - 23:00</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gold-500/10 text-center text-gold-400">
          <p>&copy; {new Date().getFullYear()} Golden Burger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}