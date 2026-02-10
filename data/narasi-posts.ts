export interface NarasiPost {
  id: string
  title: string
  author: string
  authorRole: string
  location: string
  date: string
  shortDescription: string
  content: string
  mediaType: 'video' | 'audio' | 'text' | 'image'
  mediaUrl?: string
  thumbnail: string
  tags: string[]
  featured?: boolean
}

export const narasiPosts: NarasiPost[] = [
  {
    id: '1',
    title: 'Perjalanan Menjadi Pemimpin Restorasi Mangrove',
    author: 'Ibu Siti Aminah',
    authorRole: 'Ketua Kelompok Perempuan Pesisir',
    location: 'Brebes, Jawa Tengah',
    date: '2024-01-15',
    shortDescription: 'Cerita inspiratif tentang bagaimana seorang ibu rumah tangga menjadi pelopor restorasi mangrove di desanya.',
    content: 'Dulu saya hanya seorang ibu rumah tangga biasa yang melihat pantai kampung saya semakin terkikis abrasi. Suami saya seorang nelayan, dan hasil tangkapannya semakin menurun. Saya mulai belajar tentang mangrove dari penyuluh dan memutuskan untuk mengajak ibu-ibu lain. Awalnya hanya 5 orang, sekarang kami sudah 50 anggota. Kami tidak hanya menanam mangrove, tapi juga membuat produk olahan dari buah mangrove untuk menambah penghasilan keluarga.',
    mediaType: 'video',
    mediaUrl: 'https://example.com/video1.mp4',
    thumbnail: 'https://placehold.co/800x600/2d5016/white?text=Ibu+Siti+Mangrove',
    tags: ['Inspirasi', 'Kepemimpinan', 'Pemberdayaan'],
    featured: true
  },
  {
    id: '2',
    title: 'Suara Alam: Rekaman Hutan Mangrove Pagi Hari',
    author: 'Rina Wijaya',
    authorRole: 'Aktivis Lingkungan',
    location: 'Surabaya, Jawa Timur',
    date: '2024-01-10',
    shortDescription: 'Dengarkan keindahan suara alami hutan mangrove di pagi hari yang menenangkan.',
    content: 'Saya merekam suara hutan mangrove Wonorejo di pagi hari. Terdengar kicauan burung, deburan ombak, dan angin yang berhembus di antara daun mangrove. Ini adalah bukti bahwa ekosistem mangrove kami sudah pulih dan menjadi rumah bagi banyak satwa. Semoga rekaman ini bisa menginspirasi lebih banyak orang untuk menjaga mangrove.',
    mediaType: 'audio',
    mediaUrl: 'https://example.com/audio1.mp3',
    thumbnail: 'https://placehold.co/800x600/1a4d2e/white?text=Suara+Mangrove',
    tags: ['Alam', 'Relaksasi', 'Konservasi'],
    featured: true
  },
  {
    id: '3',
    title: 'Dari Sampah Menjadi Berkah: Inovasi Kerajinan Mangrove',
    author: 'Maya Kusuma',
    authorRole: 'Pengrajin Lokal',
    location: 'Jakarta Utara, DKI Jakarta',
    date: '2024-01-05',
    shortDescription: 'Bagaimana kelompok perempuan mengubah kayu mangrove mati menjadi kerajinan bernilai ekonomi.',
    content: 'Kami memanfaatkan kayu mangrove yang mati secara alami untuk dijadikan kerajinan tangan seperti tempat pensil, bingkai foto, dan hiasan dinding. Ini memberi penghasilan tambahan sekaligus mengajarkan masyarakat untuk tidak menebang mangrove yang hidup. Workshop kami juga terbuka untuk wisatawan yang ingin belajar.',
    mediaType: 'image',
    thumbnail: 'https://placehold.co/800x600/0f3d2c/white?text=Kerajinan+Mangrove',
    tags: ['Ekonomi Kreatif', 'Inovasi', 'Sustainable'],
    featured: false
  },
  {
    id: '4',
    title: 'Dokumenter: 100 Hari Restorasi Mangrove Tarakan',
    author: 'Tim Konservasi Tarakan',
    authorRole: 'Relawan Lingkungan',
    location: 'Tarakan, Kalimantan Utara',
    date: '2023-12-28',
    shortDescription: 'Video dokumenter perjalanan 100 hari pertama restorasi mangrove di Tarakan.',
    content: 'Dokumenter singkat ini merekam perjalanan 100 hari pertama program restorasi mangrove di Tarakan. Dari pembibitan, penanaman, hingga monitoring. Melibatkan 200+ relawan termasuk ibu-ibu pesisir, pelajar, dan pegawai pemerintah. Tantangan terbesar adalah cuaca ekstrem dan hama, tapi tingkat keberhasilan kami mencapai 80%.',
    mediaType: 'video',
    mediaUrl: 'https://example.com/video2.mp4',
    thumbnail: 'https://placehold.co/800x600/1e5631/white?text=Dokumenter+Tarakan',
    tags: ['Dokumenter', 'Restorasi', 'Komunitas'],
    featured: true
  },
  {
    id: '5',
    title: 'Cerita Survivor Tsunami: Mangrove Penyelamat Hidup',
    author: 'Fitri Rahmawati',
    authorRole: 'Survivor Tsunami 2004',
    location: 'Aceh Besar, Aceh',
    date: '2023-12-20',
    shortDescription: 'Kesaksian langsung bagaimana hutan mangrove mengurangi dampak tsunami.',
    content: 'Saya adalah survivor tsunami 2004. Desa kami yang memiliki hutan mangrove lebat mengalami kerusakan lebih sedikit dibanding desa tetangga. Sejak itu, saya berkomitmen menanam dan merawat mangrove. Bukan hanya untuk lingkungan, tapi juga untuk melindungi anak cucu kami dari bencana serupa.',
    mediaType: 'audio',
    mediaUrl: 'https://example.com/audio2.mp3',
    thumbnail: 'https://placehold.co/800x600/2a4d2e/white?text=Survivor+Tsunami',
    tags: ['Kesaksian', 'Mitigasi Bencana', 'Inspirasi'],
    featured: false
  },
  {
    id: '6',
    title: 'Generasi Muda Peduli Mangrove',
    author: 'Komunitas Mangrove Muda Indonesia',
    authorRole: 'Aktivis Muda',
    location: 'Bali',
    date: '2023-12-15',
    shortDescription: 'Aksi nyata generasi muda dalam melestarikan ekosistem mangrove.',
    content: 'Kami adalah komunitas anak muda yang peduli mangrove. Setiap bulan kami mengadakan aksi tanam mangrove dan beach clean up. Kami juga aktif di media sosial untuk edukasi pentingnya mangrove. Target kami menanam 10.000 bibit di tahun ini. Mari bergabung!',
    mediaType: 'image',
    thumbnail: 'https://placehold.co/800x600/2d5016/white?text=Generasi+Muda',
    tags: ['Youth', 'Aksi Nyata', 'Edukasi'],
    featured: false
  },
  {
    id: '7',
    title: 'Meditasi di Hutan Mangrove: Healing Journey',
    author: 'Dian Purnama',
    authorRole: 'Instruktur Yoga & Meditasi',
    location: 'Bali',
    date: '2023-12-10',
    shortDescription: 'Pengalaman spiritual healing di tengah hutan mangrove yang asri.',
    content: 'Saya mengadakan sesi meditasi dan yoga di hutan mangrove. Energi positif dari alam, suara angin, dan air menciptakan pengalaman spiritual yang luar biasa. Peserta tidak hanya mendapat ketenangan, tapi juga awareness tentang pentingnya menjaga alam. Ini win-win solution untuk kesehatan mental dan lingkungan.',
    mediaType: 'video',
    mediaUrl: 'https://example.com/video3.mp4',
    thumbnail: 'https://placehold.co/800x600/1a4d2e/white?text=Meditasi+Mangrove',
    tags: ['Wellness', 'Spiritual', 'Eco-therapy'],
    featured: false
  },
  {
    id: '8',
    title: 'Resep Kuliner: Olahan Buah Mangrove yang Lezat',
    author: 'Chef Nurul',
    authorRole: 'Chef & Food Blogger',
    location: 'Surabaya, Jawa Timur',
    date: '2023-12-05',
    shortDescription: 'Berbagai kreasi kuliner dari buah mangrove yang bergizi dan lezat.',
    content: 'Buah mangrove ternyata bisa diolah menjadi berbagai makanan lezat! Saya berbagi resep sirup mangrove, dodol, keripik, hingga kue kering. Selain enak, buah mangrove kaya antioksidan. Dengan mengolah buah mangrove, kita memberi nilai ekonomi pada ekosistem mangrove sehingga masyarakat tergerak untuk melestarikannya.',
    mediaType: 'image',
    thumbnail: 'https://placehold.co/800x600/0f3d2c/white?text=Kuliner+Mangrove',
    tags: ['Kuliner', 'Ekonomi', 'Kreatif'],
    featured: false
  }
]
