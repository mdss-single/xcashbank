(function($){
	"use strict";

	$(window).on('load resize', function() {
		if ($(window).width() <= 1200) {
			
			// rates carousel
			var $headerRates = $('.js-header-rates').flickity({
				cellSelector: '.header__rates-item',
				cellAlign: 'left',
				freeScroll: true,
				wrapAround: true,
				prevNextButtons: false,
				pageDots: false,
			});
			$('.header__rates-next').on( 'click', function() {
				$headerRates.flickity('next');
			});

			// load active payment system from aside menu
			$('.menu-exchange .exchange-currency__item--active').click();

			// bids page sorting
			$('.js-cabinet-mobile-sort').click(function(e) {
				e.stopPropagation();
				var thisTop = $(this).position(),
				thisHeight = $(this).height();
				$('.cabinet-bids__sortMobile-dropdown').toggleClass('cabinet-bids__sortMobile-dropdown--active').css('top',thisTop.top+thisHeight+14);
			});
			// close bids page sorting dropdown
			$(document).click(function(e) {
				if (!$(e.target).closest('.cabinet-bids__sortMobile-dropdown').length) {
					$('.cabinet-bids__sortMobile-dropdown').removeClass('cabinet-bids__sortMobile-dropdown--active');
				}
			});
		} else {
			// destroy flickity
			if ($('.js-header-rates').flickity()) $('.js-header-rates').flickity('destroy');

			// load active payment system
			$('.exchange__col .exchange-currency__item--active').click();

			// clone picture in news
			$('.js-news-pic').each(function() {
				var picSrc = $(this).find('.news__detail-pic').attr('src');
				$(this).attr('style', 'background-image:url('+picSrc+');');
			});
		}
	});

	// header menu
	$('.js-header-menu').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.header__menu').addClass('header__menu--active');
	});
	$('.js-header-menu-close').click(function(e) {
		e.preventDefault();
		$('.header__menu').removeClass('header__menu--active');
	});
	$(document).click(function(e) {
		if (!$(e.target).closest('.header__menu').length) {
			$('.header__menu').removeClass('header__menu--active');
		}
	});

	// latest reviews
	$('.js-latest-reviews').flickity({
		cellSelector: '.latest-reviews__item',
		wrapAround: true,
		prevNextButtons: false,
	});

	// alerts
	$('.js-alert-error').click(function(e) {
		e.preventDefault();
		if (!$('.alert').hasClass('alert--active')) $('.alert').addClass('alert--active');
		$('.alert__item--error').addClass('alert__item--active');
		$('html').addClass('no-scroll');
	});
	$('.js-alert-success').click(function(e) {
		e.preventDefault();
		if (!$('.alert').hasClass('alert--active')) $('.alert').addClass('alert--active');
		$('.alert__item--success').addClass('alert__item--active');
		$('html').addClass('no-scroll');
	});
	$('.js-alert-close').click(function(e) {
		e.preventDefault();
		$(this).closest('.alert__item').removeClass('alert__item--active')
		if ( !$(this).closest('.alert').find('.alert__item--active').length ) $('.alert').removeClass('alert--active');
		$('html').removeClass('no-scroll');
	});

	// aside menu
	$('.js-header-login').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		showMenu();
		$('.login').addClass('menu__item--active');
	});
	$('.js-menu-forgot-password').click(function(e) {
		e.preventDefault();
		$(this).closest('.menu__item').removeClass('menu__item--active');
		$(this).closest('.menu__item').siblings('.restore-password').addClass('menu__item--active');
	});
	$('.js-mobile-exchange-give').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		showMenu();
		$('.menu-exchange--give').addClass('menu__item--active');
	});
	$('.js-mobile-exchange-get').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		showMenu();
		$('.menu-exchange--get').addClass('menu__item--active');
	});
	$('.js-menu-close').click(function(e) {
		e.preventDefault();
		hideMenu();
	});
	$(document).click(function(e) {
		if (!$(e.target).closest('.menu').length) {
			hideMenu();
		}
	});

	// masked input
	$('.js-mask-summ').mask("# ##0", {reverse: true});

	// modal windows
	$('.js-modal').fancybox({
		touch: false,
		lang : 'ru',
		i18n : {
			'ru' : {
				CLOSE: 'Закрыть',
				ERROR: 'Невозможно загрузить данные. Попробуйте еще раз.',
			}
		},
	});

	// choose payment system
	$('.exchange-currency__item').click(function() {
		$(this).addClass('exchange-currency__item--active').siblings('.exchange-currency__item').removeClass('exchange-currency__item--active');
		var template = $(this).data('template'),
		icon = $(this).find('.exchange-currency__item-icon img').attr('src'),
		name = $(this).find('.exchange-currency__item-name').text();
		if ( $(this).closest('.exchange__col').hasClass('exchange__col--give') || $(this).closest('.menu-exchange').hasClass('menu-exchange--give') ) {
			$('.js-exchange-give').load(template).addClass('fadeIn');
			$('.js-exchange-icon-give').attr('src', icon).addClass('fadeIn');
			$('.js-mobile-exchange-give .exchange-col__mobile-name').text(name).addClass('fadeIn');
		} else {
			$('.js-exchange-get').load(template).addClass('fadeIn');
			$('.js-exchange-icon-get').attr('src', icon).addClass('fadeIn');
			$('.js-mobile-exchange-get .exchange-col__mobile-name').text(name).addClass('fadeIn');
		}
		setTimeout(function () {
			$('.js-exchange-give, .js-exchange-get, .js-exchange-icon-give, .js-exchange-icon-get, .exchange-col__mobile-name').removeClass('fadeIn');
		}, 500);
		hideMenu();
	});

	// set currency symbol
	$('.js-exchange-currency-symbol').each(function() {
		var symbol = $(this).data('symbol');
		if ( $(this).is(':checked') && $(this).closest('.exchange__col').hasClass('exchange__col--give') ) {
			$('.exchange__col--give').find('.exchange-summ__currency').text(symbol);
		} else if ( $(this).is(':checked') && $('.exchange__col--get').find('.exchange-summ__currency').text(symbol) ) {
			$('.exchange__col--get').find('.exchange-summ__currency').text(symbol);
		}
		$(this).change(function() {
			if ($(this).closest('.exchange__col').hasClass('exchange__col--give')) {
				$('.exchange__col--give').find('.exchange-summ__currency').text(symbol);
			} else {
				$('.exchange__col--get').find('.exchange-summ__currency').text(symbol);
			}
		});
	});

	// bids select
	$('.js-bids-select').click(function(e) {
		e.stopPropagation();
		$('.cabinet-bids__select-dropdown').toggleClass('cabinet-bids__select-dropdown--active');
		$('.cabinet-bids__select-item').click(function(e) {
			e.preventDefault();
			if (!$(this).hasClass('cabinet-bids__select-item--active')) {
				var thisText = $(this).text();
				$(this).addClass('cabinet-bids__select-item--active').siblings().removeClass('cabinet-bids__select-item--active');
				$(this).closest('.cabinet-bids__select').find('.cabinet-bids__select-current').text(thisText);
				$(this).closest('.cabinet-bids__select-dropdown').removeClass('cabinet-bids__select-dropdown--active');
			}
		});
	});
	// close bids select if outside click
	$(document).click(function(e) {
		if (!$(e.target).closest('.cabinet-bids__select-dropdown').length) {
			$('.cabinet-bids__select-dropdown').removeClass('cabinet-bids__select-dropdown--active');
		}
	});

	// verification attach
	$('.js-verification-attach').change(function() {
		$('label[for="' + this.id + '"]').text($(this).val());
		readURL(this);
	});

	// select input value after focusing
	$('.js-input-selectText').focus(function() {
		$(this).select();
	});

	// copy to clipboard
	var clipboard = new Clipboard('.js-clipboard');
	$('.js-clipboard').click(function(e) {
		e.preventDefault();
	});
	clipboard.on('success', function(e) {
		e.clearSelection();
		e.trigger.textContent = 'Скопировано!';
	});

	// show promo block code
	$('.js-show-promoCode').click(function(e) {
		e.preventDefault();
		$(this).hide().next().addClass('cabinet-promo__material-textarea--active');
	});

	// validate exchange form
	$('.exchange-form').validate({
		errorClass: "input-text--error",
		wrapper: "div",
		focusInvalid: false,
		invalidHandler: function(form, validator) {
			if (!validator.numberOfInvalids())
				return;
			$('html, body').animate({
				scrollTop: $(validator.errorList[0].element).offset().top - 15
			}, 500);
		}
	});

	// inner burger navigation
	$('.js-inner-nav').click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).next().toggleClass('inner-page-nav__list--active');
	});
	$(document).click(function(e) {
		if (!$(e.target).closest('.inner-page-nav__list').length) {
			$('.inner-page-nav__list').removeClass('inner-page-nav__list--active');
		}
	});

	// load faq answer
	$('.faq__questions-item').each(function() {
		if ($(this).hasClass('faq__questions-item--active')) {
			var thisHref = $(this).attr('href');
			$('.faq__answer').html('<div class="faq__answer-loading"></div>').load(thisHref).addClass('fadeIn');
			setTimeout(function () {
				$('.faq__answer').removeClass('fadeIn');
			}, 500);
		}
	});
	$('.js-faq').on('click', '.faq__questions-item', function(e) {
		e.preventDefault();
		var thisHref = $(this).attr('href');
		$(this).addClass('faq__questions-item--active').siblings().removeClass('faq__questions-item--active');
		$(window).on('load resize', function() {
			if ($(window).width() <= 1200) {
				$('html, body').animate({
					scrollTop: $('.faq__answer').offset().top - 15
				}, 500);
			}
		});
		$('.faq__answer').html('<div class="faq__answer-loading"></div>').load(thisHref).addClass('fadeIn');
		setTimeout(function () {
			$('.faq__answer').removeClass('fadeIn');
		}, 500);
	});

	$('.partners__item-title').matchHeight();
	$('.partners__item-slogan').matchHeight();
	$('.partners__item-descr').matchHeight();

	function showMenu() {
		$('html').addClass('no-scroll');
		$('.menu').addClass('menu--active');
		if (!$('.menu__cover').length) $('body').prepend('<div class="menu__cover"></div>');
	}

	function hideMenu() {
		$('.menu').removeClass('menu--active');
		$('.menu__item').removeClass('menu__item--active');
		if ($('.menu__cover').length) $('.menu__cover').remove();
		if ($('html').hasClass('no-scroll')) $('html').removeClass('no-scroll');
	}

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('.cabinet-verification__attach-preview').html('<img src="'+e.target.result+'" alt="">').addClass('fadeIn');
			}
			setTimeout(function () {
				$('.cabinet-verification__attach-preview').removeClass('fadeIn');
			}, 500);
			reader.readAsDataURL(input.files[0]);
		}
	}

})(jQuery);