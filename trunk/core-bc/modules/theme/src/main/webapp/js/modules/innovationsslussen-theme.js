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
                        
                        instance._initActionConfirmation();
                        instance._initSigninPrompt();
                        instance._initBannerCommunicate();
                        instance._initMainNavigation();
                        instance._initOverlayLinks();
                        instance._initSelectToDropdown();
                        instance._initExpandingTextareas();
                        instance._fixToolbar();
                    },
    
                    bindUI: function() {
                        var instance = this;
                        
                        instance._bindFaq();
                        
                        instance._bindIdeaSubmitButton();
                        
                        instance._bindIdeaList();
                        
                        //instance._bindNavigationTrigger();
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
                    
                    _bindIdeaList: function() {
                    	var instance = this;
                    	
                        var ideaList = A.one('.idea-list-new');
                        
                        if(ideaList) {
                        	ideaList.delegate('mouseenter', instance._handleIdeaListItemMouseEnter, 'a', instance);
                        	ideaList.delegate('mouseleave', instance._handleIdeaListItemMouseLeave, 'a', instance);
                        }
                        
                    },
                    
                    // Show loading mask on form submit
                    _bindIdeaSubmitButton: function () {
                    	var instance = this;

                        var submitButton = A.one('.create-idea-form input.aui-button-input-submit');
                        
                        if(!isNull(submitButton)) {
                        	
                        	submitButton.on('click', function(e) {
                        		
                        		var formNode = e.currentTarget.ancestor('form');
                        		
                        		if(!isNull(formNode)) {
                        			formNode.plug(A.LoadingMask, {
                    					background: '#bcd3e6',
                    					strings: {
                    						loading: 'Sparar din id&eacute;...'
                    					}
                        			});
                            		
                        			formNode.loadingmask.show();
                            		
                        			formNode.loadingmask.centerMessage();
                        		}
                        		
                        	}, instance);
                        }
                    },
                    
                    _bindNavigationTrigger: function() {
                    	var instance = this;
                    	
                    	var navigationTrigger = A.one('#navigationTrigger');
                    	
                    	navigationTrigger.on('click', function(e) {
                    		e.halt();
                    		A.one('body').toggleClass('show-navigation');
                    	}, instance)
                    	
                    	navigationTrigger.addClass('navigation-trigger-ready');
                    },
                    
                    _fixToolbar: function() {
                    	var instance = this;
                    	
                    	var lastItems = A.all('ul.rp-toolbar li:last-child');
                    	lastItems.addClass('last');
                    },
                    
                	_handleIdeaListItemMouseEnter: function(e) {
                		var instance = this;
                		
						var listItem = e.currentTarget;
						
					    var content2 = listItem.one('.idea-content-2');
					    
					    var anim = new A.Anim({
					        node: content2,
							duration: 0.3,
							easing: A.Easing.easeOut,
					        from: {
					            opacity: 0.0
					        },
					        to: {
					        	opacity: 1.0
					        }
					    });
					    
					    anim.run();
                	},
                	
                	_handleIdeaListItemMouseLeave: function(e) {
                		var instance = this;
                	},
                    
                    _initActionConfirmation: function() {
                    	var instance = this;
                    	
            			var requiresConfirmationLinks = A.all('a.requires-confirmation');
            			requiresConfirmationLinks.plug(A.Plugin.RpActionConfirmation);
                    },
                    
                    _initSigninPrompt: function() {
                    	var instance = this;
                    	
                    	var signinPromptNodes = A.all('.innovationsslussen-signin-prompt');
                    	
            			signinPromptNodes.plug(A.Plugin.InnovationsslussenSigninPromptLink);
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
					
					_initBannerCommunicate: function() {
						var instance = this;
						
						var bannerCommunicateNode = A.one('.banner-communicate');
						
						if(!isNull(bannerCommunicateNode)) {
							
							bannerCommunicateNode.plug(A.Plugin.InnovationsslussenBannerCommunicatePlugin);
						}
					},
                    
            		_initExpandingTextareas: function() {
            			var instance = this;
            			
            			var textareas = A.all('.rp-expanding-textarea');
            			textareas.plug(A.Plugin.RpExpandingTextarea);
            			
            			// Also cater for textareas created with aui-input tag
            			var auiTextareas = A.all('.rp-expanding-textarea textarea');
            			auiTextareas.plug(A.Plugin.RpExpandingTextarea);
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
            		
            		_initSelectToDropdown: function() {
            			var instance = this;
            			
            			var selects = A.all('select.select-to-dropdown');
            			selects.plug(A.Plugin.SelectToDropdown);
            		},
            		
                    
                    _onFaqQuestionClick: function(e) {
                    	var instance = this;
                    	
                    	var questionNode = e.currentTarget;
                    	var listNode = questionNode.ancestor('li');
                    	
                    	listNode.toggleClass('expanded');
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
            'anim',
	       	'aui-base',
	       	'aui-carousel',
	       	'aui-loading-mask',
	    	'event',
	    	'event-mouseenter',
	    	'event-resize',
	    	'innovationsslussen-banner-communicate-plugin',
	    	'innovationsslussen-signin-prompt-link-plugin',
	    	'rp-action-confirmation-plugin',
	    	'rp-iframe-link-plugin',
	    	'rp-expanding-textarea-plugin',
	    	'select-to-dropdown-plugin'
      ]
    }
);
