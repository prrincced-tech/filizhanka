/* Філіжанка: UA / EN switch. Ukrainian is written in the page; English replaces the text before the motion layer runs. */
(() => {
  const EN = {
    'Біла Церква': 'Bila Tserkva',
    'Філіжанка': 'Filizhanka',
    'Про нас': 'About', 'Меню': 'Menu', 'Вітрина': 'Desserts', 'Атмосфера': 'Atmosphere', 'Контакти': 'Contacts',
    'Завітати': 'Visit us',
    'Про': 'About', 'нас': 'us', 'Віт': 'Dess', 'рина': 'erts', 'Атмо': 'Atmo', 'сфера': 'sphere',
    'Філіжанка · Біла Церква': 'Filizhanka · Bila Tserkva',
    'Почни день': 'Start your day',
    'з філіжанки': 'with a filizhanka',
    "Кав'ярня у серці Білої Церкви: готуємо каву, десерти та атмосферу міської кав'ярні.": 'A café in the heart of Bila Tserkva: we make coffee, desserts and the atmosphere of a city café.',
    'Пн–Пт': 'Mon–Fri', 'Сб–Нд': 'Sat–Sun',
    'Дивитись меню': 'See the menu', 'Як дійти': 'Directions',
    '516 відгуків на Google': '516 reviews on Google',
    'Серце міста': 'City centre',
    'Ярослава Мудрого, 11': '11 Yaroslava Mudroho St',
    'Кава': 'Coffee', 'Круасани': 'Croissants', 'Десерти': 'Desserts', 'Холодні напої': 'Cold drinks', 'Кава з собою': 'Coffee to go',
    'Чашки': 'Mugs', 'Гості': 'Guests', 'Атмосфера': 'Atmosphere',
    'Кава у серці': 'Coffee in the heart', 'міста': 'of the city',
    "Філіжанка — міська кав'ярня на Ярослава Мудрого, куди заходять на еспресо дорогою на роботу й повертаються по десерт увечері.": 'Filizhanka is a city café on Yaroslava Mudroho Street, where people stop for an espresso on the way to work and come back for dessert in the evening.',
    'Готуємо класичну каву й холодні напої, щоранку викладаємо свіжі круасани, а каву з собою пакуємо в крафт — разом із чимось солоденьким.': 'We make classic coffee and cold drinks, bake fresh croissants every morning and pack coffee to go in kraft paper, together with something sweet.',
    'Еспресо': 'Espresso', 'Макарони': 'Macarons',
    'Чому до нас': 'Why us', 'Маленькі причини': 'Little reasons', 'зайти': 'to drop in',
    'У серці міста': 'In the city centre',
    'Ярослава Мудрого, 11 — по дорозі на роботу, з прогулянки чи на зустріч.': '11 Yaroslava Mudroho St: on your way to work, during a walk or before a meeting.',
    'Щодня з 8:00': 'Daily from 8:00',
    'У будні з 8:00, у вихідні з 9:00 і до 21:00 — на ранкову каву і вечірній десерт.': 'Weekdays from 8:00, weekends from 9:00, until 21:00: for your morning coffee and evening dessert.',
    'У фірмовому стаканчику і крафтовому пакеті — разом із круасаном чи макаруном.': 'In our branded cup and kraft bag, with a croissant or a macaron.',
    'Свіжі круасани': 'Fresh croissants',
    'Щоранку — класичні й з начинками: сьомга, шинка, капрезе, банан з нутелою.': 'Every morning: classic and filled, with salmon, ham, caprese or banana and Nutella.',
    'Що у': "What's in", 'філіжанці': 'the cup',
    'Наведіть на позицію — покажемо, як вона виглядає. Новинки й сезонні напої шукайте в нашому Instagram.': 'Hover over an item to see it. New and seasonal drinks are on our Instagram.',
    '30 мл': '30 ml', '200 мл': '200 ml', '250 мл': '250 ml', '350 мл': '350 ml',
    'Американо': 'Americano', 'Капучино': 'Cappuccino', 'Лате': 'Latte', 'Раф': 'Raf coffee',
    'вершковий, з собою у фірмовому стаканчику': 'creamy, to go in our branded cup',
    'Холодна матча': 'Iced matcha', 'на молоці, з льодом': 'with milk and ice',
    'Лимонад': 'Lemonade', "з апельсином і м'ятою": 'with orange and mint',
    'Еспресо-тонік': 'Espresso tonic', 'еспресо на тоніку з льодом': 'espresso over tonic and ice',
    'Джміль': 'Bumblebee', 'фреш і еспресо': 'fresh juice and espresso',
    'Ягідне мохіто': 'Berry mojito', 'безалкогольне': 'alcohol-free',
    'З ніжною сьомгою': 'With salmon', 'солоний': 'savoury',
    'З ароматною шинкою': 'With ham', 'Капрезе': 'Caprese', 'томати й моцарела': 'tomato and mozzarella',
    'З апельсиновим джемом': 'With orange jam', 'солодкий': 'sweet',
    'Банан з нутелою': 'Banana and Nutella', 'солодкий хіт': 'sweet favourite',
    'Новинки': 'New', 'Зараз': 'Right now', 'смакуємо': "we're tasting",
    'Більше новинок в Instagram': 'More on Instagram',
    'Сезонне': 'Seasonal', 'Какао з маршмелоу': 'Cocoa with marshmallows',
    'Густе, тепле і з горою маршмелоу — для холодних вечорів.': 'Thick, warm and topped with a mountain of marshmallows, for cold evenings.',
    'Хіт': 'Favourite', 'Айс-лате': 'Iced latte',
    'Еспресо, молоко і багато льоду. Збираємо на очах у прозорому стаканчику.': 'Espresso, milk and plenty of ice, made right in front of you.',
    'На двох': 'For two', 'Кава + макарун з собою': 'Coffee + macaron to go',
    'Беріть на двох: дві кави і пара макарунів у зручній таці.': 'Take it for two: two coffees and a pair of macarons in a handy tray.',
    'Тепле': 'Warm', 'Ягідний чай з апельсином': 'Berry tea with orange',
    'Ягоди, апельсин і гаряча вода — зігріває з першого ковтка.': 'Berries, orange and hot water: warming from the first sip.',
    'Солоденьке': 'Something sweet', 'щодня': 'every day',
    'Вітрина щодня наповнена смачненьким — заходьте за десертом до кави у будь-який день тижня.': 'Our display is full of treats every day. Drop in for a dessert with your coffee any day of the week.',
    'Меренговий рулет': 'Meringue roll', 'з фруктами': 'with fruit',
    'Моті': 'Mochi', 'різні смаки': 'various flavours',
    'Макарун': 'Macaron', 'фундук-карамель': 'hazelnut caramel', 'на вітрині': 'in the display',
    'Наполеон': 'Napoleon cake', 'свіжий та ніжний': 'fresh and delicate',
    'Їжачки, які': 'Hedgehogs', 'зігріють': 'to warm you up',
    'Нові кумедні чашки вже чекають на тебе у Філіжанці. Попереджаємо: вони такі круті, що вибір буде непростим.': "Our new funny mugs are waiting for you at Filizhanka. Fair warning: they're so good it'll be hard to choose.",
    'Ідеальний подарунок для найрідніших — забирайте разом із кавою.': 'The perfect gift for your loved ones. Take one home with your coffee.',
    "Обрати в кав'ярні": 'Pick one at the café',
    'Як у нас': 'How it', 'смакує': 'tastes here',
    'Філіжанка — це маленька чашка. А ще привід зупинитися посеред дня.': 'A filizhanka is a small cup. And a reason to pause in the middle of the day.',
    'Заходьте': 'Come in', 'на каву': 'for coffee',
    'вул. Ярослава Мудрого, 11, Біла Церква': '11 Yaroslava Mudroho St, Bila Tserkva',
    'Понеділок — п\'ятниця': 'Monday – Friday', 'Субота — неділя': 'Saturday – Sunday',
    'Телефон': 'Phone', 'Прокласти маршрут': 'Get directions', 'Подзвонити': 'Call',
    'Написати в Instagram': 'Message on Instagram', 'Підписатися': 'Follow',
    'Натисніть, щоб рухати карту': 'Click to move the map',
    'Ми тут': "We're here", 'вул. Ярослава Мудрого, 11': '11 Yaroslava Mudroho St', 'центр, Біла Церква': 'city centre, Bila Tserkva',
    '· 516 відгуків ·': '· 516 reviews ·', 'залишити відгук': 'leave a review',
    'Написати': 'Message', 'Сайт': 'Site', "Кав'ярня": 'Café', 'Соцмережі': 'Social',
    'Написати в Direct': 'Message on Direct', 'Поділитися сайтом': 'Share this site',
    '© 2026 Філіжанка · Біла Церква': '© 2026 Filizhanka · Bila Tserkva',
    'Зараз відчинено · до 21:00': 'Open now · until 21:00',
    'Сьогодні відчиняємось о 9:00': 'Opening today at 9:00', 'Сьогодні відчиняємось о 8:00': 'Opening today at 8:00',
    'Завтра відчиняємось о 9:00': 'Opening tomorrow at 9:00', 'Завтра відчиняємось о 8:00': 'Opening tomorrow at 8:00',
    'Посилання скопійовано': 'Link copied',
    'дивитись': 'view'
  };
  let lang = 'uk';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'en' || q === 'uk') localStorage.setItem('fz-lang', q);
    lang = localStorage.getItem('fz-lang') === 'en' ? 'en' : 'uk';
  } catch (e) {}
  window.fzLang = lang;
  window.fzT = s => (lang === 'en' && EN[s]) || s;

  const apply = () => {
    document.querySelectorAll('[data-lang-toggle]').forEach(b => {
      b.textContent = lang === 'en' ? (b.classList.contains('lang--menu') ? 'Українська версія' : 'UA') : (b.classList.contains('lang--menu') ? 'English version' : 'EN');
      b.setAttribute('aria-label', lang === 'en' ? 'Перейти на українську' : 'Switch to English');
      b.addEventListener('click', () => {
        try { localStorage.setItem('fz-lang', lang === 'en' ? 'uk' : 'en'); sessionStorage.setItem('fz-skip-intro', '1'); } catch (e) {}
        const u = new URL(location.href); u.searchParams.delete('lang'); location.href = u.pathname + u.search + location.hash;
      });
    });
    if (lang !== 'en') return;
    document.documentElement.lang = 'en';
    document.title = 'Filizhanka: a café in the heart of Bila Tserkva';
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = 'Coffee, croissants, desserts and the atmosphere of a city café on Yaroslava Mudroho Street, 11. Daily 8:00–21:00, weekends from 9:00.';
    const skip = el => el.closest('script, style, svg, .loader, .footer__big');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      const t = n.nodeValue.replace(/\s+/g, ' ').trim();
      if (!t || !EN[t] || skip(n.parentElement)) return;
      const lead = n.nodeValue.match(/^\s*/)[0], tail = n.nodeValue.match(/\s*$/)[0];
      n.nodeValue = lead + EN[t] + tail;
    });
    document.querySelectorAll('h1[aria-label]').forEach(h => h.setAttribute('aria-label', 'Filizhanka: start your day with a filizhanka'));
  };
  apply(); // loaded at the end of <body>, right before app.js, so the whole page is there and nothing is split yet
})();
