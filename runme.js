setInterval(function(){
  for(var i=0; i<30; i++)
  {
    for(var j=0; j<30; j++)
    {
      if(OWOP.world.getPixel(i+305,j+460)!=[0,0,0])
      {
        OWOP.world.setPixel(i+305,j+460,[0,0,0],false);
      }
      if(OWOP.world.getPixel(-i+305,j+460)!=[0,0,0])
      {
        OWOP.world.setPixel(-i+305,j+460,[0,0,0],false);
      }
      if(OWOP.world.getPixel(-i+305,-j+460)!=[0,0,0])
      {
        OWOP.world.setPixel(-i+305,-j+460,[0,0,0],false);
      }
      if(OWOP.world.getPixel(i+305,-j+460)!=[0,0,0])
      {
        OWOP.world.setPixel(i+305,-j+460,[0,0,0],false);
      }
    }
  }
}, 500);
