MyButton=function(cont,t,btnText,func)
{
	this.prefix='MyButton';//Префикс, который добавляется для избежания конфликтов с именами
	this.type=t;//button - классическая кнопка, trigger - переключатель, radio - радиокнопка
	this.text=btnText;
	this.index=1;//уникальный индекс кнопки
	this.callback=null;
	this.background='white';
	this.color='black';
	this.width='auto';
	this.height='20px';
	this.state=false;
	this.radioGroup=null;
	if (typeof func === 'function') {
        this.callback=function(){func();};    
	}
	this.applyStyle=function()
	{
		$('#'+this.prefix+'_'+this.index).css(
		{
			'width':this.width,
			'height':this.height,
			'text-align': 'center',
			'color':this.color,
			'backgroundColor':this.background,
			'line-height': $('#'+this.prefix+'_'+this.index).height()+'px',
			'cursor' : 'pointer',
			'display':'inline-block',
			'padding' : '5px',
			'margin' : '3px'
		});
		$('#'+this.prefix+'_'+this.index).css(
		{			
			'border-radius': $('#'+this.prefix+'_'+this.index).height()/2+'px',
			'box-shadow': 'inset 5px -5px 10px rgba(0,0,0,0.5),inset -5px 5px 10px rgba(150,150,150,0.5)'
		});
	};
	this.redraw=function(eventObject)
	{
		var obj=eventObject.data.obj;		
		if(obj.type=='trigger')
		{
			obj.state=!obj.state;			
		}
		else if(obj.type=='radio')
		{
			obj.radioGroup.forEach(function(item)
			{
				item.state=false;
				$('#'+item.prefix+'_'+item.index).css('box-shadow', 'inset 5px -5px 10px rgba(0,0,0,0.5),inset -5px 5px 10px rgba(150,150,150,0.5)');
			});
			obj.state=true;			
		}
		if(obj.state)
			$(this).css('box-shadow', 'inset 5px -5px 10px rgba(0,0,0,0.5),inset -5px 5px 10px rgba(0,0,0,0.5)');
		else
			$(this).css('box-shadow', 'inset 5px -5px 10px rgba(0,0,0,0.5),inset -5px 5px 10px rgba(150,150,150,0.5)');
		if(obj.callback!=null)obj.callback(eventObject);
	};	
	while($('div').is('#'+this.prefix+'_'+this.index))
		this.index+=1;
	var text='<div id="'+this.prefix+'_'+this.index+'" >'+this.text+'</div>';
	if(this.type!='radio')cont.empty().append(text);
	else cont.append(text);
	$('#'+this.prefix+'_'+this.index).bind('click',{'obj':this}, this.redraw);
	if(this.type=='button')$('#'+this.prefix+'_'+this.index).bind('mousedown', function(){
		$(this).css('box-shadow', 'inset 5px -5px 10px rgba(0,0,0,0.5),inset -5px 5px 10px rgba(0,0,0,0.5)');
	});
	if(this.type=='button')$('#'+this.prefix+'_'+this.index).bind('mouseup', function(){
		$(this).css('box-shadow', 'inset 5px -5px 10px rgba(0,0,0,0.5),inset -5px 5px 10px rgba(150,150,150,0.5)');
	});
	if(this.type=='button')$('#'+this.prefix+'_'+this.index).bind('mouseout', function(){
		$(this).css('box-shadow', 'inset 5px -5px 10px rgba(0,0,0,0.5),inset -5px 5px 10px rgba(150,150,150,0.5)');
	});
	this.applyStyle();
}