document.addEventListener('DOMContentLoaded', function() {
    // 初始化Swiper轮播图
    const swiper = new Swiper('.swiper-container', {
        // 循环模式选项
        loop: true,

        // 自动播放
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        // 分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // 前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 渐变效果
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    // 视频播放控制
    const video = document.getElementById('factory-video');
    if (video) {
        // 可以添加视频相关的控制逻辑
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }

    // 响应式导航菜单
    const navLinks = document.querySelector('.nav-links');
    const languageSwitch = document.querySelector('.language-switch');

    // 导入国际化资源文件
    // 注意：确保在HTML中引入了i18n.js文件

    // 当前语言，默认为英文
    let currentLang = 'en';

    // 更新页面文本的函数
    function updatePageText(lang) {
        // 如果没有对应语言的翻译，使用默认语言
        if (!i18n[lang]) {
            console.warn(`Language ${lang} not found, using default language.`);
            return;
        }

        // 更新所有带有data-i18n属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (i18n[lang][key]) {
                element.textContent = i18n[lang][key];
            }
        });

        // 更新所有带有data-i18n-placeholder属性的输入元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (i18n[lang][key]) {
                element.placeholder = i18n[lang][key];
            }
        });

        // 保存当前语言
        currentLang = lang;

        // 更新语言切换按钮的激活状态
        document.querySelectorAll('.language-switch a').forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 语言切换功能
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const lang = this.value;
            if (lang) {
                updatePageText(lang);
            }
        });
        // 设置初始选中值
        languageSelect.value = currentLang;
    };

    // 初始化默认语言
    updatePageText(currentLang);

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // 检查targetId是否只是'#'或为空，这种情况下不执行滚动
            if (targetId === '#' || !targetId) {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加表单验证和提交逻辑
            alert('感谢您的留言！我们会尽快回复您。');
            this.reset();
        });
    }
});