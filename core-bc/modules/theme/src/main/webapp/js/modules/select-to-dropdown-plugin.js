AUI.add('select-to-dropdown-plugin', function(A) {
	
    var Lang = A.Lang,
    	isNull = Lang.isNull,
    	isString = Lang.isString,
	
		getClassName = A.ClassNameManager.getClassName,
	
		NAME = 'select-to-dropdown-plugin',
		NS = 'select-to-dropdown',
		
		// Property keys
		HOST = 'host'
	;
    
    var
    	TPL_WRAP = '<span class="select-to-dropdown-wrap"></span>',
    	TPL_CURRENT = '<span class="select-to-dropdown-current">{value}</span>',
    	TPL_TRIGGER = '<span class="select-to-dropdown-trigger"></span>',
    
    	TPL_LIST = '<ul class="select-to-dropdown-list"></ul>',
    	TPL_LIST_ITEM = '<li data-value="{value}">{text}</li>'
    ;
	
    // This module is not yet finished
	var SelectToDropdown = A.Component.create(
		{
            ATTRS: {
            	
                someAttr: {
                    value : ''
                }
                
            },
			
            EXTENDS: A.Plugin.Base,
			NAME: NAME,
			NS: NS,
	
			prototype: {
				
				selectedValue: null,
				
				initializer: function() {
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
	                
	                var current = A.substitute(TPL_CURRENT, {
	                	value: selectedText
	                });

	                var trigger = A.substitute(TPL_TRIGGER, {
	                });
	                
	                var list = A.substitute(TPL_LIST, {
	                });
	                
	                wrapNode.append(current);
	                wrapNode.append(trigger);
	                wrapNode.append(list);
	                
					var listNode = parent.one('ul.select-to-dropdown-list');
					
					options.each(function(option, index, list){
						var value = option.get('value');
						var text = option.get('text');
						
		                var listItem = A.substitute(TPL_LIST_ITEM, {
		                	value: value,
		                	text: text
		                });
						
						listNode.append(listItem);
					});
					
					host.hide();
					
				},
				
				destructor: function() {
					var instance = this;
					
			        var host = instance.get(HOST);
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