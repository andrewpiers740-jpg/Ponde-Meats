export interface ProductVariant {
  id: string;
  name: string;
  weightKg?: number;
  price: number; // in AUD (GST inclusive)
  unit: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'beef' | 'lamb' | 'goat' | 'mutton';
  subcategory: 'single-cuts' | 'meat-boxes' | 'whole-carcasses' | 'mixed-cuts';
  description: string;
  longDescription: string;
  price: number; // starting or base price
  unit: string; // e.g. "per kg", "per box", "per carcass"
  badge?: 'Popular' | 'Best Value' | 'Premium' | 'Whole Carcass' | 'Wholesale Special';
  image: string;
  variants: ProductVariant[];
  specs: {
    origin: string;
    packaging: string;
    storage: string;
    feedType: string;
    hungWeightKg?: string;
  };
  merchantReturnPolicy: {
    satisfactionGuarantee: string;
    returnWindow: string;
    replacementRefund: string;
    coldChainCompliance: string;
  };
  halalCertified: boolean;
  rating: 5;
  reviewCount: number;
}

export const PRODUCTS: Product[] = [
  {
    "id": "lamb-backstraps",
    "slug": "lamb-backstraps",
    "name": "Lamb Backstraps",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "100% silver-skin trimmed boneless South Australian lamb loin backstraps. Supreme tenderness and fast-cooking steak fillets.",
    "longDescription": "Prized by top Australian restaurants and gourmet chefs. Hand-trimmed from prime pasture lamb mid-loins, these 100% denuded backstrap fillets contain zero waste and melt-in-the-mouth tenderness. Quick-sear on high heat for 3 minutes per side.",
    "price": 30,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/lamb-backstraps.jpg",
    "variants": [
      {
        "id": "lb-1kg",
        "name": "1kg Vacuum Pack (~4 fillets)",
        "weightKg": 1,
        "price": 30,
        "unit": "per pack"
      },
      {
        "id": "lb-2kg",
        "name": "2kg Chef Pack (~8 fillets)",
        "weightKg": 2,
        "price": 60,
        "unit": "per pack"
      },
      {
        "id": "lb-5kg",
        "name": "5kg Wholesale Bulk Carton",
        "weightKg": 5,
        "price": 150,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 35
  },
  {
    "id": "lamb-brisket-bones",
    "slug": "lamb-brisket-bones",
    "name": "Lamb Brisket Bones",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Fresh meaty Australian lamb brisket ribs and sternum cartilage bones. Rich in collagen and gelatin for stocks, broths, and slow soups.",
    "longDescription": "Cut from fresh South Australian lamb breast and sternum plates. Packed with intercostal meat and natural marrow, creating velvety rich stocks, bone broths, and hearty traditional soups.",
    "price": 6.5,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/lamb-brisket-bones.jpg",
    "variants": [
      {
        "id": "lbb-2kg",
        "name": "2kg Stock Pack",
        "weightKg": 2,
        "price": 13,
        "unit": "per pack"
      },
      {
        "id": "lbb-5kg",
        "name": "5kg Bulk Soup Pack",
        "weightKg": 5,
        "price": 32.5,
        "unit": "per pack"
      },
      {
        "id": "lbb-10kg",
        "name": "10kg Commercial Carton",
        "weightKg": 10,
        "price": 65,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 42
  },
  {
    "id": "lamb-curry-pieces-fresh",
    "slug": "lamb-curry-pieces-fresh",
    "name": "Lamb Curry Pieces Fresh",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Fresh bone-in 25mm hand-diced Australian lamb curry pieces. Pristine cuts with bone marrow that enriches curries, stews, and biryanis.",
    "longDescription": "Prepared daily at our Cowirra butcher facility from tender young pasture lambs. Sliced with clean bandsaws to guarantee smooth edges with zero bone splinters. The internal marrow infuses rich flavour into Indian, Pakistani, Middle Eastern, and Caribbean dishes.",
    "price": 11,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-curry-pieces-fresh.jpg",
    "variants": [
      {
        "id": "lcpf-2kg",
        "name": "2kg Fresh Curry Pack",
        "weightKg": 2,
        "price": 22,
        "unit": "per pack"
      },
      {
        "id": "lcpf-5kg",
        "name": "5kg Family Feast Pack",
        "weightKg": 5,
        "price": 55,
        "unit": "per pack"
      },
      {
        "id": "lcpf-10kg",
        "name": "10kg Commercial Catering Box",
        "weightKg": 10,
        "price": 110,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 49
  },
  {
    "id": "lamb-curry-pieces-frozen",
    "slug": "lamb-curry-pieces-frozen",
    "name": "Lamb Curry Pieces Frozen",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Individually blast-frozen bone-in lamb curry pieces. Outstanding value wholesale cut for bulk cooking, banquets, and meal prep.",
    "longDescription": "Blast-frozen immediately post-butchery at -30°C to lock in cellular moisture and natural flavour. Defrosts evenly and cooks into succulent curry morsels. Unbeatable wholesale value at only $5.00/kg.",
    "price": 5,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/lamb-curry-pieces-frozen.jpg",
    "variants": [
      {
        "id": "lcpz-5kg",
        "name": "5kg Frozen Pack",
        "weightKg": 5,
        "price": 25,
        "unit": "per pack"
      },
      {
        "id": "lcpz-10kg",
        "name": "10kg Frozen Bulk Carton",
        "weightKg": 10,
        "price": 50,
        "unit": "per carton"
      },
      {
        "id": "lcpz-20kg",
        "name": "20kg Wholesale Foodservice Box",
        "weightKg": 20,
        "price": 100,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Deep Freeze -18°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 56
  },
  {
    "id": "lamb-diced",
    "slug": "lamb-diced",
    "name": "Diced Lamb (Boneless)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "100% boneless lean diced Australian lamb from prime leg and shoulder primals. Zero bones, zero gristle, maximum tenderness.",
    "longDescription": "Hand-trimmed and cubed into uniform 25mm bite-sized pieces. Ideal for slow casseroles, Greek souvlaki skewers, Moroccan tagines, and creamy kormas.",
    "price": 24,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-diced.jpg",
    "variants": [
      {
        "id": "ld-1kg",
        "name": "1kg Boneless Diced Pack",
        "weightKg": 1,
        "price": 24,
        "unit": "per pack"
      },
      {
        "id": "ld-2kg",
        "name": "2kg Family Pack",
        "weightKg": 2,
        "price": 48,
        "unit": "per pack"
      },
      {
        "id": "ld-5kg",
        "name": "5kg Wholesale Box",
        "weightKg": 5,
        "price": 120,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 63
  },
  {
    "id": "lamb-fillets",
    "slug": "lamb-fillets",
    "name": "Lamb Fillets (Tenderloin)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Whole tenderloin lamb fillets located on the underside of the shortloin saddle. Delicate, tender, and quick to cook.",
    "longDescription": "The single most tender cut on the lamb carcass. Flash-fry whole in butter and herbs for 2–3 minutes, or slice into delicate medallions for upscale restaurant service.",
    "price": 24,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/lamb-fillets.jpg",
    "variants": [
      {
        "id": "lf-1kg",
        "name": "1kg Pack Lamb Fillets",
        "weightKg": 1,
        "price": 24,
        "unit": "per pack"
      },
      {
        "id": "lf-2kg",
        "name": "2kg Gourmet Fillet Pack",
        "weightKg": 2,
        "price": 48,
        "unit": "per pack"
      },
      {
        "id": "lf-5kg",
        "name": "5kg Catering Box",
        "weightKg": 5,
        "price": 120,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 70
  },
  {
    "id": "lamb-fingers",
    "slug": "lamb-fingers",
    "name": "Lamb Rib Fingers (Intercostals)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Succulent intercostal meat strips cut from between the lamb ribs. Loaded with marbling and savory fat that crisps on the grill.",
    "longDescription": "A cult favourite among barbecue pitmasters and yakiniku grillers. Rib fingers contain concentrated sweet lamb fat that caramelises into crunchy, tender bursts of flavor over charcoal or in an air fryer.",
    "price": 14,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-fingers.jpg",
    "variants": [
      {
        "id": "lfi-1kg",
        "name": "1kg Rib Fingers Pack",
        "weightKg": 1,
        "price": 14,
        "unit": "per pack"
      },
      {
        "id": "lfi-2kg",
        "name": "2kg BBQ Pack",
        "weightKg": 2,
        "price": 28,
        "unit": "per pack"
      },
      {
        "id": "lfi-5kg",
        "name": "5kg Bulk Pitmaster Carton",
        "weightKg": 5,
        "price": 70,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 77
  },
  {
    "id": "lamb-flaps",
    "slug": "lamb-flaps",
    "name": "Lamb Flaps (Breast & Belly)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Whole bone-in or boneless lamb breast and belly flaps. Rich, fatty, and deeply satisfying for Pacific-style braises and oven bakes.",
    "longDescription": "Traditional lamb flaps sourced from healthy South Australian pasture lambs. Roast slowly until the skin is shatteringly crisp and the meat beneath is pull-apart tender.",
    "price": 14,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/lamb-flaps.jpg",
    "variants": [
      {
        "id": "lfl-2kg",
        "name": "2kg Flaps Pack",
        "weightKg": 2,
        "price": 28,
        "unit": "per pack"
      },
      {
        "id": "lfl-5kg",
        "name": "5kg Family Pack",
        "weightKg": 5,
        "price": 70,
        "unit": "per pack"
      },
      {
        "id": "lfl-10kg",
        "name": "10kg Wholesale Carton",
        "weightKg": 10,
        "price": 140,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 84
  },
  {
    "id": "lamb-french-cutlets",
    "slug": "lamb-french-cutlets",
    "name": "Lamb French Cutlets",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Masterfully French-trimmed lollipop lamb cutlets with clean white rib bones and tender eye of loin meat.",
    "longDescription": "The pinnacle of fine Australian dining. Sourced from grass-fed Murraylands lambs, individually cut and trimmed with pristine clean bones. Fast to cook and sensational on the palate.",
    "price": 34,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/lamb-french-cutlets.jpg",
    "variants": [
      {
        "id": "lfc-1kg",
        "name": "1kg Pack (approx. 10–12 cutlets)",
        "weightKg": 1,
        "price": 34,
        "unit": "per pack"
      },
      {
        "id": "lfc-2kg",
        "name": "2kg Dinner Party Pack",
        "weightKg": 2,
        "price": 68,
        "unit": "per pack"
      },
      {
        "id": "lfc-5kg",
        "name": "5kg Wholesale Box",
        "weightKg": 5,
        "price": 170,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 91
  },
  {
    "id": "lamb-fq-bbq-chops",
    "slug": "lamb-fq-bbq-chops",
    "name": "Lamb Forequarter BBQ Chops",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Thick-cut Australian lamb forequarter chops. Robust pasture flavour with natural marbling for sizzling hotplate grilling.",
    "longDescription": "An Australian backyard barbecue staple. Cut through the shoulder blade, forequarter chops remain exceptionally juicy and tender when grilled or braised slowly with Worcestershire and onions.",
    "price": 14,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-fq-bbq-chops.jpg",
    "variants": [
      {
        "id": "lfq-1kg",
        "name": "1kg BBQ Pack (approx. 5 chops)",
        "weightKg": 1,
        "price": 14,
        "unit": "per pack"
      },
      {
        "id": "lfq-25kg",
        "name": "2.5kg Family Pack",
        "weightKg": 2.5,
        "price": 35,
        "unit": "per pack"
      },
      {
        "id": "lfq-5kg",
        "name": "5kg Wholesale Carton",
        "weightKg": 5,
        "price": 70,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 98
  },
  {
    "id": "lamb-leg-boned-rolled",
    "slug": "lamb-leg-boned-rolled",
    "name": "Lamb Leg Boned & Rolled",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Tunnel-boned prime leg of lamb, expertly rolled and tied with elastic netting for easy carving and even roasting.",
    "longDescription": "Zero waste and effortless carving at the dinner table. Rub with garlic cloves, rosemary, and olive oil, then oven-roast at 180°C to your preferred doneness.",
    "price": 19,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/lamb-leg-boned-rolled.jpg",
    "variants": [
      {
        "id": "llbr-2kg",
        "name": "Whole Rolled Leg Roast (~2kg)",
        "weightKg": 2,
        "price": 38,
        "unit": "per roast"
      },
      {
        "id": "llbr-25kg",
        "name": "Large Rolled Leg Roast (~2.5kg)",
        "weightKg": 2.5,
        "price": 47.5,
        "unit": "per roast"
      },
      {
        "id": "llbr-pair",
        "name": "Twin Pack Rolled Legs (~4.5kg total)",
        "weightKg": 4.5,
        "price": 85.5,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 105
  },
  {
    "id": "lamb-leg-chops",
    "slug": "lamb-leg-chops",
    "name": "Lamb Leg Chops",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Center-cut lamb leg chops with small round marrow bone. Lean, hearty, and full of natural sweet lamb flavour.",
    "longDescription": "Cross-cut from the center of the lamb leg, these chops feature dense, succulent meat that performs brilliantly pan-fried, grilled, or oven-baked in a casserole.",
    "price": 17,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-leg-chops.jpg",
    "variants": [
      {
        "id": "llc-1kg",
        "name": "1kg Leg Chops Pack",
        "weightKg": 1,
        "price": 17,
        "unit": "per pack"
      },
      {
        "id": "llc-2kg",
        "name": "2kg Family Pack",
        "weightKg": 2,
        "price": 34,
        "unit": "per pack"
      },
      {
        "id": "llc-5kg",
        "name": "5kg Wholesale Box",
        "weightKg": 5,
        "price": 85,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 112
  },
  {
    "id": "lamb-leg-steaks",
    "slug": "lamb-leg-steaks",
    "name": "Lamb Leg Steaks",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Thick boneless steaks carved from prime South Australian lamb leg muscle. Quick, lean, and intensely flavourful.",
    "longDescription": "Hand-sliced boneless steaks ideal for quick mid-week dinners, hot plate searing, and stir-fries. Absorbs marinades exceptionally well.",
    "price": 17,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-leg-steaks.jpg",
    "variants": [
      {
        "id": "lls-1kg",
        "name": "1kg Leg Steaks Pack",
        "weightKg": 1,
        "price": 17,
        "unit": "per pack"
      },
      {
        "id": "lls-2kg",
        "name": "2kg BBQ Pack",
        "weightKg": 2,
        "price": 34,
        "unit": "per pack"
      },
      {
        "id": "lls-5kg",
        "name": "5kg Wholesale Pack",
        "weightKg": 5,
        "price": 85,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 119
  },
  {
    "id": "lamb-leg-bone-in",
    "slug": "lamb-leg-bone-in",
    "name": "Lamb Leg Bone In Roast",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Traditional whole bone-in leg of South Australian lamb with shank attached and clean fat layer. The quintessential roast.",
    "longDescription": "Natural pasture lamb raised along the Murray River corridor. Roasts to golden perfection with crisp crackling fat and pink, juicy internal meat.",
    "price": 13.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-leg-bone-in.jpg",
    "variants": [
      {
        "id": "llbi-22kg",
        "name": "Whole Bone-In Leg (~2.2kg)",
        "weightKg": 2.2,
        "price": 29.7,
        "unit": "per roast"
      },
      {
        "id": "llbi-28kg",
        "name": "Large Bone-In Leg (~2.8kg)",
        "weightKg": 2.8,
        "price": 37.8,
        "unit": "per roast"
      },
      {
        "id": "llbi-pair",
        "name": "Twin Leg Roast Pack (~5.0kg total)",
        "weightKg": 5,
        "price": 67.5,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 126
  },
  {
    "id": "lamb-loin-chops",
    "slug": "lamb-loin-chops",
    "name": "Lamb Loin Chops (T-Bone)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Thick-cut 22mm traditional Australian lamb T-bone loin chops. Tender loin eye and tenderloin on the bone with sweet fat.",
    "longDescription": "Cut from the prime mid-loin saddle of young pasture lambs. Sizzle on a scorching hot barbecue or skillet for 3–4 minutes per side for crispy fat and pink, tender meat.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-loin-chops.jpg",
    "variants": [
      {
        "id": "llc-1kg",
        "name": "1kg Loin Chops Pack (~8-10 chops)",
        "weightKg": 1,
        "price": 16,
        "unit": "per pack"
      },
      {
        "id": "llc-25kg",
        "name": "2.5kg Family BBQ Pack",
        "weightKg": 2.5,
        "price": 40,
        "unit": "per pack"
      },
      {
        "id": "llc-5kg",
        "name": "5kg Wholesale Butcher Box",
        "weightKg": 5,
        "price": 80,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 133
  },
  {
    "id": "lamb-neck-rosettes",
    "slug": "lamb-neck-rosettes",
    "name": "Lamb Neck Rosettes",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Cross-cut bone-in lamb neck slices with central marrow and tender collar meat. The champion cut for slow stews and tagines.",
    "longDescription": "Rich in natural connective tissue and healthy marrow. When slowly braised with vegetables and red wine, the collagen dissolves into a velvety, thick sauce.",
    "price": 10.5,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/lamb-neck-rosettes.jpg",
    "variants": [
      {
        "id": "lnr-2kg",
        "name": "2kg Neck Rosettes Pack",
        "weightKg": 2,
        "price": 21,
        "unit": "per pack"
      },
      {
        "id": "lnr-5kg",
        "name": "5kg Stew Master Pack",
        "weightKg": 5,
        "price": 52.5,
        "unit": "per pack"
      },
      {
        "id": "lnr-10kg",
        "name": "10kg Catering Box",
        "weightKg": 10,
        "price": 105,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 140
  },
  {
    "id": "lamb-racks",
    "slug": "lamb-racks",
    "name": "Lamb Racks (8-Rib Roast)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Whole 8-rib lamb rack with sweet cap of fat intact. Roast whole with herb crust or slice into cutlets at home.",
    "longDescription": "Whole uncut 8-rib pasture lamb rack from South Australia. Cook with a dijon mustard and rosemary crumb crust for a breathtaking centerpiece roast.",
    "price": 26,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/lamb-racks.jpg",
    "variants": [
      {
        "id": "lr-800g",
        "name": "Single 8-Rib Rack (~800g)",
        "weightKg": 0.8,
        "price": 20.8,
        "unit": "per rack"
      },
      {
        "id": "lr-pair",
        "name": "Twin Rack Pack (~1.6kg total)",
        "weightKg": 1.6,
        "price": 41.6,
        "unit": "per pack"
      },
      {
        "id": "lr-carton-4pc",
        "name": "Wholesale 4-Rack Carton (~3.2kg)",
        "weightKg": 3.2,
        "price": 83.2,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 147
  },
  {
    "id": "lamb-shanks-fq",
    "slug": "lamb-shanks-fq",
    "name": "Lamb Forequarter Shanks (FQ)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Fresh forequarter lamb shanks. Highly economical slow-cook cut that produces rich, gelatinous, fall-apart braised meat.",
    "longDescription": "Slightly more compact than hindquarter shanks, forequarter shanks are loaded with flavour and connective tissue that turns into pure silk after 3 hours in a Dutch oven.",
    "price": 14,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-shanks-fq.jpg",
    "variants": [
      {
        "id": "lsfq-pair",
        "name": "Twin Pack FQ Shanks (~700g)",
        "weightKg": 0.7,
        "price": 9.8,
        "unit": "per pack"
      },
      {
        "id": "lsfq-4pack",
        "name": "Family 4-Shank Pack (~1.5kg)",
        "weightKg": 1.5,
        "price": 21,
        "unit": "per pack"
      },
      {
        "id": "lsfq-10kg",
        "name": "Wholesale Commercial Box (~10kg)",
        "weightKg": 10,
        "price": 140,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 154
  },
  {
    "id": "lamb-shanks-hq",
    "slug": "lamb-shanks-hq",
    "name": "Lamb Hindquarter Shanks (HQ)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Large meaty hindquarter lamb shanks with clean French-trimmed knuckle bone. The king of restaurant braises.",
    "longDescription": "The gold standard for winter braising. Larger and meatier than forequarter shanks, our hindquarter shanks are French trimmed by hand at Cowirra SA.",
    "price": 14,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-shanks-hq.jpg",
    "variants": [
      {
        "id": "lshq-pair",
        "name": "Twin Pack HQ Shanks (~900g)",
        "weightKg": 0.9,
        "price": 12.6,
        "unit": "per pack"
      },
      {
        "id": "lshq-4pack",
        "name": "Family 4-Shank Pack (~1.8kg)",
        "weightKg": 1.8,
        "price": 25.2,
        "unit": "per pack"
      },
      {
        "id": "lshq-10kg",
        "name": "Wholesale Commercial Box (~10kg)",
        "weightKg": 10,
        "price": 140,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 161
  },
  {
    "id": "lamb-tendons",
    "slug": "lamb-tendons",
    "name": "Lamb Tendons",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Clean trimmed Australian lamb leg and knuckle tendons. Prized for bone health, collagen, Chinese hotpot, and pho broths.",
    "longDescription": "Pure tendon tissue containing naturally high collagen. When simmered gently for 4 hours, tendons soften into a jelly-like delicacy.",
    "price": 10,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/lamb-tendons.jpg",
    "variants": [
      {
        "id": "lt-1kg",
        "name": "1kg Tendons Pack",
        "weightKg": 1,
        "price": 10,
        "unit": "per pack"
      },
      {
        "id": "lt-3kg",
        "name": "3kg Bulk Broth Pack",
        "weightKg": 3,
        "price": 30,
        "unit": "per pack"
      },
      {
        "id": "lt-10kg",
        "name": "10kg Wholesale Box",
        "weightKg": 10,
        "price": 100,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 168
  },
  {
    "id": "lamb-whole-carcass",
    "slug": "lamb-whole-carcass",
    "name": "Whole Lambs (Carcass Hung Weight)",
    "category": "lamb",
    "subcategory": "whole-carcasses",
    "description": "Whole dressed pasture-fed South Australian lamb carcass (~20kg hung weight). Freshly slaughtered at Cowirra with custom butcher cutting included.",
    "longDescription": "The ultimate wholesale purchase for bulk buyers, Greek spit roasts, and large families. Delivered whole in a carcass bag or fully broken down into chops, cutlets, roasts, and ribs to your exact specifications.",
    "price": 14.5,
    "unit": "per kg hung",
    "badge": "Whole Carcass",
    "image": "/images/products/lamb-whole-carcass.jpg",
    "variants": [
      {
        "id": "lwc-whole-spit",
        "name": "Whole Carcass Spit-Ready (~20kg hung)",
        "weightKg": 20,
        "price": 290,
        "unit": "per carcass"
      },
      {
        "id": "lwc-whole-cut",
        "name": "Whole Carcass Custom Butcher Breakdown (~20kg hung)",
        "weightKg": 20,
        "price": 290,
        "unit": "per carcass"
      },
      {
        "id": "lwc-large-24kg",
        "name": "Large Whole Carcass (~24kg hung)",
        "weightKg": 24,
        "price": 348,
        "unit": "per carcass"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock",
      "hungWeightKg": "Custom hung carcass weight"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 175
  },
  {
    "id": "lamb-quarter-carcass",
    "slug": "lamb-quarter-carcass",
    "name": "1/4 Lamb (Quarter Carcass Pack)",
    "category": "lamb",
    "subcategory": "whole-carcasses",
    "description": "One quarter of a prime lamb carcass (~5kg net weight). A convenient starter pack featuring a leg or shoulder roast plus chops.",
    "longDescription": "Ideal for smaller households wanting abattoir-direct prices. Pre-portioned and vacuum sealed: Includes 1 Roast, Loin Chops, Cutlets, and Shank.",
    "price": 15.5,
    "unit": "per kg hung",
    "badge": "Whole Carcass",
    "image": "/images/products/lamb-quarter-carcass.jpg",
    "variants": [
      {
        "id": "lqc-fore",
        "name": "1/4 Forequarter Pack (~5kg)",
        "weightKg": 5,
        "price": 77.5,
        "unit": "per pack"
      },
      {
        "id": "lqc-hind",
        "name": "1/4 Hindquarter Pack (~5kg)",
        "weightKg": 5,
        "price": 77.5,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock",
      "hungWeightKg": "Custom hung carcass weight"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 182
  },
  {
    "id": "lamb-half-carcass",
    "slug": "lamb-half-carcass",
    "name": "1/2 Lamb (Half Carcass Side)",
    "category": "lamb",
    "subcategory": "whole-carcasses",
    "description": "Half a prime lamb carcass (~10kg hung weight). Contains 1 whole leg roast, 1 shoulder roast, loin chops, cutlets, shank, and rib flaps.",
    "longDescription": "Half a side of lamb custom cut and vacuum sealed into individual dinner packs. Fits easily into any standard freezer.",
    "price": 15.5,
    "unit": "per kg hung",
    "badge": "Whole Carcass",
    "image": "/images/products/lamb-half-carcass.jpg",
    "variants": [
      {
        "id": "lhc-standard",
        "name": "Half Lamb Pack (~10kg hung)",
        "weightKg": 10,
        "price": 155,
        "unit": "per half carcass"
      },
      {
        "id": "lhc-large",
        "name": "Large Half Lamb Pack (~12kg hung)",
        "weightKg": 12,
        "price": 186,
        "unit": "per half carcass"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock",
      "hungWeightKg": "Custom hung carcass weight"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 39
  },
  {
    "id": "lamb-variety-offal",
    "slug": "lamb-variety-offal",
    "name": "Lamb Hearts, Kidneys & Livers (Variety Pack)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Fresh nutrient-dense Australian lamb offal variety pack containing cleaned hearts, kidneys, and livers. Unmatched natural vitamins.",
    "longDescription": "Packed with bioavailable iron, vitamin A, B12, and CoQ10. Carefully inspected and washed at our Cowirra processing facility. Exceptional value at $7.00/kg.",
    "price": 7,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/lamb-variety-offal.jpg",
    "variants": [
      {
        "id": "lvo-2kg",
        "name": "2kg Variety Pack",
        "weightKg": 2,
        "price": 14,
        "unit": "per pack"
      },
      {
        "id": "lvo-5kg",
        "name": "5kg Bulk Offal Pack",
        "weightKg": 5,
        "price": 35,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 46
  },
  {
    "id": "lamb-tongues",
    "slug": "lamb-tongues",
    "name": "Lamb Tongues (Clean Trim)",
    "category": "lamb",
    "subcategory": "single-cuts",
    "description": "Clean-trimmed Australian lamb tongues. Delicately textured delicacy ideal for corning, braising, or slicing into tacos and salads.",
    "longDescription": "Prepared and denuded of excess fat. Simmer with aromatics until skin peels easily, revealing soft, velvety meat with deep savoury flavour.",
    "price": 14,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/lamb-tongues.jpg",
    "variants": [
      {
        "id": "ltg-1kg",
        "name": "1kg Tongues Pack",
        "weightKg": 1,
        "price": 14,
        "unit": "per pack"
      },
      {
        "id": "ltg-3kg",
        "name": "3kg Bulk Pack",
        "weightKg": 3,
        "price": 42,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 53
  },
  {
    "id": "beef-mince",
    "slug": "beef-mince",
    "name": "Beef Mince (Sold in 2kg bags)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Premium Australian butcher beef mince with ~85CL lean meat to fat ratio. Sold in convenient 2kg vacuum-sealed cryovac bags ($25.00/bag).",
    "longDescription": "Freshly minced daily from clean pasture beef trim. Free of preservatives, fillers, or added water. Ideal for homemade burgers, bolognese, meatballs, and meal prep.",
    "price": 12.5,
    "unit": "per kg (2kg bag)",
    "badge": "Popular",
    "image": "/images/products/beef-mince.jpg",
    "variants": [
      {
        "id": "bm-2kg",
        "name": "2kg Bag ($12.50/kg)",
        "weightKg": 2,
        "price": 25,
        "unit": "per 2kg bag"
      },
      {
        "id": "bm-6kg",
        "name": "6kg Carton (3 x 2kg bags)",
        "weightKg": 6,
        "price": 75,
        "unit": "per carton"
      },
      {
        "id": "bm-10kg",
        "name": "10kg Wholesale Box (5 x 2kg bags)",
        "weightKg": 10,
        "price": 125,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 60
  },
  {
    "id": "beef-bbq-sausages",
    "slug": "beef-bbq-sausages",
    "name": "BBQ Sausages (Sold in 2kg bags)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Traditional Australian beef BBQ sausages in natural casings. Sold in 2kg bags ($16.00/bag). The classic sausage sizzle champion.",
    "longDescription": "Seasoned with heritage Australian butcher herbs and mild spices. Plump, juicy, and perfect for hotplate barbecue frying.",
    "price": 8,
    "unit": "per kg (2kg bag)",
    "badge": "Best Value",
    "image": "/images/products/beef-bbq-sausages.jpg",
    "variants": [
      {
        "id": "bs-2kg",
        "name": "2kg Bag (approx. 20 sausages)",
        "weightKg": 2,
        "price": 16,
        "unit": "per 2kg bag"
      },
      {
        "id": "bs-6kg",
        "name": "6kg Party Carton (3 x 2kg bags)",
        "weightKg": 6,
        "price": 48,
        "unit": "per carton"
      },
      {
        "id": "bs-10kg",
        "name": "10kg Community / Club Bulk Box",
        "weightKg": 10,
        "price": 80,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 67
  },
  {
    "id": "beef-bolar-blade",
    "slug": "beef-bolar-blade",
    "name": "Bolar Blade",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian pasture beef bolar blade primal. Rich marbling and lean structure makes it the supreme traditional pot roast.",
    "longDescription": "Cut from the beef shoulder clod. When braised or oven-roasted slowly, bolar blade produces fork-tender roast beef with delicious gravy juices.",
    "price": 15.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-bolar-blade.jpg",
    "variants": [
      {
        "id": "bbb-25kg",
        "name": "Whole Roast (~2.5kg)",
        "weightKg": 2.5,
        "price": 38.75,
        "unit": "per roast"
      },
      {
        "id": "bbb-5kg",
        "name": "Twin Roast Pack (~5kg total)",
        "weightKg": 5,
        "price": 77.5,
        "unit": "per pack"
      },
      {
        "id": "bbb-10kg",
        "name": "10kg Commercial Box",
        "weightKg": 10,
        "price": 155,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 74
  },
  {
    "id": "beef-butt-fillet",
    "slug": "beef-butt-fillet",
    "name": "Butt Fillet",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Thick head portion of the beef tenderloin (Chateaubriand cut). Exquisite tenderness and exceptional culinary versatility.",
    "longDescription": "The widest, most succulent portion of the beef tenderloin. Perfect for high-end beef Wellington, thick medallion steaks, or roasting whole as Chateaubriand.",
    "price": 36,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-butt-fillet.jpg",
    "variants": [
      {
        "id": "bbf-15kg",
        "name": "Whole Butt Fillet Piece (~1.5kg)",
        "weightKg": 1.5,
        "price": 54,
        "unit": "per piece"
      },
      {
        "id": "bbf-3kg",
        "name": "Twin Butt Fillet Pack (~3.0kg total)",
        "weightKg": 3,
        "price": 108,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 81
  },
  {
    "id": "beef-chuck-portions",
    "slug": "beef-chuck-portions",
    "name": "Chuck Portions",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole and portioned Australian beef chuck roll roasts. Heavy marbling and intense beefy depth for pulled beef and slow cooking.",
    "longDescription": "Cut from the forequarter neck and shoulder. Full of internal fat seams that break down during 5-hour smoking or Dutch oven braising into unctuous shredded beef.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-chuck-portions.jpg",
    "variants": [
      {
        "id": "bcp-2kg",
        "name": "2kg Chuck Roast Portion",
        "weightKg": 2,
        "price": 32,
        "unit": "per portion"
      },
      {
        "id": "bcp-5kg",
        "name": "5kg Bulk Chuck Box",
        "weightKg": 5,
        "price": 80,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 88
  },
  {
    "id": "beef-chuck-steak-sliced",
    "slug": "beef-chuck-steak-sliced",
    "name": "Chuck Steak Sliced",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Hand-sliced thick beef chuck steaks. The essential cut for homemade beef and Guinness pies, hearty goulash, and slow curries.",
    "longDescription": "Pre-sliced into uniform 20mm steaks. Brown hard in oil to build fond, then slow simmer for rich melt-in-your-mouth beef gravy.",
    "price": 17,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-chuck-steak-sliced.jpg",
    "variants": [
      {
        "id": "bcss-15kg",
        "name": "1.5kg Pack Chuck Steaks",
        "weightKg": 1.5,
        "price": 25.5,
        "unit": "per pack"
      },
      {
        "id": "bcss-3kg",
        "name": "3kg Family Pack",
        "weightKg": 3,
        "price": 51,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 95
  },
  {
    "id": "beef-chuck-tender",
    "slug": "beef-chuck-tender",
    "name": "Chuck Tender",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Conical tender muscle from the shoulder clod (Mock Tender / Petite Tender). Lean, cylindrical roast cut.",
    "longDescription": "Resembling a mini tenderloin log, chuck tender is exceptionally lean with fine grain. Excellent for pot roasting, char siu beef, or thin stir-fry slicing.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-chuck-tender.jpg",
    "variants": [
      {
        "id": "bct-15kg",
        "name": "Single Chuck Tender (~1.5kg)",
        "weightKg": 1.5,
        "price": 24,
        "unit": "per piece"
      },
      {
        "id": "bct-3kg",
        "name": "Twin Pack (~3.0kg total)",
        "weightKg": 3,
        "price": 48,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 102
  },
  {
    "id": "beef-diced",
    "slug": "beef-diced",
    "name": "Diced Beef",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "100% lean boneless diced beef hand-cut into 25mm cubes from prime shoulder and round cuts.",
    "longDescription": "Trimmed free of excess fat and gristle. Ready to drop straight into casseroles, beef bourguignon, and slow-cooker curries.",
    "price": 18,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-diced.jpg",
    "variants": [
      {
        "id": "bdb-1kg",
        "name": "1kg Diced Beef Pack",
        "weightKg": 1,
        "price": 18,
        "unit": "per pack"
      },
      {
        "id": "bdb-25kg",
        "name": "2.5kg Family Pack",
        "weightKg": 2.5,
        "price": 45,
        "unit": "per pack"
      },
      {
        "id": "bdb-5kg",
        "name": "5kg Bulk Butcher Carton",
        "weightKg": 5,
        "price": 90,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 109
  },
  {
    "id": "beef-tenderloin-long-fillet",
    "slug": "beef-tenderloin-long-fillet",
    "name": "Tenderloin / Long Fillet",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Complete whole unportioned grass-fed beef eye fillet tenderloin log. The tenderest beef primal in Australia.",
    "longDescription": "Whole pristine tenderloin primal denuded and silver-skin trimmed. Cut your own custom filet mignon steaks or roast whole for royal centerpieces.",
    "price": 38,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-tenderloin-long-fillet.jpg",
    "variants": [
      {
        "id": "btlf-2kg",
        "name": "Whole Tenderloin Log (~2.0kg)",
        "weightKg": 2,
        "price": 76,
        "unit": "per primal"
      },
      {
        "id": "btlf-25kg",
        "name": "Large Tenderloin Log (~2.5kg)",
        "weightKg": 2.5,
        "price": 95,
        "unit": "per primal"
      },
      {
        "id": "btlf-twin",
        "name": "Twin Primal Pack (~4.5kg total)",
        "weightKg": 4.5,
        "price": 171,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 116
  },
  {
    "id": "beef-eye-round-girello",
    "slug": "beef-eye-round-girello",
    "name": "Eye Round DND / Girello",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "100% denuded (DND) whole beef eye round (Girello). Very lean cylindrical cut prized for roast beef, carpaccio, and biltong.",
    "longDescription": "Zero waste cylindrical primal. Slices into uniform circular roast beef discs or paper-thin carpaccio. Excellent lean protein for fitness and meal prep.",
    "price": 17.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-eye-round-girello.jpg",
    "variants": [
      {
        "id": "ber-2kg",
        "name": "Whole Eye Round (~2.0kg)",
        "weightKg": 2,
        "price": 35,
        "unit": "per piece"
      },
      {
        "id": "ber-3kg",
        "name": "Large Eye Round (~3.0kg)",
        "weightKg": 3,
        "price": 52.5,
        "unit": "per piece"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 123
  },
  {
    "id": "beef-fingers",
    "slug": "beef-fingers",
    "name": "Beef Fingers (Intercostal Ribs)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Boneless beef intercostal strips cut from between rib bones. Dense marbling that melts over hot charcoal or in a Korean BBQ grill.",
    "longDescription": "Intensely flavourful beef finger meat. The intercostal muscles carry deep grain-fed beef sweetness that caramelises crisply when pan-seared or grilled on skewers.",
    "price": 17.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-fingers.jpg",
    "variants": [
      {
        "id": "bfi-15kg",
        "name": "1.5kg Pack Beef Fingers",
        "weightKg": 1.5,
        "price": 26.25,
        "unit": "per pack"
      },
      {
        "id": "bfi-3kg",
        "name": "3kg Pitmaster Pack",
        "weightKg": 3,
        "price": 52.5,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 130
  },
  {
    "id": "beef-flank-steak",
    "slug": "beef-flank-steak",
    "name": "Flank Steak",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian beef flank steak with prominent long muscle grain. The ultimate steak for fajitas, London broil, and carne asada.",
    "longDescription": "Sear quickly over direct high heat to medium-rare, rest for 10 minutes, and slice thinly against the grain for remarkably tender, flavour-packed steak.",
    "price": 17.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-flank-steak.jpg",
    "variants": [
      {
        "id": "bfs-1kg",
        "name": "Whole Flank Steak (~1.0kg)",
        "weightKg": 1,
        "price": 17.5,
        "unit": "per steak"
      },
      {
        "id": "bfs-25kg",
        "name": "Twin Flank Pack (~2.5kg total)",
        "weightKg": 2.5,
        "price": 43.75,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 137
  },
  {
    "id": "beef-gravy-beef",
    "slug": "beef-gravy-beef",
    "name": "Gravy Beef",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole boneless beef shin and heel cuts packed with natural gelatin. Creates the thickest, most flavourful beef gravy imaginable.",
    "longDescription": "The traditional choice for slow winter stews and meat pies. As it gently simmers over low heat, the rich connective tissue dissolves into glossy, rich sauce.",
    "price": 15.5,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/beef-gravy-beef.jpg",
    "variants": [
      {
        "id": "bgb-2kg",
        "name": "2kg Gravy Beef Roast",
        "weightKg": 2,
        "price": 31,
        "unit": "per piece"
      },
      {
        "id": "bgb-5kg",
        "name": "5kg Bulk Simmer Pack",
        "weightKg": 5,
        "price": 77.5,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 144
  },
  {
    "id": "beef-gravy-beef-sliced",
    "slug": "beef-gravy-beef-sliced",
    "name": "Gravy Beef Sliced",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Pre-sliced thick medallions of beef shin gravy meat. Ready to brown and slow braise.",
    "longDescription": "Pre-sliced for customer convenience. Eliminates prep time while delivering magnificent depth to beef stews and casseroles.",
    "price": 16.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-gravy-beef-sliced.jpg",
    "variants": [
      {
        "id": "bgbs-15kg",
        "name": "1.5kg Sliced Gravy Beef",
        "weightKg": 1.5,
        "price": 24.75,
        "unit": "per pack"
      },
      {
        "id": "bgbs-3kg",
        "name": "3kg Family Pack",
        "weightKg": 3,
        "price": 49.5,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 151
  },
  {
    "id": "beef-heel-shin",
    "slug": "beef-heel-shin",
    "name": "Heel Shin",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole boneless lower leg heel shin muscle. Loaded with natural collagen fibers for slow pot roasts.",
    "longDescription": "A classic butcher cut that yields astonishing tenderness when slow cooked. Perfect for pot roast recipes and pulled beef sliders.",
    "price": 15.5,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/beef-heel-shin.jpg",
    "variants": [
      {
        "id": "bhs-2kg",
        "name": "2kg Whole Heel Shin",
        "weightKg": 2,
        "price": 31,
        "unit": "per piece"
      },
      {
        "id": "bhs-4kg",
        "name": "Twin Pack (~4kg total)",
        "weightKg": 4,
        "price": 62,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 158
  },
  {
    "id": "beef-knuckle",
    "slug": "beef-knuckle",
    "name": "Knuckle",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian beef round knuckle primal (Sirloin Tip). Very lean, versatile primal for roasts, minute steaks, and stir-fry.",
    "longDescription": "Cut from the front of the beef round. Highly versatile for whole roasting, slicing into minute schnitzel steaks, or making ultra-lean ground beef.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-knuckle.jpg",
    "variants": [
      {
        "id": "bkn-4kg",
        "name": "Whole Knuckle Primal (~4.0kg)",
        "weightKg": 4,
        "price": 64,
        "unit": "per primal"
      },
      {
        "id": "bkn-8kg",
        "name": "Large Primal (~8.0kg)",
        "weightKg": 8,
        "price": 128,
        "unit": "per primal"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 165
  },
  {
    "id": "beef-osso-bucco",
    "slug": "beef-osso-bucco",
    "name": "Osso Bucco",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Center-cut beef shin discs with rich bone marrow exposed in the center. The legendary Italian braising cut.",
    "longDescription": "Hand saw-cut into 30mm thick rounds. As the dish braises with white wine, tomatoes, and gremolata, the marrow melts into the sauce while the meat becomes fork-tender.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-osso-bucco.jpg",
    "variants": [
      {
        "id": "bob-15kg",
        "name": "1.5kg Osso Bucco Pack",
        "weightKg": 1.5,
        "price": 24,
        "unit": "per pack"
      },
      {
        "id": "bob-3kg",
        "name": "3kg Family Pack",
        "weightKg": 3,
        "price": 48,
        "unit": "per pack"
      },
      {
        "id": "bob-6kg",
        "name": "6kg Wholesale Box",
        "weightKg": 6,
        "price": 96,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 172
  },
  {
    "id": "beef-oxtail-sliced",
    "slug": "beef-oxtail-sliced",
    "name": "Oxtail Sliced",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Clean cross-cut beef oxtail segments. Supreme richness and unctuous collagen for Jamaican oxtail stew and gourmet soups.",
    "longDescription": "Freshly saw-cut along the tail joints. Slow simmered with allspice, butter beans, and thyme, oxtail produces an incomparable silky, rich gravy.",
    "price": 20.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-oxtail-sliced.jpg",
    "variants": [
      {
        "id": "box-15kg",
        "name": "1.5kg Oxtail Pack",
        "weightKg": 1.5,
        "price": 30.75,
        "unit": "per pack"
      },
      {
        "id": "box-3kg",
        "name": "3kg Stew Master Pack",
        "weightKg": 3,
        "price": 61.5,
        "unit": "per pack"
      },
      {
        "id": "box-6kg",
        "name": "6kg Commercial Box",
        "weightKg": 6,
        "price": 123,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 179
  },
  {
    "id": "beef-oyster-blade",
    "slug": "beef-oyster-blade",
    "name": "Oyster Blade",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian pasture beef oyster blade roast (Flat Iron cut). Central gelatin seam that melts into pure tenderness.",
    "longDescription": "Situated below the shoulder blade. Either roast whole as a pot roast or trim out the central sinew to produce tender Flat Iron steaks.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-oyster-blade.jpg",
    "variants": [
      {
        "id": "bob-2kg",
        "name": "Whole Oyster Blade (~2kg)",
        "weightKg": 2,
        "price": 32,
        "unit": "per piece"
      },
      {
        "id": "bob-4kg",
        "name": "Twin Pack (~4kg total)",
        "weightKg": 4,
        "price": 64,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 36
  },
  {
    "id": "beef-oyster-blade-sliced",
    "slug": "beef-oyster-blade-sliced",
    "name": "Oyster Blade Sliced",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Sliced oyster blade steaks with distinct central gelatin seam. Ideal for sizzling steaks, braises, and hotpot.",
    "longDescription": "Pre-portioned into 15mm steaks. Tender on the grill or slowly braised into velvety tenderness.",
    "price": 17,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-oyster-blade-sliced.jpg",
    "variants": [
      {
        "id": "bobs-15kg",
        "name": "1.5kg Sliced Steaks Pack",
        "weightKg": 1.5,
        "price": 25.5,
        "unit": "per pack"
      },
      {
        "id": "bobs-3kg",
        "name": "3kg Family Pack",
        "weightKg": 3,
        "price": 51,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 43
  },
  {
    "id": "beef-pe-brisket",
    "slug": "beef-pe-brisket",
    "name": "PE Brisket (Point End)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Point End (PE) beef brisket with rich intramuscular fat deckle. The premier cut for burnt ends and smoky Texas barbecue.",
    "longDescription": "The juiciest portion of the brisket primal. Deep fat marbling keeps the meat tender and moist through 14 hours of low-and-slow smoking.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-pe-brisket.jpg",
    "variants": [
      {
        "id": "bpe-3kg",
        "name": "Whole Point End Brisket (~3.0kg)",
        "weightKg": 3,
        "price": 48,
        "unit": "per piece"
      },
      {
        "id": "bpe-5kg",
        "name": "Large Point End Brisket (~5.0kg)",
        "weightKg": 5,
        "price": 80,
        "unit": "per piece"
      },
      {
        "id": "bpe-10kg",
        "name": "10kg Wholesale Pitmaster Carton",
        "weightKg": 10,
        "price": 160,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 50
  },
  {
    "id": "beef-porterhouse-sliced-100d",
    "slug": "beef-porterhouse-sliced-100d",
    "name": "Porterhouse Sliced 100-Day Grain Fed",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "100-day grain-fed Australian beef striploin steaks with white fat cap and fine marbling. Center-cut steakhouse quality.",
    "longDescription": "Thick hand-sliced 300g porterhouse steaks from cattle finished for 100 days on Australian grains. Exceptionally tender, juicy, and consistent.",
    "price": 32,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-porterhouse-sliced-100d.jpg",
    "variants": [
      {
        "id": "bps-1kg",
        "name": "1kg Pack (approx. 3-4 steaks)",
        "weightKg": 1,
        "price": 32,
        "unit": "per pack"
      },
      {
        "id": "bps-25kg",
        "name": "2.5kg Steakhouse Pack",
        "weightKg": 2.5,
        "price": 80,
        "unit": "per pack"
      },
      {
        "id": "bps-5kg",
        "name": "5kg Wholesale Box",
        "weightKg": 5,
        "price": 160,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 57
  },
  {
    "id": "beef-porterhouse-whole-100d",
    "slug": "beef-porterhouse-whole-100d",
    "name": "Porterhouse Whole 100-Day Grain Fed",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole uncut 100-day grain-fed striploin primal (~5.0kg). Slice your own custom steaks or roast whole on the spit.",
    "longDescription": "The whole striploin primal with untouched fat cap. Save money buying wholesale in one piece and cut steaks to your exact preferred thickness.",
    "price": 30,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-porterhouse-whole-100d.jpg",
    "variants": [
      {
        "id": "bpw-5kg",
        "name": "Whole Striploin Primal (~5.0kg)",
        "weightKg": 5,
        "price": 150,
        "unit": "per primal"
      },
      {
        "id": "bpw-10kg",
        "name": "Twin Primal Carton (~10.0kg total)",
        "weightKg": 10,
        "price": 300,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 64
  },
  {
    "id": "beef-rib-eye-bone-in-op-rib",
    "slug": "beef-rib-eye-bone-in-op-rib",
    "name": "Rib Eye On The Bone (OP Rib)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Oven-prepared (OP) bone-in prime rib eye steaks with prominent fat eye and clean bone. The ultimate steak indulgence.",
    "longDescription": "Cut from the prime beef rib set with the bone attached to insulate the meat during searing and roasting. Buttery richness that dissolves on the tongue.",
    "price": 35,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-rib-eye-bone-in-op-rib.jpg",
    "variants": [
      {
        "id": "bop-800g",
        "name": "Thick Cut OP Rib Steak (~800g)",
        "weightKg": 0.8,
        "price": 28,
        "unit": "per steak"
      },
      {
        "id": "bop-16kg",
        "name": "Twin OP Rib Pack (~1.6kg total)",
        "weightKg": 1.6,
        "price": 56,
        "unit": "per pack"
      },
      {
        "id": "bop-whole-4kg",
        "name": "Whole Standing Rib Roast 4-Bone (~4.0kg)",
        "weightKg": 4,
        "price": 140,
        "unit": "per roast"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 71
  },
  {
    "id": "beef-rostbiff",
    "slug": "beef-rostbiff",
    "name": "Rostbiff",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian beef rump center (Rostbiff). Very lean, fine-grained roasting joint or medallion steak cut.",
    "longDescription": "The heart of the beef rump, denuded of all outer connective tissue. Superb as an oven roast or sliced into tender rump medallions.",
    "price": 22,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-rostbiff.jpg",
    "variants": [
      {
        "id": "brb-2kg",
        "name": "Whole Rostbiff (~2.0kg)",
        "weightKg": 2,
        "price": 44,
        "unit": "per piece"
      },
      {
        "id": "brb-4kg",
        "name": "Twin Pack Rostbiff (~4.0kg total)",
        "weightKg": 4,
        "price": 88,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 78
  },
  {
    "id": "beef-rump-sliced",
    "slug": "beef-rump-sliced",
    "name": "Rump Sliced",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Thick hand-sliced prime Australian beef rump steaks. Big, robust beef flavour and tender chew on the grill.",
    "longDescription": "A classic Australian favourite. Sliced into generous 250g steaks with an intact border of sweet fat. Grill fast and rest well.",
    "price": 24,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-rump-sliced.jpg",
    "variants": [
      {
        "id": "brs-1kg",
        "name": "1kg Rump Steaks Pack",
        "weightKg": 1,
        "price": 24,
        "unit": "per pack"
      },
      {
        "id": "brs-25kg",
        "name": "2.5kg Family Pack",
        "weightKg": 2.5,
        "price": 60,
        "unit": "per pack"
      },
      {
        "id": "brs-5kg",
        "name": "5kg Wholesale Box",
        "weightKg": 5,
        "price": 120,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 85
  },
  {
    "id": "beef-rump-whole",
    "slug": "beef-rump-whole",
    "name": "Rump Whole",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian beef rump primal (~6.0kg). Contains picanha cap, rostbiff center, and rump side. Maximum butcher value.",
    "longDescription": "Buy whole and save. Easily broken down into premium picanha steaks, lean roasting portions, and tender steak strips.",
    "price": 21,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/beef-rump-whole.jpg",
    "variants": [
      {
        "id": "brw-6kg",
        "name": "Whole Rump Primal (~6.0kg)",
        "weightKg": 6,
        "price": 126,
        "unit": "per primal"
      },
      {
        "id": "brw-12kg",
        "name": "Twin Primal Box (~12.0kg total)",
        "weightKg": 12,
        "price": 252,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 92
  },
  {
    "id": "beef-scotch-fillet-msa-sliced",
    "slug": "beef-scotch-fillet-msa-sliced",
    "name": "Scotch Fillet MSA Sliced",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "MSA-graded grass-fed Scotch Fillet (Ribeye) boneless steaks. Supreme tenderness with juicy central eye of fat.",
    "longDescription": "Certified Meat Standards Australia (MSA) for guaranteed eating quality. Hand-cut to 25mm thickness, ready for high-heat steak perfection.",
    "price": 35,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-scotch-fillet-msa-sliced.jpg",
    "variants": [
      {
        "id": "bsfm-1kg",
        "name": "1kg Sliced Steaks Pack",
        "weightKg": 1,
        "price": 35,
        "unit": "per pack"
      },
      {
        "id": "bsfm-25kg",
        "name": "2.5kg Steakhouse Pack",
        "weightKg": 2.5,
        "price": 87.5,
        "unit": "per pack"
      },
      {
        "id": "bsfm-5kg",
        "name": "5kg Wholesale Box",
        "weightKg": 5,
        "price": 175,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 99
  },
  {
    "id": "beef-scotch-whole-msa-cube-roll",
    "slug": "beef-scotch-whole-msa-cube-roll",
    "name": "Scotch Whole MSA (Cube Roll)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole MSA certified boneless cube roll primal (~3.5kg). Slice your own steaks or roast whole for royal prime rib.",
    "longDescription": "The whole unportioned cube roll from grass-fed South Australian cattle. Superior marbling and unmatched juiciness.",
    "price": 33,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-scotch-whole-msa-cube-roll.jpg",
    "variants": [
      {
        "id": "bswm-35kg",
        "name": "Whole Cube Roll (~3.5kg)",
        "weightKg": 3.5,
        "price": 115.5,
        "unit": "per primal"
      },
      {
        "id": "bswm-7kg",
        "name": "Twin Primal Box (~7.0kg total)",
        "weightKg": 7,
        "price": 231,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 106
  },
  {
    "id": "beef-scotch-fillet-100d-sliced",
    "slug": "beef-scotch-fillet-100d-sliced",
    "name": "Scotch Fillet 100D Sliced",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "100-day grain-assisted Scotch Fillet steaks with buttery snowflake marbling. Top-tier restaurant steak cut.",
    "longDescription": "Enhanced intramuscular marbling resulting from 100 days grain ration. Melts like butter in the pan with deep beef richness.",
    "price": 37,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-scotch-fillet-100d-sliced.jpg",
    "variants": [
      {
        "id": "bsf1-1kg",
        "name": "1kg Sliced Steaks Pack",
        "weightKg": 1,
        "price": 37,
        "unit": "per pack"
      },
      {
        "id": "bsf1-25kg",
        "name": "2.5kg Steakhouse Box",
        "weightKg": 2.5,
        "price": 92.5,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100-Day Grain-Assisted Australian Beef"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 113
  },
  {
    "id": "beef-scotch-whole-100d-cube-roll",
    "slug": "beef-scotch-whole-100d-cube-roll",
    "name": "Scotch Whole 100D (Cube Roll)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole 100-day grain-fed cube roll primal (~3.8kg). Exceptional marbling and tender yield for fine dining.",
    "longDescription": "Whole uncut 100D ribeye cube roll. The premier choice for catering chefs, master barbecuers, and private meat lockers.",
    "price": 35,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-scotch-whole-100d-cube-roll.jpg",
    "variants": [
      {
        "id": "bsw1-38kg",
        "name": "Whole 100D Cube Roll (~3.8kg)",
        "weightKg": 3.8,
        "price": 133,
        "unit": "per primal"
      },
      {
        "id": "bsw1-76kg",
        "name": "Twin Primal Carton (~7.6kg total)",
        "weightKg": 7.6,
        "price": 266,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100-Day Grain-Assisted Australian Beef"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 120
  },
  {
    "id": "beef-silverside-outside-flat",
    "slug": "beef-silverside-outside-flat",
    "name": "Silverside (Outside Flat)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian beef outside flat silverside. The classic cut for corned beef, pastrami, and lean beef roasts.",
    "longDescription": "Dense, lean beef muscle with fine grain. Simmer slowly with cloves, vinegar, and brown sugar for mouthwatering corned silverside.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-silverside-outside-flat.jpg",
    "variants": [
      {
        "id": "bso-25kg",
        "name": "Whole Silverside Roast (~2.5kg)",
        "weightKg": 2.5,
        "price": 40,
        "unit": "per piece"
      },
      {
        "id": "bso-5kg",
        "name": "Twin Roast Pack (~5.0kg total)",
        "weightKg": 5,
        "price": 80,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 127
  },
  {
    "id": "beef-spare-ribs",
    "slug": "beef-spare-ribs",
    "name": "Spare Ribs",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Meaty Australian beef spare ribs with generous layers of meat and fat on the bone. Perfect for low-and-slow smoking.",
    "longDescription": "Smoked over hickory or red gum at 110°C for 6 hours, these ribs develop a dark mahogany bark and fall-off-the-bone tenderness.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-spare-ribs.jpg",
    "variants": [
      {
        "id": "bsr-2kg",
        "name": "2kg Ribs Rack",
        "weightKg": 2,
        "price": 32,
        "unit": "per rack"
      },
      {
        "id": "bsr-5kg",
        "name": "5kg Bulk Pitmaster Carton",
        "weightKg": 5,
        "price": 80,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 134
  },
  {
    "id": "beef-stir-fry",
    "slug": "beef-stir-fry",
    "name": "Stir Fry Beef",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Hand-sliced strips of tender Australian beef. 100% lean, trimmed, and ready for high-heat wok cooking.",
    "longDescription": "Thinly cut across the grain from tender rump and topside cuts. Wok-sear with ginger, garlic, and oyster sauce in under 3 minutes.",
    "price": 18,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-stir-fry.jpg",
    "variants": [
      {
        "id": "bsf-1kg",
        "name": "1kg Stir Fry Pack",
        "weightKg": 1,
        "price": 18,
        "unit": "per pack"
      },
      {
        "id": "bsf-25kg",
        "name": "2.5kg Family Pack",
        "weightKg": 2.5,
        "price": 45,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 141
  },
  {
    "id": "beef-t-bones",
    "slug": "beef-t-bones",
    "name": "T-Bones",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Classic Australian pasture beef T-bone steaks. Features striploin on one side and tender eye fillet on the other.",
    "longDescription": "Center-cut through the shortloin. The central T-bone locks in natural juices while imparting mineral richness during searing.",
    "price": 24,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-t-bones.jpg",
    "variants": [
      {
        "id": "btb-1kg",
        "name": "1kg Twin T-Bone Pack",
        "weightKg": 1,
        "price": 24,
        "unit": "per pack"
      },
      {
        "id": "btb-25kg",
        "name": "2.5kg Family Steakhouse Pack",
        "weightKg": 2.5,
        "price": 60,
        "unit": "per pack"
      },
      {
        "id": "btb-5kg",
        "name": "5kg Wholesale Box",
        "weightKg": 5,
        "price": 120,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 148
  },
  {
    "id": "beef-tendons",
    "slug": "beef-tendons",
    "name": "Beef Tendons",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Clean-trimmed Australian beef shank and heel tendons. Rich in pure collagen, ideal for authentic Vietnamese Pho and braised tendon pots.",
    "longDescription": "High gelatin content that softens into a silky texture after long, gentle simmering. Prized for skin, joint, and gut health.",
    "price": 12,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/beef-tendons.jpg",
    "variants": [
      {
        "id": "btn-1kg",
        "name": "1kg Tendons Pack",
        "weightKg": 1,
        "price": 12,
        "unit": "per pack"
      },
      {
        "id": "btn-3kg",
        "name": "3kg Bulk Broth Pack",
        "weightKg": 3,
        "price": 36,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 155
  },
  {
    "id": "beef-thick-skirt",
    "slug": "beef-thick-skirt",
    "name": "Thick Skirt (Hanger / Onglet)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Thick beef skirt steak (the butcher’s hanger steak). Intense beefy flavour and tender coarse grain.",
    "longDescription": "Historically kept by butchers for their own families because of its unmatched deep flavour. Sear hot to medium-rare and carve thinly.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-thick-skirt.jpg",
    "variants": [
      {
        "id": "bts-15kg",
        "name": "1.5kg Skirt Steak Pack",
        "weightKg": 1.5,
        "price": 24,
        "unit": "per pack"
      },
      {
        "id": "bts-3kg",
        "name": "3kg BBQ Pack",
        "weightKg": 3,
        "price": 48,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 162
  },
  {
    "id": "beef-tomahawk-steaks",
    "slug": "beef-tomahawk-steaks",
    "name": "Tomahawk Steaks",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Show-stopping giant bone-in Australian beef tomahawk ribeye steaks. Dry-aged with clean French-trimmed bone.",
    "longDescription": "The ultimate culinary centerpiece. Weighing 1.2kg to 1.6kg each with a long bone handle and rich intramuscular marbling.",
    "price": 29,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-tomahawk-steaks.jpg",
    "variants": [
      {
        "id": "bts-12kg",
        "name": "Single Tomahawk Steak (~1.2kg)",
        "weightKg": 1.2,
        "price": 34.8,
        "unit": "per steak"
      },
      {
        "id": "bts-15kg",
        "name": "Monster Tomahawk Steak (~1.5kg)",
        "weightKg": 1.5,
        "price": 43.5,
        "unit": "per steak"
      },
      {
        "id": "bts-pair",
        "name": "Twin Tomahawk Pack (~2.8kg total)",
        "weightKg": 2.8,
        "price": 81.2,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 169
  },
  {
    "id": "beef-topside-cap-off",
    "slug": "beef-topside-cap-off",
    "name": "Topside Cap Off",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole Australian beef topside with outer cap muscle removed. Pure lean red meat for tender schnitzels and deli roast beef.",
    "longDescription": "Extremely lean with virtually zero surface fat. Hand-slice into wafer-thin schnitzels, cube for skewers, or roast whole.",
    "price": 17.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-topside-cap-off.jpg",
    "variants": [
      {
        "id": "btco-3kg",
        "name": "Whole Roast (~3.0kg)",
        "weightKg": 3,
        "price": 52.5,
        "unit": "per piece"
      },
      {
        "id": "btco-6kg",
        "name": "Whole Topside Primal (~6.0kg)",
        "weightKg": 6,
        "price": 105,
        "unit": "per primal"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 176
  },
  {
    "id": "beef-topside-denuded",
    "slug": "beef-topside-denuded",
    "name": "Topside Denuded",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "100% fully denuded beef topside with all silver-skin, sinew, and connective tissue stripped clean. 100% usable meat.",
    "longDescription": "Master butcher prepared for maximum kitchen efficiency. Zero trimming required — slice directly for minute steaks, carpaccio, or jerky.",
    "price": 19,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/beef-topside-denuded.jpg",
    "variants": [
      {
        "id": "btd-25kg",
        "name": "Denuded Piece (~2.5kg)",
        "weightKg": 2.5,
        "price": 47.5,
        "unit": "per piece"
      },
      {
        "id": "btd-5kg",
        "name": "Whole Primal (~5.0kg)",
        "weightKg": 5,
        "price": 95,
        "unit": "per primal"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 183
  },
  {
    "id": "beef-topside-whole",
    "slug": "beef-topside-whole",
    "name": "Topside Whole",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Whole beef topside primal with natural cap (~7kg). Economical bulk buy for families, butchers, and caterers.",
    "longDescription": "The entire topside primal as it comes off the beef hindquarter rail. Highest yield per dollar for high-volume slicing and roasting.",
    "price": 16.5,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/beef-topside-whole.jpg",
    "variants": [
      {
        "id": "btw-7kg",
        "name": "Whole Topside Primal (~7.0kg)",
        "weightKg": 7,
        "price": 115.5,
        "unit": "per primal"
      },
      {
        "id": "btw-14kg",
        "name": "Twin Primal Box (~14.0kg total)",
        "weightKg": 14,
        "price": 231,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 40
  },
  {
    "id": "beef-hocks",
    "slug": "beef-hocks",
    "name": "Beef Hocks (2kg bag)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Clean saw-cut beef hock portions packed into 2kg bags ($20.00/bag). Supercharged with natural collagen for bone broths and stews.",
    "longDescription": "Rich in tendon, bone marrow, and connective meat. Simmer for hours to create dense, healing bone broth that sets to pure gelatin when chilled.",
    "price": 10,
    "unit": "per kg ($20/bag)",
    "badge": "Best Value",
    "image": "/images/products/beef-hocks.jpg",
    "variants": [
      {
        "id": "bh-2kg",
        "name": "2kg Bag ($20.00 fixed)",
        "weightKg": 2,
        "price": 20,
        "unit": "per 2kg bag"
      },
      {
        "id": "bh-6kg",
        "name": "6kg Bulk Carton (3 x 2kg bags)",
        "weightKg": 6,
        "price": 60,
        "unit": "per carton"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 47
  },
  {
    "id": "beef-marrow-bones-cut",
    "slug": "beef-marrow-bones-cut",
    "name": "Beef Marrow Bones Cut ($8 bag)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Pipe cut center femur beef marrow bones packed into convenient $8.00 bags. Roast in oven for gourmet bone marrow butter.",
    "longDescription": "Clean cut by our butchers to expose rich, creamy bone marrow. Roast at 220°C for 15 minutes, spread over toasted sourdough with sea salt and parsley.",
    "price": 8,
    "unit": "per bag",
    "badge": "Popular",
    "image": "/images/products/beef-marrow-bones-cut.jpg",
    "variants": [
      {
        "id": "bmb-bag",
        "name": "Standard Bag (~2kg bones)",
        "weightKg": 2,
        "price": 8,
        "unit": "per bag"
      },
      {
        "id": "bmb-3bags",
        "name": "3-Bag Value Pack",
        "weightKg": 6,
        "price": 24,
        "unit": "per bundle"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 54
  },
  {
    "id": "beef-chuck-bones",
    "slug": "beef-chuck-bones",
    "name": "Beef Chuck Bones ($8.00 bag)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Meaty beef chuck and neck soup bones packed into $8.00 bags. High meat content for rich brown stocks and French onion soup.",
    "longDescription": "Carrying generous pieces of beef chuck meat clinging to the bone. Roast until caramelised then simmer with mirepoix for deeply savoury broth.",
    "price": 8,
    "unit": "per bag",
    "badge": "Best Value",
    "image": "/images/products/beef_short_ribs_1795133809111.jpg",
    "variants": [
      {
        "id": "bcb-bag",
        "name": "Standard Bag (~2.5kg bones)",
        "weightKg": 2.5,
        "price": 8,
        "unit": "per bag"
      },
      {
        "id": "bcb-3bags",
        "name": "3-Bag Value Bundle",
        "weightKg": 7.5,
        "price": 24,
        "unit": "per bundle"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 61
  },
  {
    "id": "beef-variety-hearts-livers-lungs",
    "slug": "beef-variety-hearts-livers-lungs",
    "name": "Beef Hearts, Livers, Lungs (Variety Pack)",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Fresh nutrient-dense Australian beef variety offal: hearts, livers, and lungs. Highest bioavailability of natural iron and CoQ10.",
    "longDescription": "Freshly washed and inspected at our Cowirra processing facility. Exceptional superfood value at just $7.00/kg.",
    "price": 7,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/beef-variety-hearts-livers-lungs.jpg",
    "variants": [
      {
        "id": "bvo-2kg",
        "name": "2kg Variety Pack",
        "weightKg": 2,
        "price": 14,
        "unit": "per pack"
      },
      {
        "id": "bvo-5kg",
        "name": "5kg Bulk Pack",
        "weightKg": 5,
        "price": 35,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 68
  },
  {
    "id": "beef-tongues",
    "slug": "beef-tongues",
    "name": "Beef Tongues",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Fresh clean-trimmed Australian beef tongues (~1.5kg each). Exceptional delicacy for Mexican lengua tacos, corning, and deli slicing.",
    "longDescription": "Simmer gently with bay leaf and peppercorns for 3 hours until tender. Peel the outer membrane and slice for melt-in-the-mouth tacos or corned tongue.",
    "price": 16,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-tongues.jpg",
    "variants": [
      {
        "id": "btg-15kg",
        "name": "Single Whole Tongue (~1.5kg)",
        "weightKg": 1.5,
        "price": 24,
        "unit": "per piece"
      },
      {
        "id": "btg-3kg",
        "name": "Twin Tongue Pack (~3.0kg total)",
        "weightKg": 3,
        "price": 48,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 75
  },
  {
    "id": "beef-honeycomb-tripe",
    "slug": "beef-honeycomb-tripe",
    "name": "Honeycomb Tripe",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Pristine cleaned and washed Australian beef honeycomb tripe (reticulum). Tender honeycomb texture for menudo, pho, and dim sum.",
    "longDescription": "Thoroughly cleaned, blanched, and prepared to the highest abattoir hygiene standards. Absorbs spicy broths and sauces with magnificent chew.",
    "price": 14.8,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-honeycomb-tripe.jpg",
    "variants": [
      {
        "id": "bht-1kg",
        "name": "1kg Honeycomb Tripe Pack",
        "weightKg": 1,
        "price": 14.8,
        "unit": "per pack"
      },
      {
        "id": "bht-3kg",
        "name": "3kg Bulk Pack",
        "weightKg": 3,
        "price": 44.4,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 82
  },
  {
    "id": "beef-omasum-tripe",
    "slug": "beef-omasum-tripe",
    "name": "Omasum Tripe",
    "category": "beef",
    "subcategory": "single-cuts",
    "description": "Cleaned Australian beef omasum tripe (book tripe / Bible tripe). Thin leaf-like folds prized for Chinese Sichuan hotpot.",
    "longDescription": "Cleaned and prepared fresh. Flash-cook in bubbling hotpot broth for 15 seconds for crisp, tender texture.",
    "price": 14.8,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/beef-omasum-tripe.jpg",
    "variants": [
      {
        "id": "bot-1kg",
        "name": "1kg Omasum Tripe Pack",
        "weightKg": 1,
        "price": 14.8,
        "unit": "per pack"
      },
      {
        "id": "bot-3kg",
        "name": "3kg Hotpot Pack",
        "weightKg": 3,
        "price": 44.4,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 89
  },
  {
    "id": "goat-bone-in-curry-pieces",
    "slug": "goat-bone-in-curry-pieces",
    "name": "Bone In Curry Pieces (Boer Goat)",
    "category": "goat",
    "subcategory": "single-cuts",
    "description": "25mm bone-in diced cubes of Australian Boer goat. Sliced with clean bandsaws for authentic dum biryani and goat curry.",
    "longDescription": "Our signature Boer goat cut from Cowirra SA. Hand-cut 25mm cubes with marrow bone centers that enrich curry gravies with clean, sweet flavour.",
    "price": 14.5,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/goat-bone-in-curry-pieces.jpg",
    "variants": [
      {
        "id": "gbc-2kg",
        "name": "2kg Fresh Goat Curry Pack",
        "weightKg": 2,
        "price": 29,
        "unit": "per pack"
      },
      {
        "id": "gbc-5kg",
        "name": "5kg Family Feast Pack",
        "weightKg": 5,
        "price": 72.5,
        "unit": "per pack"
      },
      {
        "id": "gbc-10kg",
        "name": "10kg Wholesale Restaurant Box",
        "weightKg": 10,
        "price": 145,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "Free-Range Browse & Natural Pasture"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 96
  },
  {
    "id": "goat-whole-under-20kg",
    "slug": "goat-whole-under-20kg",
    "name": "Whole Goats Under 20kg (Capretto / Young Boer)",
    "category": "goat",
    "subcategory": "whole-carcasses",
    "description": "Whole young Australian Boer goat carcass under 20kg hung weight (approx. 14kg–18kg). Very tender, sweet, and mild.",
    "longDescription": "Dressed and inspected to Halal standards. Supplied whole for Greek, Cypriot, or Caribbean spit roasting, or portioned by our butchers.",
    "price": 16.5,
    "unit": "per kg hung",
    "badge": "Whole Carcass",
    "image": "/images/products/goat-whole-under-20kg.jpg",
    "variants": [
      {
        "id": "gw-u20-15kg",
        "name": "Whole Goat Carcass (~15kg hung)",
        "weightKg": 15,
        "price": 247.5,
        "unit": "per carcass"
      },
      {
        "id": "gw-u20-18kg",
        "name": "Whole Goat Carcass (~18kg hung)",
        "weightKg": 18,
        "price": 297,
        "unit": "per carcass"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "Free-Range Browse & Natural Pasture",
      "hungWeightKg": "Custom hung carcass weight"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 103
  },
  {
    "id": "goat-whole-over-20kg",
    "slug": "goat-whole-over-20kg",
    "name": "Whole Goats Over 20kg (Heavy Boer Goat)",
    "category": "goat",
    "subcategory": "whole-carcasses",
    "description": "Heavy Australian Boer goat carcass over 20kg hung weight (approx. 22kg–28kg). Maximum meat yield for commercial curry catering.",
    "longDescription": "Substantial meat yield per dollar for restaurants and catering events. High proportion of lean leg and shoulder meat.",
    "price": 14.5,
    "unit": "per kg hung",
    "badge": "Whole Carcass",
    "image": "/images/products/goat-whole-over-20kg.jpg",
    "variants": [
      {
        "id": "gw-o20-22kg",
        "name": "Heavy Goat Carcass (~22kg hung)",
        "weightKg": 22,
        "price": 319,
        "unit": "per carcass"
      },
      {
        "id": "gw-o20-26kg",
        "name": "Heavy Goat Carcass (~26kg hung)",
        "weightKg": 26,
        "price": 377,
        "unit": "per carcass"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "Free-Range Browse & Natural Pasture",
      "hungWeightKg": "Custom hung carcass weight"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 110
  },
  {
    "id": "goat-cut-fee",
    "slug": "goat-cut-fee",
    "name": "Butcher Cut Fee (Per Whole Goat)",
    "category": "goat",
    "subcategory": "single-cuts",
    "description": "Custom butcher breakdown service for whole goat carcasses. Cut into 25mm curry cubes, roasts, or chops, cryovac packed and labelled ($20.00 flat fee).",
    "longDescription": "Add this service to any whole goat purchase. Our master butchers will break down the whole carcass according to your exact preference (curry pieces, roast joints, or chops).",
    "price": 20,
    "unit": "per goat",
    "badge": "Best Value",
    "image": "/images/products/goat-cut-fee.jpg",
    "variants": [
      {
        "id": "gcf-single",
        "name": "Butcher Custom Breakdown (1 Goat)",
        "weightKg": 1,
        "price": 20,
        "unit": "per goat"
      },
      {
        "id": "gcf-two",
        "name": "Butcher Custom Breakdown (2 Goats)",
        "weightKg": 2,
        "price": 40,
        "unit": "per 2 goats"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "Free-Range Browse & Natural Pasture"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 117
  },
  {
    "id": "mutton-chump-steaks",
    "slug": "mutton-chump-steaks",
    "name": "Prime Australian Mutton Chump Steaks",
    "category": "mutton",
    "subcategory": "single-cuts",
    "description": "Thick hand-cut mutton rump steaks with deep ruby-red meat, subtle marbling, and delicate white fat rim.",
    "longDescription": "Prized for its intense, robust pasture flavour. Pan-sear medium or marinate with garlic, rosemary, and red wine.",
    "price": 24,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/mutton-chump-steaks.jpg",
    "variants": [
      {
        "id": "mcs-1kg",
        "name": "1kg Chump Steaks Pack",
        "weightKg": 1,
        "price": 24,
        "unit": "per pack"
      },
      {
        "id": "mcs-25kg",
        "name": "2.5kg Family Pack",
        "weightKg": 2.5,
        "price": 60,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 124
  },
  {
    "id": "mutton-shoulder-chops",
    "slug": "mutton-shoulder-chops",
    "name": "Prime Mutton Bone-In Shoulder Chops & Diced",
    "category": "mutton",
    "subcategory": "single-cuts",
    "description": "Hearty bone-in mutton shoulder chops packed with mature pasture flavour and collagen.",
    "longDescription": "The classic foundation for Australian mutton casseroles, Scotch broths, and slow braises.",
    "price": 18,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/mutton-shoulder-chops.jpg",
    "variants": [
      {
        "id": "msc-2kg",
        "name": "2kg Shoulder Chops Pack",
        "weightKg": 2,
        "price": 36,
        "unit": "per pack"
      },
      {
        "id": "msc-5kg",
        "name": "5kg Bulk Casserole Pack",
        "weightKg": 5,
        "price": 90,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 131
  },
  {
    "id": "mutton-neck-rosettes-chops",
    "slug": "mutton-neck-rosettes-chops",
    "name": "Traditional Mutton Neck Rosettes & Chops",
    "category": "mutton",
    "subcategory": "single-cuts",
    "description": "Cross-cut mutton neck chops containing central marrow bone and tender collar meat.",
    "longDescription": "Sliced crosswise through the neck, each rosette contains marrow and natural gelatin that creates the thickest, richest broth possible.",
    "price": 16,
    "unit": "per kg",
    "badge": "Best Value",
    "image": "/images/products/mutton-neck-rosettes-chops.jpg",
    "variants": [
      {
        "id": "mnr-2kg",
        "name": "2kg Neck Rosettes Pack",
        "weightKg": 2,
        "price": 32,
        "unit": "per pack"
      },
      {
        "id": "mnr-5kg",
        "name": "5kg Stew Master Pack",
        "weightKg": 5,
        "price": 80,
        "unit": "per pack"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 138
  },
  {
    "id": "mutton-whole-leg-roast",
    "slug": "mutton-whole-leg-roast",
    "name": "Whole Traditional Bone-In Leg of Mutton Roast",
    "category": "mutton",
    "subcategory": "single-cuts",
    "description": "Whole bone-in heritage leg of mutton with intact shank and savory fat cap.",
    "longDescription": "When roasted slowly with garlic slivers, rosemary, and root vegetables, the meat softens into deeply satisfying, juicy slices.",
    "price": 19,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/mutton-whole-leg-roast.jpg",
    "variants": [
      {
        "id": "mwl-28kg",
        "name": "Whole Leg of Mutton (~2.8kg)",
        "weightKg": 2.8,
        "price": 53.2,
        "unit": "per roast"
      },
      {
        "id": "mwl-35kg",
        "name": "Large Whole Leg of Mutton (~3.5kg)",
        "weightKg": 3.5,
        "price": 66.5,
        "unit": "per roast"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 145
  },
  {
    "id": "mutton-whole-shoulder-roast",
    "slug": "mutton-whole-shoulder-roast",
    "name": "Whole Bone-In Oyster Cut Mutton Shoulder Roast",
    "category": "mutton",
    "subcategory": "single-cuts",
    "description": "Whole bone-in oyster cut mutton shoulder tied with butcher twine. Rich in collagen and ideal for 6-hour braising.",
    "longDescription": "Loaded with intermuscular collagen that bastes the roast internally as it simmers in a low oven or smoker.",
    "price": 18,
    "unit": "per kg",
    "badge": "Premium",
    "image": "/images/products/mutton-whole-shoulder-roast.jpg",
    "variants": [
      {
        "id": "mws-25kg",
        "name": "Whole Oyster Shoulder (~2.5kg)",
        "weightKg": 2.5,
        "price": 45,
        "unit": "per roast"
      },
      {
        "id": "mws-32kg",
        "name": "Large Oyster Shoulder (~3.2kg)",
        "weightKg": 3.2,
        "price": 57.6,
        "unit": "per roast"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 152
  },
  {
    "id": "mutton-boneless-netted-leg",
    "slug": "mutton-boneless-netted-leg",
    "name": "Whole Boneless Net-Rolled Mutton Leg Roast",
    "category": "mutton",
    "subcategory": "single-cuts",
    "description": "Completely boned, rolled, and encased in butcher elastic netting for effortless carving and uniform roasting.",
    "longDescription": "Meticulously boned and rolled inside elastic netting. Cooks evenly from center to edge and carves into pristine dinner slices.",
    "price": 26,
    "unit": "per kg",
    "badge": "Popular",
    "image": "/images/products/mutton-boneless-netted-leg.jpg",
    "variants": [
      {
        "id": "mbn-2kg",
        "name": "Boneless Netted Leg (~2.0kg)",
        "weightKg": 2,
        "price": 52,
        "unit": "per roast"
      },
      {
        "id": "mbn-28kg",
        "name": "Large Netted Leg (~2.8kg)",
        "weightKg": 2.8,
        "price": 72.8,
        "unit": "per roast"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 159
  },
  {
    "id": "mutton-heritage-meat-box",
    "slug": "mutton-heritage-meat-box",
    "name": "Heritage Mutton Wholesale Bulk Freezer Box",
    "category": "mutton",
    "subcategory": "meat-boxes",
    "description": "Economical 12kg bulk freezer pack filled with portioned roasts, chops, diced stew cuts, and chump steaks.",
    "longDescription": "Delivering the highest protein and flavour value per dollar. Includes 3kg Leg Roast, 3kg Shoulder Chops, 2kg Diced, 2kg Chump Steaks, 2kg Neck.",
    "price": 235,
    "unit": "per box",
    "badge": "Best Value",
    "image": "/images/products/mutton-heritage-meat-box.jpg",
    "variants": [
      {
        "id": "mhm-12kg",
        "name": "Heritage Mutton Box (12kg Assorted)",
        "weightKg": 12,
        "price": 235,
        "unit": "per box"
      },
      {
        "id": "mhm-22kg",
        "name": "Commercial Catering Box (22kg Assorted)",
        "weightKg": 22,
        "price": 410,
        "unit": "per box"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 166
  },
  {
    "id": "mutton-whole-carcass-dressed",
    "slug": "mutton-whole-carcass-dressed",
    "name": "Whole Dressed Australian Prime Mutton Carcass",
    "category": "mutton",
    "subcategory": "whole-carcasses",
    "description": "Whole dressed mature pasture mutton carcass (20kg–28kg hung). Inspected and tagged at Cowirra with custom cutting available.",
    "longDescription": "The ultimate economical bulk carcass option. Sourced directly from South Australian pastoral properties, fully dressed and chilled.",
    "price": 11.5,
    "unit": "per kg hung",
    "badge": "Whole Carcass",
    "image": "/images/products/mutton-whole-carcass-dressed.jpg",
    "variants": [
      {
        "id": "mwc-24kg",
        "name": "Whole Carcass Spit / Rail Ready (~24kg hung)",
        "weightKg": 24,
        "price": 276,
        "unit": "per carcass"
      },
      {
        "id": "mwc-half",
        "name": "Half Mutton Carcass (~12kg hung)",
        "weightKg": 12,
        "price": 138,
        "unit": "per half carcass"
      }
    ],
    "specs": {
      "origin": "South Australia (Murraylands / Cowirra)",
      "packaging": "Commercial Cryovac Vacuum Sealed with Cold-Chain Logging",
      "storage": "Chilled 0°C to 4°C",
      "feedType": "100% Pasture-Fed South Australian Livestock",
      "hungWeightKg": "Custom hung carcass weight"
    },
    "merchantReturnPolicy": {
      "satisfactionGuarantee": "100% Cold-Chain Freshness Guarantee",
      "returnWindow": "48-Hour Inspection & Return Policy on Perishable Deliveries",
      "replacementRefund": "Immediate Full Replacement, Credit, or Refund to OSKO/PayID",
      "coldChainCompliance": "FSANZ & PrimeSafe Licensed Temperature Verified"
    },
    "halalCertified": true,
    "rating": 5,
    "reviewCount": 173
  }
];
