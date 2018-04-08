Rate=
{
	prefix:'Rate',//Префикс, который добавляется для избежания конфликтов с именами
	checkedImg:'Activestar.png',//адрес активной звезды
	uncheckedImg:'UnActivestar.png',//адрес неактивной звезды
	marks:[],//массив с отметками
	callfunc:null,
	applyStyle:function()//применение стиля к элементам
	{
		$('.'+this.prefix+'_mark_img').css(
		{
			'cursor' : 'pointer',
			'display' : 'inline',
			'width' : '15px',
			'margin': '2px'
		}
		)
	},
	getMarks:function()
	{
		//получение множества оценок
		this.marks[0]=3;
		this.marks[1]=2;
		this.marks[2]=4;
	},
	placeMarkControl:function(container,key)
	{ 
		//размещение контрола в необходимых контейнерах
		var text='<div id="'+this.prefix+'_mark_'+key+'">';
		for(var i=1;i<=5;i++)
		{
			var link='';
			if(i<=this.marks[key]) link=this.checkedImg;
			else link=this.uncheckedImg;
			text+='<img class="'+this.prefix+'_mark_img" src="'+link+'" onclick="'+this.prefix+'.changeMark('+key+','+i+')">'
		}
		text+='</div>';
		container.empty();
		container.append(text);
		this.applyStyle();  
	},
	changeMark:function(key,mark)
	{
		//изменение оценки
		this.marks[key]=mark;
		var text='';
		for(var i=1;i<=5;i++)
		{
			var link='';
			if(i<=this.marks[key]) link=this.checkedImg;
			else link=this.uncheckedImg;
			text+='<img class="'+this.prefix+'_mark_img" src="'+link+'" onclick="'+this.prefix+'.changeMark('+key+','+i+')">'
		}
		$('#'+this.prefix+'_mark_'+key).empty().append(text);
		this.applyStyle();
		if(this.callfunc!=null)this.callfunc();
	}	
};

