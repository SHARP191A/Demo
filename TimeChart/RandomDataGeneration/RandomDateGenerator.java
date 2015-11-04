
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Random;

public class RandomDateGenerator {
	RandomDate[] dates;
	Random rng;
	GregorianCalendar gc;
	
	public RandomDateGenerator(int dateCount)
	{
		gc = new GregorianCalendar();
		rng = new Random();
		dates = new RandomDate[dateCount];
		
		
		for(int i=0; i < dateCount; i++)
		{
			int year = 2014;
			gc.set(gc.YEAR, year);
			int monthInt = rng.nextInt(11)+1;
			gc.set(gc.MONTH,monthInt);
			int maxDayOfMonth = gc.getActualMaximum(gc.DAY_OF_MONTH);
			int day = rng.nextInt(maxDayOfMonth-1)+1;
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd");
			DecimalFormat decimalFormat = new DecimalFormat("00");
			String dateString = year + "-" + decimalFormat.format(monthInt) + "-" + decimalFormat.format(day);
			
			RandomDate rDate = new RandomDate(dateString, day, monthInt);
			dates[i] = rDate;
		}
	}

	public RandomDate[] getDates() {
		return dates;
	}

	public void setDates(RandomDate[] dates) {
		this.dates = dates;
	}
	
	
}
