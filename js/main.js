// ============================================
// pilatesroom はろこあ - メインスクリプト
// ============================================
//
// 使用ライブラリ:
//   - AOS v2.3.1（Animate On Scroll）… スクロール連動フェードインアニメーション
//
// それ以外はすべてバニラJS（Vanilla JavaScript）で実装
//
// 機能一覧（HTMLの登場順）:
//   1. AOS 初期化
//   2. ハンバーガーメニュー
//   3. Hero 写真スライドショー
//   4. 講師メッセージ「続きを読む」開閉
//   5. FAQ アコーディオン
//   6. 固定CTAバーの表示制御（Intersection Observer）
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // 1. AOS（スクロールアニメーション）の初期化
  // ============================================
  // HTML側の data-aos 属性を読み取り、要素が画面内に入ったタイミングで
  // フェードイン等のアニメーションを実行するライブラリ
  // 公式: https://michalsnik.github.io/aos/
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 60,
    });
  }

  // ============================================
  // 2. ハンバーガーメニュー
  // ============================================
  // 動作の流れ:
  //   1. ハンバーガーボタンをクリック
  //   2. ボタンに .is-open → CSSで線が × にトランスフォーム
  //   3. sp-nav に .is-open → CSSで右からスライドイン
  //   4. body に .is-nav-open → 背景スクロールを無効化

  const hamburger = document.getElementById("jsHamburger");
  const spNav = document.getElementById("jsSpNav");
  const spNavOverlay = document.getElementById("jsSpNavOverlay");

  function toggleMenu() {
    const isOpen = hamburger.classList.contains("is-open");

    if (isOpen) {
      hamburger.classList.remove("is-open");
      spNav.classList.remove("is-open");
      document.body.classList.remove("is-nav-open");
      hamburger.setAttribute("aria-label", "メニューを開く");
    } else {
      hamburger.classList.add("is-open");
      spNav.classList.add("is-open");
      document.body.classList.add("is-nav-open");
      hamburger.setAttribute("aria-label", "メニューを閉じる");
    }
  }

  if (hamburger && spNav) {
    hamburger.addEventListener("click", toggleMenu);
    if (spNavOverlay) {
      spNavOverlay.addEventListener("click", toggleMenu);
    }
    // ナビリンククリック時もメニューを閉じる（ページ内遷移のため）
    const spNavLinks = spNav.querySelectorAll(".sp-nav__link");
    spNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (hamburger.classList.contains("is-open")) {
          toggleMenu();
        }
      });
    });
  }

  // ============================================
  // 3. Hero 写真スライドショー
  // ============================================
  // .is-active を付け替えてCSSのopacity transitionでクロスフェード
  const photos = document.querySelectorAll(".hero__photo");
  if (photos.length > 0) {
    let current = 0;

    setInterval(() => {
      photos[current].classList.remove("is-active");
      current = (current + 1) % photos.length;
      photos[current].classList.add("is-active");
    }, 4000);
  }

  // ============================================
  // 4. 講師メッセージ「続きを読む」開閉
  // ============================================
  // 長文メッセージを .is-closed の max-height: 0 で折りたたみ
  // ボタンテキストも「続きを読む / 閉じる」に連動して切り替え
  const trainerToggle = document.querySelector(".trainer__toggle");
  const trainerMore = document.querySelector(".trainer__message-more");

  if (trainerToggle && trainerMore) {
    trainerToggle.addEventListener("click", () => {
      trainerMore.classList.toggle("is-closed");
      const isClosed = trainerMore.classList.contains("is-closed");
      trainerToggle.textContent = isClosed ? "続きを読む" : "閉じる";
      trainerToggle.setAttribute("aria-expanded", !isClosed);
    });
  }

  // ============================================
  // 5. FAQ アコーディオン
  // ============================================
  // 質問（dt）をクリックすると回答（dd）の表示/非表示をトグル
  // CSSの .is-closed クラスで max-height と opacity を制御
  // ※ JS無効時は全ての回答が表示される（プログレッシブエンハンスメント）
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item, index) => {
    // 最初の1つ以外は閉じた状態にする
    if (index !== 0) {
      item.classList.add("is-closed");
    }

    const question = item.querySelector(".faq__question");

    if (question) {
      question.addEventListener("click", () => {
        item.classList.toggle("is-closed");
      });
    }
  });

  // ============================================
  // 6. 固定CTAバーの表示制御
  // ============================================
  // Intersection Observer API を使い、ヒーローセクションが
  // 画面外に出たタイミングで固定バーを表示する
  const fixedBar = document.getElementById("fixedBar");
  const hero = document.querySelector(".hero");

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
