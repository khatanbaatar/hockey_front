'use client';

import { useState } from 'react';

interface Team {
  id: number;
  rank: number;
  name: string;
  logo: string;
  mp: number; // Matches Played
  w: number;  // Wins
  d: number;  // Draws
  l: number;  // Losses
  gf: number; // Goals For
  ga: number; // Goals Against
  gd: number; // Goal Difference
  pts: number; // Points
  last5: ('W' | 'D' | 'L' | '')[]; // Last 5 matches results
}

interface Competition {
  id: number;
  name: string;
  season: string;
  standings: Array<{
    id: number;
    position: number;
    games_played: number;
    wins: number;
    draws: number;
    losses: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
    points: number;
    last_5_results: string[];
    team_name_mn: string;
    team_logo: string;
  }>;
}

interface LeagueTableProps {
  competitions?: Competition[];
}

const LeagueTable = ({ competitions: propCompetitions }: LeagueTableProps) => {
  const [season, setSeason] = useState('2025-26');
  const [activeCompetitionId, setActiveCompetitionId] = useState(1);

  // Use provided competitions or fallback to mock data
  const competitions = propCompetitions || [
    {
      id: 1,
      name: 'Монголын хоккейн аварга шалгаруулах тэмцээн',
      season: '2025-26',
      standings: []
    }
  ];

  // Get current competition standings
  const currentCompetition = competitions.find(comp => comp.id === activeCompetitionId) || competitions[0];
  const currentStandings = currentCompetition?.standings || [];

  // Mock hockey team data (fallback) - Mongolian teams
  const mockTeams: Team[] = [
    {
      id: 1, rank: 1, name: 'Хангарьд', logo: '🏒',
      mp: 15, w: 10, d: 3, l: 2, gf: 45, ga: 28, gd: 17, pts: 33,
      last5: ['W', 'W', 'D', 'W', 'W']
    },
    {
      id: 2, rank: 2, name: 'Бүргэд', logo: '🏒',
      mp: 15, w: 9, d: 4, l: 2, gf: 42, ga: 25, gd: 17, pts: 31,
      last5: ['W', 'W', 'D', 'D', 'W']
    },
    {
      id: 3, rank: 3, name: 'Алтан гадас', logo: '🏒',
      mp: 15, w: 8, d: 5, l: 2, gf: 38, ga: 30, gd: 8, pts: 29,
      last5: ['W', 'D', 'W', 'D', 'D']
    },
    {
      id: 4, rank: 4, name: 'Хүрэл мөнгөн', logo: '🏒',
      mp: 15, w: 7, d: 6, l: 2, gf: 35, ga: 32, gd: 3, pts: 27,
      last5: ['D', 'W', 'L', 'W', 'D']
    },
    {
      id: 5, rank: 5, name: 'Цагаан сар', logo: '🏒',
      mp: 15, w: 6, d: 4, l: 5, gf: 32, ga: 35, gd: -3, pts: 22,
      last5: ['L', 'W', 'D', 'L', 'W']
    },
  ];

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'W':
        return <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>;
      case 'L':
        return <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✗</span>
        </div>;
      case 'D':
        return <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">-</span>
        </div>;
      default:
        return <div className="w-4 h-4 bg-gray-200 rounded-full"></div>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Байрлалын хүснэгт</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Улирал:</span>
            <select 
              value={season} 
              onChange={(e) => setSeason(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="2025-26">2025-26</option>
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
            </select>
          </div>
        </div>
      </div>

      {/* Competition Tabs */}
      {competitions.length > 1 && (
        <div className="mb-6 px-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {competitions.map((competition) => (
                <button
                  key={competition.id}
                  onClick={() => setActiveCompetitionId(competition.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    competition.id === activeCompetitionId
                      ? 'border-indigo-500 text-indigo-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {competition.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Байр</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Баг</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ТТ</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Х</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Т</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Х</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ОГ</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">АГ</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ГЗ</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Оноо</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Сүүлийн 5</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStandings.length > 0 ? (
              currentStandings.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{team.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{team.team_logo}</span>
                      <span className="font-medium">{team.team_name_mn}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.games_played}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.wins}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.draws}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.losses}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.goals_for}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.goals_against}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.goal_difference}</td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-gray-900">{team.points}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex space-x-1 justify-center">
                      {team.last_5_results.map((result, index) => (
                        <div key={index}>
                          {getResultIcon(result)}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              mockTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{team.rank}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{team.logo}</span>
                      <span className="font-medium">{team.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.mp}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.w}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.d}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.l}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.gf}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.ga}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">{team.gd}</td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-gray-900">{team.pts}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex space-x-1 justify-center">
                      {team.last5.map((result, index) => (
                        <div key={index}>
                          {getResultIcon(result)}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Шалгаруулалт:</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500"></div>
              <span className="text-sm text-gray-600">Дараагийн шат</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500"></div>
              <span className="text-sm text-gray-600">Плей-офф</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Сүүлийн 5 тоглолт:</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-gray-600">Хожсон</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">-</span>
              </div>
              <span className="text-sm text-gray-600">Тэнцсэн</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
              <span className="text-sm text-gray-600">Хожигдсон</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
              <span className="text-sm text-gray-600">Тоглоогүй</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueTable;
