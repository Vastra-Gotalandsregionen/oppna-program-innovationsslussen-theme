AUI().add('innovationsslussen-banner-communicate-plugin',function(A) {
    var Lang = A.Lang,
        isNull = Lang.isNull,
        
        NAME = 'innovationsslussen-banner-communicate-plugin',
        NS = 'innovationsslussen-banner-communicate-plugin',
        
        HEIGHT_ACTION_VIEW = 'heightActionView',
        HEIGHT_BACKLINK_WRAP = 'heightBackLinkWrap',
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
                	
                	heightBackLinkWrap: {
                		value: 30
                	},
                	
                	someAttr: {
                		value: null
                	}
                	
                },
                EXTENDS: A.Plugin.Base,
                NAME: NAME,
                NS: NS,
                
                anim: null,

                movieHeight: null,
                movieWidth: null,
                startHeight: null,
                currentView: null,
                movieCtn: null,
                movieView: null,
                startView: null,
                viewWrap: null,
                
                prototype: {
                	
                	player: null,
                    
                    initializer: function(config) {
                        var instance = this;
                        
                        var host = instance.get(HOST);
                        
                        instance._initView();
                        instance._initPlayer();
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
					
					_initPlayer: function() {
						var instance = this;
						
						var host = instance.get(HOST);
						
                        var movieCtnId = instance.movieCtn.getAttribute('id');

                        var movieHeight = instance.movieHeight;
                        var movieWidth = instance.movieWidth;

                        if(YT != null) {
                            instance.player = new YT.Player(movieCtnId, {
                        		height: movieHeight,
                        		width: movieWidth,
                        		playerVars: {
                        			autoplay: 0,
                        			rel: 0,
                        			modestbranding: 1,
                        			wmode: 'opaque'
                        		}					              
                            });
                        }
					},
                    
                    _initView: function() {
                    	var instance = this;
                    	
                        var host = instance.get(HOST);
                        
                        var views = host.all('.' + CSS_BC_VIEW);
                        
                        // Make sure each view has an explicit id
                        views.each(function(item, index, list) {
                        	item.guid();
                        });
                        
                        var movieCtns = host.all('.movie-ctn');
                        movieCtns.each(function(item, index, list) {
                        	item.guid();
                        });
                        
                    	var startView = host.one('.' + CSS_BC_VIEW + '-start');
                    	var movieView = host.one('.' + CSS_BC_VIEW + '-movie');
                    	var viewWrap = host.one('.' + CSS_BC_VIEW + '-wrap');
                    	var movieCtn = movieView.one('.movie-ctn');
                    	
                    	instance.startView = startView;
                    	instance.movieCtn = movieCtn;
                    	instance.movieView = movieView;
                    	instance.currentView = startView;
                    	instance.viewWrap = viewWrap;
                    	
                    	var startHeight = instance._getNodeHeight(startView);
                    	var movieHeight = instance.get(HEIGHT_ACTION_VIEW) - instance.get(HEIGHT_BACKLINK_WRAP);
                    	var movieWidth = instance._getNodeWidth(startView);
                    	
                    	instance.movieHeight = movieHeight;
                    	instance.movieWidth = movieWidth;
                    	instance.startHeight = startHeight;
                    },
                    
                    _onActionLinkClick: function(e) {
                    	var instance = this;
                    	
                    	var currentTarget = e.currentTarget;
                    	
                    	e.halt();
                    	
                    	var host = A.one('.banner-communicate');
                    	
                    	var isCurrentViewStart = (instance.currentView.getAttribute('id') == instance.startView.getAttribute('id') )
                    	
                    	var viewToShow = instance.startView;
                    	
                		if(!isNull(instance.player)) {
                			instance.player.stopVideo();
                			instance.player.clearVideo();
                		}
                    	
                    	if(isCurrentViewStart) {
                    		viewToShow = instance.movieView;

                    		var videoId = currentTarget.getAttribute('data-videoId'); 
                    		
                    		if(!isNull(instance.player)) {
                    			instance.player.loadVideoById(videoId);
                    		}
                    		
                    		instance.anim.set('to', {height: instance.get(HEIGHT_ACTION_VIEW)});
                    		
                    	} else {
                    		instance.anim.set('to', {height: instance.startHeight});
                    	}
                    	
                    	instance.anim.run();
                    	
                    	instance.currentView.hide();
                    	viewToShow.show();
                    	
                    	instance.currentView = viewToShow;
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
