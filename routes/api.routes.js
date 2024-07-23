const express = require('express');
const pick = require('lodash/pick');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const sharp = require('sharp');
const crypto = require('crypto');
const auth = require('../middlewares/auth');
const cdnConfig = require('../config/cdnConfig');
const jwtConfig = require('../config/jwtConfig');
const bitrixConfig = require('../config/bitrixConfig');
const dbController = require('../controllers/dbController');
const { sendVerificationEmail, generateToken } = require('../services/emailService');

const router = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    cb(null, file.mimetype.match(/^image\//));
};

const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 10485760,
    },
});

const manager = {
    id: 1,
    name: "Пичугин Федор Юрьевич",
    text: "Выгодные условия для ведения бизнеса вы всегда сможете найти на Базе “Южной”! Мы с уважением относимся к каждому клиенту и готовы предоставить лучшие условия. Обращайтесь ко мне по номеру +79127655400 - всегда помогу и решу любые вопросы!",
    photo: "/img/pics/manager.webp",
};

const yujnayaTenants = [
    {
        id: 1,
        logo: "/img/pics/yujnaya_tenants/upravdom.webp",
        title: "УправДом",
        link: "https://izhevsk.upravdom.com/",
        text: "Профессиональная сеть магазинов напольных покрытий. Оптово-розничная компания «Управдом» основана в 2002 году и сегодня является лидером по продаже напольных покрытий. Магазин «Управдом» — крупнейший в городе центр продаж напольных покрытий. Здесь можно приобрести: линолеум, ламинат, кварцвиниловый и SPC ламинат, паркетную и инженерную доску, ПВХ-плитку, пробковое покрытие и многое другое! Представляем ведущие бренды: Quick Step, Kronospan, Krono Original, Classen, Upofloor, Polarwood и другие. Компания предоставляет полный комплекс дополнительных услуг: замер помещения, доставку товара, подъем на этаж, демонтаж старых покрытий, укладку напольных покрытий.",
    },
    {
        id: 2,
        logo: "/img/pics/yujnaya_tenants/mnogo_mebeli.webp",
        title: "Много Мебели",
        link: "https://mnogomebeli.com/",
        text: "«Много Мебели» — российская компания, производящая и реализующая мягкую и корпусную мебель для дома. Крупнейший российский производитель диванов и диван-кроватей, мебель реализуется через розничную сеть, а также через интернет-магазин. Наши цены – самые доступные, потому что мы продаём мебель огромными объёмами, а производством, доставкой, хранением и сервисным обслуживанием занимаются только проверенные и надёжные партнёры, выполняющие свою работу профессионально, быстро и без лишних затрат.",
    },
    {
        id: 3,
        logo: "/img/pics/yujnaya_tenants/ariva.webp",
        title: "Арива",
        link: "https://a-pricep.ru/",
        text: "С момента основания компания Арива занимается легковыми прицепами и всем, что с ними связано, а это: 1. продажа прицепов марки МЗСА 2. продажа и установка фаркопов (ТСУ), электрики для фаркопов, смарт-коннектов 3. продажа запчастей для легковых прицепов 4. прокат прицепов 5. изготовление, продажа и установка тентов и каркасов для легковых прицепов 6. ремонт прицепов, фаркопов, электрики фаркопов 7. модернизация и тюнинг легковых прицепов. Мы имеем постоянно пополняемый большой склад прицепов, фаркопов и запчастей. Организуем Доставку в любой город по России.",
    },
    {
        id: 4,
        logo: "/img/pics/yujnaya_tenants/keramo_market.webp",
        title: "Керамо-Маркет",
        link: "https://yandex.ru/profile/1091094439",
        text: "Основной ассортимент компании: керамическая плитка, затирка, керамогранит, уголки на ванну керамические, грунтовка, мозаика, плиточный клей.",
    },
    {
        id: 5,
        logo: "/img/pics/yujnaya_tenants/ametist.webp",
        title: "Аметист",
        link: "https://ametist-store.ru/",
        text: "Компания АМЕТИСТ работает на российском рынке уже более 28 лет и входит в число лидеров мебельной отрасли. Компания является надежным бизнес-партнером и поставщиком качественных комплектующих и тканей, которые используются для изготовления удобной и современной мебели. В перечне предлагаемого ассортимента насчитывается более 5000 наименований продукции от известных производителей из стран Европы и юго-восточной Азии. Вся продукция представлена в широком ценовом диапазоне. Партнерами компании являются более 3000 различных производителей корпусной и мягкой мебели из десятков регионов по всей территории России. Компания предлагает следующий ассортимент продукции: мебельные ткани, кожа (натуральная и искусственная), внутренняя и лицевая фурнитура для мягкой и корпусной мебели, различные виды наполнителей, мебельный клей, механизмы трансформации, алюминиевые и пластиковые системы, различные виды аксессуаров и гаджетов для мебели, светильники, материалы для контрактных проектов, товары для дома.",
    },
    {
        id: 6,
        logo: "/img/pics/yujnaya_tenants/hollmart.webp",
        title: "HOLLmart",
        link: "https://hollmart.me/",
        text: "Мебельмаркет Hollmart – сеть магазинов мебели, которые позволят вам обустроить дом и сэкономить деньги. Hollmart – это: удобная и функциональная мебель, широкий ассортимент товаров, идеи для создания уютного интерьера, доступные цены! Мы предлагаем выгодные (экономичные) решения для вашего интерьера.",
    },
]

