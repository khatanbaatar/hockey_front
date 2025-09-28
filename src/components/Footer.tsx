export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Хоккейн холбоо</h3>
            <p className="text-gray-300 text-sm">
              Монгол улсын хоккейн спортын хөгжүүлэлт, тэмцээн зохион байгуулалт, 
              мэргэжлийн хөгжүүлэлтийг дэмжих зорилготой.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Холбоо барих</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Утас: +976 11 123456</p>
              <p>Имэйл: info@hockey.mn</p>
              <p>Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Сошиал сүлжээ</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                YouTube
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 Монгол улсын хоккейн холбоо. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
