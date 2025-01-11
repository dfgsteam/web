    "use strict";


    var windowOn = $(window);
  
    // PreLoader Js
    windowOn.on('load', function () {
      $("#preloader").fadeOut(500);
    });

    // Go to Top

      // Scroll Event
      $(window).on('scroll', function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $('.go-top').addClass('active');
        if (scrolled < 300) $('.go-top').removeClass('active');
      });

      // Click Event
      $('.go-top').on('click', function () {
          $("html, body").animate({
              scrollTop: "0"
          }, 1200);
      });

      // Menu Last Item
      $('.main-menu nav > ul > li').slice(-2).addClass('menu-last');

    /*--
        Header Sticky
    -----------------------------------*/

    window.onscroll = function () {
        const left = document.getElementById("header");

        if (left.scrollTop > 50 || self.pageYOffset > 50) {
            left.classList.add("header-sticky")
        } else {
            left.classList.remove("header-sticky");
        }
    }    


  /*--
        Mobile Menu
  -----------------------------------*/
	$('#mobile-menu').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "991",
		meanExpand: ['<i class="fas fa-plus"></i>'],
	});

   /*--
        Sidebar Js
  -----------------------------------*/
	$(".sidebar-toggle-btn").on("click", function () {
		$(".sidebar__area").addClass("sidebar-opened");
		$(".body-overlay").addClass("opened");
	});
	$(".sidebar__close-btn").on("click", function () {
		$(".sidebar__area").removeClass("sidebar-opened");
		$(".body-overlay").removeClass("opened");
	});



	/*--
        Body overlay Js
  -----------------------------------*/
	$(".body-overlay").on("click", function () {
		$(".sidebar__area").removeClass("sidebar-opened");
		$(".body-overlay").removeClass("opened");
	});


  // Blog move and active js
  var blog_item = gsap.utils.toArray('.postbox__item-02');
  let hover_img = gsap.utils.toArray(".hover-image");

  // Function to move the service image on mouse move
  function ServiceImageMove(event, item) {
    const contentBox = item.getBoundingClientRect();
    const dx = (event.clientX - contentBox.x - contentBox.width / 1) / 3;
    const dy = (event.clientY - contentBox.y - contentBox.height / 1) / 10;

    hover_img.forEach((img) => {
      gsap.to(img, {
        x: dx,
        y: dy,
      });
    });
  }

  // Add hover effect only for screens larger than 768px
  if (window.innerWidth > 767) {
    blog_item.forEach((item, i) => {
      item.addEventListener("mousemove", (event) => {
        ServiceImageMove(event, item);
      });

      item.addEventListener("mouseleave", () => {
        hover_img.forEach((img) => {
          gsap.to(img, {
            x: 0,
            y: 0
          });
        });
      });
    });

    // Add active Blog class on hover
    $('.postbox__item-02').hover(function () {
      $('.postbox__item-02').removeClass('active-blog-item');
      $(this).addClass('active-blog-item');
    });
  }



  /*--    
    Counter Up
  -----------------------------------*/  

    $('.counter').counterUp({
      delay: 10,
      time: 1500,
  });


  /*--    
        Brand Active
    -----------------------------------*/
    var swiper = new Swiper(".brand-active .swiper-container", {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 5,
        },
      },
  });

  /*--    
        Brand Active
    -----------------------------------*/
    var swiper = new Swiper(".brand2-active .swiper-container", {
      slidesPerView: 6,
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
      },
  });

  // brand slider 
  var swiper = new Swiper(".tp-brand-top-active", {
    slidesPerView: 'auto',
    spaceBetween: 70,
    freemode: true,
    centeredSlides: true,
    loop: true,
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
       delay: 1,
       disableOnInteraction: true,
    },
  });

 // brand slider  
 var swiper = new Swiper(".tp-brand-bottom-active", {
    slidesPerView: 'auto',
    spaceBetween: 70,
    freemode: true,
    centeredSlides: true,
    loop: true,
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
       delay: 1,
       disableOnInteraction: true,
    },
  });

    /*--
    Testimonial-2 Active
    -----------------------------------*/
    var swiper = new Swiper('.testimonial-active', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,  
      navigation: {
        nextEl: '.testimonial-active .swiper-button-next',
        prevEl: '.testimonial-active .swiper-button-prev',
      },
    });


    /*--    
        Testimonial-2 Active
    -----------------------------------*/
      var swiper = new Swiper(".author-images-active .swiper-container", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        effect: "fade",
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".testimonial-content-active .swiper-container", {
          loop: true,
          spaceBetween: 20,
          navigation: {
            nextEl: '.testimonial-content-active .swiper-button-next',
            prevEl: '.testimonial-content-active .swiper-button-prev',
          },
          thumbs: {
            swiper: swiper,
          },
      });
  
    /*--
      Testimonial Active
    -----------------------------------*/
    var swiper = new Swiper('.testimonial-2-active', {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: ".testimonial-2-active .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 3,
        },
      }
  });

   /*--
      Gallery Active
    -----------------------------------*/
    var swiper = new Swiper('.gallery-active', {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.gallery-active .swiper-button-next',
        prevEl: '.gallery-active .swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 3,
        },
      }
  });

  /*--
    Blog Slider 
  -----------------------------------*/	
  if (jQuery(".tp-blog__slider").length > 0) {
		let services__slide = new Swiper('.tp-blog__slider', {
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			autoplay: {
			  delay: 3000,
			},
			// Navigation arrows
			navigation: {
				nextEl: ".tp-blog-button-next",
				prevEl: ".tp-blog-button-prev",
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				550: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				1200: {
					slidesPerView: 1,
				},
				1400: {
					slidesPerView: 1,
					}
				}
		});

	}


  /*--
    magnificPopup video view 
  -----------------------------------*/	
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});

   /*--
        AOS
    -----------------------------------*/   
    AOS.init({
      duration: 1200,
      once: true,
  });
