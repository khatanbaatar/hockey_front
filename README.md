# Монгол улсын хоккейн холбооны вэб сайт

Энэ төсөл нь Next.js, TypeScript, Tailwind CSS ашиглан хийгдсэн Монгол улсын хоккейн холбооны танилцуулга вэб сайт юм.

## Онцлогууд

- **Бүрэн responsive дизайн** - Бүх төхөөрөмж дээр сайн харагддаг
- **Dynamic menu system** - Цэсүүд серверээс авдаг
- **Server-side content** - Хуудасны агуулга серверээс авдаг
- **Mongolian language support** - Монгол хэл дэмжих
- **Modern UI/UX** - Орчин үеийн хэрэглэгчийн интерфейс
- **SEO optimized** - Хайлтын системд оновчтой
- **Fast loading** - Хурдан ачаалах

## Технологи

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **App Router** - Next.js 13+ routing system
- **Server Components** - Server-side rendering

## Суулгах заавар

1. Dependencies суулгах:
```bash
npm install
```

2. Development server эхлүүлэх:
```bash
npm run dev
```

3. Браузераар нээх:
```
http://localhost:3000
```

## Цэсний бүтэц

### Үндсэн цэсүүд:
1. **Бүтэц зохион байгуулалт** - Холбооны бүтэц, албан тушаал
2. **Дэд бүтэц** - Спортын талбай, заал, техник хэрэгсэл
3. **Сургалт, семинар** - 8 дэд ангилал (зөвлөгч, шүүгч, хүүхэд, залуучууд, клуб, холбоо, боловсрол, олон улсын)
4. **Багууд** - Баг, клубын жагсаалт, холбоо барих мэдээлэл
5. **Галерей** - Зураг, бичлэгийн цуглуулга
6. **Тэмцээний төлөвлөгөө** - Жилийн хуанли, тэмцээний дэлгэрэнгүй
7. **Шүүгчид** - Шүүгчдийн профайл, мэргэжлийн чадвар
8. **Дүрэм журам** - Холбооны дүрэм, хоккейн дүрэм
9. **Статистик** - Тэмцээний үр дүн, баг, тоглогчдын статистик
10. **ХАБ** - Аюулгүй ажиллагааны зааварчилгаа, эрүүл мэнд
11. **Үндэсний шигшээ баг** - Үндэсний багийн бүрэлдэхүүн, тэмцээн, шагнал
12. **Түүхэн замнал** - Холбооны түүх, цаг хугацааны дараалал

## API Endpoints

### Menu API
- `GET /api/menu` - Цэсний мэдээлэл авах

### Page Content API
- `GET /api/pages/[slug]` - Хуудасны агуулга авах

## Файлын бүтэц

```
src/
├── app/
│   ├── api/
│   │   ├── menu/
│   │   │   └── route.ts
│   │   └── pages/
│   │       └── [slug]/
│   │           └── route.ts
│   ├── [slug]/
│   │   ├── page.tsx
│   │   └── [subSlug]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Breadcrumb.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   └── PageContent.tsx
└── types/
    └── index.ts
```

## Хөгжүүлэлт

### Шинэ хуудас нэмэх:
1. `src/app/api/pages/[slug]/route.ts` файлд шинэ агуулга нэмэх
2. `src/app/[slug]/page.tsx` файлд static params нэмэх
3. `src/components/PageContent.tsx` файлд breadcrumb mapping нэмэх

### Цэс нэмэх:
1. `src/app/api/menu/route.ts` файлд шинэ цэс нэмэх
2. `src/components/Header.tsx` файлд цэсний харагдах байдлыг тохируулах

## Production build

```bash
npm run build
npm start
```

## Лиценз

MIT License