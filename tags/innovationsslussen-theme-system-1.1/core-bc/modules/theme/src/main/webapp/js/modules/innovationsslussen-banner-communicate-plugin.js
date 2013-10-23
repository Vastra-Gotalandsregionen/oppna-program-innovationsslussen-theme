AUI().add('innovationsslussen-banner-communicate-plugin',function(A) {
    var Lang = A.Lang,
        isNull = Lang.isNull,
        
        HOST = 'host',
        
        NAME = 'innovationsslussen-banner-communicate-plugin',
        NS = 'innovationsslussen-banner-communicate-plugin',
        
        HEIGHT_ACTION_VIEW = 'heightActionView',
        HEIGHT_MINIMIZED = 'heightMinimized',
        HEIGHT_BACKLINK_WRAP = 'heightBackLinkWrap',
        HOST = 'host',
        
        URL_PREFIX = 'urlPrefix',
        URL_SUFFIX = 'urlSuffix',
        
		// Custom Attributes
        CSS_ANIM_RUNNING = 'banner-communicate-anim',
        
        CSS_BC_VIEW = 'banner-communicate-view',
        
        CSS_MINIMIZE = 'banner-communicate-minimize',
        CSS_MINIMIZED = 'banner-communicate-minimized',
        CSS_NORMALIZE = 'banner-communicate-normalize',
        
        CSS_HIDDEN = 'aui-helper-hidden'
    ;
    
    var	TPL_MOVIE_IFRAME = '<iframe class="movie-iframe" title="" frameborder="0" src="{src}" width="{width}" height="{height}"></iframe>',
    	TPL_MINIMIZE = '<div class="{cssClass}"><a href="#">{label}</a></div>',
		TPL_NORMALIZE = '<div class="{cssClass}"><a href="#">{label}</a></div>'

    var InnovationsslussenBannerCommunicatePlugin = A.Component.create(
            {
                ATTRS: {
                	
                	heightActionView: {
                		value: 600
                	},
                	
                	heightBackLinkWrap: {
                		value: 30
                	},
                	
                	heightMinimized: {
                		value: 100
                	},
                	
                	urlPrefix: {
                		value: '//www.youtube.com/embed/'
                	},
                	
                	urlSuffix: {
                		value: '?autoplay=1&rel=0&modestbranding=1&wmode=opaque'
                	},
                	
                	someAttr: {
                		value: null
                	}
                	
                },
                EXTENDS: A.Plugin.Base,
                NAME: NAME,
                NS: NS,
                
                anim: null,

                labelMinimize: '',
                labelNormalize: '',
                
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
                        
                        instance.labelMinimize = 'Visa mindre';
                        instance.labelNormalize = 'Visa mer';
                        
                        instance._initView();
                        instance._initAnim();
                    	
                        instance._bindActionLinks();
                        instance._bindWindowResize();
                    },
                    
                    _bindActionLinks: function() {
                    	var instance = this;
                    	
                    	var host = instance.get(HOST);
                    	
                    	// Bind action links
                    	var actionLinks = host.all('.action-link');
                    	actionLinks.on('click', instance._onActionLinkClick, instance);
                    	
                    	// Bind minimize link
                    	var minimizeLink = host.one('.' + CSS_MINIMIZE + ' a');
                    	minimizeLink.on('click', instance._onMinimizeClick, instance);
                    	
                    	// Bind normalize link
                    	var normalizeLink = host.one('.' + CSS_NORMALIZE + ' a');
                    	normalizeLink.on('click', instance._onNormalizeClick, instance);
                    	
                    },
                    
                    _bindWindowResize: function() {
                    	var instance = this;
                    	
                        // Bind window size change event
                        A.after('windowresize', function(e) {
                        	var instance = this;
                        	
                        	instance._updateHeightWidth();
                        	
                        }, instance);
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
                        
                        var movieCtns = host.all('.movie-ctn');
                        movieCtns.each(function(item, index, list) {
                        	item.guid();
                        });
                        
                    	var startView = host.one('.' + CSS_BC_VIEW + '-start');
                    	var movieView = host.one('.' + CSS_BC_VIEW + '-movie');
                    	var viewWrap = host.one('.' + CSS_BC_VIEW + '-wrap');
                    	var movieCtn = movieView.one('.movie-ctn');
                    	
                    	// Add minimize
						var minimizeNodeContent = A.substitute(TPL_MINIMIZE, {
							cssClass: CSS_MINIMIZE,
							label: instance.labelMinimize
						});
						
						startView.append(minimizeNodeContent);
						
                    	// Add normalize
						var normalizeNodeContent = A.substitute(TPL_NORMALIZE, {
							cssClass: CSS_NORMALIZE,
							label: instance.labelNormalize
						});
						
						startView.append(normalizeNodeContent);
						
                    	
						// Store node references on instance
                    	instance.startView = startView;
                    	instance.movieCtn = movieCtn;
                    	instance.movieView = movieView;
                    	instance.currentView = startView;
                    	instance.viewWrap = viewWrap;
                    	
                    	instance._updateHeightWidth();
                    },
                    
                    _onActionLinkClick: function(e) {
                    	var instance = this;
                    	
                    	var currentTarget = e.currentTarget;
                    	
                    	e.halt();
                    	
                    	var host = A.one('.banner-communicate');
                    	
                    	var isCurrentViewStart = (instance.currentView.getAttribute('id') == instance.startView.getAttribute('id') )
                    	
                    	var viewToShow = instance.startView;
                    	
                    	instance._clearVideo();
                    	
                    	if(isCurrentViewStart) {
                    		viewToShow = instance.movieView;
                    		
                    		var videoId = currentTarget.getAttribute('data-videoId'); 
                    		
                    		var url = instance.get(URL_PREFIX) + videoId + instance.get(URL_SUFFIX);
                    		
                    		var iframeNodeContent = A.substitute(TPL_MOVIE_IFRAME, {
    							src: url,
    							height: instance.movieHeight,
    							width: instance.movieWidth
    						});

                    		instance.movieCtn.append(iframeNodeContent);
                    		
                    		instance.anim.set('to', {height: instance.get(HEIGHT_ACTION_VIEW)});
                    		
                    	} else {
                    		instance.anim.set('to', {height: instance.startHeight});
                    	}
                    	
                    	instance.anim.run();
                    	
                    	instance.currentView.hide();
                    	viewToShow.show();
                    	
                    	instance.currentView = viewToShow;
                    },
                    
                    _onMinimizeClick: function(e) {
                    	var instance = this;
                    	
                    	e.halt();
                    	
                    	var host = instance.get(HOST);
                    	
                    	host.addClass(CSS_MINIMIZED);
                    },
                    
                    _onNormalizeClick: function(e) {
                    	var instance = this;
                    	
                    	e.halt();
                    	
                    	var host = instance.get(HOST);
                    	
                    	host.removeClass(CSS_MINIMIZED);
                    },
                    
                    _clearVideo: function() {
                    	var instance = this;
                    	
                    	instance.movieCtn.get('childNodes').remove();
                    },
                    
                    _updateHeightWidth: function() {
                    	var instance = this;
                    	
                    	if(!isNull(instance.startView)) {
                        	var startHeight = instance._getNodeHeight(instance.startView);
                        	var movieHeight = instance.get(HEIGHT_ACTION_VIEW) - instance.get(HEIGHT_BACKLINK_WRAP);
                        	var movieWidth = instance._getNodeWidth(instance.startView);
                        	
                        	instance.movieHeight = movieHeight;
                        	instance.movieWidth = movieWidth;
                        	instance.startHeight = startHeight;
                    	}
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
	       'event-resize',
	       'substitute',
	       'plugin'
      ]
    }
);
