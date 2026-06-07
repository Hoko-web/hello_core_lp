// pilatesroom はろこあ - メインスクリプト
// AOS v2.3.1 以外はすべてバニラJS

// アニメーションを控えたいユーザー設定（各アニメの出し分けに使用）
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

document.addEventListener("DOMContentLoaded", () => {
  // AOS 初期化（reduced-motion 時は無効化）
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 60,
      disable: prefersReducedMotion,
    });
  }

  // ハンバーガーメニュー
  const hamburger = document.querySelector(".js-hamburger");
  const drawer = document.querySelector(".js-drawer");
  const drawerOverlay = document.querySelector(".js-drawer-overlay");

  function toggleMenu() {
    const isOpen = hamburger.classList.contains("is-open");

    if (isOpen) {
      hamburger.classList.remove("is-open");
      drawer.classList.remove("is-open");
      document.body.classList.remove("is-nav-open");
      hamburger.setAttribute("aria-label", "メニューを開く");
    } else {
      hamburger.classList.add("is-open");
      drawer.classList.add("is-open");
      document.body.classList.add("is-nav-open");
      hamburger.setAttribute("aria-label", "メニューを閉じる");
    }
  }

  if (hamburger && drawer) {
    hamburger.addEventListener("click", toggleMenu);
    if (drawerOverlay) {
      drawerOverlay.addEventListener("click", toggleMenu);
    }
    // ページ内リンク遷移時もメニューを閉じる
    const drawerLinks = drawer.querySelectorAll(".p-header__drawer-link");
    drawerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (hamburger.classList.contains("is-open")) {
          toggleMenu();
        }
      });
    });
  }

  // Hero 写真クロスフェード（reduced-motion 時は切り替えない）
  const photos = document.querySelectorAll(".p-hero__photo");
  if (photos.length > 1 && !prefersReducedMotion) {
    let current = 0;

    setInterval(() => {
      photos[current].classList.remove("is-active");
      current = (current + 1) % photos.length;
      photos[current].classList.add("is-active");
    }, 4000);
  }

  // 講師メッセージ「続きを読む」開閉
  const trainerToggle = document.querySelector(".p-trainer__toggle");
  const trainerMore = document.querySelector(".p-trainer__message-more");

  if (trainerToggle && trainerMore) {
    trainerToggle.addEventListener("click", () => {
      trainerMore.classList.toggle("is-closed");
      const isClosed = trainerMore.classList.contains("is-closed");
      trainerToggle.textContent = isClosed ? "続きを読む" : "閉じる";
      trainerToggle.setAttribute("aria-expanded", !isClosed);
    });
  }

  // FAQ は <details>/<summary> でネイティブ開閉（JS不要・キーボード対応）

  // 固定CTAバー: ヒーローが画面外に出たら表示
  const fixedBar = document.querySelector(".js-fixed-bar");
  const hero = document.querySelector(".p-hero");

  if (fixedBar && hero) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            fixedBar.classList.add("is-visible");
          } else {
            fixedBar.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0 },
    );

    barObserver.observe(hero);
  }
});

new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  spaceBetween: 16,
  slidesPerView: "auto",
  centeredSlides: true,
  speed: 4000,
  // reduced-motion 時は自動スクロールを止める
  autoplay: prefersReducedMotion
    ? false
    : {
        delay: 0,
        disableOnInteraction: false,
      },
  pagination: {
    el: ".swiper-pagination",
  },
});
