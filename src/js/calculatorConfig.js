export default (function() {
    const isLocalhost = ["localhost", "127.0.0.1", "stanislav0305.github.io", ""].includes(window.location.hostname);

    const module = {
        //-----------------------------
        //для душевых кабин
        //-----------------------------
        //цена доставки (с PVN) (для душевых кабин)
        SHOWER_CABIN_DELIVERY_PRICE: 7.00,

        //цена монтажа за 1 квадратный метр (с PVN) (для душевых кабин)
        SHOWER_CABIN_INSTALLATION_PRICE: 10.00,

        //цена фотопечати (с PVN)
        SHOWER_CABIN_PHOTO_PRINTING_PRICE: 30.00,

        //цена однотонной покраски (с PVN)
        SHOWER_CABIN_MONOCHROMATIC_PAINTING_PRICE: 20.00,
        //-----------------------------


        //-----------------------------
        //для скинали
        //-----------------------------
        //минимальная площадь одной панели
        //если площадь одной панели < 0.3 то её площадь будет = 0.3 для всех расчётов
        SKINALI_PANEL_MIN_AREA_IN_SQUARE_METERS: 0.3,

        //цена замера (с PVN)
        SKINALI_METRING_PRICE: 10.00,

        //цена доставки (с PVN)
        SKINALI_DELIVERY_PRICE: 21.78,

        //цена монтажа за 1 квадратный метр (с PVN)
        SKINALI_INSTALLATION_PRICE: 20.57,

        //цена закалки панелей за 1 квадратный метр (с PVN)
        SKINALI_PANEL_HARDENING_PRICE: 25.31,

        //цена шлифовки панелей за 1 погонный метр (за 1 метр периметра) (с PVN)
        // если величина погонного метра (периметр) > 2 метров то цена за погонного метра (периметр) увеличивается на 25%
        // если величина погонного метра (периметр) > 3 метров то цена за погонного метра (периметр) увеличивается на 50%
        SKINALI_PANEL_GRINDING_PRICE: 2.13,

        //цена фотопечати за 1 квадратный метр (с PVN)
        SKINALI_PHOTO_PRINTING_PRICE: 45.19,

        //цена оформления фотопечати (с PVN)
        SKINALI_PHOTO_PRINTING_DESIGN_PRICE: 18.08,

        //цена фотопечати на 1 розетке в блоке розеток (с PVN)
        SKINALI_PHOTO_PRINTING_ON_ONE_SOCKET_BLOCK_PRICE: 5.00,

        //цена однотонной покраски за 1 квадратный метр (с PVN)
        SKINALI_MONOCHROMATIC_PAINTING_PRICE: 29.87,

        //цена за 1 квадратный метр обычного стекла
        SKINALI_NORMAL_GLASS_TYPE_PRICE: 16.64,

        //цена за 1 квадратный метр осветлённого стекла
        SKINALI_CLARIFIED_GLASS_TYPE_PRICE: 32.54,

        //цена за высверливание 1 отверстия в панелей (количество отверстий в одной панели = 1 + (целое число от длинна панели в метрах, если оно равно 0 то 1))
        SKINALI_ONE_HOLE_DRILLING_PRICE: 2.73,

        //цена за клей для всех панелей
        SKINALI_GLUE_PRICE: 5.00,

        //цена за высверливание 1 отверстия под 1 розетку в 1 блоке розеток (это цена за 1 высверливание, блок розеток требует несколько высверливаний)
        SKINALI_ONE_SOCKET_DRILLING_PRICE: 7.56,

        //-----------------------------


        //-----------------------------
        //для дверей
        //-----------------------------

        //цена доставки (с PVN) (для душевых кабин)
        DOORS_DELIVERY_PRICE: 7.00,

        //цена монтажа за 1 квадратный метр (с PVN) (для дверей)
        DOORS_INSTALLATION_PRICE: 10.00,

        //цена фотопечати (с PVN)
        DOORS_PHOTO_PRINTING_PRICE: 30.00,

        //цена однотонной покраски (с PVN)
        DOORS_MONOCHROMATIC_PAINTING_PRICE: 20.00,
        //-----------------------------

        //выводить лог в консоль
        PRINT_LOG_TO_CONSOLE_ON: isLocalhost === true ? true : true,

        //-----------------------------

        //отображать кнопку "заказать"
        SHOW_ORDER_BUTTON: true,

        //ключ для отправки мэйлов сгенерированный на smtpJs.com
        SEND_ORDER_SECURE_TOKEN: "2a89635f-a426-414c-9cdd-4616b54b3fec",

        //e-mail отправителя письма с данными заказа к которому привязан ключ на smtpJs.com
        SEND_ORDER_FROM: "stasmainwork@gmail.com",

        //e-mail получателя письма с данными заказа
        SEND_ORDER_TO: isLocalhost === true ? "0305stas@inbox.lv" : "",//"bugsy@inbox.lv",

        //subject отправителя e-mail с данными заказа
        SEND_ORDER_SUBJECT: "Новый заказ от ",

        //-----------------------------

        //максимальное количество файлов с чертежами которое можно приложить к письму
        CLIENT_DRAWING_FILES_MAX_COUNT: 10,
        
        //максимальный объём всех приложенных файлов с чертежами
        CLIENT_DRAWING_TOTAL_FILES_MAX_SIZE_IN_BYTES: 25 * 1000000 // 25 Mb    
    };

    return module;
}());