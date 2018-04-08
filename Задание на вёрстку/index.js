var PrBar1;
var PrBar2;
var PrBar3;
var Btn1;
var Btn2;
var RBtn=[];

markChanged=function()
{
	var sum=0;
	for(var i=0;i<Rate.marks.length;i++)
	{
		sum+=Rate.marks[i];
	}
	PrBar1.changeValue(sum/15*100);
	PrBar2.maxValue=15;
	PrBar2.changeValue(sum);
	
	PrBar3.maxValue=5;
	if(!Btn2.state)PrBar3.changeValue(sum/3);
};
resetRate=function()
{
	Rate.getMarks();
	for(var i=0;i<Rate.marks.length;i++)
		Rate.changeMark(i,Rate.marks[i]);
};
changeColor=function()
{
	
	var color='lime';
	if(RBtn[1].state) color='red';
	else if(RBtn[2].state) color='#AAA';
	//alert(color);
	$('#'+PrBar3.prefix+'_'+PrBar3.index+'_progress').css('backgroundColor',color);
};

$('document').ready(function()
{
	Rate.getMarks();
	Rate.placeMarkControl($('#rateElement0'),0);
	Rate.placeMarkControl($('#rateElement1'),1);
	Rate.placeMarkControl($('#rateElement2'),2);
	
	PrBar1 = new ProgBar($('#PrElement1'),'proc');
	PrBar2 = new ProgBar($('#PrElement2'),'counter');
	Rate.callfunc=markChanged;
	
	
	PrBar3 = new ProgBar($('#PrElement3'),'counter');
	Btn1 = new MyButton($('#Btn1'),'button','Сбросить рейтинг',resetRate);
	Btn2 = new MyButton($('#Btn2'),'trigger','"Заморозить" прогресс-бар');
	RBtn[0] = new MyButton($('#RBtn'),'radio','Зелёный',changeColor);	
	RBtn[1] = new MyButton($('#RBtn'),'radio','Красный',changeColor);
	RBtn[2] = new MyButton($('#RBtn'),'radio','Серый',changeColor);
	for(var i=0;i<RBtn.length;i++)
		RBtn[i].radioGroup=RBtn;
	$('#'+RBtn[0].prefix+'_'+RBtn[0].index).click();
		
	markChanged();

	$('#IconList li img').error(function()
	{
		$(this).css('display','none');
		$(this).parent().children('div').css('display','table');
		alert('ошибка загрузки');
	});
});