router
    .route('/search')
    .post(dbController.getRoomsSearch);

router
    .route('/search/types')
    .get(dbController.getRoomsTypes);

router
    .route('/search/buildings')
    .get(dbController.getRoomsLiters);

router
    .route('/report/:base')
    .get(dbController.getRoomsReport);

router
    .route('/premises/:id')
    .get(dbController.getRoomsById);

router
    .route('/premises/floormap/:id')
    .get(dbController.getRoomsByBuilding);

router
    .route('/premises/complex/:id')
    .get(dbController.getRoomsByComplex);

router
    .route('/recommendations/:id')
    .get(dbController.getRoomsRecommended);

router
    .route('/report/print/:id')
    .get((req, res) => {
        res.render('nodes/report-print');
    });

router
    .route('/rented')
    .get(auth, dbController.getRoomsByTenant);

router
    .route('/requests')
    .get(auth, dbController.getTicketsByTenant);

router
    .route('/request/create')
    .post(auth, dbController.insertTicketFromBackoffice);

router
    .route('/tenant/tg')
    .get(auth, dbController.getTenantTgUsername);

router
    .route('/tenant/tg')
    .post(auth, dbController.setTenantTgUsername);

router
    .route('/promotions')
    .post(auth, dbController.setRoomsPromotions);

router
    .route('/docs')
    .get(auth, dbController.getDocsByUser);

