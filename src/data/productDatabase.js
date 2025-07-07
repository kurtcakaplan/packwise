// Complete Product Database extracted from Excel
// Includes English, Slovak, and Hungarian translations
// Each product has unique serial numbers for stock control

import { generateId } from '../utils/helpers';

// Product categories with translations
export const PRODUCT_CATEGORIES = [
  { key: 'packing', en: 'Packing', sk: 'Balenie', hu: 'Csomagolás' },
  { key: 'food_beverage', en: 'Food & Beverage', sk: 'Potraviny a Nápoje', hu: 'Élelmiszer és Ital' },
  { key: 'hygiene_cleaning', en: 'Hygiene & Cleaning', sk: 'Hygiena a Čistenie', hu: 'Higiénia és Tisztítás' },
  { key: 'disposable', en: 'Disposable Products', sk: 'Jednorazové Výrobky', hu: 'Eldobható Termékek' },
  { key: 'industrial', en: 'Industrial Supplies', sk: 'Priemyselné Potreby', hu: 'Ipari Kellékek' }
];

// Complete product database from Excel - EXACT MATCH
export const EXCEL_PRODUCTS_DATABASE = [
  // ENGLISH PRODUCTS (Sheet 1)
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-001',
    sku: 'CARD-BOX-SM-001',
    name: {
      en: 'Small Cardboard Box',
      sk: 'Malá kartónová krabica',
      hu: 'Kis karton doboz'
    },
    description: {
      en: 'High-quality corrugated cardboard box perfect for small items shipping and storage.',
      sk: 'Vysokokvalitná vlnitá kartónová krabica ideálna na zasielanie a skladovanie malých predmetov.',
      hu: 'Kiváló minőségű hullámpapír doboz, tökéletes kis tárgyak szállításához és tárolásához.'
    },
    categoryKey: 'packing',
    dimensions: '20x15x10 cm',
    weight: '0.15 kg',
    material: 'Corrugated Cardboard',
    price: 1.50,
    quantity: 500,
    minStockLevel: 50,
    maxStockLevel: 1000,
    supplier: 'CardBoard Solutions Ltd.',
    supplierCode: 'CBS-001',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    ],
    tags: ['cardboard', 'small', 'shipping', 'storage'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-002',
    sku: 'BUBBLE-WRAP-002',
    name: {
      en: 'Bubble Wrap',
      sk: 'Bublinková fólia',
      hu: 'Buborékfólia'
    },
    description: {
      en: 'Premium quality bubble wrap for protecting fragile items during shipping and storage.',
      sk: 'Prémiová bublinková fólia na ochranu krehkých predmetov počas prepravy a skladovania.',
      hu: 'Prémium minőségű buborékfólia törékeny tárgyak védelmére szállítás és tárolás során.'
    },
    categoryKey: 'packing',
    dimensions: '50cm x 10m',
    weight: '0.8 kg',
    material: 'Polyethylene',
    price: 5.00,
    quantity: 150,
    minStockLevel: 20,
    maxStockLevel: 300,
    supplier: 'Protective Packaging Co.',
    supplierCode: 'PPC-002',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    tags: ['bubble-wrap', 'protection', 'fragile', 'polyethylene'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-003',
    sku: 'FOOD-CONT-003',
    name: {
      en: 'Food Containers',
      sk: 'Nádoby na jedlo',
      hu: 'Ételtároló'
    },
    description: {
      en: 'Eco-friendly food containers made from sustainable materials. Microwave and freezer safe.',
      sk: 'Eko nádoby na jedlo vyrobené z udržateľných materiálov. Bezpečné do mikrovlnky a mrazničky.',
      hu: 'Környezetbarát ételtárolók fenntartható anyagokból. Mikrohullámú sütőben és fagyasztóban használható.'
    },
    categoryKey: 'food_beverage',
    dimensions: '15x12x6 cm',
    weight: '1.2 kg',
    material: 'Biodegradable Pulp',
    price: 12.50,
    quantity: 120,
    minStockLevel: 15,
    maxStockLevel: 300,
    supplier: 'Green Packaging Solutions',
    supplierCode: 'GPS-003',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1603376821329-0b7a9f6d0aef?w=400&h=300&fit=crop'
    ],
    tags: ['eco-friendly', 'biodegradable', 'food-container', 'microwave-safe'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-004',
    sku: 'HAND-SANIT-004',
    name: {
      en: 'Hand Sanitizer',
      sk: 'Dezinfekčný gél na ruky',
      hu: 'Kézfertőtlenítő'
    },
    description: {
      en: 'Professional grade hand sanitizer with 70% alcohol content. Kills 99.9% of germs and bacteria.',
      sk: 'Profesionálny dezinfekčný gél na ruky s 70% obsahom alkoholu. Zabíja 99,9% mikróbov a baktérií.',
      hu: 'Professzionális kézfertőtlenítő 70% alkohol tartalommal. 99,9%-ban elpusztítja a kórokozókat és baktériumokat.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '10x10x25 cm',
    weight: '1.1 kg',
    material: '70% Ethyl Alcohol',
    price: 8.75,
    quantity: 85,
    minStockLevel: 15,
    maxStockLevel: 200,
    supplier: 'Hygiene Solutions Inc.',
    supplierCode: 'HSI-004',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop'
    ],
    tags: ['hand-sanitizer', 'alcohol', 'professional', 'antibacterial'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-005',
    sku: 'PAPER-PLATES-005',
    name: {
      en: 'Paper Plates',
      sk: 'Papierové taniere',
      hu: 'Papír tányérok'
    },
    description: {
      en: 'Sturdy disposable paper plates perfect for parties and events. Grease and moisture resistant.',
      sk: 'Pevné jednorazové papierové taniere ideálne na párty a podujatia. Odolné voči tuku a vlhkosti.',
      hu: 'Erős eldobható papír tányérok, tökéletesek bulizáshoz és eseményekhez. Zsír- és nedvességálló.'
    },
    categoryKey: 'disposable',
    dimensions: '23x23x2 cm',
    weight: '1.2 kg',
    material: 'Coated Paper',
    price: 5.90,
    quantity: 200,
    minStockLevel: 30,
    maxStockLevel: 500,
    supplier: 'Party Supplies Inc.',
    supplierCode: 'PSI-005',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    tags: ['paper-plates', 'disposable', 'party', 'grease-resistant'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-006',
    sku: 'SAFETY-VEST-006',
    name: {
      en: 'Safety Vest',
      sk: 'Reflexná vesta',
      hu: 'Biztonsági mellény'
    },
    description: {
      en: 'High visibility safety vest with reflective strips. Meets EN ISO 20471 safety standards.',
      sk: 'Reflexná bezpečnostná vesta s reflexnými pásikmi. Spĺňa bezpečnostné normy EN ISO 20471.',
      hu: 'Jól láthatósági biztonsági mellény fényvisszaverő csíkokkal. Megfelel az EN ISO 20471 biztonsági szabványoknak.'
    },
    categoryKey: 'industrial',
    dimensions: 'One Size Fits Most',
    weight: '0.3 kg',
    material: 'Polyester with Reflective Tape',
    price: 12.90,
    quantity: 35,
    minStockLevel: 10,
    maxStockLevel: 100,
    supplier: 'Safety Equipment Ltd.',
    supplierCode: 'SEL-006',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    ],
    tags: ['safety-vest', 'high-visibility', 'reflective', 'industrial'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-007',
    sku: 'PACK-TAPE-007',
    name: {
      en: 'Packing Tape',
      sk: 'Baliaca páska',
      hu: 'Csomagolószalag'
    },
    description: {
      en: 'Strong adhesive packing tape for sealing cardboard boxes. Excellent adhesion and durability.',
      sk: 'Silná lepiaca baliaca páska na uzatváranie kartónových krabíc. Vynikajúca priľnavosť a odolnosť.',
      hu: 'Erős ragasztó csomagolószalag karton dobozok lezárásához. Kiváló tapadás és tartósság.'
    },
    categoryKey: 'packing',
    dimensions: '48mm x 66m',
    weight: '0.3 kg',
    material: 'Polypropylene with Acrylic Adhesive',
    price: 4.25,
    quantity: 180,
    minStockLevel: 30,
    maxStockLevel: 200,
    supplier: 'Adhesive Solutions Inc.',
    supplierCode: 'ASI-007',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1609205611145-de2500ba2c44?w=400&h=300&fit=crop'
    ],
    tags: ['tape', 'adhesive', 'sealing', 'durable'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-008',
    sku: 'COFFEE-CUPS-008',
    name: {
      en: 'Coffee Cups',
      sk: 'Poháre na kávu',
      hu: 'Kávés poharak'
    },
    description: {
      en: 'Double wall paper coffee cups with excellent heat insulation. Perfect for hot beverages.',
      sk: 'Dvojstenné papierové poháre na kávu s vynikajúcou tepelnou izoláciou. Ideálne na horúce nápoje.',
      hu: 'Dupla falú papír kávés poharak kiváló hőszigetelésssel. Tökéletes forró italokhoz.'
    },
    categoryKey: 'food_beverage',
    dimensions: '9x9x11 cm',
    weight: '1.5 kg',
    material: 'Double Wall Paper',
    price: 12.90,
    quantity: 200,
    minStockLevel: 25,
    maxStockLevel: 500,
    supplier: 'Beverage Packaging Co.',
    supplierCode: 'BPC-008',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
    ],
    tags: ['paper-cups', 'coffee', 'double-wall', 'hot-beverages'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-009',
    sku: 'DISINF-WIPES-009',
    name: {
      en: 'Disinfectant Wipes',
      sk: 'Dezinfekčné utierky',
      hu: 'Fertőtlenítő törlőkendők'
    },
    description: {
      en: 'Antibacterial disinfectant wipes for surface cleaning. Kills 99.9% of viruses and bacteria.',
      sk: 'Antibakteriálne dezinfekčné utierky na čistenie povrchov. Zabíja 99,9% vírusov a baktérií.',
      hu: 'Antibakteriális fertőtlenítő törlőkendők felületek tisztításához. 99,9%-ban elpusztítja a vírusokat és baktériumokat.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '20x15x12 cm',
    weight: '0.8 kg',
    material: 'Non-woven Fabric with Disinfectant',
    price: 7.25,
    quantity: 120,
    minStockLevel: 20,
    maxStockLevel: 300,
    supplier: 'Cleaning Solutions Ltd.',
    supplierCode: 'CSL-009',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop'
    ],
    tags: ['wipes', 'disinfectant', 'antibacterial', 'surface-cleaning'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-EN-010',
    sku: 'PLASTIC-BAGS-010',
    name: {
      en: 'Plastic Bags',
      sk: 'Plastové tašky',
      hu: 'Műanyag táskák'
    },
    description: {
      en: 'Strong plastic shopping bags with handles. Suitable for retail and grocery stores.',
      sk: 'Pevné plastové nákupné tašky s rúčkami. Vhodné pre maloobchod a potraviny.',
      hu: 'Erős műanyag bevásárlótáskák fogantyúval. Alkalmas kiskereskedelmi és élelmiszerboltok számára.'
    },
    categoryKey: 'disposable',
    dimensions: '30x40 cm',
    weight: '2.0 kg',
    material: 'HDPE Plastic',
    price: 8.75,
    quantity: 250,
    minStockLevel: 40,
    maxStockLevel: 600,
    supplier: 'Bag Solutions Co.',
    supplierCode: 'BSC-010',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    ],
    tags: ['shopping-bags', 'plastic', 'handles', 'retail'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // SLOVAK PRODUCTS (Sheet 2)
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-011',
    sku: 'KARTÓN-KRAB-011',
    name: {
      en: 'Medium Cardboard Box',
      sk: 'Stredná kartónová krabica',
      hu: 'Közepes karton doboz'
    },
    description: {
      en: 'Durable medium-sized cardboard box with double wall construction for enhanced protection.',
      sk: 'Odolná stredne veľká kartónová krabica s dvojvrstvovou konštrukciou pre zvýšenú ochranu.',
      hu: 'Tartós közepes méretű karton doboz dupla falú konstrukcióval a fokozott védelemért.'
    },
    categoryKey: 'packing',
    dimensions: '30x25x20 cm',
    weight: '0.25 kg',
    material: 'Double Wall Corrugated Cardboard',
    price: 2.15,
    quantity: 350,
    minStockLevel: 40,
    maxStockLevel: 800,
    supplier: 'CardBoard Solutions Ltd.',
    supplierCode: 'CBS-011',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    ],
    tags: ['cardboard', 'medium', 'shipping', 'double-wall'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-012',
    sku: 'STRETCH-FÓLIA-012',
    name: {
      en: 'Stretch Film',
      sk: 'Strečová fólia',
      hu: 'Stretch fólia'
    },
    description: {
      en: 'Industrial grade stretch film for pallet wrapping and cargo securing. High puncture resistance.',
      sk: 'Priemyselná strečová fólia na balenie paliet a zabezpečenie nákladu. Vysoká odolnosť proti prepichnutiu.',
      hu: 'Ipari minőségű stretch fólia raklapok csomagolásához és rakomány rögzítéséhez. Magas átszúrási ellenállás.'
    },
    categoryKey: 'packing',
    dimensions: '500mm x 300m',
    weight: '2.5 kg',
    material: 'Linear Low-Density Polyethylene',
    price: 15.90,
    quantity: 75,
    minStockLevel: 10,
    maxStockLevel: 150,
    supplier: 'Industrial Films Ltd.',
    supplierCode: 'IFL-012',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop'
    ],
    tags: ['stretch-film', 'pallet', 'industrial', 'cargo'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-013',
    sku: 'JEDLO-NÁDOBY-013',
    name: {
      en: 'Large Food Containers',
      sk: 'Veľké nádoby na jedlo',
      hu: 'Nagy ételtárolók'
    },
    description: {
      en: 'Large capacity food containers perfect for meal prep and takeaway services. Leak-proof design.',
      sk: 'Veľkokapacitné nádoby na jedlo ideálne na prípravu jedál a takeaway služby. Nepriepustný dizajn.',
      hu: 'Nagy kapacitású ételtárolók, tökéletesek ételkészítéshez és elviteles szolgáltatásokhoz. Szivárgásmentes kialakítás.'
    },
    categoryKey: 'food_beverage',
    dimensions: '18x14x7 cm',
    weight: '0.8 kg',
    material: 'PP Plastic',
    price: 22.75,
    quantity: 85,
    minStockLevel: 10,
    maxStockLevel: 200,
    supplier: 'Food Service Supplies',
    supplierCode: 'FSS-013',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1603376821329-0b7a9f6d0aef?w=400&h=300&fit=crop'
    ],
    tags: ['food-container', 'large', 'leak-proof', 'takeaway'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-014',
    sku: 'STUDENÉ-POHÁRE-014',
    name: {
      en: 'Cold Drink Cups',
      sk: 'Poháre na studené nápoje',
      hu: 'Hideg italos poharak'
    },
    description: {
      en: 'Clear plastic cups perfect for cold beverages, smoothies, and iced drinks. Durable and reusable.',
      sk: 'Priehľadné plastové poháre ideálne na studené nápoje, smoothie a ľadové nápoje. Odolné a opakovane použiteľné.',
      hu: 'Átlátszó műanyag poharak, tökéletesek hideg italokhoz, turmixokhoz és jeges italokhoz. Tartós és újrahasználható.'
    },
    categoryKey: 'food_beverage',
    dimensions: '8x8x12 cm',
    weight: '0.9 kg',
    material: 'PET Plastic',
    price: 8.75,
    quantity: 150,
    minStockLevel: 20,
    maxStockLevel: 400,
    supplier: 'Beverage Packaging Co.',
    supplierCode: 'BPC-014',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
    ],
    tags: ['plastic-cups', 'cold-beverages', 'clear', 'reusable'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-015',
    sku: 'PAPIER-OBRÚSKY-015',
    name: {
      en: 'Paper Napkins',
      sk: 'Papierové obrúsky',
      hu: 'Papír szalvéták'
    },
    description: {
      en: 'High-quality 2-ply paper napkins for restaurants and catering. Excellent absorbency and softness.',
      sk: 'Vysokokvalitné 2-vrstvové papierové obrúsky pre reštaurácie a catering. Vynikajúca savosť a mäkkosť.',
      hu: 'Kiváló minőségű 2 rétegű papír szalvéták éttermek és vendéglátás számára. Kiváló nedvszívó képesség és puhaság.'
    },
    categoryKey: 'food_beverage',
    dimensions: '33x33 cm',
    weight: '2.0 kg',
    material: '2-Ply Paper',
    price: 6.50,
    quantity: 300,
    minStockLevel: 40,
    maxStockLevel: 800,
    supplier: 'Paper Products Ltd.',
    supplierCode: 'PPL-015',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop'
    ],
    tags: ['napkins', 'paper', '2-ply', 'restaurant'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-016',
    sku: 'NITRIL-RUKAV-016',
    name: {
      en: 'Nitrile Gloves',
      sk: 'Nitrilové rukavice',
      hu: 'Nitril kesztyűk'
    },
    description: {
      en: 'Powder-free nitrile examination gloves. Excellent chemical resistance and tactile sensitivity.',
      sk: 'Bezpúdrové nitrilové vyšetrovacie rukavice. Vynikajúca chemická odolnosť a hmatová citlivosť.',
      hu: 'Por mentes nitril vizsgálókesztyűk. Kiváló vegyi ellenállás és tapintási érzékenység.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '24x12x8 cm',
    weight: '0.6 kg',
    material: 'Nitrile Rubber',
    price: 24.90,
    quantity: 45,
    minStockLevel: 10,
    maxStockLevel: 200,
    supplier: 'Medical Supplies Co.',
    supplierCode: 'MSC-016',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop'
    ],
    tags: ['gloves', 'nitrile', 'powder-free', 'medical'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-017',
    sku: 'CHIRURG-RÚŠKA-017',
    name: {
      en: 'Surgical Masks',
      sk: 'Chirurgické rúška',
      hu: 'Sebészeti maszkok'
    },
    description: {
      en: 'Disposable 3-layer surgical masks with ear loops. High filtration efficiency and breathability.',
      sk: 'Jednorazové 3-vrstvové chirurgické rúška s ušnými slučkami. Vysoká filtračná účinnosť a priedušnosť.',
      hu: 'Eldobható 3 rétegű sebészeti maszkok fülpánttal. Magas szűrési hatékonyság és légáteresztő képesség.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '18x10x8 cm',
    weight: '0.4 kg',
    material: 'Non-woven Polypropylene',
    price: 8.90,
    quantity: 180,
    minStockLevel: 25,
    maxStockLevel: 500,
    supplier: 'Medical Supplies Co.',
    supplierCode: 'MSC-017',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop'
    ],
    tags: ['masks', 'surgical', '3-layer', 'disposable'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-018',
    sku: 'TOALET-PAPIER-018',
    name: {
      en: 'Toilet Paper',
      sk: 'Toaletný papier',
      hu: 'Toalettpapír'
    },
    description: {
      en: 'Soft and strong 2-ply toilet paper. Biodegradable and septic-safe. 200 sheets per roll.',
      sk: 'Mäkký a pevný 2-vrstvový toaletný papier. Biologicky odbúrateľný a bezpečný pre septiky. 200 útržkov na rolku.',
      hu: 'Puha és erős 2 rétegű toalettpapír. Biológiailag lebomló és szeptikus tartály barát. 200 lap tekercsenkét.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '40x30x20 cm',
    weight: '4.5 kg',
    material: '2-Ply Recycled Paper',
    price: 16.80,
    quantity: 60,
    minStockLevel: 15,
    maxStockLevel: 150,
    supplier: 'Paper Products Ltd.',
    supplierCode: 'PPL-018',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop'
    ],
    tags: ['toilet-paper', '2-ply', 'biodegradable', 'septic-safe'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-019',
    sku: 'PLAST-PRÍBORY-019',
    name: {
      en: 'Plastic Cutlery',
      sk: 'Plastové príbory',
      hu: 'Műanyag evőeszközök'
    },
    description: {
      en: 'Complete plastic cutlery sets including fork, knife, and spoon. Durable and lightweight.',
      sk: 'Kompletné plastové príborové súpravy vrátane vidličky, noža a lyžice. Odolné a ľahké.',
      hu: 'Teljes műanyag evőeszköz készletek villa, kés és kanál. Tartós és könnyű.'
    },
    categoryKey: 'disposable',
    dimensions: '20x15x10 cm',
    weight: '1.8 kg',
    material: 'PS Plastic',
    price: 11.50,
    quantity: 90,
    minStockLevel: 15,
    maxStockLevel: 250,
    supplier: 'Party Supplies Inc.',
    supplierCode: 'PSI-019',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    tags: ['cutlery', 'plastic', 'disposable', 'lightweight'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-SK-020',
    sku: 'OCHRAN-PRILBA-020',
    name: {
      en: 'Hard Hat',
      sk: 'Ochranná prilba',
      hu: 'Védősisak'
    },
    description: {
      en: 'ANSI/ISEA Z89.1 compliant hard hat for construction and industrial work. Adjustable suspension.',
      sk: 'Ochranná prilba vyhovujúca ANSI/ISEA Z89.1 pre stavebné a priemyselné práce. Nastaviteľné zavesenie.',
      hu: 'ANSI/ISEA Z89.1 szabványnak megfelelő védősisak építési és ipari munkákhoz. Állítható felfüggesztés.'
    },
    categoryKey: 'industrial',
    dimensions: '28x22x16 cm',
    weight: '0.4 kg',
    material: 'High-Density Polyethylene',
    price: 18.50,
    quantity: 25,
    minStockLevel: 8,
    maxStockLevel: 80,
    supplier: 'Safety Equipment Ltd.',
    supplierCode: 'SEL-020',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    ],
    tags: ['hard-hat', 'safety', 'construction', 'ANSI-compliant'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // HUNGARIAN PRODUCTS (Sheet 3)
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-021',
    sku: 'NAGY-KARTON-021',
    name: {
      en: 'Large Cardboard Box',
      sk: 'Veľká kartónová krabica',
      hu: 'Nagy karton doboz'
    },
    description: {
      en: 'Heavy-duty large cardboard box with triple wall construction for maximum protection of valuable items.',
      sk: 'Veľká kartónová krabica pre ťažké použitie s trojvrstvovou konštrukciou pre maximálnu ochranu cenných predmetov.',
      hu: 'Nagy teherbírású karton doboz háromrétegű konstrukcióval az értékes tárgyak maximális védelméért.'
    },
    categoryKey: 'packing',
    dimensions: '40x30x30 cm',
    weight: '0.45 kg',
    material: 'Triple Wall Corrugated Cardboard',
    price: 3.85,
    quantity: 200,
    minStockLevel: 25,
    maxStockLevel: 500,
    supplier: 'CardBoard Solutions Ltd.',
    supplierCode: 'CBS-021',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop'
    ],
    tags: ['cardboard', 'large', 'heavy-duty', 'triple-wall'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-022',
    sku: 'ÁTLÁTSZÓ-SZALAG-022',
    name: {
      en: 'Clear Tape',
      sk: 'Priehľadná páska',
      hu: 'Átlátszó szalag'
    },
    description: {
      en: 'Crystal clear packing tape with superior adhesion. Perfect for professional packaging applications.',
      sk: 'Krištáľovo čistá baliaca páska s vynikajúcou priľnavosťou. Ideálna pre profesionálne baliace aplikácie.',
      hu: 'Kristálytiszta csomagolószalag kiváló tapadással. Tökéletes professzionális csomagolási alkalmazásokhoz.'
    },
    categoryKey: 'packing',
    dimensions: '48mm x 66m',
    weight: '0.3 kg',
    material: 'Polypropylene with Acrylic Adhesive',
    price: 4.75,
    quantity: 180,
    minStockLevel: 30,
    maxStockLevel: 200,
    supplier: 'Adhesive Solutions Inc.',
    supplierCode: 'ASI-022',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1609205611145-de2500ba2c44?w=400&h=300&fit=crop'
    ],
    tags: ['tape', 'clear', 'adhesive', 'professional'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-023',
    sku: 'NAGY-ÉTEL-TÁROLÓ-023',
    name: {
      en: 'Extra Large Food Containers',
      sk: 'Extra veľké nádoby na jedlo',
      hu: 'Extra nagy ételtárolók'
    },
    description: {
      en: 'Extra large capacity food containers for bulk meal preparation and commercial use. Heavy-duty construction.',
      sk: 'Extra veľkokapacitné nádoby na jedlo pre hromadnú prípravu jedál a komerčné použitie. Konštrukcia pre ťažké použitie.',
      hu: 'Extra nagy kapacitású ételtárolók tömeges ételkészítéshez és kereskedelmi használatra. Nagy teherbírású konstrukció.'
    },
    categoryKey: 'food_beverage',
    dimensions: '25x20x10 cm',
    weight: '1.5 kg',
    material: 'Heavy-duty PP Plastic',
    price: 28.50,
    quantity: 60,
    minStockLevel: 8,
    maxStockLevel: 150,
    supplier: 'Commercial Food Supplies',
    supplierCode: 'CFS-023',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1603376821329-0b7a9f6d0aef?w=400&h=300&fit=crop'
    ],
    tags: ['food-container', 'extra-large', 'commercial', 'heavy-duty'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-024',
    sku: 'PRÉMIUM-KÁVÉ-POHÁR-024',
    name: {
      en: 'Premium Coffee Cups',
      sk: 'Prémiové poháre na kávu',
      hu: 'Prémium kávés poharak'
    },
    description: {
      en: 'Premium triple wall coffee cups with superior insulation and elegant design. Professional grade quality.',
      sk: 'Prémiové trojstenné poháre na kávu s vynikajúcou izoláciou a elegantným dizajnom. Profesionálna kvalita.',
      hu: 'Prémium háromrétegű kávés poharak kiváló szigeteléssel és elegáns dizájnnal. Professzionális minőség.'
    },
    categoryKey: 'food_beverage',
    dimensions: '10x10x12 cm',
    weight: '2.0 kg',
    material: 'Triple Wall Premium Paper',
    price: 18.90,
    quantity: 120,
    minStockLevel: 20,
    maxStockLevel: 350,
    supplier: 'Premium Beverage Co.',
    supplierCode: 'PBC-024',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
    ],
    tags: ['premium-cups', 'coffee', 'triple-wall', 'professional'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-025',
    sku: 'PRÉMIUM-SZALVÉTA-025',
    name: {
      en: 'Premium Napkins',
      sk: 'Prémiové obrúsky',
      hu: 'Prémium szalvéták'
    },
    description: {
      en: 'Luxury 3-ply paper napkins with embossed texture. Perfect for fine dining and special events.',
      sk: 'Luxusné 3-vrstvové papierové obrúsky s reliéfnou textúrou. Ideálne pre fine dining a špeciálne podujatia.',
      hu: 'Luxus 3 rétegű papír szalvéták dombornyomott textúrával. Tökéletes fine dining és különleges események számára.'
    },
    categoryKey: 'food_beverage',
    dimensions: '40x40 cm',
    weight: '3.0 kg',
    material: '3-Ply Embossed Paper',
    price: 12.75,
    quantity: 180,
    minStockLevel: 25,
    maxStockLevel: 400,
    supplier: 'Luxury Paper Products',
    supplierCode: 'LPP-025',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop'
    ],
    tags: ['premium-napkins', '3-ply', 'embossed', 'luxury'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-026',
    sku: 'PRÉMIUM-FERTŐTLENÍTŐ-026',
    name: {
      en: 'Premium Hand Sanitizer',
      sk: 'Prémiový dezinfekčný gél',
      hu: 'Prémium kézfertőtlenítő'
    },
    description: {
      en: 'Premium hand sanitizer with 75% alcohol and moisturizing agents. Gentle on skin, tough on germs.',
      sk: 'Prémiový dezinfekčný gél s 75% alkoholom a hydratačnými látkami. Jemný na pokožku, účinný proti mikróbom.',
      hu: 'Prémium kézfertőtlenítő 75% alkohollal és hidratáló anyagokkal. Gyengéd a bőrhöz, hatékony a kórokozók ellen.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '12x8x20 cm',
    weight: '0.5 kg',
    material: '75% Ethyl Alcohol with Moisturizers',
    price: 15.50,
    quantity: 95,
    minStockLevel: 20,
    maxStockLevel: 250,
    supplier: 'Premium Hygiene Solutions',
    supplierCode: 'PHS-026',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop'
    ],
    tags: ['premium-sanitizer', 'moisturizing', '75-alcohol', 'gentle'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-027',
    sku: 'LATEX-KESZTYŰ-027',
    name: {
      en: 'Latex Gloves',
      sk: 'Latexové rukavice',
      hu: 'Latex kesztyűk'
    },
    description: {
      en: 'High-quality powdered latex examination gloves. Excellent tactile sensitivity and comfort.',
      sk: 'Vysokokvalitné púdrované latexové vyšetrovacie rukavice. Vynikajúca hmatová citlivosť a pohodlie.',
      hu: 'Kiváló minőségű púderes latex vizsgálókesztyűk. Kiváló tapintási érzékenység és kényelem.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '25x13x9 cm',
    weight: '0.7 kg',
    material: 'Natural Latex Rubber',
    price: 19.90,
    quantity: 75,
    minStockLevel: 15,
    maxStockLevel: 200,
    supplier: 'Medical Glove Supplies',
    supplierCode: 'MGS-027',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400&h=300&fit=crop'
    ],
    tags: ['latex-gloves', 'powdered', 'examination', 'tactile'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-028',
    sku: 'N95-MASZK-028',
    name: {
      en: 'N95 Masks',
      sk: 'N95 rúška',
      hu: 'N95 maszkok'
    },
    description: {
      en: 'NIOSH-approved N95 respirator masks with 95% filtration efficiency. Professional medical grade.',
      sk: 'NIOSH schválené N95 respirátorové rúška s 95% filtračnou účinnosťou. Profesionálna lekárska kvalita.',
      hu: 'NIOSH jóváhagyott N95 légzésvédő maszkok 95% szűrési hatékonysággal. Professzionális orvosi minőség.'
    },
    categoryKey: 'hygiene_cleaning',
    dimensions: '20x12x10 cm',
    weight: '0.6 kg',
    material: 'Multi-layer Non-woven Fabric',
    price: 35.90,
    quantity: 40,
    minStockLevel: 10,
    maxStockLevel: 150,
    supplier: 'Professional Medical Supplies',
    supplierCode: 'PMS-028',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=400&h=300&fit=crop'
    ],
    tags: ['n95-masks', 'niosh-approved', 'respirator', 'medical-grade'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-029',
    sku: 'PRÉMIUM-TÁNYÉR-029',
    name: {
      en: 'Premium Paper Plates',
      sk: 'Prémiové papierové taniere',
      hu: 'Prémium papír tányérok'
    },
    description: {
      en: 'Heavy-duty premium paper plates with reinforced rim. Perfect for upscale events and catering.',
      sk: 'Prémiové papierové taniere pre ťažké použitie so zosilneným okrajom. Ideálne pre luxusné podujatia a catering.',
      hu: 'Nagy teherbírású prémium papír tányérok megerősített peremmel. Tökéletes előkelő eseményekhez és vendéglátáshoz.'
    },
    categoryKey: 'disposable',
    dimensions: '26x26x3 cm',
    weight: '1.8 kg',
    material: 'Heavy-duty Coated Paper',
    price: 9.90,
    quantity: 150,
    minStockLevel: 25,
    maxStockLevel: 400,
    supplier: 'Premium Party Supplies',
    supplierCode: 'PPS-029',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    ],
    tags: ['premium-plates', 'heavy-duty', 'reinforced', 'upscale'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: generateId('PKWS-', 8),
    serialNumber: 'PKWS-HU-030',
    sku: 'ELDOBHATÓ-OVERÁL-030',
    name: {
      en: 'Disposable Coveralls',
      sk: 'Jednorazové kombinézy',
      hu: 'Eldobható overálok'
    },
    description: {
      en: 'Lightweight disposable coveralls for protection against dust and light chemicals. Breathable material.',
      sk: 'Ľahké jednorazové kombinézy na ochranu pred prachom a ľahkými chemikáliami. Priedušný materiál.',
      hu: 'Könnyű eldobható overálok por és enyhe vegyi anyagok elleni védelemhez. Légáteresztő anyag.'
    },
    categoryKey: 'industrial',
    dimensions: 'Size L',
    weight: '0.2 kg',
    material: 'Polypropylene Non-woven',
    price: 6.75,
    quantity: 50,
    minStockLevel: 15,
    maxStockLevel: 150,
    supplier: 'Industrial Protection Co.',
    supplierCode: 'IPC-030',
    isActive: true,
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    ],
    tags: ['coveralls', 'disposable', 'protection', 'breathable'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Stock management functions
export const getProductBySerialNumber = (serialNumber) => {
  return EXCEL_PRODUCTS_DATABASE.find(product => product.serialNumber === serialNumber);
};

export const getProductsBySKU = (sku) => {
  return EXCEL_PRODUCTS_DATABASE.filter(product => product.sku.includes(sku));
};

export const getLowStockProducts = () => {
  return EXCEL_PRODUCTS_DATABASE.filter(product => product.quantity <= product.minStockLevel);
};

export const getOutOfStockProducts = () => {
  return EXCEL_PRODUCTS_DATABASE.filter(product => product.quantity === 0);
};

export const getProductsByCategory = (categoryKey) => {
  return EXCEL_PRODUCTS_DATABASE.filter(product => product.categoryKey === categoryKey);
};

export const getProductsBySupplier = (supplierCode) => {
  return EXCEL_PRODUCTS_DATABASE.filter(product => product.supplierCode === supplierCode);
};

export const updateProductStock = (serialNumber, newQuantity) => {
  const productIndex = EXCEL_PRODUCTS_DATABASE.findIndex(product => product.serialNumber === serialNumber);
  if (productIndex !== -1) {
    EXCEL_PRODUCTS_DATABASE[productIndex].quantity = newQuantity;
    EXCEL_PRODUCTS_DATABASE[productIndex].updatedAt = new Date().toISOString();
    return EXCEL_PRODUCTS_DATABASE[productIndex];
  }
  return null;
};

export const getStockSummary = () => {
  const totalProducts = EXCEL_PRODUCTS_DATABASE.length;
  const totalStock = EXCEL_PRODUCTS_DATABASE.reduce((sum, product) => sum + product.quantity, 0);
  const lowStockCount = getLowStockProducts().length;
  const outOfStockCount = getOutOfStockProducts().length;
  const totalValue = EXCEL_PRODUCTS_DATABASE.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return {
    totalProducts,
    totalStock,
    lowStockCount,
    outOfStockCount,
    totalValue: totalValue.toFixed(2)
  };
};

// Export default for easy import
export default EXCEL_PRODUCTS_DATABASE;