ProgBar=function(cont,t)//в качестве параметра передаётся элемент, который дожен содержать прогрессбар, и его тип
{
	this.prefix='ProgBar';//Префикс, который добавляется для избежания конфликтов с именами
	this.type=t;//proc - проценты, counter - прогресс по счётчику
	this.value=0;
	this.index=1;//уникальный индекс прогрессбара
	this.maxValue=10;//максимальное значение при прогреccе по счётчику
	this.applyStyle=function()
	{
		$('#'+this.prefix+'_'+this.index).css(//объединяющий элемент
		{
			'position':'relative',
			'height':'30px',
			'margin': '3px',
			'align':'center'
		});
		$('#'+this.prefix+'_'+this.index+'_background').css(//фон
		{
			'position':'absolute',
			'width':'100%',
			'height':$('#'+this.prefix+'_'+this.index).height()+'px',
			'backgroundColor':'white',
			'border-radius': $('#'+this.prefix+'_'+this.index).height()/2+'px',
			'box-shadow': 'inset 0 0 10px rgba(0,0,0,0.5)'
		});
		$('#'+this.prefix+'_'+this.index+'_progress').css(//строка прогресса
		{
			'position':'absolute',
			'height':$('#'+this.prefix+'_'+this.index).height()+'px',
			'backgroundColor':'lime',
			'border-radius': $('#'+this.prefix+'_'+this.index).height()/2+'px',
			'box-shadow': 'inset -5px 5px 15px rgba(255,255,255,150)'
		});
		$('#'+this.prefix+'_'+this.index+'_text').css(//текст
		{
			'font-family':'sans-serif',
			'line-height': $('#'+this.prefix+'_'+this.index).height()+'px',
			'width':'100%',
			'height': '100%',
			'position': 'relative',
			'text-align': 'center',
			'color': 'black'
		});
	};
	this.redraw=function()
	{
		if(this.type=='proc')
		{
			this.maxValue=100;
			$('#'+this.prefix+'_'+this.index+'_text').empty().append(Math.round(this.value*100)/100+'%');
		}
		else $('#'+this.prefix+'_'+this.index+'_text').empty().append(Math.round(this.value*100)/100+'/'+this.maxValue);
		var width=this.value/this.maxValue*100;
		$('#'+this.prefix+'_'+this.index+'_progress').animate({'width': width+'%'}, 500);
	};
	this.changeValue=function(newValue)
	{
		this.value=newValue;
		this.redraw();
	}	
	while($('div').is('#'+this.prefix+'_'+this.index))
		this.index+=1;
	var startText='0%';
	if(this.type=='counter')startText='0'
	var text='<div id="'+this.prefix+'_'+this.index+'">';
	text+='<div id="'+this.prefix+'_'+this.index+'_background"></div>';
	text+='<div id="'+this.prefix+'_'+this.index+'_progress"></div>';
	text+='<div id="'+this.prefix+'_'+this.index+'_text">'+startText+'</div>';
	text+='</div>';
	cont.empty().append(text);
	this.applyStyle();
	this.redraw();
}