router
    .route('/login')
    .post(async (req, res) => {
        try {
            const { login, password } = req.body;
            let user;

            if (/\S+@\S+\.\S+/.test(login)) {
                // Login using email
                user = await dbController.getTenantByParam({ 'email': login });
            } else if (/^\d+$/.test(login)) {
                // Login using TIN
                user = await dbController.getTenantByParam({ 'tin': login });
            } else {
                return res.status(400).json({ success: false, message: 'Invalid login format' });
            }

            if (!user || user.password == null) {
                return res.status(400).json({ success: false, message: 'No such user' });
            }

            if (await bcrypt.compare(password, user.password)) {
                const token = generateToken({ id: user.id, status: user.status, name: user.name });

                return res.cookie("secretToken", token, { httpOnly: true }).json({ success: true });
            } else {
                return res.status(400).json({ success: false, message: 'Wrong password' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to login' });
        }
    });

router
    .route('/signup/check')
    .post(async (req, res) => {
        try {
            const { tin } = pick(req.body, ['tin']);

            user = await dbController.getTenantByParam({ tin });
            if (user) {
                return res.status(200).json({ exists: true, signedUp: user.email !== '' });
            }
            return res.status(404).json({ exists: false });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to check tin' });
        }
    });

router
    .route('/signup/verify-email')
    .post(async (req, res) => {
        try {
            const { tin, email } = pick(req.body, ['tin', 'email']);

            const user = await dbController.getTenantByParam({ tin });

            if (user) {
                const token = generateToken({ id: user.id, email }, true);
                await sendVerificationEmail(email, token, true);
                return res.status(200).json({ message: 'Verification email sent' });
            }

            return res.status(404).json({ message: 'TIN not found' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to verify email' });
        }
    });

router
    .route('/password-reset/initiate')
    .post(async (req, res) => {
        try {
            const { tin, email } = pick(req.body, ['tin', 'email']);

            user = await dbController.getTenantByParam({ tin, email });

            if (user) {
                const token = generateToken({ id: user.id, email }, true);
                await sendVerificationEmail(email, token, false);
                return res.status(200).json({ message: 'Password reset email sent' });
            }

            return res.status(404).json({ message: 'User not found' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Failed to verify email' });
        }
    });

router
    .route('/reset-password')
    .post(async (req, res) => {
        const { password, confirmPassword, token } = pick(req.body, ['password', 'confirmPassword', 'token']);

        if (!token) {
            return res.status(400).json({ success: false, message: 'No reset token found' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }

        try {
            jwt.verify(token, jwtConfig.emailToken, async (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send("Email verification failed, possibly the link is invalid or expired");
                }
                const hashedPassword = await bcrypt.hash(password, 10);

                const user = await dbController.setTenantPassword(decoded.id, hashedPassword);

                return res.status(200).json({ success: true, message: 'Password reset successfully' });
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({ success: false, message: 'Failed to reset password' });
        }
    });

router
    .route('/contact')
    .post(async (req, res) => {
        const { name, email, phone, url } = pick(req.body, ['name', 'email', 'phone', 'url']);

        try {
            const response = await axios.post(`${bitrixConfig.url}/crm.lead.add`, {
                fields: {
                    TITLE: `Заявка от ${name}`,
                    NAME: name,
                    EMAIL: [{ VALUE: email }],
                    PHONE: [{ VALUE: phone }],
                    WEB: [{ VALUE: url, VALUE_TYPE: "Депо" }],
                }
            });
            res.json({ success: true, data: response.data });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

router
    .route('/docs/sign')
    .post(auth, async (req, res) => {
        const { docId, docName, signType, operator } = pick(req.body, ['docId', 'docName', 'signType', 'operator']);
        const user = req.user;

        try {
            const response = await axios.post(`${bitrixConfig.url}/crm.lead.add`, {
                fields: {
                    TITLE: `Заявка на подпись договора ${docName}`,
                    NAME: user.name,
                    COMMENTS: `${docName} (ID: ${docId}), подписание ${signType} ${(operator ? operator : '')}`
                }
            });
            res.json({ success: true, data: response.data });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

router
    .route('/docs/request')
    .post(auth, async (req, res) => {
        const { docType, customRequest } = pick(req.body, ['docType', 'customRequest']);
        const user = req.user;

        try {
            const response = await axios.post(`${bitrixConfig.url}/crm.lead.add`, {
                fields: {
                    TITLE: `Заказ документа ${customRequest ? customRequest : docType}`,
                    NAME: user.name,
                    COMMENTS: `Заказан документ ${(customRequest ? customRequest : docType)}`
                }
            });
            res.json({ success: true, data: response.data });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

router
    .route('/manager')
    .get(async (req, res) => {
        if (manager) {
            res.json(manager);
        } else {
            res.status(404).json({ error: 'Manager not found' });
        }
    });

router
    .route('/manager/update')
    .post(async (req, res) => {
        try {
            const data = pick(req.body, 'name', 'text', 'photo');
            console.log(data);
            res.status(200);
        } catch (error) {
            res.status(404).json({ error: 'Manager not updated' });
        }
    });

router
    .route('/tenants')
    .get(async (req, res) => {
        if (yujnayaTenants) {
            res.json(yujnayaTenants);
        } else {
            res.status(404).json({ error: 'Tenants not found' });
        }
    });

router
    .route('/upload')
    .post(upload.single('file'), async (req, res) => {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Файл не найден' });
        }

        try {
            const filename = crypto.randomBytes(10).toString('hex').substr(0, 10);

            const webpBuffer = await sharp(file.buffer)
                .webp()
                .toBuffer();

            const formData = new FormData();
            formData.append('file', webpBuffer, {
                filename: `${filename}.webp`,
                contentType: 'image/webp'
            });

            const headers = {
                'Authorization': `Bearer ${cdnConfig.token}`,
                ...formData.getHeaders()
            };

            const response = await axios.post(
                `https://api.cloudflare.com/client/v4/accounts/${cdnConfig.acc}/images/v1`,
                formData,
                { headers }
            );

            res.json(response.data);
        }

        catch (error) {
            console.log('Error uploading photo:', error.response ? error.response.data : error.message);
            res.status(500).json({ message: 'Ошибка при загрузке фотографии' });
        }
    });

module.exports = router;