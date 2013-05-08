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
                    },
    
                    bindUI: function() {
                        var instance = this;
                    },
                    
					_initBannerCarousel: function() {
						var instance = this;
						
						console.log('foo');
						
						var bannerBox = instance.get(BANNER_BOX);
						
						if(isNull(bannerBox)) {return;}
						
						var computedHeightBannerBox = parseInt(bannerBox.getComputedStyle('height').replace('px', ''));
						bannerBox.setStyle('height', computedHeightBannerBox);
						
						var bannerBoxContent = bannerBox.one('.banner-box-content');
						
						if(isNull(bannerBoxContent)) {return;}
						
						var computedWidth = parseInt(bannerBoxContent.getComputedStyle('width').replace('px', ''));
						var computedHeight = parseInt(bannerBoxContent.getComputedStyle('height').replace('px', ''));
						
                        var bannerBoxMenu = bannerBox.one('.banner-box-menu');
                        bannerBoxMenu.show();
						
						instance.bannerCarousel = new A.Carousel({
							intervalTime: 8,
							contentBox: bannerBoxContent,
							activeIndex: 'rand',
							height: computedHeight,
							width: computedWidth,
                            nodeMenu: bannerBoxMenu,
                            nodeMenuItemSelector: 'li'
						}).render();
						
						bannerBoxContent.all('a.banner-box-link').removeClass('aui-helper-hidden');
						bannerBox.addClass('banner-box-js');
						
                        // Bind window size change event
                        A.on('windowresize', function(e) {
                        	var bannerBox = instance.get(BANNER_BOX);
                        	
                            if(isNull(bannerBox)) {return;}
                            
                            var bannerBoxContent = bannerBox.one('.banner-box-content');
                            
                            if(isNull(bannerBoxContent)) {return;}
                            
    						var computedWidth = parseInt(bannerBoxContent.getComputedStyle('width').replace('px', ''));
    						var computedHeight = parseInt(bannerBoxContent.getComputedStyle('height').replace('px', ''));
    						
    						var width = computedWidth;
    						var height = computedHeight;
    						
    						if(height > 300) {
    							height = 300;
    						}
    						
    						//alert('resize width and height is: ' + width + ', ' + height);
    							
                            
                            instance.bannerCarousel.set('width', width);
                            //instance.bannerCarousel.set('height', height);
                            
                            instance.bannerCarousel.render();

                        });
						
						
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
