AUI.add('rp-iframe-link-plugin', function(A) {
	
	var	Lang = A.Lang,
		getClassName = A.ClassNameManager.getClassName,
		NAME = 'rp-iframe-link-plugin',
		NS = 'rp-iframe-link',
	
		// Custom Attributes
		ALIGN_HEIGHT_WITH_VIEWPORT = 'alignHeightWithViewport',
		ALIGN_WIDTH_WITH_VIEWPORT = 'alignWidthWithViewport',
		RATIO_HEIGHT_VIEWPORT = 'ratioHeightViewport',
		RATIO_WIDTH_VIEWPORT = 'ratioWidthViewport',
		USE_MAX_HEIGHT = 'useMaxHeight',
		IFRAME_ID = 'iframeId',
		MAX_HEIGHT = 'maxHeight',
		WIDTH = 'width',
	
		// Property keys
		HOST = 'host'
	;
	
	var TPL_IFRAME = '<iframe class="content-iframe" title="" frameborder="0" allowfullscreen src="{url}" width="100%" height="100%" scrolling="yes"></iframe>';

	var RpIframeLink = A.Component.create({
		
		ATTRS:
			{
            	alignHeightWithViewport: {
        		value: true
            },
	            alignWidthWithViewport: {
	            value: true
            },
	            iframeId: {
	            value: 'rpDialogIframe'
            },
	            maxHeight: {
	            value: 500
            },
	            ratioHeightViewport: {
	            value: 0.9
            },
	            ratioWidthViewport: {
	            value: 0.7
            },
	            width: {
	            value: 600
            },
                useMaxHeight: {
                value: true
            }

        },

        EXTENDS: A.Plugin.Base,
        NAME: NAME,
        NS: NS,

        prototype: {
        	dialog: null,
        	dialogTitle: '',
			winHeight: null,
			winWidth: null,

			initializer: function() {
				var instance = this;
				
				var host = instance.get(HOST);

				instance.dialogTitle = '&nbsp;'

				if(!host.hasChildNodes()) {
					instance.dialogTitle = host.html();
				}

				instance.winHeight = A.one("body").get("winHeight");
				instance.winWidth = A.one("body").get("winWidth");

				if(instance.get(ALIGN_HEIGHT_WITH_VIEWPORT)) {
					var maxHeight = instance.winHeight * instance.get(RATIO_HEIGHT_VIEWPORT);
					instance.set(MAX_HEIGHT, maxHeight);
				}

				if(instance.get(ALIGN_WIDTH_WITH_VIEWPORT)) {
					var width = instance.winWidth * instance.get(RATIO_WIDTH_VIEWPORT);
					instance.set(WIDTH, width);
				}

				instance._initLinks();
			},

			_initLinks: function() {
				var instance = this;
		
				var host = instance.get(HOST);
				var uri = host.getAttribute('href');
				uri = uri.replace('p_p_state=normal', 'p_p_state=pop_up');

				host.setAttribute('href', uri);
				
				host.on('click', instance._onHostClick, instance);
			},
			
            // Event listener - on before documentDialog render
            _onBeforeDocumentDialogRender: function (e, params) {

                // Instance is document dialog
                var instance = this;

                var iframeURL = params[0];
                
                var contentIframe = A.substitute(TPL_IFRAME, {
                	url: iframeURL
                });

                instance.set('bodyContent', contentIframe);
            },
			
			_onHostClick: function(e) {
				var instance = this;
				e.halt();

				var linkNode = e.currentTarget;
				var uri = linkNode.getAttribute('href');
				var iframeId = instance.get(IFRAME_ID);
				var width = instance.get(WIDTH);
				var height = 'auto';
				
				var title = linkNode.html();
				
				var useMaxHeight = instance.get(USE_MAX_HEIGHT);
				
				if(useMaxHeight) {
					height = instance.get(MAX_HEIGHT);
				}

				var dialog = new A.Dialog({
					bodyContent: 'Lorem ipsum',
					centered: false,
					cssClass: 'rp-iframe-dialog',
					align: { node: null, points: [A.WidgetPositionAlign.TC, A.WidgetPositionAlign.TC] },
					destroyOnClose: true,
					modal: true,
					title: title,
					resizable: true,
					height: height,
					width: width
				});
				
				var params = [uri];
				dialog.before('render', instance._onBeforeDocumentDialogRender, dialog, params);
				dialog.render();

				instance.dialog = dialog;

				// Listen for when the iframe is available to be modified
				//A.on('available', instance._onIframeAvailable, '#' + iframeId, null, null, instance);
			},

			/*
			_onIframeAvailable: function(e, instance) {
				var iframeNode = this;
				var maxHeight = instance.get(MAX_HEIGHT);
				var useMaxHeight = instance.get(USE_MAX_HEIGHT);

				var currentDialog = instance.dialog;

				// _uiSetHeight method only exist in later versions of aui-dialog-iframe
				
				// Intercept the _uiSetHeight method to check if to close dialog
				A.Do.before(function(height) {
					var iframeDoc = iframeNode.resizeiframe._iframeDoc;
					var iframeDocEl = iframeDoc && iframeDoc.documentElement;

					var iframeDocElNode = A.one(iframeDocEl);
					var savedIndicatorNode = iframeDocElNode.one('.iframe-saved-indicator');
					if(savedIndicatorNode) { 
						currentDialog.close(); 
					}
				}, iframeNode.resizeiframe, '_uiSetHeight');

				// If don't useMaxHeight, dont continue
				if(!useMaxHeight) { return; }

				// Intercept the _uiSetHeight method and modify if it goes further
				A.Do.before(function(height) {
					var iframeDoc = iframeNode.resizeiframe._iframeDoc;
					var iframeDocEl = iframeDoc && iframeDoc.documentElement;
					var tooTall = height > maxHeight;

					iframeDocEl.style.overflowY = tooTall ? '' : 'hidden';

					if (tooTall) {
						return new A.Do.AlterArgs('MaxHeight set', [maxHeight]);
						//return new A.Do.Prevent();
					}

				}, iframeNode.resizeiframe, '_uiSetHeight');
			},
			*/

			_someFunction: function() {}
        	}

		}
	);

	A.namespace('Plugin').RpIframeLink = RpIframeLink;

	}, '1.0.1' ,{
		requires:[
			'aui-component',
			'aui-dialog',
			'plugin'
		]
	}
);
