AUI().add('innovationsslussen-banner-communicate-plugin',function(A) {
    var Lang = A.Lang,
        isNull = Lang.isNull,
        
        NAME = 'innovationsslussen-banner-communicate-plugin',
        NS = 'innovationsslussen-banner-communicate-plugin',
        
        HEIGHT_ACTION_VIEW = 'heightActionView',
        HOST = 'host',
        
		// Custom Attributes
        CSS_ANIM_RUNNING = 'banner-communicate-anim',
        
        CSS_BC_VIEW = 'banner-communicate-view',
        
        CSS_HIDDEN = 'aui-helper-hidden'
    ;

    var InnovationsslussenBannerCommunicatePlugin = A.Component.create(
            {
                ATTRS: {
                	
                	heightActionView: {
                		value: 600
                	},
                	
                	someAttr: {
                		value: null
                	}
                	
                },
                EXTENDS: A.Plugin.Base,
                NAME: NAME,
                NS: NS,
                
                anim: null,

                heightStart: null,
                viewCurrent: null,
                viewStart: null,
                viewWrap: null,
                
                prototype: {
                	
                	dialog: null,
                    
                    initializer: function(config) {
                        var instance = this;
                        
                        var host = instance.get(HOST);
                        
                        instance._initView();
                        instance._initAnim();
                    	
                        instance._bindActionLinks();
                    },
                    
                    _bindActionLinks: function() {
                    	var instance = this;
                    	
                    	var host = instance.get(HOST);
                    	
                    	var actionLinks = host.all('.action-link');
                    	
                    	actionLinks.on('click', instance._onActionLinkClick, instance);
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
					
					_initAnim: function() {
						var instance = this;
						
                    	instance.anim = new A.Anim({
                    		duration: 1.0,
                    		easing: A.Easing.easeOut,
                    	    node: instance.viewWrap,
                    	    to: {
                    	        height: instance.get(HEIGHT_ACTION_VIEW)
                    	    }
                    	});                    	
						
                    	instance.anim.on('start', function(e) {
                    		var instance = this;
                    		var host = instance.get(HOST);
                    		
                    		host.addClass(CSS_ANIM_RUNNING);
                    	}, instance);
                    	
                    	instance.anim.on('end', function(e) {
                    		var instance = this;
                    		var host = instance.get(HOST);
                    		
                    		host.removeClass(CSS_ANIM_RUNNING);
                    	}, instance);
					},
                    
                    _initView: function() {
                    	var instance = this;
                    	
                        var host = instance.get(HOST);
                        
                        var views = host.all('.' + CSS_BC_VIEW);
                        
                        // Make sure each view has an explicit id
                        views.each(function(item, index, list) {
                        	item.guid();
                        });
                        
                    	var viewStart = host.one('.' + CSS_BC_VIEW + '-1');
                    	var viewWrap = host.one('.' + CSS_BC_VIEW + '-wrap');
                    	
                    	instance.viewStart = viewStart;
                    	instance.viewCurrent = viewStart;
                    	instance.viewWrap = viewWrap;
                    	
                    	var heightStart = instance._getNodeHeight(viewStart);
                    	
                    	instance.heightStart = heightStart;
                    },
                    
                    _onActionLinkClick: function(e) {
                    	var instance = this;
                    	
                    	var currentTarget = e.currentTarget;
                    	
                    	e.halt();
                    	
                    	var viewToShowIndex = currentTarget.getAttribute('data-showView');
                    	
                    	var host = A.one('.banner-communicate');
                    	
                    	var viewToShow = host.all('.' + CSS_BC_VIEW + '-' + viewToShowIndex);
                    	
                    	var isViewStart = ( viewToShow.getAttribute('id') == instance.viewStart.getAttribute('id') );
                    	
                    	if(isViewStart) {
                        	instance.anim.set('to', {height: instance.heightStart});
                    	}
                    	else {
                    		instance.anim.set('to', {height: instance.get(HEIGHT_ACTION_VIEW)});
                    	}
                    	
                    	instance.anim.run();
                    	
                    	instance.viewCurrent.hide();
                    	viewToShow.show();
                    	
                    	instance.viewCurrent = viewToShow;
                    },
                    
                    _someFunction: function() {
                        var instance = this;
                    }

                }
            }
    );

    A.namespace('Plugin').InnovationsslussenBannerCommunicatePlugin = InnovationsslussenBannerCommunicatePlugin;
        
    },1, {
        requires: [
           'anim',
	       'aui-base',
	       'aui-component',
	       'aui-simple-anim',
	       'plugin'
      ]
    }
);
