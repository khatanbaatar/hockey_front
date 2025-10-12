# Hockey Federation Database

Монголын хоккейн холбооны мэдээллийн сангийн бүтэц

## Database Structure

### Tables Created:

1. **teams** - Хоккейн багуудын мэдээлэл
2. **players** - Тоглогчдын мэдээлэл
3. **competitions** - Тэмцээнүүдийн мэдээлэл
4. **matches** - Тоглолтын мэдээлэл
5. **match_statistics** - Тоглолтын статистик

## Setup Instructions

### 1. Create Database
```sql
CREATE DATABASE hockey_federation;
USE hockey_federation;
```

### 2. Run Schema
```bash
mysql -u username -p hockey_federation < schema.sql
```

### 3. Insert Data
```bash
mysql -u username -p hockey_federation < insert_data.sql
```

## Sample Data Included

### Teams (5 teams):
- Хангарьд (Hangard)
- Бүргэд (Burged)
- Алтан гадас (Altan Gadas)
- Хүрэл мөнгөн (Khürel Möngön)
- Цагаан сар (Tsagaan Sar)

### Players (20 players):
- 4 players per team
- Various positions: Forward, Defender, Goalkeeper, Midfielder
- Complete statistics: goals, assists, points, etc.

### Competitions (3 competitions):
- Монголын хоккейн аварга шалгаруулах тэмцээн
- Үндэсний лиг
- Хаваргийн кубок

### Matches (8 completed matches):
- Sample match results
- Team statistics updates

## Key Features

- **Multi-language support** (Mongolian/English)
- **Complete player statistics** (goals, assists, points, etc.)
- **Team standings** with win/loss records
- **Match tracking** with detailed results
- **Performance analytics** queries included

## Query Examples

See `queries.sql` for comprehensive query examples including:
- Team standings
- Player statistics
- Top scorers
- Match results
- Performance analytics

## API Integration

This database structure supports the API endpoints:
- `/api/page/statistics-team-player-stats`
- `/api/page/statistics-competition-results`

## Notes

- All player names are in Mongolian
- Statistics are realistic for hockey players
- Database includes proper foreign key relationships
- Indexes added for performance optimization
