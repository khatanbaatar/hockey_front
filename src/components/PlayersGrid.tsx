'use client';

import { Player } from '@/types';

interface PlayersGridProps {
  players?: Player[];
}

const PlayersGrid = ({ players: propPlayers }: PlayersGridProps) => {
  // Use provided players or fallback to mock data
  const players: Player[] = propPlayers || [
    {
      id: 1,
      name: "Батбаяр Батбат",
      position: "Forward",
      club: "Хангарьд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Энхбаяр Мөнхбат",
      position: "Goalkeeper",
      club: "Бүргэд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Төмөрбаатар Төмөр",
      position: "Defender",
      club: "Алтан гадас",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Ганбаатар Ганзориг",
      position: "Forward",
      club: "Хүрэл мөнгөн",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Мөнхбаатар Мөнхбат",
      position: "Midfielder",
      club: "Цагаан сар",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Батбаатар Батбат",
      position: "Defender",
      club: "Хангарьд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Энхбаатар Энхбат",
      position: "Forward",
      club: "Бүргэд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Төмөрбаатар Төмөр",
      position: "Goalkeeper",
      club: "Алтан гадас",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 9,
      name: "Ганбаатар Ганзориг",
      position: "Defender",
      club: "Хүрэл мөнгөн",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 10,
      name: "Мөнхбаатар Мөнхбат",
      position: "Forward",
      club: "Цагаан сар",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 11,
      name: "Батбаатар Батбат",
      position: "Midfielder",
      club: "Хангарьд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 12,
      name: "Энхбаатар Энхбат",
      position: "Defender",
      club: "Бүргэд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 13,
      name: "Төмөрбаатар Төмөр",
      position: "Forward",
      club: "Алтан гадас",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 14,
      name: "Ганбаатар Ганзориг",
      position: "Goalkeeper",
      club: "Хүрэл мөнгөн",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 15,
      name: "Мөнхбаатар Мөнхбат",
      position: "Defender",
      club: "Цагаан сар",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 16,
      name: "Батбаатар Батбат",
      position: "Forward",
      club: "Хангарьд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 17,
      name: "Энхбаатар Энхбат",
      position: "Midfielder",
      club: "Бүргэд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 18,
      name: "Төмөрбаатар Төмөр",
      position: "Defender",
      club: "Алтан гадас",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 19,
      name: "Ганбаатар Ганзориг",
      position: "Forward",
      club: "Хүрэл мөнгөн",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 20,
      name: "Мөнхбаатар Мөнхбат",
      position: "Goalkeeper",
      club: "Цагаан сар",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 21,
      name: "Батбаатар Батбат",
      position: "Defender",
      club: "Хангарьд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 22,
      name: "Энхбаатар Энхбат",
      position: "Forward",
      club: "Бүргэд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 23,
      name: "Төмөрбаатар Төмөр",
      position: "Midfielder",
      club: "Алтан гадас",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 24,
      name: "Ганбаатар Ганзориг",
      position: "Defender",
      club: "Хүрэл мөнгөн",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 25,
      name: "Мөнхбаатар Мөнхбат",
      position: "Forward",
      club: "Цагаан сар",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 26,
      name: "Батбаатар Батбат",
      position: "Goalkeeper",
      club: "Хангарьд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 27,
      name: "Энхбаатар Энхбат",
      position: "Defender",
      club: "Бүргэд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 28,
      name: "Төмөрбаатар Төмөр",
      position: "Forward",
      club: "Алтан гадас",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 29,
      name: "Ганбаатар Ганзориг",
      position: "Midfielder",
      club: "Хүрэл мөнгөн",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 30,
      name: "Мөнхбаатар Мөнхбат",
      position: "Defender",
      club: "Цагаан сар",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 31,
      name: "Батбаатар Батбат",
      position: "Forward",
      club: "Хангарьд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 32,
      name: "Энхбаатар Энхбат",
      position: "Goalkeeper",
      club: "Бүргэд",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 33,
      name: "Төмөрбаатар Төмөр",
      position: "Defender",
      club: "Алтан гадас",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 34,
      name: "Ганбаатар Ганзориг",
      position: "Forward",
      club: "Хүрэл мөнгөн",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face"
    },
    {
      id: 35,
      name: "Мөнхбаатар Мөнхбат",
      position: "Midfielder",
      club: "Цагаан сар",
      clubLogo: "🏒",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Players</h2>
        <p className="text-gray-600">Монголын хоккейн тамирчдын мэдээлэл</p>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {players.map((player) => (
          <div 
            key={player.id} 
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            {/* Player Photo */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={player.photo}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Player Info */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                {player.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {player.position}
              </p>
              
              {/* Club Info */}
              <div className="flex items-center space-x-2">
                <span className="text-lg">{player.clubLogo}</span>
                <span className="text-sm text-gray-500 truncate">
                  {player.club}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Total Players</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{players.length}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Positions</h3>
          <div className="flex justify-center space-x-4 mt-2">
            <div className="text-center">
              <p className="text-sm text-gray-600">Forward</p>
              <p className="text-xl font-bold text-green-600">
                {players.filter(p => p.position === 'Forward').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Defender</p>
              <p className="text-xl font-bold text-blue-600">
                {players.filter(p => p.position === 'Defender').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Goalkeeper</p>
              <p className="text-xl font-bold text-red-600">
                {players.filter(p => p.position === 'Goalkeeper').length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Midfielder</p>
              <p className="text-xl font-bold text-purple-600">
                {players.filter(p => p.position === 'Midfielder').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Clubs</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">
            {new Set(players.map(p => p.club)).size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayersGrid;
