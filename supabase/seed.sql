
-- ═══════════════════════════════════════════════════════════
-- AvtoQism Initial Seed Data
-- ═══════════════════════════════════════════════════════════

-- Categories
insert into public.categories (id, name, slug, icon, count) values
  (1, 'Dvigatel', 'dvigatel', 'Cog', 45),
  (2, 'Tormoz tizimi', 'tormoz-tizimi', 'Disc', 38),
  (3, 'Osma (podveska)', 'osma', 'ArrowDownUp', 32),
  (4, 'Elektrika', 'elektrika', 'Zap', 28),
  (5, 'Kuzov qismlari', 'kuzov', 'Car', 55),
  (6, 'Moy va suyuqliklar', 'moy-suyuqliklar', 'Droplets', 42),
  (7, 'Shinalar', 'shinalar', 'Circle', 36),
  (8, 'Aksessuarlar', 'aksessuarlar', 'Package', 29)
on conflict (id) do nothing;

-- Brands
insert into public.brands (id, name, slug, logo) values
  (1, 'Chevrolet', 'chevrolet', '/images/brands/chevrolet.svg'),
  (2, 'KIA', 'kia', '/images/brands/kia.svg'),
  (3, 'Hyundai', 'hyundai', '/images/brands/hyundai.svg'),
  (4, 'Daewoo', 'daewoo', '/images/brands/daewoo.svg'),
  (5, 'Lada', 'lada', '/images/brands/lada.svg'),
  (6, 'Toyota', 'toyota', '/images/brands/toyota.svg'),
  (7, 'Spark', 'spark', '/images/brands/spark.svg'),
  (8, 'Tracker', 'tracker', '/images/brands/tracker.svg'),
  (9, 'Nexia', 'nexia', '/images/brands/nexia.svg'),
  (10, 'Lacetti', 'lacetti', '/images/brands/lacetti.svg')
on conflict (id) do nothing;

-- Products (Sample initial seed)
insert into public.products (id, title, slug, price, condition, category_id, brand_id, city, oem, compatible_cars, description, images, views, status) values
  (1, 'Tormoz disk (Chevrolet)', 'tormoz-disk-chevrolet', 450000, 'new', 2, 1, 'Toshkent', '96471298', array['Chevrolet Lacetti', 'Chevrolet Gentra'], 'Original sifatli tormoz diski. Chevrolet Lacetti va Gentra modellariga mos. Holati yangi.', array['/images/products/tormoz-disk-1.svg', '/images/products/tormoz-disk-2.svg'], 42, 'active'),
  (2, 'Akumulyator Bosch 75Ah', 'akumulyator-bosch-75ah', 1200000, 'new', 4, 1, 'Toshkent', 'S4008', array['Barcha avtomobillar'], 'Bosch Silver 75Ah original akkumulyator. 2 yil rasmiy kafolat bilan beriladi.', array['/images/products/akum-bosch-1.svg', '/images/products/akum-bosch-2.svg'], 89, 'active'),
  (3, 'Amortizator (old)', 'amortizator-old', 350000, 'used', 3, 1, 'Toshkent', '96410023', array['Chevrolet Cobalt', 'Ravon R4'], 'Cobalt uchun original old amortizator. Kam ishlatilgan, soz holatda.', array['/images/products/amortizator-1.svg'], 15, 'active'),
  (4, 'Motor moyi Shell Helix 5W-40', 'motor-moyi-shell-helix-5w-40', 320000, 'new', 6, 1, 'Toshkent', null, array['Barcha benzin dvigatellar'], 'Shell Helix Ultra 5W-40 to‘liq sintetik motor moyi. 4 litrlik qadoqda.', array['/images/products/shell-moy-1.svg', '/images/products/shell-moy-2.svg'], 67, 'active'),
  (5, 'Moy filtri Mann', 'moy-filtri-mann', 120000, 'new', 1, 1, 'Toshkent', 'W67/1', array['Chevrolet Spark', 'Chevrolet Matiz'], 'Mann-Filter original moy filtri. Yuqori tozalash darajasi.', array['/images/products/moy-filtr-1.svg'], 23, 'active'),
  (6, 'Radiator', 'radiator', 680000, 'new', 1, 1, 'Samarqand', '96536528', array['Chevrolet Nexia 3'], 'Nexia 3 uchun original alyumin radiator. Sovutish tizimi uchun mukammal.', array['/images/products/radiator-1.svg', '/images/products/radiator-2.svg'], 54, 'active'),
  (7, 'Generator 90A', 'generator-90a', 1500000, 'new', 4, 1, 'Toshkent', '96985814', array['Chevrolet Cobalt'], 'Cobalt 1.5 motor uchun original 90A generator. Kafolati bor.', array['/images/products/generator-1.svg'], 38, 'active')
on conflict (id) do nothing;
