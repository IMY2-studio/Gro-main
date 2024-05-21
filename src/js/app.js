import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'
import intersect from '@alpinejs/intersect'
import Swiper, { Pagination, EffectFade, Autoplay } from 'swiper'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { gsap } from 'gsap'
import collapse from '@alpinejs/collapse'

// Product page custom cursor

window.addEventListener('load', () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

function customCursor() {
  var cursor = document.querySelector('.js-cursor')
  var closeCursor = document.querySelector('.close-modal--button')
  var mediaCarousel = document.querySelector('#media-wrapper')

  document.addEventListener('mousemove', (t) => {
    console.log(t.target)

    if (
      t.target === mediaCarousel ||
      t.target.matches('.custom-cursor-image')
    ) {
      if (t.target.classList.contains('lg:!flex')) {
        return
      } else {
        cursor.classList.add('lg:!flex')
      }
    }

    // let cursorDot = document.querySelector('[data-dot]')

    var curX = t.clientX
    var curY = t.clientY

    closeCursor.style.transform =
      'translate(calc(' + curX + 'px - 50%),calc(' + curY + 'px - 50%))'

    cursor.style.transform =
      'translate(calc(' + curX + 'px - 50%),calc(' + curY + 'px - 50%))'
  })

  mediaCarousel.addEventListener('mouseleave', () => {
    cursor.classList.remove('lg:!flex')
  })
}

// Sorting options

const showSortingOptions = () => {
  let input = document.querySelector('#sort-options-wrapper')
  let itemsToShow = document.querySelector('#sort-by')
  let chevron = document.querySelector('.sort-chevron')

  gsap.to(chevron, {
    rotate: '180',
    ease: 'power2.in',
    duration: 0.2
  })

  let timeline = gsap.timeline()

  timeline
    .to(input, {
      borderBottomColor: 'rgba(0, 0, 0, 0.01)',
      ease: 'power2.in',
      duration: 0.2
    })
    .to(input, {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      duration: 0.2,
      ease: 'power2.in'
    })
    .to(itemsToShow, {
      opacity: 1,
      height: 'auto',
      duration: 0.4,
      ease: 'power2.in'
    })

  console.log('toggle test play')
}

const hideSortingOptions = () => {
  let input = document.querySelector('#sort-options-wrapper')
  let itemsToShow = document.querySelector('#sort-by')

  let chevron = document.querySelector('.sort-chevron')

  gsap.to(chevron, {
    rotate: '0',
    ease: 'power2.in',
    duration: 0.2
  })

  let timeline = gsap.timeline()

  timeline
    .to(itemsToShow, {
      height: 0,
      opacity: 0,
      delay: 0.1,
      ease: 'power2.in',
      duration: 0.2
    })
    .to(input, {
      borderBottomRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      borderBottomColor: 'rgba(9, 35, 36, 0.2)',
      ease: 'power2.in',
      duration: 0.03
    })

  console.log('toggle test')
}

// Header Menu

const showMenu = (e) => {
  e.preventDefault()

  let count = e.target.dataset.count * 1

  console.log(count)

  // Select header and closer

  const siteHeader = document.querySelector('#site-layout-header')
  const headerDrawerCloser = document.querySelector(
    '#header-menus-transparent--close'
  )

  siteHeader.classList.add('!bg-green')

  // disable scroll

  const docBody = document.querySelector('body')

  docBody.classList.add('overflow-hidden', 'menu-drawer-open')

  // hovered element

  const hoveredElement = e.target

  // Menu to select

  const thisMenu = e.target.dataset.link
  const thisMenuSelected = document.querySelector(`[data-menu="${thisMenu}"]`)

  // All menus revert back to intended style before showing active menu

  const allMenus = document.querySelectorAll('.dropdown-menu--wrapper')
  const allLinks = document.querySelectorAll('.parent-link')
  const headerDrawer = document.querySelector('#header-menus-drawer')

  if (count > 4) {
    gsap.to(headerDrawer, {
      height: 'auto',
      duration: 0.1,
      ease: 'power2.in'
    })
  } else {
    gsap.to(headerDrawer, {
      height: 'auto',
      duration: 0.1,
      ease: 'power2.in'
    })
  }

  allLinks.forEach((element) => {
    element.classList.remove('active')
  })

  hoveredElement.classList.add('active')

  let tl = gsap.timeline({
    onStart: () => {
      for (let index = 0; index < allMenus.length; index++) {
        const element = allMenus[index]

        element.style.display = 'none'
        element.style.opacity = 0
      }
    }
  })

  tl.set(headerDrawer, {
    display: 'grid'
  })

  tl.to(headerDrawer, {
    y: 0,
    duration: 0.2
  })

  tl.set(headerDrawerCloser, {
    display: 'block'
  })

  tl.to(thisMenuSelected, {
    display: 'block',
    opacity: 1,
    duration: 0.2,
    delay: 0.1
  })

  console.log(thisMenu)
}

// Mobile Menu

const showMenuMobile = (e) => {
  e.preventDefault()

  // Select header and closer

  const siteHeader = document.querySelector('#site-layout-header')
  const headerDrawerCloser = document.querySelector(
    '#header-menus-transparent--close'
  )

  siteHeader.classList.add('!bg-green')

  // disable scroll

  const docBody = document.querySelector('body')
  docBody.classList.add('overflow-hidden')

  // hovered element

  const hoveredElement = e.target

  // Menu to select

  const thisMenu = e.target.dataset.link
  const thisMenuSelected = document.querySelector(
    `[data-menu-mobile="${thisMenu}"]`
  )

  // All menus revert back to intended style before showing active menu

  const allMenus = document.querySelectorAll('.dropdown-menu--wrapper-mobile')
  const headerDrawer = document.querySelector('#header-menus-drawer-mobile')

  hoveredElement.classList.add('active')

  let tl = gsap.timeline({
    onStart: () => {
      for (let index = 0; index < allMenus.length; index++) {
        const element = allMenus[index]

        element.style.display = 'none'
        element.style.opacity = 0
      }
    }
  })

  tl.set(headerDrawer, {
    display: 'grid'
  })

  tl.to(headerDrawer, {
    x: 0,
    duration: 0.2
  })

  tl.set(headerDrawerCloser, {
    display: 'block'
  })

  tl.to(thisMenuSelected, {
    display: 'block',
    opacity: 1,
    duration: 0.2
  })
}

const closeMenu = () => {
  const siteHeader = document.querySelector('#site-layout-header')

  const allMenus = document.querySelectorAll('.dropdown-menu--wrapper')
  const headerDrawer = document.querySelector('#header-menus-drawer')

  const headerDrawerCloser = document.querySelector(
    '#header-menus-transparent--close'
  )

  for (let index = 0; index < allMenus.length; index++) {
    const element = allMenus[index]

    element.style.display = 'none'
    element.style.opacity = 0
  }

  let tl = gsap.timeline({
    onStart: () => {
      siteHeader.classList.remove('!bg-green')

      for (let index = 0; index < allMenus.length; index++) {
        const element = allMenus[index]

        element.style.display = 'none'
        element.style.opacity = 0
      }
    },
    onComplete: () => {
      // enable scroll

      const docBody = document.querySelector('body')
      docBody.classList.remove('overflow-hidden', 'menu-drawer-open')
    }
  })

  tl.to(headerDrawer, {
    y: '-100%',
    duration: 0.3
  })

  tl.to(headerDrawer, {
    display: 'none',
    delay: 0.3
  })

  tl.set(headerDrawerCloser, {
    display: 'none'
  })
}

const closeMenuMobile = (e) => {
  e.preventDefault()

  // Select header and closer

  const siteHeader = document.querySelector('#site-layout-header')

  siteHeader.classList.add('!bg-green')

  // disable scroll

  const docBody = document.querySelector('body')
  docBody.classList.add('overflow-hidden')

  // hovered element

  const hoveredElement = e.target

  // Menu to select

  const thisMenu = e.target.dataset.link
  const thisMenuSelected = document.querySelector(
    `[data-menu-mobile="${thisMenu}"]`
  )

  // All menus revert back to intended style before showing active menu

  const allMenus = document.querySelectorAll('.dropdown-menu--wrapper-mobile')
  const headerDrawer = document.querySelector('#header-menus-drawer-mobile')

  hoveredElement.classList.add('active')

  let tl = gsap.timeline({
    onComplete: () => {
      for (let index = 0; index < allMenus.length; index++) {
        const element = allMenus[index]

        element.style.display = 'none'
        element.style.opacity = 0
      }

      const docBody = document.querySelector('body')
      docBody.classList.remove('overflow-hidden')
    }
  })

  tl.to(headerDrawer, {
    x: 0,
    duration: 0.2
  })

  tl.set(headerDrawer, {
    display: 'none'
  })

  tl.to(thisMenuSelected, {
    display: 'none',
    opacity: 0,
    duration: 0.2
  })
}

// Header Search bar

const openSearchDrawer = (e) => {
  console.log(e)

  // Use GSAP to transition header correctly

  /* Selectors */

  // Button

  const button = e.target

  // Headers

  const siteHeader = document.querySelector('#site-layout-header')

  // Search bar

  const searchBar = document.querySelector('#header-search-bar')

  /* Get Height settings */

  const rect = siteHeader.getBoundingClientRect()
  const offset = {
    top: rect.top + window.scrollY,
    bottom: rect.bottom - window.innerHeight,
    left: rect.left + window.scrollX
  }
  const width = siteHeader.offsetWidth
  const height = siteHeader.offsetHeight
  const bottom = offset.bottom
  const top = offset.top - window.pageYOffset
  const left = offset.left

  /* animate */

  var tlOpen = gsap.timeline()

  tlOpen.set(searchBar, {
    height: height
  })

  tlOpen.to(siteHeader, {
    opacity: 0,
    duration: 0.2
  })

  tlOpen.to(siteHeader, {
    translateY: '-100%',
    duration: 0.2
  })

  tlOpen.to(searchBar, {
    translateY: 0,
    duration: 0.1
  })
}

//  Close search bar

const closeSearchDrawer = (e) => {
  // Use GSAP to transition header correctly

  /* Selectors */

  // Button

  const button = e.target

  // Headers

  const siteHeader = document.querySelector('#site-layout-header')

  // Search bar

  const searchBar = document.querySelector('#header-search-bar')

  /* Get Height settings */

  const rect = siteHeader.getBoundingClientRect()
  const offset = {
    top: rect.top + window.scrollY,
    bottom: rect.bottom - window.innerHeight,
    left: rect.left + window.scrollX
  }
  const width = siteHeader.offsetWidth
  const height = siteHeader.offsetHeight
  const bottom = offset.bottom
  const top = offset.top - window.pageYOffset
  const left = offset.left

  /* animate */

  var tlClose = gsap.timeline()

  tlClose.to(searchBar, {
    translateY: '-100%',
    duration: 0.2
  })

  tlClose.set(siteHeader, {
    opacity: 1,
    duration: 0.2
  })

  tlClose.to(siteHeader, {
    translateY: 0,
    duration: 0.2
  })
}

// Home Page Slider

Alpine.data('heroSlider', () => ({
  init() {
    let slideTime = this.$el.getAttribute('data-slide-time')
    let transitionSpeed = this.$el.getAttribute('data-transition-speed')

    const swiper = new Swiper(this.$el.querySelector('.swiper'), {
      modules: [Pagination, Autoplay],
      slidesPerView: 1,
      autoplay: {
        enabled: true,
        delay: slideTime
      },
      speed: transitionSpeed,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
    swiper.on('slideChange', function (sl) {
      // const slides = sl.slides
      // const activeSlide = slides[sl.activeIndex]
      // const caption = activeSlide.dataset.caption
      // const section = activeSlide.dataset.section
      // const captionToUpdate = document.querySelector(`#image-caption-${section}`)
      // if(caption.length > 0 && caption.length !== null) {
      //     captionToUpdate.innerHTML = caption
      // }
    })
  }
}))

// Categories Slider

Alpine.data('categorieslider', () => ({
  init(element) {
    const swiper = new Swiper(element, {
      modules: [Pagination, Autoplay],
      slidesPerView: 1.2,
      autoHeight: true,
      spaceBetween: 20,
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: '.swiper-pagination-categories',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3
        }
      }
    })
    swiper.on('activeIndexChange', (sl) => {
      let slideIndex =
        sl.activeIndex === 0 ? sl.activeIndex + 1 : sl.activeIndex - 1

      let indexDisplay = document.querySelector('.number')

      indexDisplay.innerHTML = `${slideIndex} `
    })
    ;(function () {
      const parent = document.querySelector('.wrapper-section--swiper')

      let totalPagination = swiper.pagination.bullets.length

      let totalDisplayElement = parent.querySelector('.total')

      totalDisplayElement.innerHTML = '2'
    })()
  }
}))

Alpine.data('collectionListingSlider', () => ({
  init(element) {
    const swiper = new Swiper(element, {
      modules: [Pagination, Autoplay],
      slidesPerView: 1,
      autoHeight: true,
      spaceBetween: 20,
      autoplay: {
        delay: 3000
      },
      pagination: {
        el: '.swiper-pagination-collection-listing',
        clickable: true
      }
    })
  }
}))

// Home Page Slider

Alpine.data('featuredBlockSlider', () => ({
  init(element) {
    const swiperBlock = new Swiper(element, {
      modules: [Pagination, EffectFade, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerView: 1,
      effect: 'fade',
      autoplay: {
        delay: 3000
      },
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.swiper-pagination-block',
        clickable: true
      }
    })
    swiperBlock.on('activeIndexChange', (sl) => {
      let slideIndex = sl.activeIndex + 1

      let indexDisplay = document.querySelector('.number-block')

      indexDisplay.innerHTML = `${slideIndex} `
    })
    ;(function () {
      const parent = document.querySelector('.wrapper-section--swiper-block')

      let totalPagination = swiperBlock.pagination.bullets.length

      let totalDisplayElement = parent.querySelector('.total-block')

      totalDisplayElement.innerHTML = '3'
    })()
  }
}))

// Home Page Slider

Alpine.data('productImageMobileSlider', () => ({
  init(element) {
    new Swiper(element, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  }
}))

// Load more button pagination

window.showSortingOptions = showSortingOptions
window.hideSortingOptions = hideSortingOptions
window.customCursor = customCursor
window.closeSearchDrawer = closeSearchDrawer
window.closeMenuMobile = closeMenuMobile
window.showMenuMobile = showMenuMobile
window.closeMenu = closeMenu
window.showMenu = showMenu
window.openSearchDrawer = openSearchDrawer
window.Alpine = Alpine
Alpine.plugin(persist)
Alpine.plugin(collapse)
Alpine.plugin(intersect)

Alpine.start()

let Sunrise = {
  updateQuantity(line, qty) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty, line: line })
    })
      .then((response) => response.json())
      .then((data) => {
        // fire javascript event on window
        window.dispatchEvent(new Event('cart-updated'))
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}

window.Sunrise = Sunrise
