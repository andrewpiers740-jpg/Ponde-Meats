import { LAMB_COPY } from './copy/lamb';
import { BEEF_COPY_1 } from './copy/beef1';
import { BEEF_COPY_2 } from './copy/beef2';
import { GOAT_MUTTON_COPY } from './copy/goat-mutton';
import type { Product } from './products';
import { SITE } from './site';

const UNIQUE_COPY: Record<string, string[]> = {
  ...LAMB_COPY,
  ...BEEF_COPY_1,
  ...BEEF_COPY_2,
  ...GOAT_MUTTON_COPY,
};

export interface CopySection {
  heading?: string;
  paragraphs: string[];
}

const fmt = (n: number) => `$${n.toFixed(2)}`;

const STORAGE: Record<Product['category'], string> = {
  beef: 'Keep beef chilled between 0 and 4 degrees Celsius and use it within the date printed on the pack, or freeze it in its original vacuum bag at minus 18 degrees or colder. For the best texture, thaw slowly in the fridge on the lowest shelf, allowing a full day for larger pieces, and never thaw at room temperature. Raw beef should always be kept separate from cooked and ready-to-eat foods, and cooked through to a safe temperature unless you are enjoying a whole-muscle steak.',
  lamb: 'Keep lamb chilled between 0 and 4 degrees Celsius and use it within the date printed on the pack, or freeze it in its original vacuum bag at minus 18 degrees or colder. Thaw slowly in the fridge, allowing a full day for roasts and larger cuts, and bring whole cuts out of the fridge a little before cooking so they cook evenly. Keep raw lamb away from ready-to-eat foods, wash hands and boards after handling, and rest cooked meat before carving.',
  goat: 'Keep goat chilled between 0 and 4 degrees Celsius and use it within the date printed on the pack, or freeze it in its original vacuum bag at minus 18 degrees or colder. Thaw slowly in the fridge, and drain and dry the meat before browning so it colours well. Goat is lean, so cook it gently with plenty of moisture, keep raw meat away from ready-to-eat foods, and cook bone-in pieces until tender and well past safe temperature.',
  mutton: 'Keep mutton chilled between 0 and 4 degrees Celsius and use it within the date printed on the pack, or freeze it in its original vacuum bag at minus 18 degrees or colder. Thaw slowly in the fridge, allowing a full day or more for large roasts. Mutton is at its best cooked low and slow with moisture, so plan your cooking time ahead. Keep raw meat separate from ready-to-eat foods and rest cooked cuts before carving.',
};

export function getProductSections(product: Product): CopySection[] {
  const unique = UNIQUE_COPY[product.slug] ?? [];
  const o = SITE.orderRules;
  const sections: CopySection[] = [{ paragraphs: unique }];

  const packLines = product.variants.map((v) => {
    const perKg = v.weightKg ? ` (${fmt(v.price / v.weightKg)} per kg)` : '';
    return `${v.name} at ${fmt(v.price)}${perKg}`;
  });
  sections.push({
    heading: `Pack sizes and pricing for ${product.name}`,
    paragraphs: [
      `You can choose from ${product.variants.length === 1 ? 'one pack size' : `${product.variants.length} pack sizes`}: ${packLines.join('; ')}. All prices are in Australian dollars and include GST. Use the quantity buttons to add as many packs as you need, and the total updates as you go, so you can compare pack sizes and see exactly what your order will cost before it goes into the cart.`,
    ],
  });

  sections.push({
    heading: 'Storage, thawing and food safety',
    paragraphs: [STORAGE[product.category]],
  });

  sections.push({
    heading: 'Ordering and delivery',
    paragraphs: [
      `Orders from Ponde Meats start at ${fmt(o.minOrder)}, with free refrigerated delivery on orders over ${fmt(o.freeShippingThreshold)} and a flat ${fmt(o.flatShippingFee)} delivery fee below that. Pay by ${o.altPaymentMethods.join(' or ')} and take ${o.altPaymentDiscountPercent}% off your order. ${product.halalCertified ? 'This product is listed as halal accredited. ' : ''}Every order is packed at our Cowirra facility in South Australia and sent chilled. If you have questions about cuts, quantities or timing, call ${SITE.contact.phoneFormatted} or message us on WhatsApp.`,
    ],
  });

  return sections;
}
