// 'use strict';



// // element toggle function
// const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// // sidebar variables
// const sidebar = document.querySelector("[data-sidebar]");
// const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// // sidebar toggle functionality for mobile
// sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// // testimonials variables
// const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector("[data-modal-container]");
// const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// // modal variable
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text]");

// // modal toggle function
// const testimonialsModalFunc = function () {
//   modalContainer.classList.toggle("active");
//   overlay.classList.toggle("active");
// }

// // add click event to all modal items
// for (let i = 0; i < testimonialsItem.length; i++) {

//   testimonialsItem[i].addEventListener("click", function () {

//     modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//     modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//     modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
//     modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

//     testimonialsModalFunc();

//   });

// }

// // add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// // custom select variables
// const select = document.querySelector("[data-select]");
// const selectItems = document.querySelectorAll("[data-select-item]");
// const selectValue = document.querySelector("[data-selecct-value]");
// const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// // add event in all select items
// for (let i = 0; i < selectItems.length; i++) {
//   selectItems[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     elementToggleFunc(select);
//     filterFunc(selectedValue);

//   });
// }

// // filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {

//   for (let i = 0; i < filterItems.length; i++) {

//     if (selectedValue === "all") {
//       filterItems[i].classList.add("active");
//     } else if (selectedValue === filterItems[i].dataset.category) {
//       filterItems[i].classList.add("active");
//     } else {
//       filterItems[i].classList.remove("active");
//     }

//   }

// }

// // add event in all filter button items for large screen
// let lastClickedBtn = filterBtn[0];

// for (let i = 0; i < filterBtn.length; i++) {

//   filterBtn[i].addEventListener("click", function () {

//     let selectedValue = this.innerText.toLowerCase();
//     selectValue.innerText = this.innerText;
//     filterFunc(selectedValue);

//     lastClickedBtn.classList.remove("active");
//     this.classList.add("active");
//     lastClickedBtn = this;

//   });

// }



// // contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// // add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }

//   });
// }



// // page navigation variables
// const navigationLinks = document.querySelectorAll("[data-nav-link]");
// const pages = document.querySelectorAll("[data-page]");

// // add event to all nav link
// for (let i = 0; i < navigationLinks.length; i++) {
//   navigationLinks[i].addEventListener("click", function () {

//     for (let i = 0; i < pages.length; i++) {
//       if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
//         pages[i].classList.add("active");
//         navigationLinks[i].classList.add("active");
//         window.scrollTo(0, 0);
//       } else {
//         pages[i].classList.remove("active");
//         navigationLinks[i].classList.remove("active");
//       }
//     }

//   });
// }


'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // element toggle function
  const elementToggleFunc = function (elem) { if (elem) elem.classList.toggle("active"); }

  // ---------- SIDEBAR ----------
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // ---------- TESTIMONIALS MODAL ----------
  const testimonialsItem = Array.from(document.querySelectorAll("[data-testimonials-item]"));
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  }

  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar && modalImg) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt || '';
      }
      if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
      if (text && modalText) modalText.innerHTML = text.innerHTML;

      testimonialsModalFunc();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

  // ---------- HELPERS ----------
  const normalize = str => (str || '').toString().trim().toLowerCase();

  // ---------- CUSTOM SELECT & FILTER ----------
  const select = document.querySelector("[data-select]");
  const selectItems = Array.from(document.querySelectorAll("[data-select-item]"));
  const selectValue = document.querySelector("[data-selecct-value]"); // kept original typo selector
  const filterBtn = Array.from(document.querySelectorAll("[data-filter-btn]"));
  const filterItems = Array.from(document.querySelectorAll("[data-filter-item]"));

  // Precompute normalized category for each filter item to speed up comparisons
  filterItems.forEach(fi => {
    fi.dataset.normCategory = normalize(fi.dataset.category);
  });

  // safe toggle for select
  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(this); });
  }

  // filter function that uses normalized values
  const filterFunc = function (selectedValue) {
    const normSel = normalize(selectedValue);

    filterItems.forEach(item => {
      if (normSel === 'all' || normSel === '') {
        item.classList.add('active');
      } else if (item.dataset.normCategory === normSel) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // select-list click handling
  selectItems.forEach(si => {
    si.addEventListener('click', function () {
      const text = this.innerText || this.textContent || '';
      if (selectValue) selectValue.innerText = text;
      elementToggleFunc(select);
      filterFunc(text);
      // sync horizontal buttons active state if any
      filterBtn.forEach(b => b.classList.toggle('active', normalize(b.innerText) === normalize(text)));
    });
  });

  // horizontal filter buttons
  let lastClickedBtn = filterBtn.length ? filterBtn[0] : null;

  filterBtn.forEach(btn => {
    btn.addEventListener("click", function () {
      const text = this.innerText || this.textContent || '';
      if (selectValue) selectValue.innerText = text;
      filterFunc(text);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });

  // initialize filter state using the first active button or 'all'
  const initialBtn = filterBtn.find(b => b.classList.contains('active'));
  if (initialBtn) {
    filterFunc(initialBtn.innerText);
    // ensure selectValue shows correct initial text
    if (selectValue) selectValue.innerText = initialBtn.innerText;
    lastClickedBtn = initialBtn;
  } else {
    filterFunc('all');
    if (selectValue) selectValue.innerText = 'All';
  }

  // ---------- CONTACT FORM VALIDATION ----------
  const form = document.querySelector("[data-form]");
  const formInputs = Array.from(document.querySelectorAll("[data-form-input]"));
  const formBtn = document.querySelector("[data-form-btn]");

  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      if (!form) return;
      if (form.checkValidity()) {
        formBtn && formBtn.removeAttribute("disabled");
      } else {
        formBtn && formBtn.setAttribute("disabled", "");
      }
    });
  });

  // ---------- PAGE NAVIGATION ----------
  const navigationLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const pages = Array.from(document.querySelectorAll("[data-page]"));

  navigationLinks.forEach((navLink, idx) => {
    navLink.addEventListener("click", function () {
      const targetName = normalize(this.innerHTML);
      pages.forEach((page, pageIdx) => {
        if (targetName === normalize(page.dataset.page)) {
          page.classList.add("active");
          navigationLinks[pageIdx] && navigationLinks[pageIdx].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
          navigationLinks[pageIdx] && navigationLinks[pageIdx].classList.remove("active");
        }
      });
    });
  });

  // ---------- VIDEO PREVIEW HELPERS ----------
  // Ensure videos request metadata (helps to get width/height and posters), and try to play/pause via IntersectionObserver
  const projectVideos = Array.from(document.querySelectorAll('.project-video'));

  projectVideos.forEach(v => {
    // encourage metadata load
    try { v.preload = v.getAttribute('preload') || 'metadata'; } catch (e) {}
    // ensure muted so autoplay is allowed
    v.muted = true;
    v.setAttribute('playsinline', '');
  });

  if ('IntersectionObserver' in window && projectVideos.length) {
    const vidObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          // attach <source> if you used data-src pattern (optional)
          // if (v.dataset.src && !v.querySelector('source')) {
          //   const s = document.createElement('source'); s.src = v.dataset.src; s.type = 'video/mp4'; v.appendChild(s); v.load();
          // }
          // try play (muted -> should not be blocked)
          v.play().catch(()=>{ /* autoplay might still be blocked; poster will show */ });
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.45 });

    projectVideos.forEach(v => vidObserver.observe(v));
  }

  // End DOMContentLoaded
});
