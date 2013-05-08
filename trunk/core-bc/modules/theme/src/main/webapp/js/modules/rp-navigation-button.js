AUI().add('rp-navigation-button',function(A) {
    var Lang = A.Lang,
        isNull = Lang.isNull,
        
        NAME = 'rp-navigation-button',
        NS = 'rp-navigation-button',
        
        BANNER_NODE = 'bannerNode',
        NAVIGATION_LIST = 'navigationList',
        TRIGGER = 'trigger',
        
        CSS_HIDDEN = 'aui-helper-hidden',
        CSS_SELECTED = 'selected',
        CSS_TRIGGER_ACTIVE = 'menu-active'
    ;

    var TPL_MENU = '<nav id="navigationButtonMenu"><ul class="navigation-button-menu-list"></ul></nav>',
    	TPL_MENU_ITEM = '<li class="{cssClass}"><a href="{url}">{label}</a></li>',
    	TPL_SUB_MENU = '<ul class="navigation-button-sub-menu-list"></ul>',
    	TPL_SUB_MENU_ITEM = '<li class="{cssClass}"><a href="{url}">{label}</a></li>'
	;
        
    var RpNavigationButton = A.Component.create(
            {
                ATTRS: {
                	
                	bannerNode: {
                		value: '#banner',
                		setter: A.one
                	},
                	
                	navigationList: {
                		value: '#navigation ul.nav-list',
                		setter: A.one
                	},
                	
                	trigger: {
                		value: '#navigationTrigger',
            			setter: A.one
                	}
                	
                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                
                navigationButtonMenu: null,
                
                prototype: {
                    
                    initializer: function(config) {
                        var instance = this;
                        
                    },
                    
                    renderUI: function() {
                        var instance = this;
                        
                        instance._initNavigationMenu();
                    },
    
                    bindUI: function() {
                        var instance = this;
                        
                        var trigger = instance.get(TRIGGER);
                        if(!isNull(trigger)) {
                        	trigger.on('click', instance._onTriggerClick, instance);	
                        }
                    },
                    
                    _initNavigationMenu: function(e) {
                    	var instance = this;
                    	
                    	var navigationList = instance.get(NAVIGATION_LIST);
                    	
                    	if(isNull(instance.get(TRIGGER)) || isNull(navigationList)) { return; }
                    	
                    	var firstLevelLinks = navigationList.all('>li>a');
                    	
                    	var bannerNode = instance.get(BANNER_NODE);
                    	
                    	bannerNode.append(TPL_MENU);
                    	
                    	var navigationButtonMenu = bannerNode.one('#navigationButtonMenu');
                    	
                    	navigationButtonMenu.hide();
                    	
                    	var menuList = navigationButtonMenu.one('.navigation-button-menu-list');
                    	
                    	firstLevelLinks.each(function(item, index, list) {
                    		var linkUrl = item.getAttribute('href');
                    		var spanNode = item.one('>span');
                    		var linkText = spanNode.html();
                    		var cssClass = '';
                    		
                    		var listItem = item.ancestor('li');
                    		
                    		if(index+1 == list.size()) {
                    			cssClass = cssClass + ' last';
                    		}
                    		
                    		if(listItem.hasClass(CSS_SELECTED)) {
                    			cssClass = cssClass + ' ' + CSS_SELECTED;
                    		} 
                    		
    						var menuItemHtml = A.substitute(TPL_MENU_ITEM, {
    							cssClass: cssClass,
    							label: linkText,
    							url: linkUrl
    						});
                    		
    						menuList.append(menuItemHtml);
    						
                    	});
                    	
						var selectedItemMainNav = navigationList.one('li.selected');
						var selectedSubMenuItem = menuList.one('li.selected');
						
						if(selectedItemMainNav && selectedSubMenuItem) {
							
                			var secondLevelList = selectedItemMainNav.one('ul.nav-list-sub-1');
                			
                			if(secondLevelList) {
                				var secondLevelLinks = secondLevelList.all('>li>a');
                				
                				selectedSubMenuItem.append(TPL_SUB_MENU);
                            	
                            	var subMenu = selectedSubMenuItem.one('>ul');
                            	
                            	secondLevelLinks.each(function(subItem, subIndex, subList) {
                            		
                            		var subLinkUrl = subItem.getAttribute('href');
                            		var subSpanNode = subItem.one('>span');
                            		var subLinkText = subSpanNode.html();
                            		var subCssClass = '';
                            		
                            		var subListItem = subItem.ancestor('li');
                            		
                            		if(subIndex+1 == subList.size()) {
                            			subCssClass = subCssClass + ' last';
                            		}
                            		
                            		if(subListItem.hasClass(CSS_SELECTED)) {
                            			subCssClass = subCssClass + ' ' + CSS_SELECTED;
                            		} 
                            		
            						var subMenuItemHtml = A.substitute(TPL_SUB_MENU_ITEM, {
            							cssClass: subCssClass,
            							label: subLinkText,
            							url: subLinkUrl
            						});
                            		
            						subMenu.append(subMenuItemHtml);
                            	});
                            	
                            	selectedSubMenuItem.addClass('expanded');
                			}
						}
                    	
                    	instance.navigationButtonMenu = navigationButtonMenu;
                    },
                    
                    _onTriggerClick: function(e) {
                    	var instance = this;
                    	
                    	e.halt();
                    	
                    	var trigger = instance.get(TRIGGER);
                    	
                    	if(instance.navigationButtonMenu.hasClass(CSS_HIDDEN)) {
                    		instance.navigationButtonMenu.show();
                    		trigger.addClass(CSS_TRIGGER_ACTIVE);
                    	}
                    	else {
                    		instance.navigationButtonMenu.hide();
                    		trigger.removeClass(CSS_TRIGGER_ACTIVE);
                    	}
                    },
                    
                    _someFunction: function() {
                        var instance = this;
                    }

                }
            }
    );

    A.RpNavigationButton = RpNavigationButton;
        
    },1, {
        requires: [
	       'aui-base',
	       'substitute'
      ]
    }
);
