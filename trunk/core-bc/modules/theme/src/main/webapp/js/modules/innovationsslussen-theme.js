AUI().add('innovationsslussen-theme',function(A) {
    var Lang = A.Lang,
    	isNull = Lang.isNull,
    	isUndefined = Lang.isUndefined,
    	getClassName = A.ClassNameManager.getClassName,
    	
    	BANNER_BOX = 'bannerBox',
        
        NAME = 'innovationsslussen-theme',
        NS = 'innovationsslussen-theme'
    ;
    
    var InnovationsslussenTheme = A.Component.create(
            {
                ATTRS: {
                	
					bannerBox: {
						setter: A.one,
						value: '.banner-box'
					},
                    
                    someAttribute: {
                        value: ''
                    }
                    
                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                prototype: {
                	
                	bannerCarousel: null,
                    
                    initializer: function(config) {
                        var instance = this;
                    },
                    
                    renderUI: function() {
                        var instance = this;
                        
                        instance._initBannerCarousel();
                        instance._initBreadcrumbs();
                        instance._initNavigationButton();
                        instance._initMainNavigation();
                        instance._initOverlayLinks();
                        instance._initTyckTill();
                        instance._initFaq();
                    },
    
                    bindUI: function() {
                        var instance = this;
                        
                        instance._bindFaq();
                    },
                    
                    _bindFaq: function () {
                    	var instance = this;
                    	
                    	var faqQuestionNodes = A.all('.faq-question');
                    	
                    	if(faqQuestionNodes) {
                        	faqQuestionNodes.on('click', instance._onFaqQuestionClick, instance);
                        	
                        	faqQuestionNodes.on('mouseover', function(e) {
                        		var currentTarget = e.currentTarget;
                        		currentTarget.addClass('hover');
                        	});
                        	faqQuestionNodes.on('mouseout', function(e) {
                        		var currentTarget = e.currentTarget;
                        		currentTarget.removeClass('hover');
                        	});
                    	}
                    },
                    
					_initBannerCarousel: function() {
						var instance = this;
						
						var bannerBox = instance.get(BANNER_BOX);
						
						if(isNull(bannerBox)) {return;}
						
						var bannerBoxContent = bannerBox.one('.banner-box-content');
						
						if(isNull(bannerBoxContent)) {return;}
						
						var bannerBoxContentWidth = instance._getNodeWidth(bannerBox);
						var bannerBoxContentHeight = instance._getNodeHeight(bannerBox);
						
                        var bannerBoxMenu = bannerBox.one('.banner-box-menu');
                        bannerBoxMenu.show();
						
						instance.bannerCarousel = new A.Carousel({
							intervalTime: 8,
							contentBox: bannerBoxContent,
							activeIndex: 'rand',
							height: bannerBoxContentHeight,
							width: bannerBoxContentWidth,
                            nodeMenu: bannerBoxMenu,
                            nodeMenuItemSelector: 'li'
						}).render();
						
						bannerBoxContent.all('a.banner-box-link').removeClass('aui-helper-hidden');
						bannerBox.addClass('banner-box-js');
						
						// Move carousel to next item (needed due to bug in ie7 with height and a bug in aui-carousel that prevents carousel.next() to work properly)
						var currentIndex = instance.bannerCarousel.get('activeIndex');
						var nodeSelectionSize = instance.bannerCarousel.nodeSelection.size();

						var newIndex = currentIndex + 1;

						if (newIndex > (nodeSelectionSize - 1)) {
							newIndex = 0;
						}

						instance.bannerCarousel.item(newIndex);
						
                        // Bind window size change event
                        A.after('windowresize', function(e) {
                        	var instance = this;
                        	
                        	var bannerBox = instance.get(BANNER_BOX);
                        	
                            if(isNull(bannerBox)) {return;}
                            
                            var carouselNode = bannerBox.one('.aui-carousel');
                            
                            if(isNull(carouselNode)) {return;}
                            
                            var carouselHeight = instance._getNodeHeight(carouselNode);
                            var carouselWidth = instance._getNodeWidth(carouselNode);
                            var carouselRatio = carouselHeight/carouselWidth;
                            
                            carouselNode.setStyle('width', 'auto');
                            
                            var carouselWidthNew = instance._getNodeWidth(carouselNode);
                            var carouselHeightNew = carouselRatio * carouselWidthNew;

                            instance.bannerCarousel.set('width', carouselWidthNew);
                            instance.bannerCarousel.set('height', carouselHeightNew);
    						
                            instance.bannerCarousel.render();
                        }, instance);
						
					},
					
                    _initFaq: function() {
                    	var instance = this;
                    	
                    	var answerNodes = A.all('.faq-answer');
                    	if(answerNodes) {
                    		answerNodes.hide();	
                    	}
                    	
                    	var faqWrap = A.all('.faq-wrap');
                    	
                    	if(faqWrap) {
                    		faqWrap.removeClass('faq-wrap-not-active');	
                    	}
                    },
					
					
					_getNodeHeight: function(node) {
						var instance = this;
						
						var height = 0;
						
						var computedHeightStr = node.getComputedStyle('height');
						
						if(computedHeightStr) {
							height = parseInt(computedHeightStr.replace('px', ''));
						}
						
						return height;
					},
					
					_getNodeWidth: function(node) {
						var instance = this;
						
						var width = 0;
						
						var computedWidthStr = node.getComputedStyle('width');
						
						if(computedWidthStr) {
							width = parseInt(computedWidthStr.replace('px', ''));
						}
						
						return width;
					},
                    
                    _initBreadcrumbs: function() {
                    	var instance = this;
                    	
                    	var breadcrumbItems = A.all('#breadcrumbs ul.breadcrumbs li');
                    	if(breadcrumbItems.size() > 0) {
                    		var firstItem = breadcrumbItems.item(0);
                    		var lastItem = breadcrumbItems.item(breadcrumbItems.size() - 1);
                    		
                    		firstItem.addClass('first');
                    		lastItem.addClass('last');
                    	}
                    	
                    },

            		_initOverlayLinks: function() {
            			var instance = this;
            			
            			var overlayLinks = A.all('a.rp-overlay-link');
            			overlayLinks.plug(A.Plugin.RpIframeLink);
            		},
            		
            		_initMainNavigation: function() {
            			var instance = this;
            			
            			var mainNavList = A.one('#navigation ul.nav-list');
            			
            			if(mainNavList) {
            				var mainNavListItems = mainNavList.all('> li');
            				
                			mainNavListItems.on('mouseenter', instance._onMainNavItemEnter, instance);
                			mainNavListItems.on('mouseleave', instance._onMainNavItemLeave, instance);
                			
                			// Extra callback method that ensures that no hover classes are left behind in ie
                			
                			mainNavList.on('mouseenter', instance._onMainNavEnter, instance);
                			mainNavList.on('mouseleave', instance._onMainNavLeave, instance);
            			}
            		},
                    
            		_initNavigationButton: function() {
            			var instance = this;
            			
            			var rpNavigationButton = new A.RpNavigationButton();
            			
            			rpNavigationButton.render();
            		},
            		
            		_initTyckTill: function() {
            			var instance = this;
            			
            			var trigger = A.one('#tycktillWrap a');
            			
            			// Do nothing if there is no tycktill trigger
            			if(!trigger) { return; }
            			
            			var tyckTill = new A.TyckTill({
            				trigger: trigger
            			});
            			
            			tyckTill.render();
            		},
            		
                    _onFaqQuestionClick: function(e) {
                    	var instance = this;
                    	
                    	var questionNode = e.currentTarget;
                    	var answerNodes = questionNode.siblings('.faq-answer');
                    	var faqWrap = questionNode.ancestor('.faq-wrap');
                    	
                    	var allQuestionNodes = faqWrap.all('.faq-question');
                    	var allAnswerNodes = faqWrap.all('.faq-answer');
                    	
                    	var isTargetActive = questionNode.hasClass('active');
                    	
                    	allAnswerNodes.hide();
                    	allQuestionNodes.removeClass('active');
                    	
                    	if(isTargetActive) {
                    		questionNode.removeClass('active');
                    	}
                    	else {
                    		questionNode.addClass('active');
                    		answerNodes.show();
                    	}
                    },
            		
            		_onMainNavEnter: function(e) {
            			var instance = this;
            		},
            		
            		_onMainNavLeave: function(e) {
            			var instance = this;
            			
            			var mainNavList = e.currentTarget;
            			
            			var mainNavListItems = mainNavList.all('li');
            			mainNavListItems.removeClass('hover');
            		},
            		
            		_onMainNavItemEnter: function(e) {
            			var instance = this;
            			
            			var navListItem = e.currentTarget;
            			
            			var allNavListItems = A.all('#navigation li');
            			allNavListItems.removeClass('hover');
            			
            			navListItem.addClass('hover');
            		},
            		
            		_onMainNavItemLeave: function(e) {
            			var instance = this;
            			
            			var navListItem = e.currentTarget;
            			navListItem.removeClass('hover');
            		},
                    
                    _someFunction: function(e) {
                        var instance = this;
                    }

                }
            }
    );

    A.InnovationsslussenTheme = InnovationsslussenTheme;
        
    },1, {
        requires: [
	       	'aui-base',
	       	'aui-carousel',
	    	'event',
	    	'event-resize',
	    	'rp-iframe-link-plugin',
	    	'rp-navigation-button',
	    	'rp-tyck-till'
      ]
    }
);
