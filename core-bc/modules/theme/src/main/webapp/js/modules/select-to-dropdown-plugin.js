AUI.add('select-to-dropdown-plugin', function(A) {
	
    var Lang = A.Lang,
    	isNull = Lang.isNull,
    	isString = Lang.isString,
	
		getClassName = A.ClassNameManager.getClassName,
		
		NAME = 'select-to-dropdown-plugin',
		NS = 'select-to-dropdown',
		
		// Property keys
		BIND_FORM_SUBMIT = 'bindFormSubmit',
		HOST = 'host'
	;
    
    var
    	TPL_WRAP = '<span class="select-to-dropdown-wrap"></span>',
    	TPL_TRIGGER = '<span class="select-to-dropdown-trigger">{value}</span>',
    
    	TPL_LIST = '<ul class="select-to-dropdown-list"></ul>',
    	TPL_LIST_ITEM = '<li class="{cssClass}" data-value="{value}">{text}</li>'
    ;
	
    // This module is not yet finished
	var SelectToDropdown = A.Component.create(
		{
            ATTRS: {
            	
            	bindFormSubmit: {
            		value: false
            	},
            	
                someAttr: {
                    value : ''
                }
                
            },
			
            EXTENDS: A.Plugin.Base,
			NAME: NAME,
			NS: NS,
	
			prototype: {
				
				listVisible: false,
				listNode: null,
				triggerNode: null,
				selectedValue: null,
				wrapNode: null,
				
				initializer: function() {
					var instance = this;
					
					instance._setupUI();
					instance._setupBind();
				},
				
				destructor: function() {
					var instance = this;
					
			        var host = instance.get(HOST);
				},
				
				_onDocumentClick: function(e) {
					var instance = this;
					
					var target = e.target;
					
					var isChildOfWrap = instance.wrapNode.contains(target);
					
					if(instance.listVisible && !isChildOfWrap) {
						instance.listNode.removeClass('select-to-dropdown-list-active');
						instance.listVisible = !instance.listVisible;
					}
				},
				
				_onListItemClick: function(e) {
					var instance = this;
					
					var currentTarget = e.currentTarget;
					
					var selectedValue = currentTarget.getAttribute('data-value');
					var selectedNodeInnerHtml = currentTarget.html();
					
					instance.selectedValue = selectedValue;
					
					instance.triggerNode.html(selectedNodeInnerHtml);
					
					var host = instance.get(HOST);
					host.set('value', instance.selectedValue);
					
					if(instance.get(BIND_FORM_SUBMIT)) {
						var form = host.ancestor('form');
						submitForm(form);
					}
					
				},
				
				_onTriggerClick: function(e) {
					var instance = this;
					
					instance.listNode.toggleClass('select-to-dropdown-list-active');
					
					instance.listVisible = !instance.listVisible;
				},
				
				_setupBind: function() {
					var instance = this;
					
					// Trigger click
					instance.triggerNode.on('click', instance._onTriggerClick, instance)
					
					// Document click
					A.one(document.body).on('click', instance._onDocumentClick, instance);
					
					// List item click
					var listItems = instance.listNode.all('li');
					listItems.on('click', instance._onListItemClick, instance);
				},
				
				_setupUI: function() {
					var instance = this;
					
					var host = instance.get(HOST);
					var parent = host.ancestor();
					
					var selectedIndex = host.get('selectedIndex');
					var options = host.get('options');
					var selectedOption = options.item(selectedIndex);
					var selectedValue = selectedOption.get('value');
					var selectedText = selectedOption.get('text');
					
					instance.selectedValue = selectedValue;
					
	                var wrap = A.substitute(TPL_WRAP, {
	                });
	                
	                host.insert(wrap, 'after');
	                
	                var wrapNode = parent.one('.select-to-dropdown-wrap');
	                instance.wrapNode = wrapNode;
	                
	                var trigger = A.substitute(TPL_TRIGGER, {
	                	value: selectedText
	                });
	                
	                var list = A.substitute(TPL_LIST, {
	                });
	                
	                wrapNode.append(trigger);
	                wrapNode.append(list);
	                
					var listNode = parent.one('ul.select-to-dropdown-list');
					instance.listNode = listNode;
					
					options.each(function(option, index, list){
						var value = option.get('value');
						var text = option.get('text');
						
						var cssClass = '';
						
						if(index+1 == list.size()) {
							cssClass = 'last';
						}
						
		                var listItem = A.substitute(TPL_LIST_ITEM, {
		                	cssClass: cssClass,
		                	value: value,
		                	text: text
		                });
						
						listNode.append(listItem);
					});
					
					host.hide();
					
					
					var triggerNode = parent.one('.select-to-dropdown-trigger');
					instance.triggerNode = triggerNode;
				},
				
				_someFunction: function() {}
				
			}
		}
	);

	A.namespace('Plugin').SelectToDropdown = SelectToDropdown;

	}, '1.0.1' ,{
		requires:[
		          'aui-component',
		          'plugin',
		          'substitute'
  		]
	}
);