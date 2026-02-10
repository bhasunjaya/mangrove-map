export interface MangrovePractice {
  id: string
  namaPraktik: string
  lokasi: {
    gps: {
      lat: number
      lng: number
    }
    desa: string
    kabupaten: string
    provinsi: string
  }
  tahunPelaksanaan: number
  status: 'berjalan' | 'selesai'
  peranPerempuan: Array<'inisiator' | 'pemimpin komunitas' | 'pelaksana lapangan'>
  ringkasan: string
  deskripsi: string
  dampak: string
  fotoUtama: string
  mediaPendukung: {
    foto: string[]
    video: string[]
    audio: string[]
    dokumen: string[]
  }
}

export const mangrovePractices: MangrovePractice[] = [
  {
    id: '1',
    namaPraktik: 'Restorasi Mangrove Pantai Utara Brebes',
    lokasi: {
      gps: { lat: -6.8884, lng: 108.9947 },
      desa: 'Sawojajar',
      kabupaten: 'Brebes',
      provinsi: 'Jawa Tengah'
    },
    tahunPelaksanaan: 2020,
    status: 'berjalan',
    peranPerempuan: ['inisiator', 'pelaksana lapangan'],
    ringkasan: 'Program restorasi mangrove yang melibatkan ibu-ibu nelayan lokal dalam penanaman dan pemeliharaan 10 hektar lahan mangrove.',
    deskripsi: 'Program restorasi mangrove di Pantai Utara Brebes dimulai pada tahun 2020 sebagai upaya untuk mengembalikan ekosistem pesisir yang telah rusak akibat abrasi dan konversi lahan. Kelompok perempuan nelayan mengambil peran penting dalam inisiasi dan pelaksanaan program. Mereka tidak hanya terlibat dalam penanaman bibit mangrove, tetapi juga dalam pembibitan, monitoring pertumbuhan, dan edukasi masyarakat. Program ini berhasil menanam lebih dari 50.000 bibit mangrove dengan tingkat survival rate mencapai 75%.',
    dampak: 'Program ini menghasilkan dampak positif yang signifikan, termasuk: (1) Pengurangan abrasi pantai hingga 60%, (2) Peningkatan populasi ikan dan kepiting sebesar 45%, (3) Pemberdayaan ekonomi 50 perempuan nelayan melalui ekowisata mangrove, (4) Peningkatan kesadaran lingkungan masyarakat pesisir, (5) Penciptaan zona penyangga alami untuk pemukiman penduduk.',
    fotoUtama: 'https://placehold.co/800x600/2d5016/white?text=Restorasi+Mangrove+Brebes',
    mediaPendukung: {
      foto: [
        'https://placehold.co/600x400/2d5016/white?text=Penanaman+Bibit',
        'https://placehold.co/600x400/2d5016/white?text=Kelompok+Perempuan',
        'https://placehold.co/600x400/2d5016/white?text=Hasil+Restorasi'
      ],
      video: ['video-penanaman-brebes.mp4'],
      audio: ['wawancara-ibu-siti.mp3'],
      dokumen: ['laporan-monitoring-2023.pdf', 'proposal-program.pdf']
    }
  },
  {
    id: '2',
    namaPraktik: 'Konservasi Mangrove Teluk Jakarta',
    lokasi: {
      gps: { lat: -6.1043, lng: 106.8972 },
      desa: 'Muara Angke',
      kabupaten: 'Jakarta Utara',
      provinsi: 'DKI Jakarta'
    },
    tahunPelaksanaan: 2018,
    status: 'selesai',
    peranPerempuan: ['pemimpin komunitas', 'pelaksana lapangan'],
    ringkasan: 'Konservasi dan rehabilitasi hutan mangrove seluas 8 hektar di kawasan Teluk Jakarta dengan melibatkan komunitas lokal.',
    deskripsi: 'Program konservasi mangrove di Teluk Jakarta merupakan kolaborasi antara komunitas pesisir, pemerintah daerah, dan LSM lingkungan. Perempuan lokal mengambil peran kepemimpinan dalam mengorganisir kegiatan penanaman rutin setiap bulan dan mengelola program eduwisata mangrove. Program ini juga mengintegrasikan sistem pengelolaan sampah dan pembersihan area pesisir. Dengan pendekatan partisipatif, program berhasil merestorasi area yang sebelumnya terdegradasi menjadi hutan mangrove yang produktif.',
    dampak: 'Dampak program mencakup: (1) Restorasi 8 hektar kawasan mangrove dengan 40.000 pohon, (2) Pengembangan ekowisata yang menghasilkan pendapatan tambahan untuk 35 keluarga, (3) Pengurangan pencemaran air laut melalui program bersih pantai, (4) Peningkatan biodiversitas burung dan biota laut, (5) Menjadi model restorasi mangrove perkotaan untuk kawasan lain.',
    fotoUtama: 'https://placehold.co/800x600/1a4d2e/white?text=Konservasi+Mangrove+Jakarta',
    mediaPendukung: {
      foto: [
        'https://placehold.co/600x400/1a4d2e/white?text=Hutan+Mangrove',
        'https://placehold.co/600x400/1a4d2e/white?text=Eduwisata',
        'https://placehold.co/600x400/1a4d2e/white?text=Komunitas'
      ],
      video: ['dokumentasi-konservasi-jakarta.mp4', 'testimoni-peserta.mp4'],
      audio: [],
      dokumen: ['laporan-akhir-program.pdf']
    }
  },
  {
    id: '3',
    namaPraktik: 'Pembibitan Mangrove Berbasis Komunitas Surabaya',
    lokasi: {
      gps: { lat: -7.3121, lng: 112.7391 },
      desa: 'Wonorejo',
      kabupaten: 'Surabaya',
      provinsi: 'Jawa Timur'
    },
    tahunPelaksanaan: 2019,
    status: 'berjalan',
    peranPerempuan: ['inisiator', 'pemimpin komunitas', 'pelaksana lapangan'],
    ringkasan: 'Pembangunan nursery mangrove dan program penanaman berkelanjutan yang dipimpin oleh kelompok perempuan pesisir.',
    deskripsi: 'Program ini dimulai dengan inisiatif kelompok perempuan pesisir Wonorejo yang prihatin dengan degradasi hutan mangrove di wilayah mereka. Mereka membangun nursery komunitas untuk memproduksi bibit mangrove berkualitas. Program berkembang menjadi pusat pembelajaran ekologi mangrove bagi sekolah-sekolah dan masyarakat umum. Perempuan-perempuan ini juga mengembangkan produk olahan hasil mangrove seperti sirup, dodol, dan keripik dari buah mangrove yang memberikan nilai ekonomi tambahan.',
    dampak: 'Program menghasilkan: (1) Produksi 100.000 bibit mangrove per tahun, (2) Penanaman 12 hektar area baru, (3) Pemberdayaan ekonomi 40 perempuan melalui produk olahan mangrove, (4) Edukasi lingkungan untuk 2.000+ pelajar per tahun, (5) Pengembangan model pembibitan yang diadopsi daerah lain.',
    fotoUtama: 'https://placehold.co/800x600/0f3d2c/white?text=Pembibitan+Mangrove+Surabaya',
    mediaPendukung: {
      foto: [
        'https://placehold.co/600x400/0f3d2c/white?text=Nursery+Mangrove',
        'https://placehold.co/600x400/0f3d2c/white?text=Produk+Olahan',
        'https://placehold.co/600x400/0f3d2c/white?text=Edukasi+Siswa'
      ],
      video: ['proses-pembibitan.mp4'],
      audio: ['podcast-kisah-sukses.mp3'],
      dokumen: ['panduan-pembibitan.pdf', 'katalog-produk.pdf']
    }
  },
  {
    id: '4',
    namaPraktik: 'Restorasi Ekosistem Mangrove Tarakan',
    lokasi: {
      gps: { lat: 3.3000, lng: 117.6333 },
      desa: 'Mamburungan',
      kabupaten: 'Tarakan',
      provinsi: 'Kalimantan Utara'
    },
    tahunPelaksanaan: 2021,
    status: 'berjalan',
    peranPerempuan: ['pelaksana lapangan'],
    ringkasan: 'Program restorasi ekosistem mangrove untuk melindungi biodiversitas dan mata pencaharian masyarakat pesisir.',
    deskripsi: 'Restorasi mangrove di Tarakan fokus pada pemulihan ekosistem yang mendukung keanekaragaman hayati dan ekonomi lokal. Program melibatkan perempuan pesisir dalam kegiatan penanaman, monitoring, dan pengelolaan area konservasi. Pendekatan silvofishery diintegrasikan untuk memberikan manfaat ekonomi langsung kepada masyarakat sambil tetap menjaga kelestarian mangrove. Program juga mengembangkan sistem monitoring berbasis aplikasi mobile untuk tracking pertumbuhan mangrove.',
    dampak: 'Hasil program meliputi: (1) Restorasi 15 hektar hutan mangrove, (2) Peningkatan hasil tangkapan ikan nelayan sebesar 40%, (3) Pengembangan tambak silvofishery untuk 25 keluarga, (4) Perlindungan habitat bekantan dan burung air, (5) Implementasi sistem monitoring digital pertama di kawasan.',
    fotoUtama: 'https://placehold.co/800x600/1e5631/white?text=Restorasi+Mangrove+Tarakan',
    mediaPendukung: {
      foto: [
        'https://placehold.co/600x400/1e5631/white?text=Area+Restorasi',
        'https://placehold.co/600x400/1e5631/white?text=Silvofishery',
        'https://placehold.co/600x400/1e5631/white?text=Monitoring'
      ],
      video: ['drone-footage-tarakan.mp4'],
      audio: [],
      dokumen: ['technical-report.pdf', 'monitoring-data.pdf']
    }
  },
  {
    id: '5',
    namaPraktik: 'Mangrove untuk Mitigasi Bencana Aceh',
    lokasi: {
      gps: { lat: 5.5483, lng: 95.3238 },
      desa: 'Lhoknga',
      kabupaten: 'Aceh Besar',
      provinsi: 'Aceh'
    },
    tahunPelaksanaan: 2017,
    status: 'selesai',
    peranPerempuan: ['inisiator', 'pemimpin komunitas'],
    ringkasan: 'Penanaman mangrove sebagai sabuk hijau untuk mitigasi tsunami dan gelombang tinggi di pesisir Aceh.',
    deskripsi: 'Pasca tsunami 2004, masyarakat Aceh memahami pentingnya mangrove sebagai pelindung alami. Program ini diprakarsai oleh kelompok perempuan survivor tsunami yang ingin melindungi generasi mendatang. Mereka memimpin penanaman mangrove di sepanjang 5 km garis pantai, menciptakan sabuk hijau yang kokoh. Program juga mencakup pembangunan jalur evakuasi dan pusat informasi kebencanaan. Perempuan-perempuan ini menjadi champion dalam advokasi kebijakan mitigasi bencana berbasis ekosistem.',
    dampak: 'Program memberikan dampak: (1) Pembangunan sabuk mangrove sepanjang 5 km, (2) Penanaman 60.000 pohon mangrove, (3) Reduksi energi gelombang hingga 70%, (4) Pembangunan 3 jalur evakuasi terintegrasi, (5) Model mitigasi bencana berbasis alam yang direplikasi di 10 desa lain.',
    fotoUtama: 'https://placehold.co/800x600/2a4d2e/white?text=Mangrove+Mitigasi+Aceh',
    mediaPendukung: {
      foto: [
        'https://placehold.co/600x400/2a4d2e/white?text=Sabuk+Mangrove',
        'https://placehold.co/600x400/2a4d2e/white?text=Jalur+Evakuasi',
        'https://placehold.co/600x400/2a4d2e/white?text=Perempuan+Pemimpin'
      ],
      video: ['documentary-aceh.mp4', 'before-after.mp4'],
      audio: ['story-survivor.mp3'],
      dokumen: ['disaster-mitigation-plan.pdf', 'impact-assessment.pdf']
    }
  }
]
