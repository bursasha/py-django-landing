window.addEventListener("DOMContentLoaded", () => {
  // Work with tabs
  const tabs = document.querySelectorAll(".tabs__item");

  tabs.forEach((tab) => {
    if (!tab.classList.contains("tabs__item_active")) {
      tab.addEventListener("click", () => {
        tabs.forEach((otherItem) => {
          if (otherItem.classList.contains("tabs__item_active")) {
            otherItem.classList.remove("tabs__item_active");
          }
        });
        tab.classList.add("tabs__item_active");
      });
    }
  });


  // Work with photo carousel
  $(".gallery__carousel").slick({
    autoPlay: true,
    autoPlaySpeed: 5000,
    prevArrow:
      '<div class="carousel__arrow carousel__prev"><i class="fas fa-chevron-left"></i></div>',
    nextArrow:
      '<div class="carousel__arrow carousel__next"><i class="fas fa-chevron-right"></i></div>'
  })


  // Work with video
  const videos = document.querySelectorAll('video')


  videos.forEach((video) => {

    const playBtn = video.nextSibling.nextSibling
    // console.log(playBtn)

    playBtn.addEventListener('click', () => {
      video.play()
      video.setAttribute('controls', 'controls')
      playBtn.style.display = 'none'
    })


    video.addEventListener('ended', function () {
      this.src = this.src
      playBtn.style.display = 'block'
      video.removeAttribute('controls')
    })

  })


  // Work with page block anchors
  const anchors = document.querySelectorAll('.scroll_to')

  for (let anchor of anchors) {
    anchor.addEventListener('click', (event) => {
      event.preventDefault()

      const blockId = anchor.getAttribute('href')

      document.querySelector(blockId).scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    })
  }


  // Work with popup window
  function popupOpen() {
    document.querySelector('.popup').classList.add('popup__active')
    document.body.style.overflow = 'hidden'
  }

  function popupClose() {
    document.querySelector('.popup').classList.remove('popup__active')
    document.body.style.overflow = 'visible'
  }

  const buttonSend = document.querySelector('.send__btn')
  const buttonClosePopup = document.querySelector('.popup__close')

  // buttonSend.addEventListener('click', popupOpen)
  buttonClosePopup.addEventListener('click', popupClose)


  // Work with form
  const formContact = document.querySelector('.contacts__form')

  formContact.addEventListener('submit', (event) => {
    event.preventDefault()

    let objData = {}
    const formData = new FormData(formContact)

    formData.forEach(function(value, key) {
      objData[key] = value
    })

    let isValid = formValidate(objData)

    if (isValid) {
      $.post('http://127.0.0.1:8000/', objData)
      popupOpen()
    } else {
      return
    }
  })

  function formValidate(objFormData) {
    let isValid = false

    for (key in objFormData) {
      if (objFormData[key].trim().length < 2) {
        isValid = false
        break
      }
      isValid = true
    }
    return isValid
  }

})
